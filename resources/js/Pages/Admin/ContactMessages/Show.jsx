import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { PageHeader, StatusBadge, Panel } from '@/Components/Admin/AdminUI';

export default function Show({ message }) {
    const { patch, processing } = useForm({
        status: message.status === 'pending' ? 'resolved' : 'pending',
    });

    const toggleStatus = () => {
        patch(route('admin.contacts.update-status', message.id));
    };

    const destroy = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('admin.contacts.destroy', message.id));
        }
    };

    return (
        <AdminLayout title="Contact Query Details">
            <a href={route('admin.contacts.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Contact Queries
            </a>

            <PageHeader title={message.subject || 'No Subject'} subtitle={`#${message.id} · Received ${new Date(message.created_at).toLocaleString()}`} action={<StatusBadge status={message.status} />} />

            <Panel className="max-w-3xl">
                <div className="grid grid-cols-1 gap-6 border-b border-border pb-6 sm:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Sender Information</h3>
                        <p className="text-base font-semibold text-navy">{message.name}</p>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                        <p className="text-sm text-muted-foreground">{message.phone || 'No phone provided'}</p>
                        {message.user_role && (
                            <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">{message.user_role}</span>
                        )}
                        {message.user && (
                            <p className="mt-1 text-xs text-muted-foreground">User #{message.user.id} ({message.user.phone})</p>
                        )}
                    </div>
                    <div>
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Message Metadata</h3>
                        <p className="text-sm text-muted-foreground">Type: <span className="font-medium capitalize text-navy">{message.type || 'general'}</span></p>
                        {message.pickup_request_id && (
                            <p className="text-sm text-muted-foreground">
                                Order: <span className="font-medium text-navy">#{message.pickup_request_id}{message.pickup_request?.pickup_code && ` (${message.pickup_request.pickup_code})`}</span>
                            </p>
                        )}
                        <p className="text-sm text-muted-foreground">ID: #{message.id}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</h3>
                    <div className="whitespace-pre-wrap rounded-2xl border border-border bg-eco/40 p-4 text-sm text-navy">{message.message}</div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={destroy}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                        <Trash2 className="size-4" /> Delete
                    </button>
                    <button
                        onClick={toggleStatus}
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                    >
                        Mark as {message.status === 'pending' ? 'Resolved' : 'Pending'}
                    </button>
                </div>
            </Panel>
        </AdminLayout>
    );
}
