<?php

namespace Database\Seeders;

use App\Models\ScrapCategory;
use App\Models\ScrapItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ScrapItemSeeder extends Seeder
{
    protected string $assetDir = 'scrap-items';

    public function run(): void
    {
        $data = [
            'Large Appliances' => [
                ['name' => 'Split AC 1.5 Ton (Indoor + Outdoor)', 'rate' => 3700, 'unit' => 'piece', 'image' => 'split-ac.jpg'],
                ['name' => 'Window AC 1.5 Ton', 'rate' => 4300, 'unit' => 'piece', 'image' => 'window-ac.jpg'],
                ['name' => 'Split AC 1 Ton (Indoor + Outdoor)', 'rate' => 3200, 'unit' => 'piece', 'image' => 'split-ac-1ton.jpg'],
                ['name' => 'AC 2 Ton (Copper Coil)', 'rate' => 5000, 'unit' => 'piece', 'image' => 'ac-2ton.jpg'],
                ['name' => 'Front Load Washing Machine', 'rate' => 1400, 'unit' => 'piece', 'image' => 'washing-machine-front.jpg'],
                ['name' => 'Top Load Washing Machine', 'rate' => 900, 'unit' => 'piece', 'image' => 'washing-machine-top.jpg'],
                ['name' => 'Semi Automatic Washing Machine', 'rate' => 800, 'unit' => 'piece', 'image' => 'washing-machine-semi.jpg'],
                ['name' => 'Single Door Fridge', 'rate' => 900, 'unit' => 'piece', 'image' => 'fridge-single.jpg'],
                ['name' => 'Double Door Fridge', 'rate' => 1400, 'unit' => 'piece', 'image' => 'fridge-double.jpg'],
                ['name' => 'Geyser', 'rate' => 22, 'unit' => 'kg', 'image' => 'geyser.jpg'],
                ['name' => 'RO Purifier', 'rate' => 100, 'unit' => 'piece', 'image' => 'ro-purifier.jpg'],
            ],
            'Mobiles & Computers' => [
                ['name' => 'Scrap Laptop', 'rate' => 350, 'unit' => 'piece', 'image' => 'laptop.jpg'],
                ['name' => 'Computer CPU', 'rate' => 250, 'unit' => 'piece', 'image' => 'cpu.jpg'],
                ['name' => 'CRT Monitor', 'rate' => 175, 'unit' => 'piece', 'image' => 'crt-monitor.jpg'],
                ['name' => 'LCD Monitor', 'rate' => 50, 'unit' => 'piece', 'image' => 'lcd-monitor.jpg'],
                ['name' => 'LED Monitor', 'rate' => 50, 'unit' => 'piece', 'image' => 'led-monitor.jpg'],
                ['name' => 'Mobile Phone (Android)', 'rate' => 60, 'unit' => 'piece', 'image' => 'android-phone.jpg'],
                ['name' => 'Mobile Phone (Keypad)', 'rate' => 30, 'unit' => 'piece', 'image' => 'keypad-phone.jpg'],
                ['name' => 'Mobile Charger', 'rate' => 5, 'unit' => 'piece', 'image' => 'mobile-charger.jpg'],
                ['name' => 'Laptop Charger', 'rate' => 10, 'unit' => 'piece', 'image' => 'laptop-charger.jpg'],
            ],
            'Metals' => [
                ['name' => 'Copper', 'rate' => 575, 'unit' => 'kg', 'image' => 'copper.jpg'],
                ['name' => 'Aluminium', 'rate' => 140, 'unit' => 'kg', 'image' => 'aluminium.jpg'],
                ['name' => 'Iron Cooler', 'rate' => 27, 'unit' => 'kg', 'image' => 'iron-cooler.jpg'],
                ['name' => 'Plastic Cooler', 'rate' => 18, 'unit' => 'kg', 'image' => 'plastic-cooler.jpg'],
                ['name' => 'UPS / Inverter (Copper Coil)', 'rate' => 55, 'unit' => 'kg', 'image' => 'ups-inverter.jpg'],
                ['name' => 'UPS / Inverter (Aluminium Coil)', 'rate' => 40, 'unit' => 'kg', 'image' => 'ups-inverter.jpg'],
            ],
            'Electronics' => [
                ['name' => 'LED TV', 'rate' => 400, 'unit' => 'piece', 'image' => 'led-tv.jpg'],
                ['name' => 'LCD TV', 'rate' => 350, 'unit' => 'piece', 'image' => 'led-tv.jpg'],
                ['name' => 'Ceiling Fan (Copper winding)', 'rate' => 150, 'unit' => 'piece', 'image' => 'ceiling-fan.jpg'],
                ['name' => 'Ceiling Fan (Aluminium winding)', 'rate' => 80, 'unit' => 'piece', 'image' => 'ceiling-fan.jpg'],
                ['name' => 'Exhaust Fan', 'rate' => 50, 'unit' => 'piece', 'image' => 'exhaust-fan.jpg'],
                ['name' => 'LED Bulb', 'rate' => 1, 'unit' => 'piece', 'image' => 'led-bulb.jpg'],
                ['name' => 'Tubelight', 'rate' => 1, 'unit' => 'piece', 'image' => 'tubelight.jpg'],
            ],
            'Office Equipment' => [
                ['name' => 'Desktop Workstation', 'rate' => 250, 'unit' => 'piece', 'image' => 'desktop-workstation.jpg'],
                ['name' => 'Printer / Scanner', 'rate' => 40, 'unit' => 'kg', 'image' => 'printer-scanner.jpg'],
                ['name' => 'Server (Rack Unit)', 'rate' => 90, 'unit' => 'kg', 'image' => 'server-rack.jpg'],
                ['name' => 'Network Switch / Router', 'rate' => 120, 'unit' => 'kg', 'image' => 'network-router.jpg'],
                ['name' => 'UPS Battery Backup', 'rate' => 55, 'unit' => 'kg', 'image' => 'ups-battery.jpg'],
            ],
            'Batteries & Cables' => [
                ['name' => 'Lead Acid Battery', 'rate' => 95, 'unit' => 'kg', 'image' => 'lead-acid-battery.jpg'],
                ['name' => 'Lithium-ion Battery Pack', 'rate' => 120, 'unit' => 'kg', 'image' => 'lithium-battery.jpg'],
                ['name' => 'Copper Cable / Wiring', 'rate' => 575, 'unit' => 'kg', 'image' => 'copper-cable.jpg'],
                ['name' => 'Mixed Cables', 'rate' => 60, 'unit' => 'kg', 'image' => 'mixed-cables.jpg'],
            ],
            'Other Scrap' => [
                ['name' => 'Mixed E-Waste', 'rate' => 35, 'unit' => 'kg', 'image' => 'mixed-ewaste.jpg'],
                ['name' => 'Plastic Scrap', 'rate' => 18, 'unit' => 'kg', 'image' => 'plastic-scrap.jpg'],
                ['name' => 'PCB / Circuit Boards', 'rate' => 250, 'unit' => 'kg', 'image' => 'pcb.jpg'],
                ['name' => 'Steel Scrap', 'rate' => 30, 'unit' => 'kg', 'image' => 'steel-scrap.jpg'],
            ],
        ];

        $missingImages = [];
        $count = 0;

        foreach ($data as $categoryTitle => $items) {
            $category = ScrapCategory::where('title', $categoryTitle)->first();

            if (!$category) {
                $this->command?->warn("Skipped items for missing category: {$categoryTitle}");
                continue;
            }

            foreach ($items as $i => $item) {
                $imagePath = $this->copyImage($item['image'], $missingImages);

                ScrapItem::updateOrCreate(
                    ['scrap_category_id' => $category->id, 'name' => $item['name']],
                    [
                        'rate' => $item['rate'],
                        'unit' => $item['unit'],
                        'image_path' => $imagePath,
                        'is_active' => true,
                        'sort_order' => $i,
                    ]
                );
                $count++;
            }
        }

        $this->command?->info("Scrap items seeded: {$count}");
        if ($missingImages) {
            $this->command?->warn('Missing scrap item images (skipped): ' . implode(', ', array_unique($missingImages)));
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
