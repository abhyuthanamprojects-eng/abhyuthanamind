import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, LayoutTemplate, Plus } from 'lucide-react';
import { PageHeader, StatusBadge, FilterSelect, Panel, EmptyState, ActionBtn } from '@/Components/Admin/AdminUI';

export default function Index({ sections, filters, pageKeys }) {
    const applyFilter = (next) => {
        router.get(route('admin.page-sections.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this page section?')) {
            router.delete(route('admin.page-sections.destroy', id));
        }
    };

    return (
        <AdminLayout title="Page Sections (CMS)">
            <PageHeader
                title="Page Sections (CMS)"
                subtitle="Manage flexible content blocks for Home, About, Process, Contact and other pages."
                action={(
                    <a href={route('admin.page-sections.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Add Section
                    </a>
                )}
            />

            <div className="mb-5">
                <FilterSelect
                    value={filters.page_key || ''}
                    onChange={(v) => applyFilter({ page_key: v })}
                    options={[{ value: '', label: 'All Pages' }, ...pageKeys.map((k) => ({ value: k, label: k }))]}
                />
            </div>

            <Panel className="p-0">
                {sections.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={LayoutTemplate} title="No page sections found" message="Add content blocks for Home, About, Process or Contact pages." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Page / Section</th>
                                    <th className="px-5 py-3">Title</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sections.map((s) => (
                                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <p className="font-semibold text-navy">{s.page_key} / {s.section_key}</p>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">{s.title || '—'}</td>
                                        <td className="px-5 py-3"><StatusBadge status={s.is_active ? 'Active' : 'Inactive'} /></td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.page-sections.edit', s.id)} />
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
        </AdminLayout>
    );
}
