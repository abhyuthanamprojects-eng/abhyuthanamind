import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader, EmptyState } from '@/Components/Admin/AdminUI';
import { Hourglass } from 'lucide-react';

export default function ComingSoon({ title, description }) {
    return (
        <AdminLayout title={title}>
            <PageHeader title={title} subtitle={description} />
            <EmptyState
                icon={Hourglass}
                title="Backend integration pending"
                message="This module's UI is ready. It will go live once the matching database tables and API endpoints are built — let your developer know when you're ready to wire it up."
            />
        </AdminLayout>
    );
}
