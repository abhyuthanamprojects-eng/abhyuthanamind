<?php

namespace Database\Seeders;

use App\Models\ScrapCategory;
use Illuminate\Database\Seeder;

class ScrapCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['title' => 'Large Appliances', 'icon' => 'Refrigerator', 'sort_order' => 0],
            ['title' => 'Mobiles & Computers', 'icon' => 'Laptop', 'sort_order' => 1],
            ['title' => 'Metals', 'icon' => 'Layers', 'sort_order' => 2],
            ['title' => 'Electronics', 'icon' => 'Tv', 'sort_order' => 3],
            ['title' => 'Office Equipment', 'icon' => 'Printer', 'sort_order' => 4],
            ['title' => 'Batteries & Cables', 'icon' => 'BatteryCharging', 'sort_order' => 5],
            ['title' => 'Other Scrap', 'icon' => 'Boxes', 'sort_order' => 6],
        ];

        foreach ($categories as $category) {
            ScrapCategory::updateOrCreate(
                ['title' => $category['title']],
                $category + ['is_active' => true]
            );
        }

        $this->command?->info('Scrap categories seeded: ' . count($categories));
    }
}
