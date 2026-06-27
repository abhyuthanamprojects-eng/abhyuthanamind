import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Plus, IndianRupee, Tag } from 'lucide-react';
import { PageHeader, StatCard, FilterBar, FilterSelect, Panel, EmptyState, ActionBtn, StatusBadge, Pagination } from '@/Components/Admin/AdminUI';

export default function Index({ items, categories, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const categoryForm = useForm({ title: '', icon: '', description: '' });

    const applyFilter = (next) => {
        router.get(route('admin.scrap-rate.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDeleteItem = (id) => {
        if (confirm('Delete this scrap item?')) {
            router.delete(route('admin.scrap-items.destroy', id));
        }
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Delete this category? It must have no items.')) {
            router.delete(route('admin.scrap-categories.destroy', id));
        }
    };

    const submitCategory = (e) => {
        e.preventDefault();
        categoryForm.post(route('admin.scrap-categories.store'), {
            onSuccess: () => {
                categoryForm.reset();
                setShowCategoryForm(false);
            },
        });
    };

    return (
        <AdminLayout title="Scrap Rate Management">
            <PageHeader
                title="Scrap Rate Management"
                subtitle="Manage scrap categories, items and rates shown on the public Scrap Rate page."
                action={(
                    <a href={route('admin.scrap-items.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                        <Plus className="size-4" /> Add Scrap Item
                    </a>
                )}
            />

            <div className="grid gap-5 sm:grid-cols-3">
                <StatCard icon={IndianRupee} label="Total Items" value={stats.total_items} tone="brand" />
                <StatCard icon={IndianRupee} label="Active Items" value={stats.active_items} tone="blue" />
                <StatCard icon={Tag} label="Categories" value={stats.total_categories} tone="amber" />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
                {/* Categories sidebar */}
                <Panel>
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-navy">Categories</h3>
                        <button onClick={() => setShowCategoryForm((v) => !v)} className="text-xs font-semibold text-brand hover:underline">
                            {showCategoryForm ? 'Cancel' : '+ Add'}
                        </button>
                    </div>

                    {showCategoryForm && (
                        <form onSubmit={submitCategory} className="mb-4 space-y-2 rounded-2xl border border-border bg-eco/30 p-3">
                            <input
                                placeholder="Category title"
                                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                                value={categoryForm.data.title}
                                onChange={(e) => categoryForm.setData('title', e.target.value)}
                                required
                            />
                            {categoryForm.errors.title && <p className="text-xs text-rose-600">{categoryForm.errors.title}</p>}
                            <button type="submit" disabled={categoryForm.processing} className="h-8 w-full rounded-xl bg-brand text-xs font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60">
                                Save Category
                            </button>
                        </form>
                    )}

                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={() => applyFilter({ category: '' })}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition ${!filters.category ? 'bg-accent text-accent-foreground' : 'text-navy hover:bg-muted'}`}
                            >
                                All Categories
                            </button>
                        </li>
                        {categories.map((c) => (
                            <li key={c.id} className="group flex items-center gap-1">
                                <button
                                    onClick={() => applyFilter({ category: c.id })}
                                    className={`flex-1 truncate rounded-xl px-3 py-2 text-left text-sm font-medium transition ${String(filters.category) === String(c.id) ? 'bg-accent text-accent-foreground' : 'text-navy hover:bg-muted'}`}
                                >
                                    {c.title}
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(c.id)}
                                    className="hidden rounded-lg p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 group-hover:block"
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </Panel>

                {/* Items table */}
                <div>
                    <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search item name…">
                        <FilterSelect
                            value={filters.status || ''}
                            onChange={(v) => applyFilter({ status: v })}
                            options={[
                                { value: '', label: 'All Status' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                    </FilterBar>

                    <Panel className="mt-4 p-0">
                        {items.data.length === 0 ? (
                            <div className="p-6">
                                <EmptyState icon={IndianRupee} title="No scrap items found" message="Add your first scrap item to populate the public Scrap Rate page." />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                            <th className="px-5 py-3">Item</th>
                                            <th className="px-5 py-3">Category</th>
                                            <th className="px-5 py-3">Rate</th>
                                            <th className="px-5 py-3">Status</th>
                                            <th className="px-5 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.data.map((item) => (
                                            <tr key={item.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {item.image_url ? (
                                                            <img src={item.image_url} alt={item.name} className="size-10 rounded-xl border border-border object-cover" />
                                                        ) : (
                                                            <div className="grid size-10 place-items-center rounded-xl bg-eco text-muted-foreground"><IndianRupee className="size-4" /></div>
                                                        )}
                                                        <span className="font-semibold text-navy">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-muted-foreground">{item.category?.title}</td>
                                                <td className="px-5 py-3 text-navy">₹{item.rate}/{item.unit}</td>
                                                <td className="px-5 py-3"><StatusBadge status={item.is_active ? 'Active' : 'Inactive'} /></td>
                                                <td className="px-5 py-3 text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.scrap-items.edit', item.id)} />
                                                        <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDeleteItem(item.id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Panel>
                    <Pagination links={items.links} />
                </div>
            </div>
        </AdminLayout>
    );
}
