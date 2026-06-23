import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users } from 'lucide-react';
import AdminCard from '@/Components/Admin/AdminCard';

export default function Dashboard({ stats }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="row">
                {stats.users_count !== null && stats.users_count !== undefined && (
                    <div className="col-12 col-sm-6 col-lg-3">
                        <AdminCard
                            title="Total Users"
                            value={stats.users_count}
                            subtext="Total registered users"
                            icon={<Users size={22} />}
                            color="green"
                        />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
