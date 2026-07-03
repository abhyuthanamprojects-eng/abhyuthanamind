<?php

namespace Database\Seeders;

use App\Models\MediaItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MediaItemSeeder extends Seeder
{
    protected string $assetDir = 'media';

    public function run(): void
    {
        $items = [
            ['title' => 'Plant Exterior', 'category' => 'plant', 'file' => 'plant-exterior.jpg', 'alt_text' => 'Abhyuthanam recycling plant exterior'],
            ['title' => 'Plant Floor', 'category' => 'plant', 'file' => 'plant-floor.jpg', 'alt_text' => 'Abhyuthanam recycling plant floor'],
            ['title' => 'Collection Process', 'category' => 'process', 'file' => 'process-collection.jpg', 'alt_text' => 'E-waste collection process'],
            ['title' => 'Dismantling Process', 'category' => 'process', 'file' => 'process-dismantling.jpg', 'alt_text' => 'E-waste dismantling process'],
            ['title' => 'Separation Process', 'category' => 'process', 'file' => 'process-separation.jpg', 'alt_text' => 'Material separation process'],
            ['title' => 'Shredding Process', 'category' => 'process', 'file' => 'process-shredding.jpg', 'alt_text' => 'E-waste shredding process'],
            ['title' => 'About Us — Main', 'category' => 'about', 'file' => 'about-main.jpg', 'alt_text' => 'Abhyuthanam Recyclers team'],
            ['title' => 'About Us — Truck', 'category' => 'about', 'file' => 'about-truck.jpg', 'alt_text' => 'Pickup truck'],
            ['title' => 'About Us — Worker', 'category' => 'about', 'file' => 'about-worker.jpg', 'alt_text' => 'Facility worker'],
            ['title' => 'Recycling Highlight 1', 'category' => 'recycle', 'file' => 'recycle-1.jpg', 'alt_text' => 'Recycling process highlight'],
            ['title' => 'Recycling Highlight 2', 'category' => 'recycle', 'file' => 'recycle-2.jpg', 'alt_text' => 'Recycling process highlight'],
            ['title' => 'Recycling Highlight 3', 'category' => 'recycle', 'file' => 'recycle-3.jpg', 'alt_text' => 'Recycling process highlight'],
            ['title' => 'Co-Founder — Amit Kumar Ojha', 'category' => 'owner', 'file' => 'owner-1.jpg', 'alt_text' => 'Amit Kumar Ojha, Co-Founder & Managing Director'],
            ['title' => 'Co-Founder — Manju Ojha', 'category' => 'owner', 'file' => 'owner-2.jpg', 'alt_text' => 'Manju Ojha, Co-Founder & Director'],
            ['title' => 'Journey — Company Founded (2023)', 'category' => 'journey', 'file' => 'founded.jpg', 'alt_text' => 'Company founded 2023'],
            ['title' => 'Journey — Plant Set Up', 'category' => 'journey', 'file' => 'plant.jpg', 'alt_text' => 'Plant set up'],
            ['title' => 'Journey — Certifications Achieved', 'category' => 'journey', 'file' => 'certifications.jpg', 'alt_text' => 'Certifications achieved'],
            ['title' => 'Journey — Capacity Scaled', 'category' => 'journey', 'file' => 'capacity.jpg', 'alt_text' => 'Capacity scaled to 8,400 MT/year'],
            ['title' => 'Journey — Team Expanded', 'category' => 'journey', 'file' => 'team.jpg', 'alt_text' => 'Team and services expanded'],
            ['title' => 'Journey — Growing Customer Base', 'category' => 'journey', 'file' => 'customers.jpg', 'alt_text' => 'Growing customer base'],
        ];

        $missingImages = [];
        $count = 0;

        foreach ($items as $i => $item) {
            $filePath = $this->copyImage($item['file'], $missingImages);

            if (!$filePath) {
                continue;
            }

            MediaItem::updateOrCreate(
                ['file_path' => $filePath],
                [
                    'title' => $item['title'],
                    'category' => $item['category'],
                    'alt_text' => $item['alt_text'],
                    'is_active' => true,
                    'sort_order' => $i,
                ]
            );
            $count++;
        }

        $this->command?->info("Media items seeded: {$count}");
        if ($missingImages) {
            $this->command?->warn('Missing media images (skipped): ' . implode(', ', $missingImages));
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
