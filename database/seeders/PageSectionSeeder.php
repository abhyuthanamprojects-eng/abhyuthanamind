<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PageSectionSeeder extends Seeder
{
    protected string $assetDir = 'page-sections';

    public function run(): void
    {
        // Content sourced verbatim from resources/js/Frontend/lib/site-data.ts
        // (company, companyMeta, companyStory) — no invented figures.
        $sections = [
            [
                'page_key' => 'home',
                'section_key' => 'hero',
                'title' => 'ABHYUTHANAM RECYCLER',
                'subtitle' => 'Certified e-waste and scrap recycling for businesses and households.',
                'content' => 'Abhyuthanam Recyclers is a certified e-waste and scrap recycling company helping businesses and households dispose responsibly through secure, transparent and sustainable processes.',
                'image' => 'home-hero.png',
                'json_data' => null,
            ],
            [
                'page_key' => 'about',
                'section_key' => 'hero',
                'title' => 'About Abhyuthanam Recyclers',
                'subtitle' => 'Founded 2023 · UPSIDA Plastic City, Dibiyapur, Uttar Pradesh',
                'content' => "Abhyuthanam Recyclers was started in 2023 with one simple idea — make it easy and safe for Indian businesses and homes to get rid of old electronics the right way.",
                'image' => 'about-hero.jpg',
                'json_data' => null,
            ],
            [
                'page_key' => 'contact',
                'section_key' => 'info',
                'title' => 'Get in Touch',
                'subtitle' => null,
                'content' => null,
                'image' => null,
                'json_data' => [
                    'emails' => ['sales@abhyuthanamind.com', 'info@abhyuthanamind.com'],
                    'phones' => ['+91 77385 74635', '1800 203 0267', '011-4476-1731'],
                    'plant_address' => 'E-15, UPSIDA Plastic City, Dibiyapur, Uttar Pradesh - 206244',
                    'corporate_address' => 'E-44/3, 1st Floor, Industrial Area, Phase-II, Okhla, New Delhi - 110020',
                    'hours' => 'Mon – Sat: 9:00 AM – 6:00 PM',
                ],
            ],
            [
                'page_key' => 'footer',
                'section_key' => 'contact',
                'title' => null,
                'subtitle' => null,
                'content' => null,
                'image' => null,
                'json_data' => [
                    'email' => 'info@abhyuthanamind.com',
                    'phones' => ['+91 77385 74635', '1800 2030 267'],
                    'address' => 'E-15, UPSIDA Plastic City, Dibiyapur, UP, PIN- 206244',
                ],
            ],
        ];

        $missingImages = [];
        $count = 0;

        foreach ($sections as $i => $section) {
            $imagePath = $section['image'] ? $this->copyImage($section['image'], $missingImages) : null;

            PageSection::updateOrCreate(
                ['page_key' => $section['page_key'], 'section_key' => $section['section_key']],
                [
                    'title' => $section['title'],
                    'subtitle' => $section['subtitle'],
                    'content' => $section['content'],
                    'image_path' => $imagePath,
                    'json_data' => $section['json_data'],
                    'is_active' => true,
                    'sort_order' => $i,
                ]
            );
            $count++;
        }

        $this->command?->info("Page sections seeded: {$count}");
        if ($missingImages) {
            $this->command?->warn('Missing page section images (skipped): ' . implode(', ', $missingImages));
        }
    }

    protected function copyImage(string $filename, array &$missing): ?string
    {
        $sourcePath = database_path("seeders/assets/{$this->assetDir}/{$filename}");
        $destRelative = "{$this->assetDir}/{$filename}";

        if (!file_exists($sourcePath)) {
            $missing[] = $filename;
            return null;
        }

        if (!Storage::disk('public')->exists($destRelative)) {
            Storage::disk('public')->put($destRelative, file_get_contents($sourcePath));
        }

        return $destRelative;
    }
}
