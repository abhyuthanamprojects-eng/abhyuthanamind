import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Head } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';

const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

export default function Buttons() {
    return (
        <AdminLayout>
            <Head title="Buttons" />

            <AdminHeader title="Buttons" subtitle="Bootstrap button styles available in the admin theme." icon={<SlidersHorizontal size={20} />} />

            <div className="card mb-4">
                <div className="card-header bg-transparent"><h6 className="mb-0">Solid Buttons</h6></div>
                <div className="card-body d-flex flex-wrap gap-2">
                    {variants.map((v) => (
                        <button key={v} type="button" className={`btn btn-${v}`}>{v}</button>
                    ))}
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header bg-transparent"><h6 className="mb-0">Outline Buttons</h6></div>
                <div className="card-body d-flex flex-wrap gap-2">
                    {variants.map((v) => (
                        <button key={v} type="button" className={`btn btn-outline-${v}`}>{v}</button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="card-header bg-transparent"><h6 className="mb-0">Sizes</h6></div>
                <div className="card-body d-flex flex-wrap align-items-center gap-2">
                    <button type="button" className="btn btn-primary btn-lg">Large</button>
                    <button type="button" className="btn btn-primary">Default</button>
                    <button type="button" className="btn btn-primary btn-sm">Small</button>
                    <button type="button" className="btn btn-primary" disabled>Disabled</button>
                </div>
            </div>
        </AdminLayout>
    );
}
