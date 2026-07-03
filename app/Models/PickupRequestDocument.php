<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PickupRequestDocument extends Model
{
    public const TYPE_FORM_6 = 'form_6';
    public const TYPE_FORM_2 = 'form_2';
    public const TYPE_GREEN_CERTIFICATE = 'green_certificate';
    public const TYPE_OTHER = 'other';

    public const TYPE_LABELS = [
        self::TYPE_FORM_6 => 'Form 6 — E-Waste Manifest',
        self::TYPE_FORM_2 => 'Form 2 — Recycling Certificate',
        self::TYPE_GREEN_CERTIFICATE => 'Green Certificate',
        self::TYPE_OTHER => 'Other Document',
    ];

    public const STATUS_DRAFT = 'draft';
    public const STATUS_GENERATED = 'generated';
    public const STATUS_UPLOADED = 'uploaded';
    public const STATUS_SENT = 'sent';

    protected $fillable = [
        'pickup_request_id', 'document_type', 'document_number', 'file_path',
        'generated_data', 'issued_at', 'uploaded_by', 'status', 'notes',
    ];

    protected $casts = [
        'generated_data' => 'array',
        'issued_at' => 'date',
    ];

    protected $appends = ['file_url', 'type_label'];

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? asset($this->file_path) : null;
    }

    public function getTypeLabelAttribute(): string
    {
        return self::TYPE_LABELS[$this->document_type] ?? 'Document';
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
