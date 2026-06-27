<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $customerRole = Role::firstOrCreate(['name' => 'customer', 'guard_name' => 'web']);
        $pickupBoyRole = Role::firstOrCreate(['name' => 'pickup_boy', 'guard_name' => 'web']);
        $channelPartnerRole = Role::firstOrCreate(['name' => 'channel_partner', 'guard_name' => 'web']);

        // Create Permissions (Granular)
        $permissions = [
            'view_users',
            'create_users',
            'edit_users',
            'delete_users',
            'view_roles',
            'create_roles',
            'edit_roles',
            'delete_roles',
            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',
            'view_pickups',
            'create_pickups',
            'edit_pickups',
            'cancel_pickups',
            'assign_pickups',
            'verify_kyc',
            'approve_payments',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Assign Permissions to Roles
        $superAdminRole->syncPermissions(Permission::all());
        $adminRole->syncPermissions(Permission::all());

        $customerRole->syncPermissions([
            'create_pickups',
            'view_pickups',
            'cancel_pickups'
        ]);

        $pickupBoyRole->syncPermissions([
            'view_pickups',
            'edit_pickups'
        ]);

        $channelPartnerRole->syncPermissions([
            'create_pickups',
            'view_pickups',
            'cancel_pickups'
        ]);

        $paymentAdminRole = Role::firstOrCreate(['name' => 'payment_admin', 'guard_name' => 'web']);
        $paymentAdminRole->syncPermissions([
            'view_pickups',
            'approve_payments'
        ]);
    }
}
