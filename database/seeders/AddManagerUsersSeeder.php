<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AddManagerUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Manager 1: Aman Tiwari
        User::updateOrCreate(
            ['email' => 'aman@abhyuthanamind.com'],
            [
                'name' => 'Aman Tiwari',
                'email' => 'aman@abhyuthanamind.com',
                'password' => Hash::make('aman@123'),
                'user_type' => 'manager',
                'status' => true,
            ]
        );
        echo "✓ Created/Updated manager: Aman Tiwari (aman@abhyuthanamind.com)\n";

        // Manager 2: Anurag Pandey
        User::updateOrCreate(
            ['email' => 'sales_team@abhyuthanamind.com'],
            [
                'name' => 'Anurag Pandey',
                'email' => 'sales_team@abhyuthanamind.com',
                'password' => Hash::make('anurag@123'),
                'user_type' => 'manager',
                'status' => true,
            ]
        );
        echo "✓ Created/Updated manager: Anurag Pandey (sales_team@abhyuthanamind.com)\n";
    }
}
