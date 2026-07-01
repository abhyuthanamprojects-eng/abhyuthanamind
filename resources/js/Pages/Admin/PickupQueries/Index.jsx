import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ClipboardList, Sparkles, MessageSquareMore, BadgeCheck, XCircle, Eye } from 'lucide-react';
import {
    PageHeader, StatCard, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination,
} from '@/Components/Admin/AdminUI';

export default function Index({ queries, filters, stats, statusOptions }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.pickup-queries.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const statusSelectOptions = [
        { value: '', label: 'All statuses' },
        ...Object.entries(statusOptions).map(([value, label]) => ({ value, label })),
    ];

    return (
        <AdminLayout title="Pickup Queries">
            <PageHeader title="Pickup Queries" subtitle="Website pickup enquiries awaiting review, negotiation or conversion into a pickup request." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard icon={ClipboardList} label="Total" value={stats.total} tone="brand" i={0} />
                <StatCard icon={Sparkles} label="New" value={stats.new} tone="amber" i={1} />
                <StatCard icon={MessageSquareMore} label="In Negotiation" value={stats.negotiation} tone="violet" i={2} />
                <StatCard icon={BadgeCheck} label="Converted" value={stats.converted} tone="blue" i={3} />
                <StatCard icon={XCircle} label="Rejected" value={stats.rejected} tone="rose" i={4} />
            </div>

            <div className="mt-6">
                <FilterBar
                    query={search}
                    onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }}
                    placeholder="Search by query ID, name, mobile, city or category…"
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
                    {queries.data.length === 0 ? (
                        <div className="p-6">
                            <EmptyState icon={ClipboardList} title="No pickup queries found" message="Website pickup enquiries will show up here for review." />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        <th className="px-5 py-3">Query ID</th>
                                        <th className="px-5 py-3">Customer</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Scrap Category</th>
                                        <th className="px-5 py-3">Quantity</th>
                                        <th className="px-5 py-3">Preferred Date</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Submitted</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queries.data.map((q) => (
                                        <tr key={q.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                            <td className="px-5 py-3 font-semibold text-navy">{q.query_id}</td>
                                            <td className="px-5 py-3">
                                                <p className="font-medium text-navy">{q.full_name}</p>
                                                <p className="text-xs text-muted-foreground">{q.mobile_number}</p>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{q.city}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{q.scrap_category}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{q.approximate_quantity || '—'}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{q.preferred_pickup_date ? new Date(q.preferred_pickup_date).toLocaleDateString() : '—'}</td>
                                            <td className="px-5 py-3"><StatusBadge status={q.status} /></td>
                                            <td className="px-5 py-3 text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                                            <td className="px-5 py-3 text-right">
                                                <ActionBtn icon={Eye} label="View details" tone="brand" href={route('admin.pickup-queries.show', q.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Panel>
                <Pagination links={queries.links} />
            </div>
        </AdminLayout>
    );
}
