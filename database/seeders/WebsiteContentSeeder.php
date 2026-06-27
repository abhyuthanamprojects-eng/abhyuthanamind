<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class WebsiteContentSeeder extends Seeder
{
    /**
     * Seeds all dynamic website content modules in dependency order.
     * Every child seeder uses updateOrCreate — safe to re-run anytime,
     * never truncates and never touches pickup_requests, contact_messages,
     * users or app_settings.
     */
    public function run(): void
    {
        $this->call([
            ScrapCategorySeeder::class,
            ScrapItemSeeder::class,
            ServiceSeeder::class,
            IndustrySeeder::class,
            TestimonialSeeder::class,
            CertificateSeeder::class,
            MediaItemSeeder::class,
            PageSectionSeeder::class,
        ]);
    }
}
