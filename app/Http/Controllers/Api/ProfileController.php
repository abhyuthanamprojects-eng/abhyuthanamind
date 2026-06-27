<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use OpenApi\Attributes as OA;

class ProfileController extends Controller
{
    use ApiResponseTrait;

    /**
     * Update Bank Details.
     */
    #[OA\Post(
        path: "/api/auth/profile/bank-details",
        operationId: "updateBankDetails",
        tags: ["Profile"],
        summary: "Update user bank/upi details",
        security: [["apiAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["bank_name", "account_number", "ifsc_code"],
                properties: [
                    new OA\Property(property: "bank_name", type: "string"),
                    new OA\Property(property: "account_number", type: "string"),
                    new OA\Property(property: "ifsc_code", type: "string"),
                    new OA\Property(property: "upi_id", type: "string")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Bank details updated"),
            new OA\Response(response: 422, description: "Validation Error")
        ]
    )]
    public function updateBankDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bank_name' => 'required|string|max:100',
            'account_number' => 'required|string|max:50',
            'ifsc_code' => 'required|string|max:20',
            'upi_id' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $user = $request->user();
        $user->update([
            'bank_name' => $request->bank_name,
            'account_number' => $request->account_number,
            'ifsc_code' => $request->ifsc_code,
            'upi_id' => $request->upi_id,
        ]);

        return $this->successResponse('profile.bank_updated', $user);
    }

    #[OA\Post(
        path: "/api/auth/profile/update",
        operationId: "updateProfile",
        tags: ["Profile"],
        summary: "Update User Profile",
        description: "Update the user's name, email, city ID, and optionally upload a profile photo.",
        security: [["apiAuth" => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\MediaType(
                mediaType: "multipart/form-data",
                schema: new OA\Schema(
                    properties: [
                        new OA\Property(property: "name", type: "string", example: "John Doe"),
                        new OA\Property(property: "email", type: "string", format: "email", example: "john@example.com"),
                        new OA\Property(property: "city_id", type: "integer", example: 1),
                        new OA\Property(property: "profile_photo", type: "string", format: "binary", description: "Profile photo image file")
                    ]
                )
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Profile updated successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "boolean", example: true),
                        new OA\Property(property: "message", type: "string", example: "profile.updated"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 422, description: "Validation Error"),
            new OA\Response(response: 401, description: "Unauthenticated")
        ]
    )]
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'city_id' => 'nullable|exists:cities,id',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($request->hasFile('profile_photo')) {
            // Delete old photo if it exists
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            $user->profile_photo_path = $request->file('profile_photo')->store('profile_photos', 'public');
        } elseif ($request->boolean('remove_photo')) {
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            $user->profile_photo_path = null;
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('city_id')) {
            $user->city_id = $request->city_id;
        }

        $user->save();

        return $this->successResponse('profile.updated', $user->fresh());
    }

    #[OA\Delete(
        path: "/api/auth/profile",
        operationId: "deleteAccount",
        tags: ["Profile"],
        summary: "Delete user account",
        description: "Permanently delete the authenticated user's account and associated data.",
        security: [["apiAuth" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Account deleted successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "status", type: "boolean", example: true),
                        new OA\Property(property: "message", type: "string", example: "profile.deleted"),
                        new OA\Property(property: "data", type: "object")
                    ]
                )
            ),
            new OA\Response(response: 401, description: "Unauthenticated")
        ]
    )]
    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        // Revoke all sanctum tokens
        $user->tokens()->delete();

        // Hard-delete so the phone/email unique constraints are freed immediately.
        // A soft-delete leaves the row (and its unique indexes) in place, causing
        // "Duplicate entry" errors if the same phone tries to register again.
        $user->forceDelete();

        return $this->successResponse('profile.deleted', null);
    }
}
