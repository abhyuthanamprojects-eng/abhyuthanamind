<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $assetDir = database_path('seeders/assets/certificates');

        $certificates = [
            [
                'name' => 'UPPCB Consent to Operate',
                'certificate_type' => 'Consolidated Consent & Authorization for E-waste Operations',
                'asset' => 'uppcb-consent-to-operate.pdf',
                'file_path' => 'certificates/uppcb-consent-to-operate.pdf',
                'issue_date' => '2025-08-25',
                'expiry_date' => '2029-12-31',
                'sort_order' => 0,
            ],
            [
                'name' => 'UPPCB Consent to Establish',
                'certificate_type' => 'Pollution Control Approval for E-waste Recycling',
                'asset' => 'uppcb-consent-to-establish.pdf',
                'file_path' => 'certificates/uppcb-consent-to-establish.pdf',
                'issue_date' => '2025-02-07',
                'expiry_date' => '2030-02-05',
                'sort_order' => 1,
            ],
            [
                'name' => 'UPPCB Hazardous Waste Authorization',
                'certificate_type' => 'Authorization under Hazardous and Other Wastes Rules, 2016',
                'asset' => 'uppcb-hazardous-waste-authorization.pdf',
                'file_path' => 'certificates/uppcb-hazardous-waste-authorization.pdf',
                'issue_date' => '2025-09-02',
                'expiry_date' => '2030-09-02',
                'sort_order' => 2,
            ],
            [
                'name' => 'ISO 9001:2015',
                'certificate_type' => 'Quality Management Systems',
                'asset' => 'iso-9001-2015.pdf',
                'file_path' => 'certificates/iso-9001-2015.pdf',
                'issue_date' => '2025-10-27',
                'expiry_date' => '2028-10-26',
                'sort_order' => 3,
            ],
            [
                'name' => 'ISO 14001:2015',
                'certificate_type' => 'Environmental Management Systems',
                'asset' => 'iso-14001-2015.pdf',
                'file_path' => 'certificates/iso-14001-2015.pdf',
                'issue_date' => '2025-10-27',
                'expiry_date' => '2028-10-26',
                'sort_order' => 4,
            ],
            [
                'name' => 'ISO 45001:2018',
                'certificate_type' => 'Occupational Health and Safety Management Systems',
                'asset' => 'iso-45001-2018.pdf',
                'file_path' => 'certificates/iso-45001-2018.pdf',
                'issue_date' => '2025-10-27',
                'expiry_date' => '2028-10-26',
                'sort_order' => 5,
            ],
            [
                'name' => 'ISO 15270:2008',
                'certificate_type' => 'Recovery and Recycling of Plastics Waste',
                'asset' => 'iso-15270-2008.pdf',
                'file_path' => 'certificates/iso-15270-2008.pdf',
                'issue_date' => '2025-10-27',
                'expiry_date' => '2028-10-26',
                'sort_order' => 6,
            ],
            [
                'name' => 'ISO/TR 23891:2020',
                'certificate_type' => 'Plastics Recycling and Recovery Test Methods',
                'asset' => 'iso-tr-23891-2020.pdf',
                'file_path' => 'certificates/iso-tr-23891-2020.pdf',
                'issue_date' => '2025-10-27',
                'expiry_date' => '2028-10-26',
                'sort_order' => 7,
            ],
        ];

        foreach ($certificates as $record) {
            $sourcePath = $assetDir.'/'.$record['asset'];

            if (! is_file($sourcePath)) {
                $this->command?->warn("CertificateSeeder: missing asset {$record['asset']}, skipped.");
                continue;
            }

            Storage::disk('public')->put($record['file_path'], file_get_contents($sourcePath));

            $certificate = Certificate::withTrashed()->firstOrNew([
                'name' => $record['name'],
            ]);

            if ($certificate->trashed()) {
                $certificate->restore();
            }

            unset($record['asset']);

            $certificate->fill([
                ...$record,
                'show_on_website' => true,
                'is_active' => true,
            ]);

            $certificate->save();
        }

        $this->command?->info('CertificateSeeder: synced real certificate documents.');
    }
}
