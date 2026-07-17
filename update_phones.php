<?php
/**
 * One-off: normalise phone numbers on the live Contact and Footer sections
 * to "+91 ..." format without touching any other admin-edited content.
 * Run once from the project root:  php update_phones.php
 * Safe to delete afterwards.
 */

require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\PageSection;

$contactPhones = ['+91 77385 74635', '+91 1800 2030 267', '+91 11-44761731'];
$footerPhones  = ['+91 77385 74635', '+91 1800 2030 267'];

$contact = PageSection::where('page_key', 'contact')->where('section_key', 'info')->first();
if ($contact) {
    $j = $contact->json_data ?? [];
    $j['phones'] = $contactPhones;
    $contact->json_data = $j;
    $contact->save();
    echo "Contact phones updated: ".implode(', ', $contactPhones).PHP_EOL;
} else {
    echo "Contact section not found (skipped).".PHP_EOL;
}

$footer = PageSection::where('page_key', 'footer')->where('section_key', 'contact')->first();
if ($footer) {
    $j = $footer->json_data ?? [];
    $j['phones'] = $footerPhones;
    $footer->json_data = $j;
    $footer->save();
    echo "Footer phones updated: ".implode(', ', $footerPhones).PHP_EOL;
} else {
    echo "Footer section not found (skipped).".PHP_EOL;
}

echo "Done.".PHP_EOL;
