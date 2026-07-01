import { router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft, Pencil, Check, X, Sparkles, EyeOff, Eye, Trash2, Building2, MapPin, Star, Quote,
} from 'lucide-react';
import { PageHeader, Panel, StatusBadge } from '@/Components/Admin/AdminUI';

const isVideoUrl = (url) => /\.(mp4|mov|webm|avi|m4v)$/i.test(url || '');

export default function Show({ testimonial: t }) {
    const handleDelete = () => {
        if (confirm('Delete this testimonial?')) {
            router.delete(route('admin.testimonials.destroy', t.id));
        }
    };

    const handleApprove = () => router.post(route('admin.testimonials.approve', t.id));

    const handleReject = () => {
        const reason = window.prompt('Reason for rejection (optional):') || '';
        router.post(route('admin.testimonials.reject', t.id), { rejection_reason: reason });
    };

    const handleFeature = () => router.post(route('admin.testimonials.feature', t.id));
    const handleToggleStatus = () => router.post(route('admin.testimonials.toggle-status', t.id));

    const handleDeleteMedia = (mediaId) => {
        if (confirm('Remove this media item?')) {
            router.delete(route('admin.testimonials.media.destroy', [t.id, mediaId]));
        }
    };

    return (
        <AdminLayout title={`Testimonial · ${t.customer_name}`}>
            <PageHeader
                title={t.customer_name}
                subtitle="Testimonial detail"
                action={(
                    <Link href={route('admin.testimonials.index')} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy shadow-soft transition hover:bg-eco/60">
                        <ArrowLeft className="size-4" /> Back to Testimonials
                    </Link>
                )}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Panel>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {t.image_url && !isVideoUrl(t.image_url) ? (
                                    <img src={t.image_url} alt={t.customer_name} className="size-16 rounded-full border border-border object-cover" />
                                ) : (
                                    <div className="grid size-16 place-items-center rounded-full bg-brand text-xl font-bold text-brand-foreground">
                                        {t.customer_name?.[0]}
                                    </div>
                                )}
                                <div>
                                    <h3 className="flex items-center gap-1.5 text-lg font-bold text-navy">
                                        {t.customer_name}
                                        {t.is_featured && <Sparkles className="size-4 text-amber-500" />}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t.designation}</p>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        {t.company_name && <span className="flex items-center gap-1"><Building2 className="size-3.5" />{t.company_name}</span>}
                                        {t.city && <span className="flex items-center gap-1"><MapPin className="size-3.5" />{t.city}</span>}
                                    </div>
                                </div>
                            </div>
                            <StatusBadge status={t.status} />
                        </div>

                        <div className="mt-4 text-amber-500">{'★'.repeat(t.rating)}<span className="text-muted-foreground">{'★'.repeat(5 - t.rating)}</span></div>

                        <div className="mt-5 rounded-2xl bg-eco/60 p-5">
                            <Quote className="size-5 text-brand/40" />
                            <p className="mt-2 text-sm leading-relaxed text-navy">{t.review_text}</p>
                        </div>

                        {(t.outcome_label || t.outcome_text) && (
                            <div className="mt-4 rounded-2xl border border-border p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t.outcome_label || 'Outcome'}</p>
                                <p className="mt-1 text-sm text-navy">{t.outcome_text}</p>
                            </div>
                        )}

                        {t.status === 'rejected' && t.rejection_reason && (
                            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-rose-600">Rejection Reason</p>
                                <p className="mt-1 text-sm text-rose-700">{t.rejection_reason}</p>
                            </div>
                        )}
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Media</h3>
                        {(!t.media || t.media.length === 0) && !t.image_url && !t.video_url ? (
                            <p className="text-sm text-muted-foreground">No media attached.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {t.video_url && (
                                    <div className="overflow-hidden rounded-2xl border border-border">
                                        <video src={t.video_url} controls className="aspect-square w-full object-cover" />
                                    </div>
                                )}
                                {t.image_url && !isVideoUrl(t.image_url) && !t.video_url && (
                                    <div className="overflow-hidden rounded-2xl border border-border">
                                        <img src={t.image_url} alt={t.customer_name} className="aspect-square w-full object-cover" />
                                    </div>
                                )}
                                {(t.media || []).map((m) => (
                                    <div key={m.id} className="group relative overflow-hidden rounded-2xl border border-border">
                                        {m.media_type === 'image' ? (
                                            <img src={m.file_url} alt={m.title || ''} className="aspect-square w-full object-cover" />
                                        ) : (
                                            <video src={m.file_url} controls className="aspect-square w-full object-cover" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMedia(m.id)}
                                            className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-rose-600 text-white opacity-0 transition group-hover:opacity-100"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Panel>
                </div>

                <div className="space-y-6 lg:col-span-1">
                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Actions</h3>
                        <div className="space-y-2.5">
                            {t.status === 'pending' && (
                                <>
                                    <button onClick={handleApprove} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                                        <Check className="size-4" /> Approve
                                    </button>
                                    <button onClick={handleReject} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                                        <X className="size-4" /> Reject
                                    </button>
                                </>
                            )}
                            {t.status === 'approved' && (
                                <button onClick={handleToggleStatus} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">
                                    {t.is_active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    {t.is_active ? 'Unpublish' : 'Publish'}
                                </button>
                            )}
                            <button onClick={handleFeature} className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${t.is_featured ? 'bg-accent text-accent-foreground' : 'border border-border text-navy hover:bg-muted'}`}>
                                <Sparkles className="size-4" /> {t.is_featured ? 'Unfeature' : 'Mark Featured'}
                            </button>
                            <Link href={route('admin.testimonials.edit', t.id)} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">
                                <Pencil className="size-4" /> Edit
                            </Link>
                            <button onClick={handleDelete} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                                <Trash2 className="size-4" /> Delete
                            </button>
                        </div>
                    </Panel>

                    <Panel>
                        <h3 className="mb-3 text-base font-bold text-navy">Details</h3>
                        <dl className="space-y-2.5 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Source</dt>
                                <dd className="font-medium capitalize text-navy">{t.source || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Industry</dt>
                                <dd className="font-medium text-navy">{t.industry || '—'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Consent to Publish</dt>
                                <dd className="font-medium text-navy">{t.consent_to_publish ? 'Yes' : 'No'}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Submitted</dt>
                                <dd className="font-medium text-navy">{new Date(t.created_at).toLocaleDateString()}</dd>
                            </div>
                            {t.approved_at && (
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">{t.status === 'rejected' ? 'Reviewed' : 'Approved'}</dt>
                                    <dd className="font-medium text-navy">{new Date(t.approved_at).toLocaleDateString()}</dd>
                                </div>
                            )}
                            {t.approved_by && (
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">By</dt>
                                    <dd className="font-medium text-navy">{t.approved_by?.name}</dd>
                                </div>
                            )}
                        </dl>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
