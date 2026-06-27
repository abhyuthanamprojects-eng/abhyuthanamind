import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ section = null }) {
    const isEditing = !!section;

    const { data, setData, post, processing, errors } = useForm({
        page_key: section?.page_key || '',
        section_key: section?.section_key || '',
        title: section?.title || '',
        subtitle: section?.subtitle || '',
        content: section?.content || '',
        json_data: section?.json_data ? JSON.stringify(section.json_data, null, 2) : '',
        is_active: section?.is_active ?? true,
        image: null,
        _method: isEditing ? 'put' : 'post',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? route('admin.page-sections.update', section.id) : route('admin.page-sections.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Page Section' : 'Add Page Section'}>
            <a href={route('admin.page-sections.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Page Sections
            </a>

            <PageHeader title={isEditing ? `Edit: ${section.page_key} / ${section.section_key}` : 'Add New Page Section'} />

            <Panel className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Page Key</label>
                            <input className={inputClass} value={data.page_key} onChange={(e) => setData('page_key', e.target.value)} placeholder="home, about, contact…" required />
                            {errors.page_key && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.page_key}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Section Key</label>
                            <input className={inputClass} value={data.section_key} onChange={(e) => setData('section_key', e.target.value)} placeholder="hero, intro, cta…" required />
                            {errors.section_key && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.section_key}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Title</label>
                        <input className={inputClass} value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Subtitle</label>
                        <input className={inputClass} value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Content</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={5} value={data.content} onChange={(e) => setData('content', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Image</label>
                        {section?.image_url && !data.image && (
                            <img src={section.image_url} alt={section.title} className="mb-2 size-20 rounded-2xl border border-border object-cover" />
                        )}
                        <input type="file" accept="image/*" className={inputClass} onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.image}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Extra JSON Data (optional, for stats/lists/etc.)</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 font-mono text-xs outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={5} value={data.json_data} onChange={(e) => setData('json_data', e.target.value)} placeholder='{"items": []}' />
                        {errors.json_data && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.json_data}</p>}
                    </div>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        Active (visible on public website)
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.page-sections.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Section' : 'Create Section'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
