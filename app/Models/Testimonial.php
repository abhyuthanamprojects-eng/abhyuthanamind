<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Testimonial extends Model
{
    use SoftDeletes;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_INACTIVE = 'inactive';

    protected $fillable = [
        'customer_name', 'designation', 'company_name', 'industry', 'city', 'image_path',
        'video_url', 'source', 'rating', 'review_text', 'outcome_text', 'outcome_label',
        'is_active', 'sort_order', 'status', 'is_featured', 'consent_to_publish',
        'approved_at', 'approved_by', 'rejection_reason',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'consent_to_publish' => 'boolean',
        'rating' => 'integer',
        'approved_at' => 'datetime',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset($this->image_path) : null;
    }

    public function media()
    {
        return $this->hasMany(TestimonialMedia::class)->orderBy('sort_order')->orderBy('id');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePublished($query)
    {
        return $query->where('status', self::STATUS_APPROVED)
            ->where('consent_to_publish', true)
            ->where('is_active', true);
    }

    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    public function scopeOrdered($query)
    {
        return $query->orderByDesc('is_featured')->orderBy('sort_order')->orderBy('id');
    }

    public function approve(?int $approvedByUserId = null): void
    {
        $this->update([
            'status' => self::STATUS_APPROVED,
            'approved_at' => now(),
            'approved_by' => $approvedByUserId,
            'rejection_reason' => null,
        ]);
    }

    public function reject(?string $reason = null): void
    {
        $this->update([
            'status' => self::STATUS_REJECTED,
            'rejection_reason' => $reason,
            'approved_at' => null,
            'approved_by' => null,
        ]);
    }
}
