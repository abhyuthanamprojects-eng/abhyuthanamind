<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AssignRolesToUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles if they don't exist
        $roles = ['admin', 'manager', 'accountant', 'customer'];
        foreach ($roles as $role) {
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $role]);
        }

        // Assign roles based on user_type
        User::all()->each(function (User $user) {
            $roleToAssign = $user->user_type ?: 'customer';
            $user->syncRoles([$roleToAssign]);
            echo "✓ Assigned role '$roleToAssign' to {$user->name} ({$user->email})\n";
        });
    }
}
