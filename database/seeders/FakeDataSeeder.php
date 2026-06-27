<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class FakeDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Get Roles
        $adminRole = Role::where('name', 'admin')->first();
        $customerRole = Role::where('name', 'customer')->first();

        // 2. Ensure at least one city exists for locations
        $city = City::first();
        $cityId = $city ? $city->id : 1;

        // 3. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@ewaste.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'phone' => '1111111111', // Changed from 9999999999 so customer can use it
                'status' => true,
                'city_id' => $cityId,
            ]
        );
        if ($adminRole && !$admin->hasRole('admin')) {
            $admin->assignRole($adminRole);
        }

        // 4. Dummy Customer
        $customer = User::firstOrCreate(
            ['phone' => '9999999999'],
            [
                'name' => 'Dummy Customer',
                'email' => 'customer@ewaste.com',
                'password' => Hash::make('999999'),
                'status' => true,
                'city_id' => $cityId,
            ]
        );
        if ($customerRole && !$customer->hasRole('customer')) {
            $customer->assignRole($customerRole);
        }
    }
}
