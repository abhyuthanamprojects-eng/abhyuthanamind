<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\PickupRequest;
use App\Models\PickupStatusLog;
use App\Services\ActivityLogger;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;


class AdminController extends Controller
{
    use ApiResponseTrait;

    /**
     * View Activity Logs.
     */
    #[OA\Get(
        path: "/api/admin/logs",
        operationId: "getAdminLogs",
        tags: ["Admin"],
        summary: "View system activity logs",
        security: [["apiAuth" => []]],
        responses: [
            new OA\Response(response: 200, description: "Logs fetched")
        ]
    )]
    public function logs(Request $request)
    {
        $query = Activity::with('causer')->latest();

        if ($request->has('module')) {
            $query->where('properties->module', $request->module);
        }

        if ($request->has('action')) {
            $query->where('properties->action', $request->action);
        }

        if ($request->has('user_id')) {
            $query->where('causer_id', $request->user_id);
        }

        $logs = $query->paginate(20);

        return $this->successResponse('general.success', $logs);
    }

    #[OA\Post(
        path: "/api/admin/payments/{id}/approve",
        operationId: "approvePayment",
        tags: ["Admin"],
        summary: "Approve or Reject Payment",
        security: [["apiAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["status"],
                properties: [
                    new OA\Property(property: "status", type: "string", enum: ["approved", "failed"], example: "approved"),
                    new OA\Property(property: "remarks", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Payment status updated"
            )
        ]
    )]
    public function approvePayment(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:approved,failed',
            'remarks' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $payment = Payment::find($id);

        if (!$payment) {
            return $this->errorResponse('general.not_found', 404);
        }

        $payment->status = $request->status;
        if ($request->has('remarks')) {
            $payment->remarks = $request->remarks;
        }
        $payment->save();

        ActivityLogger::log('approve_payment', 'admin', 'Payment ' . $request->status, ['payment_id' => $id, 'status' => $request->status]);

        if ($request->status === 'approved' && $payment->pickup_request_id) {
            $payment->pickupRequest()->update(['status' => 'completed']);
        }

        return $this->successResponse('payment.' . ($request->status === 'approved' ? 'approved' : 'failed'), $payment);
    }

    /**
     * List all pickup requests (Admin).
     */
    #[OA\Get(
        path: "/api/admin/pickups",
        operationId: "adminListPickups",
        tags: ["Admin"],
        summary: "List all pickup requests with global filters",
        security: [["apiAuth" => []]],
        responses: [
            new OA\Response(response: 200, description: "Pickups fetched")
        ]
    )]
    public function listPickups(Request $request)
    {
        $query = PickupRequest::with(['customer', 'items.category']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        $pickups = $query->latest()->paginate($request->per_page ?? 20);

        return $this->paginatedResponse('admin.pickups_fetched', $pickups);
    }

    public function getPickup($id)
    {
        $pickup = PickupRequest::with(['customer', 'items.category', 'images', 'statusLogs'])->find($id);

        if (!$pickup) {
            return $this->errorResponse('pickup.not_found', 404);
        }

        return $this->successResponse('admin.pickup_fetched', $pickup);
    }

    public function updatePickupStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $pickup = PickupRequest::findOrFail($id);

        \Illuminate\Support\Facades\DB::transaction(function () use ($pickup, $request) {
            $pickup->update(['status' => $request->status]);

            PickupStatusLog::create([
                'pickup_request_id' => $pickup->id,
                'status' => $request->status,
                'notes' => $request->notes ?? 'Status updated by admin',
                'created_by' => auth()->id()
            ]);
        });

        return $this->successResponse('admin.pickup_status_updated', $pickup);
    }

    public function getRescheduleRequests($id)
    {
        $pickup = PickupRequest::findOrFail($id);

        if ($pickup->status !== 'reschedule_requested') {
            return $this->errorResponse('admin.no_reschedule_requested', 400);
        }

        return $this->successResponse('admin.reschedule_request_fetched', [
            'pickup_request_id' => $pickup->id,
            'reschedule_reason' => $pickup->reschedule_reason,
            'current_scheduled_at' => $pickup->scheduled_at ? $pickup->scheduled_at->format('Y-m-d H:i:s') : null,
        ]);
    }

    public function approveReschedule(Request $request, $id)
    {
        $request->validate([
            'new_scheduled_at' => 'required|date|after:now',
            'notes' => 'nullable|string'
        ]);

        $pickup = PickupRequest::findOrFail($id);

        if ($pickup->status !== 'reschedule_requested') {
            return $this->errorResponse('admin.no_reschedule_requested', 400);
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($pickup, $request) {
            $pickup->update([
                'status' => 'rescheduled',
                'scheduled_at' => $request->new_scheduled_at
            ]);

            PickupStatusLog::create([
                'pickup_request_id' => $pickup->id,
                'status' => 'rescheduled',
                'notes' => 'Admin approved reschedule. Details: ' . $request->notes,
                'created_by' => auth()->id()
            ]);
        });

        return $this->successResponse('admin.reschedule_approved', $pickup);
    }

    public function rejectReschedule(Request $request, $id)
    {
        $request->validate([
            'notes' => 'nullable|string'
        ]);

        $pickup = PickupRequest::findOrFail($id);

        if ($pickup->status !== 'reschedule_requested') {
            return $this->errorResponse('admin.no_reschedule_requested', 400);
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($pickup, $request) {
            $pickup->update([
                'status' => 'assigned'
            ]);

            PickupStatusLog::create([
                'pickup_request_id' => $pickup->id,
                'status' => 'reschedule_rejected',
                'notes' => 'Admin rejected reschedule request. Details: ' . $request->notes,
                'created_by' => auth()->id()
            ]);
        });

        return $this->successResponse('admin.reschedule_rejected', $pickup);
    }

    public function getPickupTracking($id)
    {
        $pickupRequest = PickupRequest::with(['statusLogs.creator'])->findOrFail($id);

        $trackingData = [
            'pickup_request_id' => $pickupRequest->id,
            'order_code' => $pickupRequest->pickup_code,
            'current_status' => $pickupRequest->status,
            'scheduled_time' => $pickupRequest->scheduled_at ? $pickupRequest->scheduled_at->format('Y-m-d H:i:s') : null,
            'logs' => $pickupRequest->statusLogs,
        ];

        return $this->successResponse('admin.pickup_tracking_fetched', $trackingData);
    }

    public function getPickupTimeline($id)
    {
        $logs = PickupStatusLog::where('pickup_request_id', $id)
            ->with('creator')
            ->latest()
            ->get();
        return $this->successResponse('admin.timeline_fetched', $logs);
    }

    public function getVerificationAudit($id)
    {
        $pickup = PickupRequest::with(['items.category', 'images' => fn($q) => $q->where('type', 'verification')])
            ->findOrFail($id);

        return $this->successResponse('admin.verification_audit_fetched', [
            'items' => $pickup->items,
            'images' => $pickup->images,
            'final_amount' => $pickup->final_amount,
            'notes' => PickupStatusLog::where('pickup_request_id', $id)->where('status', 'picked_up')->first()?->notes
        ]);
    }

    /**
     * List payments / settlements.
     */
    #[OA\Get(
        path: "/api/admin/payments",
        operationId: "adminListPayments",
        tags: ["Admin"],
        summary: "List all payments and settlements",
        security: [["apiAuth" => []]],
        responses: [
            new OA\Response(response: 200, description: "Payments fetched")
        ]
    )]
    public function listPayments(Request $request)
    {
        $query = Payment::with(['user', 'pickupRequest']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $payments = $query->latest()->paginate($request->per_page ?? 20);

        return $this->paginatedResponse('admin.payments_fetched', $payments);
    }

    /**
     * Get single payment details.
     */
    #[OA\Get(
        path: "/api/admin/payments/{id}",
        operationId: "adminGetPaymentDetails",
        tags: ["Admin"],
        summary: "Get specific payment details",
        security: [["apiAuth" => []]],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Payment details fetched")
        ]
    )]
    public function getPayment($id)
    {
        $payment = Payment::with(['user', 'pickupRequest.items.category'])->find($id);

        if (!$payment) {
            return $this->errorResponse('general.not_found', 404);
        }

        return $this->successResponse('admin.payment_fetched', $payment);
    }
}
