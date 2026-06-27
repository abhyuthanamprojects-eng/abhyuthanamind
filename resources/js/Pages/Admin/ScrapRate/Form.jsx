import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ item = null, categories }) {
    const isEditing = !!item;

    const { data, setData, post, processing, errors } = useForm({
        scrap_category_id: item?.scrap_category_id || (categories[0]?.id ?? ''),
        name: item?.name || '',
        rate: item?.rate || '',
        unit: item?.unit || 'piece',
        description: item?.description || '',
        is_active: item?.is_active ?? true,
        image: null,
        _method: isEditing ? 'put' : 'post',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? route('admin.scrap-items.update', item.id) : route('admin.scrap-items.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Scrap Item' : 'Add Scrap Item'}>
            <a href={route('admin.scrap-rate.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Scrap Rate Management
            </a>

            <PageHeader title={isEditing ? `Edit: ${item.name}` : 'Add New Scrap Item'} />

            <Panel className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={labelClass}>Category</label>
                        <select className={inputClass} value={data.scrap_category_id} onChange={(e) => setData('scrap_category_id', e.target.value)} required>
                            {categories.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                        {errors.scrap_category_id && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.scrap_category_id}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Item Name</label>
                        <input className={inputClass} value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Rate (₹)</label>
                            <input type="number" step="0.01" min="0" className={inputClass} value={data.rate} onChange={(e) => setData('rate', e.target.value)} required />
                            {errors.rate && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.rate}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Unit</label>
                            <select className={inputClass} value={data.unit} onChange={(e) => setData('unit', e.target.value)}>
                                <option value="piece">Piece</option>
                                <option value="kg">Kg</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Image</label>
                        {item?.image_url && !data.image && (
                            <img src={item.image_url} alt={item.name} className="mb-2 size-20 rounded-2xl border border-border object-cover" />
                        )}
                        <input type="file" accept="image/*" className={inputClass} onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.image}</p>}
                    </div>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        Active (visible on public Scrap Rate page)
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.scrap-rate.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Item' : 'Create Item'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
