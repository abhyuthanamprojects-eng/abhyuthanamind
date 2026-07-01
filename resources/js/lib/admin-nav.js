import {
    LayoutDashboard, Truck, MessageSquare, HelpCircle, FileText, Star, Award, Images,
    IndianRupee, Users, BarChart3, User, Wrench, Factory, LayoutTemplate, ClipboardList,
} from 'lucide-react';

export const adminNav = [
    {
        group: 'Main',
        items: [
            { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
            { label: 'Pickup Queries', route: 'admin.pickup-queries.index', icon: ClipboardList },
            { label: 'Pickup Requests', route: 'admin.pickups.index', icon: Truck },
            { label: 'Contact Queries', route: 'admin.contacts.index', icon: MessageSquare },
            { label: 'Help & Support', route: 'admin.help-support.index', icon: HelpCircle },
            { label: 'Customers / Leads', route: 'admin.customers.index', icon: Users },
        ],
    },
    {
        group: 'Website Content',
        items: [
            { label: 'Static Pages', route: 'admin.pages.index', icon: FileText },
            { label: 'Page Sections (CMS)', route: 'admin.page-sections.index', icon: LayoutTemplate },
            { label: 'Services', route: 'admin.services.index', icon: Wrench },
            { label: 'Industries', route: 'admin.industries.index', icon: Factory },
            { label: 'Testimonials', route: 'admin.testimonials.index', icon: Star },
            { label: 'Certificates', route: 'admin.certificates.index', icon: Award },
            { label: 'Media / Gallery', route: 'admin.media.index', icon: Images },
        ],
    },
    {
        group: 'Business Data',
        items: [
            { label: 'Scrap Rate Management', route: 'admin.scrap-rate.index', icon: IndianRupee },
            { label: 'Reports / Analytics', route: 'admin.reports.index', icon: BarChart3 },
        ],
    },
    {
        group: 'Settings',
        items: [
            { label: 'Profile', route: 'profile.edit', icon: User },
        ],
    },
];
