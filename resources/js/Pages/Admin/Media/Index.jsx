import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Trash2, Images, Upload } from 'lucide-react';
import { PageHeader, FilterBar, FilterSelect, Panel, EmptyState, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ items, filters, categories }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '', category: '', alt_text: '', file: null,
    });

    const applyFilter = (next) => {
        router.get(route('admin.media.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this media item?')) {
            router.delete(route('admin.media.destroy', id));
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('admin.media.store'), {
            forceFormData: true,
            onSuccess: () => { reset(); setShowForm(false); },
        });
    };

    return (
        <AdminLayout title="Media / Gallery">
            <PageHeader
                title="Media / Gallery"
                subtitle="Manage facility, certificate and service images used across the website."
                action={(
                    <button onClick={() => setShowForm((v) => !v)} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Upload className="size-4" /> {showForm ? 'Cancel' : 'Upload Image'}
                    </button>
                )}
            />

            {showForm && (
                <Panel className="mb-5">
                    <form onSubmit={handleUpload} className="grid gap-4 sm:grid-cols-2">
                        <input placeholder="Title (optional)" className="h-11 rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        <input placeholder="Category / tag (optional)" className="h-11 rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" value={data.category} onChange={(e) => setData('category', e.target.value)} />
                        <input placeholder="Alt text (optional)" className="h-11 rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 sm:col-span-2" value={data.alt_text} onChange={(e) => setData('alt_text', e.target.value)} />
                        <input type="file" accept="image/*" className="h-11 rounded-2xl border border-border bg-card px-4 text-sm outline-none sm:col-span-2" onChange={(e) => setData('file', e.target.files[0])} required />
                        {errors.file && <p className="text-xs font-medium text-rose-600 sm:col-span-2">{errors.file}</p>}
                        <button type="submit" disabled={processing} className="h-11 rounded-2xl bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60 sm:col-span-2">
                            Upload
                        </button>
                    </form>
                </Panel>
            )}

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by title…">
                <FilterSelect
                    value={filters.category || ''}
                    onChange={(v) => applyFilter({ category: v })}
                    options={[{ value: '', label: 'All Categories' }, ...categories.map((c) => ({ value: c, label: c }))]}
                />
            </FilterBar>

            {items.data.length === 0 ? (
                <Panel>
                    <EmptyState icon={Images} title="No media uploaded" message="Upload facility, certificate or service images here." />
                </Panel>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {items.data.map((m) => (
                        <div key={m.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                            <img src={m.file_url} alt={m.alt_text || m.title || ''} className="h-32 w-full object-cover" />
                            <div className="p-2.5">
                                <p className="truncate text-xs font-semibold text-navy">{m.title || 'Untitled'}</p>
                                {m.category && <p className="truncate text-[0.65rem] text-muted-foreground">{m.category}</p>}
                            </div>
                            <button
                                onClick={() => handleDelete(m.id)}
                                className="absolute right-2 top-2 grid size-8 place-items-center rounded-xl bg-card/90 text-rose-600 opacity-0 shadow-soft transition group-hover:opacity-100 hover:bg-rose-50"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Pagination links={items.links} />
        </AdminLayout>
    );
}
