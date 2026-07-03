import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel, FormSection } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ service = null }) {
    const isEditing = !!service;

    const { data, setData, post, processing, errors } = useForm({
        title: service?.title || '',
        slug: service?.slug || '',
        short_description: service?.short_description || '',
        long_description: service?.long_description || '',
        icon: service?.icon || '',
        is_active: service?.is_active ?? true,
        meta_title: service?.meta_title || '',
        meta_description: service?.meta_description || '',
        image: null,
        _method: isEditing ? 'put' : 'post',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? route('admin.services.update', service.id) : route('admin.services.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Service' : 'Add Service'}>
            <a href={route('admin.services.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Services
            </a>

            <PageHeader title={isEditing ? `Edit: ${service.title}` : 'Add New Service'} />

            <Panel className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={labelClass}>Title</label>
                        <input className={inputClass} value={data.title} onChange={(e) => {
                            setData('title', e.target.value);
                            if (!isEditing) setData('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                        }} required />
                        {errors.title && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Slug</label>
                        <input className={inputClass} value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />
                        {errors.slug && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.slug}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Short Description</label>
                        <input className={inputClass} value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} maxLength={255} />
                    </div>

                    <div>
                        <label className={labelClass}>Long Description</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={6} value={data.long_description} onChange={(e) => setData('long_description', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Icon (lucide-react name, optional)</label>
                        <input className={inputClass} value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="e.g. Recycle" />
                    </div>

                    <div>
                        <label className={labelClass}>Image</label>
                        {service?.image_url && !data.image && (
                            <img src={service.image_url} alt={service.title} className="mb-2 size-20 rounded-2xl border border-border object-cover" />
                        )}
                        <input type="file" accept="image/*" className={inputClass} onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.image}</p>}
                    </div>

                    <FormSection title="SEO (optional)">
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Meta Title</label>
                                <input className={inputClass} value={data.meta_title} onChange={(e) => setData('meta_title', e.target.value)} maxLength={160} />
                            </div>
                            <div>
                                <label className={labelClass}>Meta Description</label>
                                <input className={inputClass} value={data.meta_description} onChange={(e) => setData('meta_description', e.target.value)} maxLength={255} />
                            </div>
                        </div>
                    </FormSection>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        Active (visible on public website)
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.services.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Service' : 'Create Service'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
