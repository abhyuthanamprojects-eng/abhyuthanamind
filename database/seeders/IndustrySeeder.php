<?php

namespace Database\Seeders;

use App\Models\Industry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class IndustrySeeder extends Seeder
{
    protected string $assetDir = 'industries';

    public function run(): void
    {
        $industries = [
            [
                'slug' => 'oem',
                'title' => 'OEM',
                'short_description' => "Original Equipment Manufacturer's primary concern is their Dead On Arrival products.",
                'long_description' => 'Original Equipment Manufacturers face the constant challenge of managing Dead On Arrival (DOA) products, defective returns and end-of-life inventory. We provide certified solutions tailored to OEM needs.',
                'image' => 'oem.jpg',
            ],
            [
                'slug' => 'e-commerce-companies',
                'title' => 'E-Commerce Companies',
                'short_description' => 'E-commerce companies look for third-party logistics partners to collect returns.',
                'long_description' => 'E-commerce companies always look forward to a reliable third-party logistics provider to collect returns, manage damaged goods and dispose of unsellable inventory responsibly.',
                'image' => 'e-commerce-companies.jpg',
            ],
            [
                'slug' => 'corporates',
                'title' => 'Corporates',
                'short_description' => 'All corporate companies have hardware and software requirements from time to time.',
                'long_description' => 'All corporate companies have various hardware and software requirements from time to time, generating retired IT assets that require secure, compliant disposition and data destruction.',
                'image' => 'corporates.jpg',
            ],
            [
                'slug' => 'logistics-distribution',
                'title' => 'Logistics & Distribution',
                'short_description' => 'Many products are destroyed or damaged while in transit and need responsible handling.',
                'long_description' => 'Many products are destroyed or damaged while in transit. These products need responsible collection and disposal to avoid environmental harm and recover residual value.',
                'image' => 'logistics-distribution.jpg',
            ],
        ];

        $missingImages = [];

        foreach ($industries as $i => $industry) {
            $imagePath = $this->copyImage($industry['image'], $missingImages);

            Industry::updateOrCreate(
                ['slug' => $industry['slug']],
                [
                    'title' => $industry['title'],
                    'short_description' => $industry['short_description'],
                    'long_description' => $industry['long_description'],
                    'image_path' => $imagePath,
                    'is_active' => true,
                    'sort_order' => $i,
                ]
            );
        }

        $this->command?->info('Industries seeded: ' . count($industries));
        if ($missingImages) {
            $this->command?->warn('Missing industry images (skipped): ' . implode(', ', $missingImages));
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
