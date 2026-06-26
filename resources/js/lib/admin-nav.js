import {
    LayoutDashboard, Truck, MessageSquare, HelpCircle, FileText, Star, Award,
    IndianRupee, Users, Settings, User,
} from 'lucide-react';

export const adminNav = [
    {
        group: 'Main',
        items: [
            { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
            { label: 'Pickup Requests', route: 'admin.pickups.index', icon: Truck },
            { label: 'Contact Queries', route: 'admin.contacts.index', icon: MessageSquare },
            { label: 'Help & Support', route: 'admin.help-support.index', icon: HelpCircle },
        ],
    },
    {
        group: 'Website Content',
        items: [
            { label: 'Static Pages', route: 'admin.pages.index', icon: FileText },
            { label: 'Testimonials', route: 'admin.testimonials.index', icon: Star },
            { label: 'Certificates', route: 'admin.certificates.index', icon: Award },
        ],
    },
    {
        group: 'Business Data',
        items: [
            { label: 'Scrap Rate Management', route: 'admin.scrap-rate.index', icon: IndianRupee },
            { label: 'Customers / Leads', route: 'admin.customers.index', icon: Users },
        ],
    },
    {
        group: 'Settings',
        items: [
            { label: 'App Settings', route: 'admin.app-settings.index', icon: Settings },
            { label: 'Profile', route: 'profile.edit', icon: User },
        ],
    },
];
