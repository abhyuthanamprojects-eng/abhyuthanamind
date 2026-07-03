import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Truck, Clock, CheckCircle2, XCircle, Activity, Eye, Link as LinkIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import {
    PageHeader, StatCard, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination,
} from '@/Components/Admin/AdminUI';

export default function Index({ pickups, filters, stats, statusOptions }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.pickups.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const copyTrackingLink = (url) => {
        if (!url) {
            toast.error('No tracking link available.');
            return;
        }
        navigator.clipboard.writeText(url);
        toast.success('Tracking link copied.');
    };

    const statusSelectOptions = [
        { value: '', label: 'All statuses' },
        ...Object.entries(statusOptions).map(([value, label]) => ({ value, label })),
    ];

    return (
        <AdminLayout title="Pickup Requests">
            <PageHeader title="Pickup Requests" subtitle="All scrap pickup requests booked by customers." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard icon={Truck} label="Total" value={stats.total} tone="brand" i={0} />
                <StatCard icon={Clock} label="Pending" value={stats.pending} tone="amber" i={1} />
                <StatCard icon={Activity} label="Active (in process)" value={stats.active} tone="violet" i={2} />
                <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} tone="blue" i={3} />
                <StatCard icon={XCircle} label="Cancelled" value={stats.cancelled} tone="rose" i={4} />
            </div>

            <div className="mt-6">
                <FilterBar
                    query={search}
                    onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }}
                    placeholder="Search by booking ID, customer name, mobile, city or category…"
                >
                    <FilterSelect value={filters.status || ''} onChange={(v) => applyFilter({ status: v })} options={statusSelectOptions} />
                    <input
                        type="date"
                        value={filters.date || ''}
                        onChange={(e) => applyFilter({ date: e.target.value })}
                        className="h-11 rounded-2xl border border-border bg-card px-4 text-sm font-medium text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
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
                                        <th className="px-5 py-3">Booking ID</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Scrap Category</th>
                                        <th className="px-5 py-3">Pickup Date</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Created</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pickups.data.map((p) => (
                                        <tr key={p.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                            <td className="px-5 py-3 font-semibold text-navy">{p.booking_id || p.pickup_code || `#${p.id}`}</td>
                                            <td className="px-5 py-3">
                                                <p className="font-medium text-navy">{p.customer_name || '—'}</p>
                                                <p className="text-xs text-muted-foreground">{p.customer_phone}</p>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{p.city?.name ?? p.metadata?.public_lead?.city ?? '—'}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{p.metadata?.public_lead?.scrap_category ?? '—'}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString() : '—'}</td>
                                            <td className="px-5 py-3"><StatusBadge status={p.tracking_status} /></td>
                                            <td className="px-5 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <ActionBtn icon={Eye} label="View details" tone="brand" href={route('admin.pickups.show', p.id)} />
                                                    <ActionBtn icon={LinkIcon} label="Copy tracking link" onClick={() => copyTrackingLink(p.tracking_url)} />
                                                    <ActionBtn icon={Download} label="Download details" tone="brand" href={p.tracking_url ? `${p.tracking_url}/download` : undefined} />
                                                </div>
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
