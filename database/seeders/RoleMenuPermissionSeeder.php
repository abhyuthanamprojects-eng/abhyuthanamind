<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleMenuPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // Admin — full access
            ['role_name' => 'admin', 'menu_key' => 'dashboard', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'pickup-queries', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'pickup-requests', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'contact-queries', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'help-support', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'customers-leads', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'static-pages', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'page-sections', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'services', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'industries', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'testimonials', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'certificates', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'media-gallery', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'scrap-rate', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'reports', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'user-management', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'admin', 'menu_key' => 'app-settings', 'can_access' => true, 'can_edit' => true],

            // Manager — Main access only
            ['role_name' => 'manager', 'menu_key' => 'dashboard', 'can_access' => true, 'can_edit' => false],
            ['role_name' => 'manager', 'menu_key' => 'pickup-queries', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'manager', 'menu_key' => 'pickup-requests', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'manager', 'menu_key' => 'contact-queries', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'manager', 'menu_key' => 'help-support', 'can_access' => true, 'can_edit' => true],
            ['role_name' => 'manager', 'menu_key' => 'customers-leads', 'can_access' => true, 'can_edit' => false],

            // Accountant — Business data only
            ['role_name' => 'accountant', 'menu_key' => 'dashboard', 'can_access' => true, 'can_edit' => false],
            ['role_name' => 'accountant', 'menu_key' => 'scrap-rate', 'can_access' => true, 'can_edit' => false],
            ['role_name' => 'accountant', 'menu_key' => 'reports', 'can_access' => true, 'can_edit' => true],
        ];

        \App\Models\RoleMenuPermission::upsert($permissions, ['role_name', 'menu_key']);
    }
}
