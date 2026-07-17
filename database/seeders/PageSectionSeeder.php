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
                    'phones' => ['+91 70429 89374', '+91 1800 2030 267', '+91 11-44761731'],
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
                    'phones' => ['+91 70429 89374', '+91 1800 2030 267'],
                    'address' => 'E-15, UPSIDA Plastic City, Dibiyapur, UP, PIN- 206244',
                ],
            ],
            [
                'page_key' => 'home',
                'section_key' => 'exchange_policy',
                'title' => 'Give your old, get real value on the new',
                // subtitle doubles as the small eyebrow label above the heading.
                'subtitle' => 'Exchange Policy',
                'content' => "Don't just scrap it — exchange it. Hand over your old laptops, phones, ACs, TVs and appliances to Abhyuthanam Recyclers and get an instant assessed value adjusted against your replacement. We collect the old, pay you a fair exchange amount, and help you upgrade responsibly.",
                // image left null so the bundled default renders; admin can upload a replacement.
                'image' => null,
                'json_data' => [
                    'badge' => 'Old for New',
                    'bullets' => [
                        'Transparent, on-the-spot valuation of your old device',
                        'Exchange value adjusted towards your new purchase',
                        'Free doorstep pickup of the old item',
                        'Certified, zero-landfill recycling of what we collect',
                    ],
                    'buttons' => [
                        ['label' => 'Get exchange value', 'href' => '/schedule-pickup', 'style' => 'primary'],
                        ['label' => 'View scrap rates', 'href' => '/scrap-rate', 'style' => 'outline'],
                    ],
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
