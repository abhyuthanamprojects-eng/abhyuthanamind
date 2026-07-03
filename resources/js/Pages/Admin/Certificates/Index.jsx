import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Award, Plus, FileText } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ certificates, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.certificates.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this certificate?')) {
            router.delete(route('admin.certificates.destroy', id));
        }
    };

    const isPdf = (path) => path?.toLowerCase().endsWith('.pdf');

    return (
        <AdminLayout title="Certificates">
            <PageHeader
                title="Certificates"
                subtitle="Manage certification documents shown on the public website."
                action={(
                    <a href={route('admin.certificates.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Add Certificate
                    </a>
                )}
            />

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by name…">
                <FilterSelect
                    value={filters.status || ''}
                    onChange={(v) => applyFilter({ status: v })}
                    options={[{ value: '', label: 'All Status' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]}
                />
            </FilterBar>

            <Panel className="p-0">
                {certificates.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={Award} title="No certificates found" message="Add your first certification document." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Certificate</th>
                                    <th className="px-5 py-3">Type</th>
                                    <th className="px-5 py-3">On Website</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificates.data.map((c) => (
                                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {isPdf(c.file_path) ? (
                                                    <div className="grid size-10 place-items-center rounded-xl bg-eco text-muted-foreground"><FileText className="size-4" /></div>
                                                ) : (
                                                    <img src={c.file_url} alt={c.name} className="size-10 rounded-xl border border-border object-cover" />
                                                )}
                                                <span className="font-semibold text-navy">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">{c.certificate_type || '—'}</td>
                                        <td className="px-5 py-3"><StatusBadge status={c.show_on_website ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3"><StatusBadge status={c.is_active ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.certificates.edit', c.id)} />
                                                <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDelete(c.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={certificates.links} />
        </AdminLayout>
    );
}
