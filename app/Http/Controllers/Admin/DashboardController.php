<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Page;
use App\Models\PickupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $canSeeUsers = $user->hasAnyRole(['admin', 'payment_admin']);

        $stats = [
            'users_count' => $canSeeUsers ? User::count() : null,
            'pickups_total' => PickupRequest::count(),
            'pickups_pending' => PickupRequest::whereIn('status', ['new', 'pending', 'assigned'])->count(),
            'pickups_completed' => PickupRequest::where('status', 'completed')->count(),
            'contact_queries' => ContactMessage::count(),
            'contact_queries_pending' => ContactMessage::where('status', 'pending')->count(),
            'pages_count' => Page::count(),
        ];

        $recentPickups = PickupRequest::with('city:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'pickup_code', 'customer_name', 'customer_phone', 'city_id', 'status', 'scheduled_at', 'created_at']);

        $recentQueries = ContactMessage::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'subject', 'status', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentPickups' => $recentPickups,
            'recentQueries' => $recentQueries,
        ]);
    }
}
