import { useState } from 'react';
import { router, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { toast } from 'sonner';
import {
    ArrowLeft, Phone, Mail, MapPin, Building2, Package, Calendar, Clock,
    CheckCircle2, XCircle, Trash2, ExternalLink, IndianRupee,
} from 'lucide-react';
import { PageHeader, Panel, StatusBadge } from '@/Components/Admin/AdminUI';

export default function Show({ query: q, statusOptions }) {
    const [showReject, setShowReject] = useState(false);
    const isConverted = q.status === 'converted';
    const isRejected = q.status === 'rejected';

    const negotiationForm = useForm({
        negotiation_notes: q.negotiation_notes || '',
        quoted_amount: q.quoted_amount || '',
        final_amount: q.final_amount || '',
        status: q.status,
    });

    const acceptForm = useForm({ final_amount: q.final_amount || q.quoted_amount || '' });
    const rejectForm = useForm({ negotiation_notes: q.negotiation_notes || '' });

    const saveNegotiation = (e) => {
        e.preventDefault();
        negotiationForm.patch(route('admin.pickup-queries.update', q.id), {
            onSuccess: () => toast.success('Saved.'),
        });
    };

    const accept = (e) => {
        e.preventDefault();
        if (!confirm('Convert this query into a real pickup request? This will generate a booking ID and tracking link.')) return;
        acceptForm.post(route('admin.pickup-queries.accept', q.id));
    };

    const reject = (e) => {
        e.preventDefault();
        rejectForm.post(route('admin.pickup-queries.reject', q.id), {
            onSuccess: () => { setShowReject(false); toast.success('Query rejected.'); },
        });
    };

    const destroy = () => {
        if (confirm('Delete this pickup query permanently?')) {
            router.delete(route('admin.pickup-queries.destroy', q.id));
        }
    };

    return (
        <AdminLayout title={`Pickup Query · ${q.query_id}`}>
            <PageHeader
                title={q.query_id}
                subtitle="Pickup enquiry detail"
                action={(
                    <Link href={route('admin.pickup-queries.index')} className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy shadow-soft transition hover:bg-eco/60">
                        <ArrowLeft className="size-4" /> Back to Pickup Queries
                    </Link>
                )}
            />

            {isConverted && q.converted_pickup_request && (
                <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-brand/30 bg-accent p-5 text-accent-foreground">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5" />
                        <p className="text-sm font-semibold">
                            Converted to pickup request <span className="font-extrabold">{q.converted_pickup_request.booking_id}</span>
                            {q.converted_by && <> by {q.converted_by.name}</>}
                        </p>
                    </div>
                    <Link href={route('admin.pickups.show', q.converted_pickup_request_id)} className="inline-flex items-center gap-1.5 rounded-2xl bg-card px-4 py-2 text-sm font-semibold text-navy shadow-soft hover:bg-eco/60">
                        View Pickup Request <ExternalLink className="size-3.5" />
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Panel>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-navy">{q.full_name}</h3>
                                <p className="text-sm text-muted-foreground">{q.customer_type}</p>
                            </div>
                            <StatusBadge status={q.status} />
                        </div>
                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                            <p className="flex items-center gap-2 text-navy"><Phone className="size-4 text-brand" />{q.mobile_number}</p>
                            {q.email && <p className="flex items-center gap-2 text-navy"><Mail className="size-4 text-brand" />{q.email}</p>}
                            {q.company_name && <p className="flex items-center gap-2 text-navy"><Building2 className="size-4 text-brand" />{q.company_name}</p>}
                            <p className="flex items-center gap-2 text-navy"><MapPin className="size-4 text-brand" />{q.city}</p>
                        </div>
                        <div className="mt-4 rounded-2xl bg-eco/60 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Pickup Address</p>
                            <p className="mt-1 text-sm text-navy">{q.pickup_address}</p>
                        </div>
                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                            <p className="flex items-center gap-2 text-navy"><Package className="size-4 text-brand" />{q.scrap_category}</p>
                            {q.approximate_quantity && <p className="text-muted-foreground">Qty: {q.approximate_quantity}</p>}
                            {q.preferred_contact_method && <p className="text-muted-foreground">Contact via: {q.preferred_contact_method}</p>}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Calendar className="size-4 text-brand" />{new Date(q.preferred_pickup_date).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1.5"><Clock className="size-4 text-brand" />{q.preferred_pickup_time}</span>
                        </div>
                        {q.description && (
                            <div className="mt-4 rounded-2xl border border-border p-4">
                                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Description</p>
                                <p className="mt-1 text-sm text-navy">{q.description}</p>
                            </div>
                        )}
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Negotiation</h3>
                        <form onSubmit={saveNegotiation} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-navy">Negotiation Notes</label>
                                <textarea
                                    rows={3}
                                    value={negotiationForm.data.negotiation_notes}
                                    onChange={(e) => negotiationForm.setData('negotiation_notes', e.target.value)}
                                    className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    placeholder="Internal notes about price/quantity discussion with the customer…"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-navy">Quoted Amount</label>
                                    <div className="relative">
                                        <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="number" step="0.01" min="0"
                                            value={negotiationForm.data.quoted_amount}
                                            onChange={(e) => negotiationForm.setData('quoted_amount', e.target.value)}
                                            className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-navy">Final Amount</label>
                                    <div className="relative">
                                        <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="number" step="0.01" min="0"
                                            value={negotiationForm.data.final_amount}
                                            onChange={(e) => negotiationForm.setData('final_amount', e.target.value)}
                                            className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-navy">Status</label>
                                <select
                                    value={negotiationForm.data.status}
                                    onChange={(e) => negotiationForm.setData('status', e.target.value)}
                                    disabled={isConverted}
                                    className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm font-medium text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
                                >
                                    {Object.entries(statusOptions).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={negotiationForm.processing || isConverted}
                                className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                            >
                                Save Negotiation
                            </button>
                        </form>
                    </Panel>
                </div>

                <div className="space-y-6 lg:col-span-1">
                    {!isConverted && !isRejected && (
                        <Panel>
                            <h3 className="mb-4 text-base font-bold text-navy">Decision</h3>
                            <form onSubmit={accept} className="space-y-3">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-navy">Final Amount (optional)</label>
                                    <div className="relative">
                                        <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <input
                                            type="number" step="0.01" min="0"
                                            value={acceptForm.data.final_amount}
                                            onChange={(e) => acceptForm.setData('final_amount', e.target.value)}
                                            className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={acceptForm.processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                                >
                                    <CheckCircle2 className="size-4" /> Accept &amp; Create Pickup Request
                                </button>
                            </form>

                            {!showReject ? (
                                <button
                                    type="button"
                                    onClick={() => setShowReject(true)}
                                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                                >
                                    <XCircle className="size-4" /> Reject Query
                                </button>
                            ) : (
                                <form onSubmit={reject} className="mt-3 space-y-2">
                                    <textarea
                                        rows={2}
                                        value={rejectForm.data.negotiation_notes}
                                        onChange={(e) => rejectForm.setData('negotiation_notes', e.target.value)}
                                        placeholder="Reason for rejection (optional)…"
                                        className="w-full rounded-2xl border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit" disabled={rejectForm.processing} className="flex-1 rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60">
                                            Confirm Reject
                                        </button>
                                        <button type="button" onClick={() => setShowReject(false)} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Panel>
                    )}

                    <Panel>
                        <h3 className="mb-3 text-base font-bold text-navy">Details</h3>
                        <dl className="space-y-2.5 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Submitted</dt>
                                <dd className="font-medium text-navy">{new Date(q.created_at).toLocaleString()}</dd>
                            </div>
                            {q.converted_at && (
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Converted</dt>
                                    <dd className="font-medium text-navy">{new Date(q.converted_at).toLocaleString()}</dd>
                                </div>
                            )}
                        </dl>
                        <button
                            type="button"
                            onClick={destroy}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                            <Trash2 className="size-4" /> Delete Query
                        </button>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
