import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { Globe2 } from 'lucide-react';

export default function SamplePage() {
    return (
        <AdminLayout>
            <Head title="Sample Page" />

            <AdminHeader title="Sample Page" subtitle="A blank starting point for a new admin page." icon={<Globe2 size={20} />} />

            <div className="card">
                <div className="card-body text-center py-5 text-secondary">
                    This is a blank sample page — duplicate it as a starting point for a new admin screen.
                </div>
            </div>
        </AdminLayout>
    );
}
