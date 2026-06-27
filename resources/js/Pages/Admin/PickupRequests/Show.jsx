import { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft, MapPin, Phone, Mail, Calendar, IndianRupee, Link as LinkIcon,
    Download, Award, Upload, Trash2, Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, StatusBadge, Panel } from '@/Components/Admin/AdminUI';

export default function Show({ pickup, statusOptions }) {
    const [showCertForm, setShowCertForm] = useState(false);

    const statusForm = useForm({
        tracking_status: pickup.tracking_status || 'pending',
        note: '',
        public_note: pickup.public_notes || '',
    });

    const certForm = useForm({
        certificate_file: null,
        certificate_number: pickup.certificate?.certificate_number || '',
        issued_at: pickup.certificate?.issued_at || '',
        notes: pickup.certificate?.notes || '',
    });

    const submitStatus = (e) => {
        e.preventDefault();
        statusForm.post(route('admin.pickups.update-status', pickup.id), {
            preserveScroll: true,
            onSuccess: () => statusForm.setData('note', ''),
        });
    };

    const submitCertificate = (e) => {
        e.preventDefault();
        certForm.post(route('admin.pickups.certificate.upload', pickup.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => setShowCertForm(false),
        });
    };

    const removeCertificate = () => {
        if (!confirm('Remove this certificate?')) return;
        router.delete(route('admin.pickups.certificate.destroy', pickup.id), { preserveScroll: true });
    };

    const copyTrackingLink = () => {
        if (!pickup.tracking_url) {
            toast.error('No tracking link available.');
            return;
        }
        navigator.clipboard.writeText(pickup.tracking_url);
        toast.success('Tracking link copied.');
    };

    const lead = pickup.metadata?.public_lead;

    return (
        <AdminLayout title={`Pickup ${pickup.booking_id || pickup.pickup_code || pickup.id}`}>
            <Link href={route('admin.pickups.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Pickup Requests
            </Link>

            <PageHeader
                title={pickup.booking_id || pickup.pickup_code || `Pickup #${pickup.id}`}
                subtitle={`Submitted ${new Date(pickup.created_at).toLocaleString()}`}
                action={<StatusBadge status={pickup.tracking_status} />}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Customer Details</h3>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{pickup.customer_name || pickup.customer?.name || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mobile</dt>
                                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy"><Phone className="size-3.5 text-brand" />{pickup.customer_phone || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</dt>
                                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy"><Mail className="size-3.5 text-brand" />{pickup.customer_email || pickup.customer?.email || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Company</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.company_name || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{pickup.city?.name || lead?.city || '—'}</dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Address</dt>
                                <dd className="mt-1 flex items-start gap-1.5 text-sm font-medium text-navy"><MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" />{pickup.address || '—'}</dd>
                            </div>
                        </dl>
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Pickup Details</h3>
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Scrap Category</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.scrap_category || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected Item</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.selected_scrap_item || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Approx. Quantity</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.approximate_quantity || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Date</dt>
                                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy">
                                    <Calendar className="size-3.5 text-brand" />
                                    {pickup.scheduled_at ? new Date(pickup.scheduled_at).toLocaleString() : '—'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Preferred Contact</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.preferred_contact_method || '—'}</dd>
                            </div>
                            <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Customer Type</dt>
                                <dd className="mt-1 text-sm font-medium text-navy">{lead?.customer_type || '—'}</dd>
                            </div>
                            {lead?.description && (
                                <div className="sm:col-span-2">
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description / Scrap Details</dt>
                                    <dd className="mt-1 text-sm font-medium text-navy">{lead.description}</dd>
                                </div>
                            )}
                        </dl>

                        {pickup.items?.length > 0 && (
                            <>
                                <h4 className="mb-3 mt-6 text-sm font-bold text-navy">Scrap Items</h4>
                                <ul className="space-y-2">
                                    {pickup.items.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between rounded-2xl border border-border px-4 py-2.5 text-sm">
                                            <div>
                                                <span className="font-medium text-navy">{item.product_name}</span>
                                                {item.condition && <span className="ml-2 text-xs capitalize text-muted-foreground">({item.condition})</span>}
                                            </div>
                                            <span className="text-muted-foreground">
                                                {item.quantity ? `${item.quantity} qty` : ''}{item.weight ? ` · ${item.weight} kg` : ''}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {pickup.reschedule_reason && (
                            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                                <span className="font-semibold">Reschedule note: </span>{pickup.reschedule_reason}
                            </div>
                        )}
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Update Status</h3>
                        <form onSubmit={submitStatus} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</label>
                                    <select
                                        value={statusForm.data.tracking_status}
                                        onChange={(e) => statusForm.setData('tracking_status', e.target.value)}
                                        className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm font-medium text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    >
                                        {Object.entries(statusOptions).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Internal Note (admin only)</label>
                                    <input
                                        value={statusForm.data.note}
                                        onChange={(e) => statusForm.setData('note', e.target.value)}
                                        placeholder="Optional note for this update"
                                        className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Public Note (visible to customer on tracking page)</label>
                                <textarea
                                    value={statusForm.data.public_note}
                                    onChange={(e) => statusForm.setData('public_note', e.target.value)}
                                    rows={2}
                                    placeholder="Optional message shown to the customer"
                                    className="w-full rounded-2xl border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={statusForm.processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                            >
                                {statusForm.processing ? 'Updating…' : 'Update Status'}
                            </button>
                        </form>

                        {pickup.status_histories?.length > 0 && (
                            <div className="mt-6 border-t border-border pt-5">
                                <h4 className="mb-3 text-sm font-bold text-navy">Status Timeline</h4>
                                <ul className="space-y-3">
                                    {[...pickup.status_histories].reverse().map((h) => (
                                        <li key={h.id} className="flex items-start gap-3">
                                            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                                                <Clock className="size-3.5" />
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-navy">{statusOptions[h.status] || h.status}</p>
                                                {h.note && <p className="text-xs text-muted-foreground">{h.note}</p>}
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(h.created_at).toLocaleString()}{h.changed_by?.name ? ` · ${h.changed_by.name}` : ''}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Panel>
                </div>

                <div className="space-y-6">
                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Booking Summary</h3>
                        <dl className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <dt className="text-muted-foreground">Booking ID</dt>
                                <dd className="font-semibold text-navy">{pickup.booking_id || '—'}</dd>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <dt className="text-muted-foreground">Submitted</dt>
                                <dd className="font-medium text-navy">{new Date(pickup.created_at).toLocaleDateString()}</dd>
                            </div>
                        </dl>
                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                onClick={copyTrackingLink}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-eco"
                            >
                                <LinkIcon className="size-4" /> Copy Tracking Link
                            </button>
                            {pickup.tracking_url && (
                                <a
                                    href={`${pickup.tracking_url}/download`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-eco"
                                >
                                    <Download className="size-4" /> Download Details
                                </a>
                            )}
                        </div>
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy">
                            <Award className="size-4 text-brand" /> Certificate
                        </h3>

                        {pickup.certificate && !showCertForm ? (
                            <div className="space-y-3">
                                <dl className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Number</dt>
                                        <dd className="font-medium text-navy">{pickup.certificate.certificate_number || '—'}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Issued</dt>
                                        <dd className="font-medium text-navy">{pickup.certificate.issued_at ? new Date(pickup.certificate.issued_at).toLocaleDateString() : '—'}</dd>
                                    </div>
                                </dl>
                                <div className="flex gap-2">
                                    <a
                                        href={pickup.certificate.file_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-eco"
                                    >
                                        <Download className="size-4" /> View
                                    </a>
                                    <button
                                        onClick={() => setShowCertForm(true)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-eco"
                                    >
                                        <Upload className="size-4" /> Replace
                                    </button>
                                    <button
                                        onClick={removeCertificate}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={submitCertificate} className="space-y-3">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => certForm.setData('certificate_file', e.target.files[0])}
                                    className="w-full rounded-2xl border border-dashed border-border bg-card px-3 py-2.5 text-sm"
                                />
                                <input
                                    value={certForm.data.certificate_number}
                                    onChange={(e) => certForm.setData('certificate_number', e.target.value)}
                                    placeholder="Certificate number (optional)"
                                    className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                                <input
                                    type="date"
                                    value={certForm.data.issued_at}
                                    onChange={(e) => certForm.setData('issued_at', e.target.value)}
                                    className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                                <textarea
                                    value={certForm.data.notes}
                                    onChange={(e) => certForm.setData('notes', e.target.value)}
                                    placeholder="Notes (optional)"
                                    rows={2}
                                    className="w-full rounded-2xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={certForm.processing || !certForm.data.certificate_file}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                                    >
                                        {certForm.processing ? 'Uploading…' : 'Upload Certificate'}
                                    </button>
                                    {pickup.certificate && (
                                        <button
                                            type="button"
                                            onClick={() => setShowCertForm(false)}
                                            className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-eco"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                                {pickup.tracking_status !== 'completed' && (
                                    <p className="text-xs text-muted-foreground">Certificate is usually uploaded after marking the request as Completed.</p>
                                )}
                            </form>
                        )}
                    </Panel>

                    <Panel>
                        <h3 className="mb-4 text-base font-bold text-navy">Amount</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Estimated</span>
                                <span className="flex items-center font-semibold text-navy"><IndianRupee className="size-3.5" />{pickup.estimated_amount ?? '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Final</span>
                                <span className="flex items-center font-semibold text-navy"><IndianRupee className="size-3.5" />{pickup.final_amount ?? '—'}</span>
                            </div>
                            {pickup.warehouse && (
                                <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                                    <span className="text-muted-foreground">Warehouse</span>
                                    <span className="font-semibold text-navy">{pickup.warehouse.name}</span>
                                </div>
                            )}
                        </div>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
