import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, FileText, Plus } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ pages, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(route('admin.pages.destroy', id));
        }
    };

    const applyFilter = (next) => {
        router.get(route('admin.pages.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Static Pages">
            <PageHeader
                title="Static Pages"
                subtitle="Manage standalone content pages on the website."
                action={(
                    <a href={route('admin.pages.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Create New Page
                    </a>
                )}
            />

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by title or slug…" />

            <Panel className="p-0">
                {pages.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={FileText} title="No pages found" message="Create your first static page to get started." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Title / Slug</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Last Updated</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.data.map((page) => (
                                    <tr key={page.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-navy">{page.title}</p>
                                            <p className="text-xs text-muted-foreground">/{page.slug}</p>
                                        </td>
                                        <td className="px-5 py-3"><StatusBadge status={page.is_active ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3 text-muted-foreground">{new Date(page.updated_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.pages.edit', page.id)} />
                                                <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDelete(page.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={pages.links} />
        </AdminLayout>
    );
}
