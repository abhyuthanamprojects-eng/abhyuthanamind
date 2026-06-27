import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Wrench, Plus } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ services, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.services.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    };

    return (
        <AdminLayout title="Services">
            <PageHeader
                title="Services"
                subtitle="Manage the services shown on the public website."
                action={(
                    <a href={route('admin.services.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Add Service
                    </a>
                )}
            />

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by title…">
                <FilterSelect
                    value={filters.status || ''}
                    onChange={(v) => applyFilter({ status: v })}
                    options={[{ value: '', label: 'All Status' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                />
            </FilterBar>

            <Panel className="p-0">
                {services.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={Wrench} title="No services found" message="Add your first service to show it on the public website." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Service</th>
                                    <th className="px-5 py-3">Slug</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.data.map((s) => (
                                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {s.image_url ? (
                                                    <img src={s.image_url} alt={s.title} className="size-10 rounded-xl border border-border object-cover" />
                                                ) : (
                                                    <div className="grid size-10 place-items-center rounded-xl bg-eco text-muted-foreground"><Wrench className="size-4" /></div>
                                                )}
                                                <span className="font-semibold text-navy">{s.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">/{s.slug}</td>
                                        <td className="px-5 py-3"><StatusBadge status={s.is_active ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.services.edit', s.id)} />
                                                <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDelete(s.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={services.links} />
        </AdminLayout>
    );
}
