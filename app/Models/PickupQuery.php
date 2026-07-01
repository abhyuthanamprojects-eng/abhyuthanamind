<?php

namespace App\Models;

use App\Services\PickupBookingNumberService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PickupQuery extends Model
{
    use SoftDeletes;

    public const STATUS_NEW = 'new';
    public const STATUS_UNDER_REVIEW = 'under_review';
    public const STATUS_NEGOTIATION = 'negotiation';
    public const STATUS_ACCEPTED = 'accepted';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_CONVERTED = 'converted';

    public const STATUSES = [
        self::STATUS_NEW => 'New',
        self::STATUS_UNDER_REVIEW => 'Under Review',
        self::STATUS_NEGOTIATION => 'Negotiation',
        self::STATUS_ACCEPTED => 'Accepted',
        self::STATUS_REJECTED => 'Rejected',
        self::STATUS_CONVERTED => 'Converted',
    ];

    protected $fillable = [
        'query_id', 'customer_type', 'full_name', 'mobile_number', 'email', 'company_name',
        'city', 'pickup_address', 'scrap_category', 'selected_scrap_item', 'approximate_quantity',
        'preferred_contact_method', 'preferred_pickup_date', 'preferred_pickup_time', 'description',
        'negotiation_notes', 'quoted_amount', 'final_amount', 'status',
        'converted_pickup_request_id', 'created_by_admin', 'converted_by', 'converted_at',
    ];

    protected $casts = [
        'preferred_pickup_date' => 'date',
        'quoted_amount' => 'decimal:2',
        'final_amount' => 'decimal:2',
        'converted_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (PickupQuery $query) {
            if (!$query->query_id) {
                $query->query_id = PickupBookingNumberService::nextQueryId();
            }
            if (!$query->status) {
                $query->status = self::STATUS_NEW;
            }
        });
    }

    public function convertedPickupRequest()
    {
        return $this->belongsTo(PickupRequest::class, 'converted_pickup_request_id');
    }

    public function createdByAdmin()
    {
        return $this->belongsTo(User::class, 'created_by_admin');
    }

    public function convertedBy()
    {
        return $this->belongsTo(User::class, 'converted_by');
    }

    public function scopeStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Accept this query and create the real PickupRequest from it. The
     * PickupRequest model's own creating() hook generates booking_id and
     * tracking_token automatically, so we only need to copy fields over.
     */
    public function convertToPickupRequest(?int $convertedByUserId = null): PickupRequest
    {
        $city = City::whereRaw('LOWER(name) = ?', [strtolower(trim($this->city))])->first();

        $pickup = PickupRequest::create([
            'request_type' => 'scrap',
            'pickup_query_id' => $this->id,
            'pickup_code' => 'WEB-' . now()->format('YmdHi') . '-' . strtoupper(substr(uniqid(), -4)),
            'customer_name' => $this->full_name,
            'customer_phone' => $this->mobile_number,
            'customer_email' => $this->email,
            'city_id' => $city?->id,
            'address' => $this->pickup_address,
            'scheduled_at' => \Illuminate\Support\Carbon::parse($this->preferred_pickup_date->format('Y-m-d') . ' ' . $this->preferred_pickup_time),
            'status' => 'pending',
            'estimated_amount' => $this->final_amount ?? $this->quoted_amount ?? 0,
            'final_amount' => $this->final_amount,
            'metadata' => [
                'public_lead' => [
                    'source' => 'website',
                    'customer_type' => $this->customer_type,
                    'company_name' => $this->company_name,
                    'city' => $this->city,
                    'scrap_category' => $this->scrap_category,
                    'approximate_quantity' => $this->approximate_quantity,
                    'preferred_contact_method' => $this->preferred_contact_method,
                    'description' => $this->description,
                    'selected_scrap_item' => $this->selected_scrap_item,
                ],
                'from_query' => [
                    'query_id' => $this->query_id,
                    'negotiation_notes' => $this->negotiation_notes,
                    'quoted_amount' => $this->quoted_amount,
                ],
            ],
        ]);

        $pickup->statusHistories()->create([
            'status' => 'pending',
            'title' => 'Pickup Request Created',
            'note' => 'Created from pickup query ' . $this->query_id,
            'changed_by' => $convertedByUserId,
        ]);

        $this->update([
            'status' => self::STATUS_CONVERTED,
            'converted_pickup_request_id' => $pickup->id,
            'converted_by' => $convertedByUserId,
            'converted_at' => now(),
        ]);

        return $pickup;
    }
}
