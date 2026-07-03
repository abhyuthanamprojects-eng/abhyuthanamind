import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ page = null }) {
    const isEditing = !!page;

    const { data, setData, post, put, processing, errors } = useForm({
        title: page?.title || '',
        slug: page?.slug || '',
        content: page?.content || '',
        is_active: page?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.pages.update', page.id));
        } else {
            post(route('admin.pages.store'));
        }
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Page' : 'Create Page'}>
            <a href={route('admin.pages.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Static Pages
            </a>

            <PageHeader title={isEditing ? `Edit: ${page.title}` : 'Create New Page'} />

            <Panel className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className={labelClass}>Page Title</label>
                        <input
                            id="title"
                            type="text"
                            className={inputClass}
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                if (!isEditing) {
                                    setData('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                }
                            }}
                            required
                        />
                        {errors.title && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="slug" className={labelClass}>Slug (URL Path)</label>
                        <div className="flex items-center overflow-hidden rounded-2xl border border-border bg-card focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                            <span className="pl-4 text-sm text-muted-foreground">abhyuthanamind.com/</span>
                            <input
                                id="slug"
                                type="text"
                                className="h-11 w-full bg-transparent px-2 text-sm outline-none"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                required
                            />
                        </div>
                        {errors.slug && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.slug}</p>}
                    </div>

                    <div>
                        <label htmlFor="content" className={labelClass}>Page Content (HTML/Markdown)</label>
                        <textarea
                            id="content"
                            className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                            value={data.content}
                            rows={15}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        />
                        {errors.content && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.content}</p>}
                    </div>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input
                            type="checkbox"
                            className="size-4 rounded border-border text-brand focus:ring-brand/30"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        Published (Visible on site)
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.pages.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                        >
                            {isEditing ? 'Update Page' : 'Create Page'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
