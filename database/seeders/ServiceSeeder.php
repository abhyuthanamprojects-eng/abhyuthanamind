<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ServiceSeeder extends Seeder
{
    protected string $assetDir = 'services';

    public function run(): void
    {
        $services = [
            [
                'slug' => 'e-waste-recycling',
                'title' => 'E-Waste Recycling',
                'short_description' => 'End-to-end collection, segregation and environmentally safe recycling of electronic waste.',
                'long_description' => 'We provide complete e-waste recycling — from collection and segregation to environmentally safe processing — recovering valuable resources while ensuring zero dumping and full compliance with pollution control norms.',
                'icon' => 'Recycle',
                'image' => 'e-waste-recycling.jpg',
            ],
            [
                'slug' => 'it-mobility-asset-disposition',
                'title' => 'IT & Mobility Asset Disposition',
                'short_description' => 'Structured ITAD services for corporates, OEMs and enterprises retiring IT infrastructure.',
                'long_description' => 'Our IT Asset Disposition (ITAD) service helps organizations responsibly retire end-of-life IT and mobility assets while protecting sensitive data and recovering maximum residual value.',
                'icon' => 'Laptop',
                'image' => 'it-mobility-asset-disposition.jpg',
            ],
            [
                'slug' => 'data-sanitization',
                'title' => 'Data Sanitization',
                'short_description' => 'Certified data wiping, degaussing and hard disk shredding for complete data security.',
                'long_description' => 'We deliver certified data sanitization — software wiping, degaussing and physical hard-disk shredding — so sensitive data is destroyed beyond recovery with a complete, audit-ready trail.',
                'icon' => 'ShieldCheck',
                'image' => 'data-sanitization.jpg',
            ],
            [
                'slug' => 'precious-metal-recovery',
                'title' => 'Precious Metal Recovery',
                'short_description' => 'Recovery of gold, silver, copper, aluminium and other valuable materials from e-waste streams.',
                'long_description' => 'We scientifically recover precious and base metals — gold, silver, copper and aluminium — from e-waste streams through environmentally safe methods with a strict zero-dumping commitment.',
                'icon' => 'Gem',
                'image' => 'precious-metal-recovery.jpg',
            ],
            [
                'slug' => 'reverse-logistics',
                'title' => 'Reverse Logistics',
                'short_description' => 'DOA product management and reverse supply-chain solutions for e-commerce, OEMs and logistics.',
                'long_description' => 'Our reverse logistics solutions help e-commerce companies, OEMs and distributors efficiently manage returns, dead-on-arrival (DOA) products and damaged goods through a streamlined collection and processing network.',
                'icon' => 'Truck',
                'image' => 'reverse-logistics.jpg',
            ],
            [
                'slug' => 'epr-csr-services',
                'title' => 'EPR & CSR Services',
                'short_description' => 'Extended Producer Responsibility compliance and corporate sustainability programs.',
                'long_description' => 'We provide complete Extended Producer Responsibility (EPR) support and impactful CSR programs — from authorization and target fulfilment to community-focused sustainability initiatives.',
                'icon' => 'ShieldCheck',
                'image' => 'epr-csr-services.jpg',
            ],
            [
                'slug' => 'training-awareness',
                'title' => 'Training & Awareness',
                'short_description' => 'Awareness programs around responsible e-waste handling as per Government rules.',
                'long_description' => 'The Ministry of Environment, Forest and Climate Change has published E-Waste Management Rules. We conduct training and awareness programs to help organizations and communities comply and adopt responsible practices.',
                'icon' => 'GraduationCap',
                'image' => 'training-awareness.jpg',
            ],
        ];

        $missingImages = [];

        foreach ($services as $i => $service) {
            $imagePath = $this->copyImage($service['image'], $missingImages);

            Service::updateOrCreate(
                ['slug' => $service['slug']],
                [
                    'title' => $service['title'],
                    'short_description' => $service['short_description'],
                    'long_description' => $service['long_description'],
                    'icon' => $service['icon'],
                    'image_path' => $imagePath,
                    'is_active' => true,
                    'sort_order' => $i,
                ]
            );
        }

        $this->command?->info('Services seeded: ' . count($services));
        if ($missingImages) {
            $this->command?->warn('Missing service images (skipped): ' . implode(', ', $missingImages));
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
