<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        // Sourced verbatim from the existing public site content
        // (resources/js/Frontend/lib/site-data.ts -> testimonials).
        // No customer photos exist yet, so image_path stays null until
        // real photos are uploaded via the admin Testimonials page.
        $testimonials = [
            [
                'customer_name' => 'Rohit Sharma',
                'designation' => 'IT Asset Manager',
                'company_name' => 'Infinite Systems Pvt. Ltd.',
                'industry' => 'IT Services Company',
                'city' => 'Noida',
                'rating' => 5,
                'review_text' => 'We had years of old laptops and servers piling up. Abhyuthanam picked everything up, wiped the data securely and handed us proper certificates for our audit. Clean, simple and stress-free.',
                'outcome_text' => '120+ devices cleared',
            ],
            [
                'customer_name' => 'Priya Nair',
                'designation' => 'Operations Head',
                'company_name' => 'ShopKart E-Commerce',
                'industry' => 'E-Commerce',
                'city' => 'Bengaluru',
                'rating' => 5,
                'review_text' => 'Their team helped us manage bulk returns and damaged goods without any hassle. Pickups are always on time and the paperwork is spot on. It has genuinely made our reverse logistics easier.',
                'outcome_text' => 'Faster returns handling',
            ],
            [
                'customer_name' => 'Anil Verma',
                'designation' => 'Plant Director',
                'company_name' => 'VoltEdge Electronics',
                'industry' => 'Electronics Manufacturer',
                'city' => 'Pune',
                'rating' => 5,
                'review_text' => 'We visited their plant before signing up and were impressed. Nothing goes to landfill and everything is recovered properly. We now trust them with all our factory e-waste.',
                'outcome_text' => 'Zero-landfill disposal',
            ],
            [
                'customer_name' => 'Sneha Kapoor',
                'designation' => 'CSR & Compliance Lead',
                'company_name' => 'Meridian Finance',
                'industry' => 'Financial Services',
                'city' => 'Mumbai',
                'rating' => 5,
                'review_text' => 'They handled our EPR filings and recycling targets from start to finish. We met our compliance goals comfortably and the whole burden was taken off our small team.',
                'outcome_text' => 'EPR targets met',
            ],
            [
                'customer_name' => 'Manish Gupta',
                'designation' => 'Facilities Manager',
                'company_name' => 'Nexus Towers',
                'industry' => 'Commercial Real Estate',
                'city' => 'Gurugram',
                'rating' => 5,
                'review_text' => 'We cleared out two floors of old electronics and furniture scrap in a single day. The crew was polite, careful and quick. Highly recommend them for any office clean-up.',
                'outcome_text' => 'Office space cleared',
            ],
            [
                'customer_name' => 'Deepa Iyer',
                'designation' => 'Sustainability Officer',
                'company_name' => 'GreenLeaf Industries',
                'industry' => 'Manufacturing',
                'city' => 'Hyderabad',
                'rating' => 5,
                'review_text' => 'What we value most is how transparent they are. We get clear reports on how much waste was recycled and recovered, which helps us show real progress on our sustainability goals.',
                'outcome_text' => 'Measurable impact reports',
            ],
        ];

        foreach ($testimonials as $i => $t) {
            Testimonial::updateOrCreate(
                ['customer_name' => $t['customer_name'], 'company_name' => $t['company_name']],
                $t + [
                    'is_active' => true,
                    'sort_order' => $i,
                    'status' => Testimonial::STATUS_APPROVED,
                    'consent_to_publish' => true,
                ]
            );
        }

        $this->command?->info('Testimonials seeded: ' . count($testimonials) . ' (no photos available — text content only).');

        // Local-only sample so the admin "Pending" tab has something to review
        // during development. Never runs outside local/testing environments.
        if (app()->environment(['local', 'testing'])) {
            Testimonial::updateOrCreate(
                ['customer_name' => 'Test Submission (Pending Review)', 'company_name' => 'QA Sandbox Pvt. Ltd.'],
                [
                    'designation' => 'Ops Lead',
                    'industry' => 'Testing',
                    'city' => 'Sample City',
                    'rating' => 4,
                    'review_text' => 'This is a sample customer-submitted testimonial used to verify the admin pending-review queue locally. Safe to approve, reject, or delete.',
                    'outcome_text' => 'Sample submission',
                    'is_active' => true,
                    'sort_order' => 999,
                    'status' => Testimonial::STATUS_PENDING,
                    'consent_to_publish' => true,
                ]
            );
            $this->command?->info('Added 1 local-only pending sample testimonial for QA.');
        }
    }
}
