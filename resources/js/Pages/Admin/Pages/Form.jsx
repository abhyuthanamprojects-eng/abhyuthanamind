import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { ArrowLeft } from 'lucide-react';

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
        <AdminLayout>
            <Head title={isEditing ? 'Edit Page' : 'Create Page'} />

            <AdminHeader
                title={isEditing ? `Edit: ${page.title}` : 'Create New Page'}
                action={{ label: 'Back to List', icon: <ArrowLeft size={16} />, href: route('admin.pages.index') }}
            />

            <div className="card" style={{ maxWidth: '56rem' }}>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Page Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                className="form-control"
                                value={data.title}
                                onChange={(e) => {
                                    setData('title', e.target.value);
                                    if (!isEditing) {
                                        setData('slug', e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                                    }
                                }}
                                required
                            />
                            {errors.title && <div className="text-danger fs-3 mt-1">{errors.title}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="slug" className="form-label">Slug (URL Path)</label>
                            <div className="input-group">
                                <span className="input-group-text">scrapify.in/</span>
                                <input
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    className="form-control"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.slug && <div className="text-danger fs-3 mt-1">{errors.slug}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Page Content (HTML/Markdown)</label>
                            <textarea
                                id="content"
                                name="content"
                                className="form-control"
                                value={data.content}
                                rows="15"
                                onChange={(e) => setData('content', e.target.value)}
                                required
                            />
                            {errors.content && <div className="text-danger fs-3 mt-1">{errors.content}</div>}
                        </div>

                        <div className="form-check mb-4">
                            <input
                                id="is_active"
                                type="checkbox"
                                className="form-check-input"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                            />
                            <label htmlFor="is_active" className="form-check-label">
                                Published (Visible on site)
                            </label>
                            {errors.is_active && <div className="text-danger fs-3 mt-1">{errors.is_active}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {isEditing ? 'Update Page' : 'Create Page'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
