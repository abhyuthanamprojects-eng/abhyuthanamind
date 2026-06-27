import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

const isVideoUrl = (url) => /\.(mp4|mov|webm|avi)$/i.test(url || '');
const isVideoFile = (file) => file?.type?.startsWith('video/');

export default function Form({ testimonial = null }) {
    const isEditing = !!testimonial;

    const { data, setData, post, processing, errors } = useForm({
        customer_name: testimonial?.customer_name || '',
        designation: testimonial?.designation || '',
        company_name: testimonial?.company_name || '',
        industry: testimonial?.industry || '',
        city: testimonial?.city || '',
        rating: testimonial?.rating || 5,
        review_text: testimonial?.review_text || '',
        outcome_label: testimonial?.outcome_label || '',
        outcome_text: testimonial?.outcome_text || '',
        video_url: testimonial?.video_url || '',
        is_active: testimonial?.is_active ?? true,
        is_featured: testimonial?.is_featured ?? false,
        consent_to_publish: testimonial?.consent_to_publish ?? true,
        media: null,
        _method: isEditing ? 'put' : 'post',
    });

    const handleDeleteMedia = (mediaId) => {
        if (confirm('Remove this media item?')) {
            router.delete(route('admin.testimonials.media.destroy', [testimonial.id, mediaId]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? route('admin.testimonials.update', testimonial.id) : route('admin.testimonials.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Testimonial' : 'Add Testimonial'}>
            <a href={route('admin.testimonials.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Testimonials
            </a>

            <PageHeader title={isEditing ? `Edit: ${testimonial.customer_name}` : 'Add New Testimonial'} />

            <Panel className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Customer Name</label>
                            <input className={inputClass} value={data.customer_name} onChange={(e) => setData('customer_name', e.target.value)} required />
                            {errors.customer_name && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.customer_name}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Designation</label>
                            <input className={inputClass} value={data.designation} onChange={(e) => setData('designation', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Company Name</label>
                        <input className={inputClass} value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Industry</label>
                            <input className={inputClass} placeholder="e.g. IT Services Company" value={data.industry} onChange={(e) => setData('industry', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>City</label>
                            <input className={inputClass} placeholder="e.g. Noida" value={data.city} onChange={(e) => setData('city', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Rating</label>
                        <select className={inputClass} value={data.rating} onChange={(e) => setData('rating', e.target.value)}>
                            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Review Text</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={4} value={data.review_text} onChange={(e) => setData('review_text', e.target.value)} required />
                        {errors.review_text && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.review_text}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Outcome Label (optional)</label>
                            <input className={inputClass} placeholder="e.g. Devices recycled" value={data.outcome_label} onChange={(e) => setData('outcome_label', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Outcome Value (optional)</label>
                            <input className={inputClass} placeholder="e.g. 120+ devices" value={data.outcome_text} onChange={(e) => setData('outcome_text', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Video URL (optional)</label>
                        <input type="url" className={inputClass} placeholder="https://…" value={data.video_url} onChange={(e) => setData('video_url', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Photo or Video Upload</label>
                        {testimonial?.video_url && !data.media && (
                            <video src={testimonial.video_url} controls className="mb-2 h-32 rounded-2xl border border-border object-cover" />
                        )}
                        {testimonial?.image_url && !isVideoUrl(testimonial.image_url) && !data.media && (
                            <img src={testimonial.image_url} alt={testimonial.customer_name} className="mb-2 size-16 rounded-full border border-border object-cover" />
                        )}
                        {data.media && isVideoFile(data.media) && (
                            <video src={URL.createObjectURL(data.media)} controls className="mb-2 h-32 rounded-2xl border border-border object-cover" />
                        )}
                        <input type="file" accept="image/*,video/*" className={inputClass} onChange={(e) => setData('media', e.target.files[0])} />
                        <p className="mt-1.5 text-xs text-muted-foreground">A video upload here is automatically stored as the video URL below, separate from the photo.</p>
                        <p className="mt-1.5 text-xs text-muted-foreground">Images and videos up to 50MB are accepted — they're compressed automatically on upload.</p>
                        {errors.media && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.media}</p>}
                    </div>

                    {isEditing && testimonial.media?.length > 0 && (
                        <div>
                            <label className={labelClass}>Submitted Media</label>
                            <div className="flex flex-wrap gap-3">
                                {testimonial.media.map((m) => (
                                    <div key={m.id} className="relative">
                                        {m.media_type === 'image' ? (
                                            <img src={m.file_url} className="size-20 rounded-2xl border border-border object-cover" />
                                        ) : (
                                            <div className="grid size-20 place-items-center rounded-2xl border border-border bg-muted text-xs text-muted-foreground">Video</div>
                                        )}
                                        <button type="button" onClick={() => handleDeleteMedia(m.id)} className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-rose-600 text-white shadow-soft">
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-5">
                        <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                            <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                            Active (visible on public website)
                        </label>
                        <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                            <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} />
                            Featured
                        </label>
                        <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                            <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.consent_to_publish} onChange={(e) => setData('consent_to_publish', e.target.checked)} />
                            Consent to publish
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.testimonials.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
