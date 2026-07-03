import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ certificate = null }) {
    const isEditing = !!certificate;

    const { data, setData, post, processing, errors } = useForm({
        name: certificate?.name || '',
        certificate_type: certificate?.certificate_type || '',
        issue_date: certificate?.issue_date ? certificate.issue_date.substring(0, 10) : '',
        expiry_date: certificate?.expiry_date ? certificate.expiry_date.substring(0, 10) : '',
        show_on_website: certificate?.show_on_website ?? true,
        is_active: certificate?.is_active ?? true,
        file: null,
        _method: isEditing ? 'put' : 'post',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? route('admin.certificates.update', certificate.id) : route('admin.certificates.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Certificate' : 'Add Certificate'}>
            <a href={route('admin.certificates.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Certificates
            </a>

            <PageHeader title={isEditing ? `Edit: ${certificate.name}` : 'Add New Certificate'} />

            <Panel className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className={labelClass}>Certificate Name</label>
                        <input className={inputClass} value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                        {errors.name && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Type (e.g. R2, CPCB, SPCB)</label>
                        <input className={inputClass} value={data.certificate_type} onChange={(e) => setData('certificate_type', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Issue Date</label>
                            <input type="date" className={inputClass} value={data.issue_date} onChange={(e) => setData('issue_date', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>Expiry Date</label>
                            <input type="date" className={inputClass} value={data.expiry_date} onChange={(e) => setData('expiry_date', e.target.value)} />
                            {errors.expiry_date && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.expiry_date}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>File (Image or PDF)</label>
                        {certificate?.file_url && !data.file && (
                            <a href={certificate.file_url} target="_blank" rel="noreferrer" className="mb-2 block text-xs font-medium text-brand underline">View current file</a>
                        )}
                        <input type="file" accept="image/*,.pdf" className={inputClass} onChange={(e) => setData('file', e.target.files[0])} required={!isEditing} />
                        {errors.file && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.file}</p>}
                    </div>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.show_on_website} onChange={(e) => setData('show_on_website', e.target.checked)} />
                        Display on public website
                    </label>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        Active
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.certificates.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Certificate' : 'Create Certificate'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
