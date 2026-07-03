import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Factory, Plus } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ industries, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.industries.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this industry?')) {
            router.delete(route('admin.industries.destroy', id));
        }
    };

    return (
        <AdminLayout title="Industries">
            <PageHeader
                title="Industries"
                subtitle="Manage the industries served, shown on the public website."
                action={(
                    <a href={route('admin.industries.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Add Industry
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
                {industries.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={Factory} title="No industries found" message="Add your first industry to show it on the public website." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Industry</th>
                                    <th className="px-5 py-3">Slug</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {industries.data.map((i) => (
                                    <tr key={i.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {i.image_url ? (
                                                    <img src={i.image_url} alt={i.title} className="size-10 rounded-xl border border-border object-cover" />
                                                ) : (
                                                    <div className="grid size-10 place-items-center rounded-xl bg-eco text-muted-foreground"><Factory className="size-4" /></div>
                                                )}
                                                <span className="font-semibold text-navy">{i.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">/{i.slug}</td>
                                        <td className="px-5 py-3"><StatusBadge status={i.is_active ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.industries.edit', i.id)} />
                                                <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDelete(i.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={industries.links} />
        </AdminLayout>
    );
}
