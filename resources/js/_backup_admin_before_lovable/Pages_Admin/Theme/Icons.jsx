import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import {
    Smile, Home, Settings, Mail, Bell, User, Calendar, Search, Star,
    Heart, Globe2, FileText, LayoutGrid, CheckCircle2, XCircle, Menu,
    LogIn, LogOut, UserPlus, HelpCircle,
} from 'lucide-react';

const icons = [
    { name: 'Smile', Icon: Smile }, { name: 'Home', Icon: Home }, { name: 'Settings', Icon: Settings },
    { name: 'Mail', Icon: Mail }, { name: 'Bell', Icon: Bell }, { name: 'User', Icon: User },
    { name: 'Calendar', Icon: Calendar }, { name: 'Search', Icon: Search }, { name: 'Star', Icon: Star },
    { name: 'Heart', Icon: Heart }, { name: 'Globe2', Icon: Globe2 }, { name: 'FileText', Icon: FileText },
    { name: 'LayoutGrid', Icon: LayoutGrid }, { name: 'CheckCircle2', Icon: CheckCircle2 }, { name: 'XCircle', Icon: XCircle },
    { name: 'Menu', Icon: Menu }, { name: 'LogIn', Icon: LogIn }, { name: 'LogOut', Icon: LogOut },
    { name: 'UserPlus', Icon: UserPlus }, { name: 'HelpCircle', Icon: HelpCircle },
];

export default function IconsPage() {
    return (
        <AdminLayout>
            <Head title="Icons" />

            <AdminHeader title="Icons" subtitle="lucide-react icon set used throughout the admin panel." icon={<Smile size={20} />} />

            <div className="card">
                <div className="card-body">
                    <div className="row g-3">
                        {icons.map(({ name, Icon }) => (
                            <div key={name} className="col-6 col-md-3 col-lg-2 d-flex flex-column align-items-center text-center gap-2 py-3">
                                <Icon size={24} />
                                <span className="fs-2 text-secondary">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
