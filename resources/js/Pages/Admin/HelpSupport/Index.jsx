import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Eye, HelpCircle } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';
import { cn } from '@/lib/utils';

const tabs = ['all', 'pending', 'in_progress', 'resolved', 'closed'];

export default function Index({ tickets, filters, statusCounts }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.help-support.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Help & Support">
            <PageHeader title="Help & Support Tickets" subtitle="Customer and partner support queries submitted via the mobile app." />

            <div className="mb-4 flex flex-wrap gap-2">
                {tabs.map((s) => {
                    const active = filters.status === s || (!filters.status && s === 'all');
                    return (
                        <button
                            key={s}
                            type="button"
                            onClick={() => applyFilter({ status: s === 'all' ? '' : s })}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold capitalize transition',
                                active ? 'bg-brand text-brand-foreground shadow-soft' : 'border border-border bg-card text-navy hover:bg-muted',
                            )}
                        >
                            {s.replace('_', ' ')}
                            {statusCounts?.[s] !== undefined && (
                                <span className={cn('rounded-full px-2 py-0.5 text-[0.7rem] font-bold', active ? 'bg-white/25' : 'bg-muted text-muted-foreground')}>{statusCounts[s]}</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search tickets…" />

            <Panel className="p-0">
                {tickets.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={HelpCircle} title="No support tickets found" message="Try adjusting your search or filters." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">User</th>
                                    <th className="px-5 py-3">Subject</th>
                                    <th className="px-5 py-3">Type</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Date</th>
                                    <th className="px-5 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-navy">{t.name || t.user?.name || 'Guest'}</p>
                                            <p className="text-xs capitalize text-muted-foreground">{t.user_role || 'Visitor'}</p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="max-w-xs truncate font-medium text-navy">{t.subject}</p>
                                            {t.pickup_request_id && <p className="mt-0.5 text-xs font-bold uppercase text-brand">Order #{t.pickup_request_id}</p>}
                                        </td>
                                        <td className="px-5 py-3 capitalize text-muted-foreground">{t.type}</td>
                                        <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                                        <td className="px-5 py-3 text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            <ActionBtn icon={Eye} label="View ticket" tone="brand" href={route('admin.help-support.show', t.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={tickets.links} />
        </AdminLayout>
    );
}
