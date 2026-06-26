import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { AlertTriangle } from 'lucide-react';

const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

export default function Alerts() {
    return (
        <AdminLayout>
            <Head title="Alerts" />

            <AdminHeader title="Alerts" subtitle="Bootstrap alert styles available in the admin theme." icon={<AlertTriangle size={20} />} />

            <div className="card">
                <div className="card-body">
                    {variants.map((v) => (
                        <div key={v} className={`alert alert-${v}`} role="alert">
                            A simple <strong>{v}</strong> alert — check it out!
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
