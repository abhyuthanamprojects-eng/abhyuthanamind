<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PickupRequestCertificate extends Model
{
    protected $fillable = [
        'pickup_request_id', 'certificate_number', 'file_path', 'issued_at', 'notes', 'uploaded_by',
    ];

    protected $casts = [
        'issued_at' => 'date',
    ];

    protected $appends = ['file_url'];

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? asset($this->file_path) : null;
    }

    public function pickupRequest()
    {
        return $this->belongsTo(PickupRequest::class);
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
