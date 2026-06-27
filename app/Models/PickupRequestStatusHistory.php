<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PickupRequestStatusHistory extends Model
{
    protected $fillable = ['pickup_request_id', 'status', 'note', 'changed_by'];

    public function pickupRequest()
    {
        return $this->belongsTo(PickupRequest::class);
    }

    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
