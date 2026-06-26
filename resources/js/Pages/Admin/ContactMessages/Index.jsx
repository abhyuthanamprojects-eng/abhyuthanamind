import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Eye, MessageSquare } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

const statusOptions = [
    { value: '', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'resolved', label: 'Resolved' },
];
const typeOptions = [
    { value: '', label: 'All types' },
    { value: 'general', label: 'General' },
    { value: 'order', label: 'Order' },
];
const roleOptions = [
    { value: '', label: 'All roles' },
    { value: 'customer', label: 'Customer' },
    { value: 'channel_partner', label: 'Channel Partner' },
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'pickup_boy', label: 'Pickup Boy' },
];

export default function Index({ messages, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.contacts.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Contact Queries">
            <PageHeader title="Contact Queries" subtitle="Messages submitted from the website contact form and mobile app." />

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by name, email or subject…">
                <FilterSelect value={filters.status || ''} onChange={(v) => applyFilter({ status: v })} options={statusOptions} />
                <FilterSelect value={filters.type || ''} onChange={(v) => applyFilter({ type: v })} options={typeOptions} />
                <FilterSelect value={filters.user_role || ''} onChange={(v) => applyFilter({ user_role: v })} options={roleOptions} />
            </FilterBar>

            <Panel className="p-0">
                {messages.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={MessageSquare} title="No queries found" message="Try adjusting your search or filters." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Contact</th>
                                    <th className="px-5 py-3">Subject / Type</th>
                                    <th className="px-5 py-3">Order</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Received</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.data.map((msg) => (
                                    <tr key={msg.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-navy">{msg.name}</p>
                                            <p className="text-xs text-muted-foreground">{msg.email}</p>
                                            <p className="text-xs text-muted-foreground">{msg.phone}</p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <p className="max-w-xs truncate font-medium text-navy">{msg.subject || 'No Subject'}</p>
                                            <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[0.7rem] font-semibold capitalize text-muted-foreground">{msg.type || 'general'}</span>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">
                                            {msg.pickup_request_id ? (
                                                <>
                                                    #{msg.pickup_request_id}
                                                    {msg.pickup_request?.pickup_code && <div className="text-xs">{msg.pickup_request.pickup_code}</div>}
                                                </>
                                            ) : '—'}
                                        </td>
                                        <td className="px-5 py-3"><StatusBadge status={msg.status} /></td>
                                        <td className="px-5 py-3 text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            <ActionBtn icon={Eye} label="View details" tone="brand" href={route('admin.contacts.show', msg.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={messages.links} />
        </AdminLayout>
    );
}
