import { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowLeft, MapPin, Phone, Mail, Calendar, IndianRupee, Link as LinkIcon,
    Download, Award, Upload, Trash2, Clock, FileText, Eye, Recycle, ClipboardList,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, StatusBadge, Panel } from '@/Components/Admin/AdminUI';

const DOCUMENT_FIELDS = {
    form_6: {
        label: 'Form 6 — E-Waste Manifest',
        icon: FileText,
        availableFrom: 'pickup_done',
        fields: [
            ['sender_name', 'Sender Name'], ['sender_address', 'Sender Address'], ['sender_phone', 'Sender Phone'],
            ['sender_authorization_no', 'Sender Authorization No.'],
            ['transporter_name', 'Transporter Name'], ['transporter_address', 'Transporter Address'], ['transporter_phone', 'Transporter Phone'],
            ['vehicle_type', 'Vehicle Type'], ['transporter_registration_no', 'Transporter Registration No.'], ['vehicle_registration_no', 'Vehicle Registration No.'],
            ['receiver_authorization_no', 'Receiver Authorization No.'],
            ['ewaste_description', 'E-Waste Description (Item / Weight / Numbers)', 'textarea'],
            ['pickup_date', 'Pickup Date', 'date'],
        ],
    },
    form_2: {
        label: 'Form 2 — Recycling Certificate',
        icon: ClipboardList,
        availableFrom: 'segregation_completed',
        fields: [
            ['client_company_name', 'Client Company Name'], ['client_address', 'Client Address'],
            ['tax_invoice_number', 'Tax Invoice Number'], ['weight_kg', 'Weight (KG)', 'number'],
            ['vehicle_number', 'Vehicle Number'], ['manifest_number', 'Manifest Number'],
            ['date', 'Date', 'date'], ['registration_no', 'Registration No. (UPPCB)'], ['valid_till', 'Valid Till'],
            ['director_name', 'Director Name'], ['notes', 'Notes', 'textarea'],
        ],
    },
    green_certificate: {
        label: 'Green Certificate',
        icon: Award,
        availableFrom: 'segregation_completed',
        fields: [
            ['client_company_name', 'Client Company Name'], ['manifest_number', 'Manifest Number'],
            ['tax_invoice_number', 'Tax Invoice Number'], ['date', 'Date', 'date'],
            ['recycled_percentage', 'Recycled %', 'number'], ['refurbished_percentage', 'Refurbished %', 'number'],
            ['quantity', 'Quantity'], ['registration_no', 'Registration No. (UPPCB)'], ['director_name', 'Director Name'],
        ],
    },
};

function autoFillData(pickup) {
    const lead = pickup.metadata?.public_lead || {};
    const today = new Date().toISOString().slice(0, 10);
    const pickupDate = pickup.scheduled_at ? new Date(pickup.scheduled_at).toISOString().slice(0, 10) : '';
    const wasteDescription = [
        [lead.scrap_category, lead.selected_scrap_item].filter(Boolean).join(' — '),
        lead.approximate_quantity ? `Approx. ${lead.approximate_quantity}` : null,
        lead.description || null,
    ].filter(Boolean).join(' | ');

    // Chain values already entered on Form 6 (manifest/vehicle), so Form 2 / Green Certificate don't repeat data entry.
    const form6 = pickup.documents?.find((d) => d.document_type === 'form_6');
    const form6Data = form6?.generated_data || {};

    return {
        sender_name: pickup.customer_name || '',
        sender_address: pickup.address || '',
        sender_phone: pickup.customer_phone || '',
        client_company_name: pickup.customer_name || '',
        client_address: pickup.address || '',
        ewaste_description: wasteDescription,
        pickup_date: pickupDate,
        date: today,
        weight_kg: pickup.total_quantity || '',
        quantity: lead.approximate_quantity || '',
        recycled_percentage: pickup.recycled_percentage || '',
        refurbished_percentage: pickup.refurbished_percentage || '',
        manifest_number: form6?.document_number || '',
        vehicle_number: form6Data.vehicle_registration_no || '',
    };
}

function DocumentCard({ pickup, documentType, existing }) {
    const def = DOCUMENT_FIELDS[documentType];
    const Icon = def.icon;
    const [open, setOpen] = useState(false);
    const auto = autoFillData(pickup);

    const form = useForm({
        document_type: documentType,
        mode: 'generate',
        document_number: existing?.document_number || '',
        file: null,
        ...Object.fromEntries(def.fields.map(([key]) => [key, existing?.generated_data?.[key] || auto[key] || ''])),
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('admin.pickups.documents.store', pickup.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    const destroy = () => {
        if (!existing) return;
        if (!confirm(`Remove ${def.label}?`)) return;
        router.delete(route('admin.pickups.documents.destroy', [pickup.id, existing.id]), { preserveScroll: true });
    };

    return (
        <div className="rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-4" /></span>
                    <div>
                        <p className="text-sm font-bold text-navy">{def.label}</p>
                        {existing ? <StatusBadge status={existing.status} /> : <span className="text-xs text-muted-foreground">Not generated yet</span>}
                    </div>
                </div>
            </div>

            {existing && !open ? (
                <div className="mt-3 flex gap-2">
                    <a
                        href={route('admin.pickups.documents.preview', [pickup.id, existing.id])}
                        target="_blank" rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy transition hover:bg-eco"
                    >
                        <Eye className="size-3.5" /> Preview
                    </a>
                    <button onClick={() => setOpen(true)} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy transition hover:bg-eco">
                        <Upload className="size-3.5" /> Replace
                    </button>
                    <button onClick={destroy} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-2.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
                        <Trash2 className="size-3.5" />
                    </button>
                </div>
            ) : !open ? (
                <button onClick={() => setOpen(true)} className="mt-3 w-full rounded-xl border border-dashed border-border px-3 py-2 text-xs font-semibold text-brand transition hover:bg-eco">
                    Generate / Upload
                </button>
            ) : (
                <form onSubmit={submit} className="mt-3 space-y-2.5">
                    <div className="flex gap-2 text-xs font-semibold">
                        <button type="button" onClick={() => form.setData('mode', 'generate')} className={`flex-1 rounded-xl px-3 py-1.5 ${form.data.mode === 'generate' ? 'bg-brand text-brand-foreground' : 'border border-border text-navy'}`}>Generate</button>
                        <button type="button" onClick={() => form.setData('mode', 'upload')} className={`flex-1 rounded-xl px-3 py-1.5 ${form.data.mode === 'upload' ? 'bg-brand text-brand-foreground' : 'border border-border text-navy'}`}>Upload File</button>
                    </div>

                    <input
                        value={form.data.document_number}
                        onChange={(e) => form.setData('document_number', e.target.value)}
                        placeholder="Document / Reference Number"
                        className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />

                    {form.data.mode === 'upload' && (
                        <input
                            type="file" accept=".pdf,.jpg,.jpeg,.png,.docx"
                            onChange={(e) => form.setData('file', e.target.files[0])}
                            className="w-full rounded-xl border border-dashed border-border bg-card px-3 py-2 text-xs"
                        />
                    )}

                    {form.data.mode === 'generate' && def.fields.map(([key, label, type]) => (
                        type === 'textarea' ? (
                            <textarea
                                key={key}
                                value={form.data[key]}
                                onChange={(e) => form.setData(key, e.target.value)}
                                placeholder={label}
                                rows={2}
                                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                            />
                        ) : (
                            <input
                                key={key}
                                type={type || 'text'}
                                value={form.data[key]}
                                onChange={(e) => form.setData(key, e.target.value)}
                                placeholder={label}
                                className="h-9 w-full rounded-xl border border-border bg-card px-3 text-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                            />
                        )
                    ))}

                    <div className="flex gap-2">
                        <button type="submit" disabled={form.processing} className="flex-1 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {form.processing ? 'Saving…' : 'Save Document'}
                        </button>
                        <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-navy transition hover:bg-muted">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default function Show({ pickup, statusOptions }) {
    const statusForm = useForm({
        tracking_status: pickup.tracking_status || 'pending',
        note: '',
        public_note: pickup.public_notes || '',
    });

    const processingForm = useForm({
        total_quantity: pickup.total_quantity || '',
        recycled_percentage: pickup.recycled_percentage || '',
        refurbished_percentage: pickup.refurbished_percentage || '',
        disposed_percentage: pickup.disposed_percentage || '',
        recycled_quantity: pickup.recycled_quantity || '',
        refurbished_quantity: pickup.refurbished_quantity || '',
        processing_notes: pickup.processing_notes || '',
    });

    const submitStatus = (e) => {
        e.preventDefault();
        statusForm.post(route('admin.pickups.update-status', pickup.id), {
            preserveScroll: true,
            onSuccess: () => statusForm.setData('note', ''),
        });
    };

    const submitProcessing = (e) => {
        e.preventDefault();
        processingForm.patch(route('admin.pickups.material-processing', pickup.id), {
            preserveScroll: true,
        });
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

                    <Panel>
                        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-navy">
                            <Recycle className="size-4 text-brand" /> Material Processing
                        </h3>
                        <form onSubmit={submitProcessing} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total Quantity (kg)</label>
                                    <input type="number" step="0.01" min="0" value={processingForm.data.total_quantity} onChange={(e) => processingForm.setData('total_quantity', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recycled %</label>
                                    <input type="number" step="0.01" min="0" max="100" value={processingForm.data.recycled_percentage} onChange={(e) => processingForm.setData('recycled_percentage', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Refurbished %</label>
                                    <input type="number" step="0.01" min="0" max="100" value={processingForm.data.refurbished_percentage} onChange={(e) => processingForm.setData('refurbished_percentage', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Disposed / Other %</label>
                                    <input type="number" step="0.01" min="0" max="100" value={processingForm.data.disposed_percentage} onChange={(e) => processingForm.setData('disposed_percentage', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recycled Qty (kg)</label>
                                    <input type="number" step="0.01" min="0" value={processingForm.data.recycled_quantity} onChange={(e) => processingForm.setData('recycled_quantity', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Refurbished Qty (kg)</label>
                                    <input type="number" step="0.01" min="0" value={processingForm.data.refurbished_quantity} onChange={(e) => processingForm.setData('refurbished_quantity', e.target.value)}
                                        className="h-10 w-full rounded-2xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Processing Notes</label>
                                <textarea rows={2} value={processingForm.data.processing_notes} onChange={(e) => processingForm.setData('processing_notes', e.target.value)}
                                    className="w-full rounded-2xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
                            </div>
                            {processingForm.errors.recycled_percentage && (
                                <p className="text-xs font-medium text-rose-600">{processingForm.errors.recycled_percentage}</p>
                            )}
                            <button type="submit" disabled={processingForm.processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                                {processingForm.processing ? 'Saving…' : 'Save Material Processing'}
                            </button>
                        </form>
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
                            <Award className="size-4 text-brand" /> Documents / Certificates
                        </h3>
                        <div className="space-y-3">
                            {Object.keys(DOCUMENT_FIELDS).map((type) => (
                                <DocumentCard
                                    key={type}
                                    pickup={pickup}
                                    documentType={type}
                                    existing={pickup.documents?.find((d) => d.document_type === type)}
                                />
                            ))}
                        </div>
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
                        </div>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
