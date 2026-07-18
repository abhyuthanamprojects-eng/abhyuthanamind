<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class MakeMainAdminSeeder extends Seeder
{
    /**
     * Makes admin@ewaste.com the single main admin.
     * Any other user holding the admin role/user_type is soft-deleted.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'admin']);

        $main = User::withTrashed()->firstOrNew(['email' => 'admin@ewaste.com']);
        if ($main->trashed()) {
            $main->restore();
        }
        if (!$main->exists) {
            $main->name = 'Admin User';
            $main->password = Hash::make('password');
        }
        $main->user_type = 'admin';
        $main->status = true;
        $main->save();
        $main->syncRoles(['admin']);
        echo "✓ Main admin: {$main->name} (admin@ewaste.com)\n";

        // Remove every other admin account
        User::where('email', '!=', 'admin@ewaste.com')
            ->where(function ($q) {
                $q->where('user_type', 'admin')
                  ->orWhereHas('roles', fn ($r) => $r->where('name', 'admin'));
            })
            ->get()
            ->each(function (User $user) {
                $user->syncRoles([]);
                $user->delete();
                echo "✗ Removed admin: {$user->name} ({$user->email})\n";
            });
    }
}
