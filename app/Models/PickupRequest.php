<?php

namespace App\Models;

use App\Services\PickupBookingNumberService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PickupRequest extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Customer-facing tracking statuses, distinct from the internal
     * `status` / `status_new` columns used by the authenticated app's
     * pickup logistics lifecycle (RequestStatusTransitionService). These
     * drive manual admin updates and the public /track-pickup/{token} page.
     */
    public const TRACKING_STATUSES = [
        'pending' => 'Pending',
        'confirmed' => 'Booking Confirmed',
        'in_progress' => 'In Progress',
        'driver_on_the_way' => 'Driver On The Way',
        'picked_up' => 'Picked Up',
        'processing' => 'Processing',
        'completed' => 'Completed',
        'cancelled' => 'Cancelled',
    ];

    protected $hidden = ['tracking_token'];

    protected $appends = ['shipping_charge', 'subtotal_amount', 'payment_receipt_image_url', 'tracking_url'];

    protected static function booted(): void
    {
        static::creating(function (PickupRequest $pickup) {
            if (!$pickup->booking_id) {
                $pickup->booking_id = PickupBookingNumberService::next();
            }
            if (!$pickup->tracking_token) {
                $pickup->tracking_token = PickupBookingNumberService::generateTrackingToken();
            }
            if (!$pickup->tracking_status) {
                $pickup->tracking_status = 'pending';
            }
        });
    }

    public function getTrackingUrlAttribute(): ?string
    {
        return $this->tracking_token ? url('/track-pickup/' . $this->tracking_token) : null;
    }

    public function statusHistories()
    {
        return $this->hasMany(PickupRequestStatusHistory::class)->orderBy('created_at');
    }

    public function certificate()
    {
        return $this->hasOne(PickupRequestCertificate::class);
    }

    public function scopePending($query)
    {
        return $query->where('tracking_status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('tracking_status', 'completed');
    }

    public function scopeTrackingStatus($query, string $status)
    {
        return $query->where('tracking_status', $status);
    }

    /**
     * Apply a manual admin status update and record it in the history table.
     */
    public function updateTrackingStatus(string $status, ?string $note = null, ?int $changedBy = null, ?string $publicNote = null): void
    {
        $this->update([
            'tracking_status' => $status,
            'tracking_status_updated_at' => now(),
            'admin_notes' => $note ?? $this->admin_notes,
            'public_notes' => $publicNote ?? $this->public_notes,
        ]);

        $this->statusHistories()->create([
            'status' => $status,
            'note' => $note,
            'changed_by' => $changedBy,
        ]);
    }

    public function getShippingChargeAttribute()
    {
        return $this->metadata['pricing_breakdown']['shipping_charge'] ?? 0;
    }

    public function getSubtotalAmountAttribute()
    {
        return $this->metadata['pricing_breakdown']['subtotal_amount'] ?? $this->estimated_amount;
    }

    public function getPaymentReceiptImageUrlAttribute()
    {
        $path = $this->payment_receipt_image;

        if (!$path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (file_exists(public_path($path))) {
            return asset($path);
        }

        return asset('storage/' . ltrim($path, '/'));
    }

    protected $fillable = [
        'request_type',
        'donation_category',
        'customer_id',
        'address_id',
        'pickup_code',
        'customer_name',
        'customer_phone',
        'created_by',
        'city_id',
        'address',
        'latitude',
        'longitude',
        'scheduled_at',
        'payout_method',
        'reschedule_reason',
        'status',
        'status_new',
        'customer_email',
        'meeting_type',
        'warehouse_assigned_at',
        'pickup_started_at',
        'pickup_completed_at',
        'warehouse_received_at',
        'payment_pending_at',
        'payment_completed_at',
        'completed_at',
        'estimated_amount',
        'final_amount',
        'cancellation_reason',
        'rating',
        'review',
        'payment_detail_id',
        'metadata',
        'coupon_code',
        'coupon_discount_value',
        'price_locked_at',
        'final_amount_modified_by',
        'payment_receipt_image',
        'tracking_status',
        'tracking_status_updated_at',
        'admin_notes',
        'public_notes',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'price_locked_at' => 'datetime',
        'metadata' => 'array',
        'tracking_status_updated_at' => 'datetime',
    ];

    public function setScheduledAtAttribute($value)
    {
        if ($value) {
            $this->attributes['scheduled_at'] = \Carbon\Carbon::parse($value)
                ->setTimezone(config('app.timezone'));
        } else {
            $this->attributes['scheduled_at'] = null;
        }
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function paymentDetail()
    {
        return $this->belongsTo(PaymentDetail::class);
    }

    public function attributes()
    {
        return $this->hasMany(PickupRequestAttribute::class);
    }

    public function requestAttributes()
    {
        return $this->hasMany(PickupRequestAttribute::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function priceLogs()
    {
        return $this->hasMany(PickupPriceLog::class);
    }

    public function isPriceLocked(): bool
    {
        return !is_null($this->price_locked_at);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function items()
    {
        return $this->hasMany(PickupItem::class);
    }

    public function images()
    {
        return $this->hasMany(PickupImage::class);
    }

    public function statusLogs()
    {
        return $this->hasMany(PickupStatusLog::class);
    }

    /**
     * Transition to a new status with validation and logging
     */
    public function transitionTo(
        \App\Enums\RequestStatus $newStatus,
        $userId,
        $userRole = 'system',
        $reason = null
    ) {
        return \App\Services\RequestStatusTransitionService::transition(
            $this,
            $newStatus,
            $userId,
            $userRole,
            $reason
        );
    }
}
