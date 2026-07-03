import { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Pencil, Trash2, Star, Plus, Eye, Check, X, Sparkles, EyeOff, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { PageHeader, StatusBadge, FilterBar, Panel, EmptyState, ActionBtn, Pagination } from '@/Components/Admin/AdminUI';

const isVideoUrl = (url) => /\.(mp4|mov|webm|avi|m4v)$/i.test(url || '');

const TABS = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

export default function Index({ testimonials, filters, counts, submissionUrl }) {
    const [search, setSearch] = useState(filters.search || '');

    const applyFilter = (next) => {
        router.get(route('admin.testimonials.index'), { ...filters, ...next }, { preserveState: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this testimonial?')) {
            router.delete(route('admin.testimonials.destroy', id));
        }
    };

    const handleApprove = (id) => {
        router.post(route('admin.testimonials.approve', id));
    };

    const handleReject = (id) => {
        const reason = window.prompt('Reason for rejection (optional):') || '';
        router.post(route('admin.testimonials.reject', id), { rejection_reason: reason });
    };

    const handleFeature = (id) => {
        router.post(route('admin.testimonials.feature', id));
    };

    const handleToggleStatus = (id) => {
        router.post(route('admin.testimonials.toggle-status', id));
    };

    const copyLink = () => {
        navigator.clipboard.writeText(submissionUrl);
        alert('Testimonial submission link copied!');
    };

    return (
        <AdminLayout title="Testimonials">
            <PageHeader
                title="Testimonials"
                subtitle="Manage customer testimonials shown on the public website."
                action={(
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={copyLink}
                            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy shadow-soft transition hover:bg-eco/60"
                        >
                            <LinkIcon className="size-4" /> Copy Submission Link
                        </button>
                        <a href={route('admin.testimonials.create')} className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark">
                            <Plus className="size-4" /> Add Testimonial
                        </a>
                    </div>
                )}
            />

            <div className="mb-4 flex gap-2 overflow-x-auto">
                {TABS.map((t) => (
                    <button
                        key={t.value}
                        type="button"
                        onClick={() => applyFilter({ tab: t.value })}
                        className={`whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                            (filters.tab || 'all') === t.value
                                ? 'bg-brand text-brand-foreground shadow-soft'
                                : 'border border-border bg-card text-muted-foreground hover:bg-eco/60'
                        }`}
                    >
                        {t.label} <span className="ml-1 opacity-70">({counts?.[t.value] ?? 0})</span>
                    </button>
                ))}
            </div>

            <FilterBar query={search} onQuery={(v) => { setSearch(v); applyFilter({ search: v }); }} placeholder="Search by customer or company name…" />

            <Panel className="p-0">
                {testimonials.data.length === 0 ? (
                    <div className="p-6">
                        <EmptyState icon={Star} title="No testimonials found" message="Add your first customer testimonial, or wait for customer submissions." />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Company</th>
                                    <th className="px-5 py-3">Rating</th>
                                    <th className="px-5 py-3">Media</th>
                                    <th className="px-5 py-3">Status</th>
                                    <th className="px-5 py-3">Submitted</th>
                                    <th className="px-5 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.data.map((t) => (
                                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-eco/40">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {t.image_url && !isVideoUrl(t.image_url) ? (
                                                    <img src={t.image_url} alt={t.customer_name} className="size-10 rounded-full border border-border object-cover" />
                                                ) : t.video_url ? (
                                                    <div className="grid size-10 place-items-center rounded-full bg-navy text-navy-foreground text-[10px] font-bold">▶</div>
                                                ) : (
                                                    <div className="grid size-10 place-items-center rounded-full bg-brand text-brand-foreground font-bold">{t.customer_name?.[0]}</div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-navy flex items-center gap-1">
                                                        {t.customer_name}
                                                        {t.is_featured && <Sparkles className="size-3.5 text-amber-500" />}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{t.designation}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-muted-foreground">{t.company_name}</td>
                                        <td className="px-5 py-3 text-navy">{'★'.repeat(t.rating)}</td>
                                        <td className="px-5 py-3 text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                <ImageIcon className="size-3.5" /> {t.media_count ?? 0}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                                        <td className="px-5 py-3 text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex justify-end gap-1">
                                                <ActionBtn icon={Eye} label="View" tone="brand" href={route('admin.testimonials.show', t.id)} />
                                                {t.status === 'pending' && (
                                                    <>
                                                        <ActionBtn icon={Check} label="Approve" tone="brand" onClick={() => handleApprove(t.id)} />
                                                        <ActionBtn icon={X} label="Reject" tone="danger" onClick={() => handleReject(t.id)} />
                                                    </>
                                                )}
                                                {t.status === 'approved' && (
                                                    <ActionBtn icon={t.is_active ? EyeOff : Eye} label={t.is_active ? 'Unpublish' : 'Publish'} tone="ghost" onClick={() => handleToggleStatus(t.id)} />
                                                )}
                                                <ActionBtn icon={Sparkles} label={t.is_featured ? 'Unfeature' : 'Mark Featured'} tone={t.is_featured ? 'brand' : 'ghost'} onClick={() => handleFeature(t.id)} />
                                                <ActionBtn icon={Pencil} label="Edit" tone="brand" href={route('admin.testimonials.edit', t.id)} />
                                                <ActionBtn icon={Trash2} label="Delete" tone="danger" onClick={() => handleDelete(t.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
            <Pagination links={testimonials.links} />
        </AdminLayout>
    );
}
