<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    /**
     * NOTE: The current public site (site-data.ts -> certificates) lists
     * R2v3, CPCB, SPCB, MoEF and ISO as `available: false` — meaning no
     * real certificate scan/PDF exists yet anywhere in the project.
     *
     * Per instruction, we do not fabricate certificate files or records.
     * This seeder intentionally does nothing until real certificate
     * files are dropped into database/seeders/assets/certificates/ and
     * this seeder is updated with their names/types/dates, OR an admin
     * uploads them directly via the Certificates admin page.
     */
    public function run(): void
    {
        $this->command?->warn('CertificateSeeder: skipped — no real certificate files available yet. Add files to database/seeders/assets/certificates/ and update this seeder, or upload via admin.');
    }
}
