<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $stats = [
            'users_count' => $user->hasAnyRole(['admin', 'payment_admin']) ? User::count() : null,
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
