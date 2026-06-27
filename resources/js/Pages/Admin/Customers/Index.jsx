import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Users, MessageSquare, Truck, ExternalLink, IndianRupee } from 'lucide-react';
import {
    PageHeader, StatCard, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination,
} from '@/Components/Admin/AdminUI';

const typeOptions = [
    { value: '', label: 'All types' },
    { value: 'contact', label: 'Contact Enquiry' },
    { value: 'pickup', label: 'Pickup Request' },
];

export default function Index({ leads, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.customers.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Customers / Leads">
            <PageHeader title="Customers / Leads" subtitle="Aggregated view of contact enquiries and pickup requests from the website and app." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={Users} label="Total" value={stats.total} tone="brand" i={0} />
                <StatCard icon={MessageSquare} label="Contact Enquiries" value={stats.contacts} tone="rose" i={1} />
                <StatCard icon={Truck} label="Pickup Requests" value={stats.pickups} tone="blue" i={2} />
            </div>

            <div className="mt-6">
                <FilterBar
                    query={search}
                    onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }}
                    placeholder="Search by name, company or city…"
                >
                    <FilterSelect value={filters.type || ''} onChange={(v) => applyFilter({ type: v })} options={typeOptions} />
                </FilterBar>

                <Panel className="p-0">
                    {leads.data.length === 0 ? (
                        <div className="p-6">
                            <EmptyState icon={Users} title="No customers or leads found" message="Contact enquiries and pickup requests will show up here." />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        <th className="px-5 py-3">Name</th>
                                        <th className="px-5 py-3">Company</th>
                                        <th className="px-5 py-3">Type</th>
                                        <th className="px-5 py-3">City</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Est. Value</th>
                                        <th className="px-5 py-3">Last Contact</th>
                                        <th className="px-5 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.data.map((row) => (
                                        <tr key={row.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                            <td className="px-5 py-3 font-medium text-navy">{row.name || '—'}</td>
                                            <td className="px-5 py-3 text-muted-foreground">{row.company || '—'}</td>
                                            <td className="px-5 py-3">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-navy">
                                                    {row.type === 'pickup' ? <Truck className="size-3" /> : <MessageSquare className="size-3" />}
                                                    {row.type_label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{row.city || '—'}</td>
                                            <td className="px-5 py-3"><StatusBadge status={row.status} /></td>
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {row.estimated_value ? <span className="flex items-center"><IndianRupee className="size-3.5" />{row.estimated_value}</span> : '—'}
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">{new Date(row.last_contact).toLocaleDateString()}</td>
                                            <td className="px-5 py-3 text-right">
                                                <ActionBtn icon={ExternalLink} label="View" tone="brand" href={row.link} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Panel>
                <Pagination links={leads.links} />
            </div>
        </AdminLayout>
    );
}
