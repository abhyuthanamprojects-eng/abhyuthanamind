<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleMenuPermission extends Model
{
    protected $fillable = ['role_name', 'menu_key', 'can_access', 'can_edit'];

    protected function casts(): array
    {
        return [
            'can_access' => 'boolean',
            'can_edit' => 'boolean',
        ];
    }
}
