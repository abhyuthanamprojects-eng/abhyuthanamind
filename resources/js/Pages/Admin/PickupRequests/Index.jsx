import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Truck, Clock, CheckCircle2, Eye } from 'lucide-react';
import {
    PageHeader, StatCard, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination,
} from '@/Components/Admin/AdminUI';

const statusOptions = [
    { value: '', label: 'All statuses' },
    { value: 'new', label: 'New' },
    { value: 'pending', label: 'Pending' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];

export default function Index({ pickups, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.pickups.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Pickup Requests">
            <PageHeader title="Pickup Requests" subtitle="All scrap pickup requests booked by customers." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={Truck} label="Total Requests" value={stats.total} tone="brand" i={0} />
                <StatCard icon={Clock} label="Pending" value={stats.pending} tone="amber" i={1} />
                <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} tone="blue" i={2} />
            </div>

            <div className="mt-6">
                <FilterBar
                    query={search}
                    onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }}
                    placeholder="Search by customer name, mobile or pickup code…"
                >
                    <FilterSelect value={filters.status || ''} onChange={(v) => applyFilter({ status: v })} options={statusOptions} />
                </FilterBar>

                <Panel className="p-0">
                    {pickups.data.length === 0 ? (
                        <div className="p-6">
                            <EmptyState icon={Truck} title="No pickup requests found" message="Try adjusting your search or filters." />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        <th className="px-5 py-3">Request</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Pickup Date</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Created</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pickups.data.map((p) => (
                                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                            <td className="px-5 py-3 font-semibold text-navy">{p.pickup_code || `#${p.id}`}</td>
                                            <td className="px-5 py-3">
                                                <p className="font-medium text-navy">{p.customer_name || '—'}</p>
                                                <p className="text-xs text-muted-foreground">{p.customer_phone}</p>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{p.city?.name ?? '—'}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString() : '—'}</td>
                                            <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                            <td className="px-5 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                                            <td className="px-5 py-3 text-right">
                                                <ActionBtn icon={Eye} label="View details" tone="brand" href={route('admin.pickups.show', p.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Panel>
                <Pagination links={pickups.links} />
            </div>
        </AdminLayout>
    );
}
