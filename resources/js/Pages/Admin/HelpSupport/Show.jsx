import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { cn } from '@/lib/utils';

const statusTones = {
    pending: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-violet-100 text-violet-700',
    resolved: 'bg-accent text-accent-foreground',
    closed: 'bg-muted text-muted-foreground',
};

export default function Show({ ticket }) {
    const { data, setData, post, processing } = useForm({ status: ticket.status });

    const updateStatus = (newStatus) => {
        setData('status', newStatus);
        post(route('admin.help-support.update-status', ticket.id), { preserveScroll: true });
    };

    return (
        <AdminLayout title="Ticket Detail">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <a href={route('admin.help-support.index')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                    <ArrowLeft className="size-4" /> Back to tickets
                </a>
                <div className="flex flex-wrap gap-2">
                    {['pending', 'in_progress', 'resolved', 'closed'].map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => updateStatus(s)}
                            disabled={processing || data.status === s}
                            className={cn(
                                'rounded-2xl px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition disabled:cursor-default',
                                data.status === s ? statusTones[s] : 'border border-border bg-card text-muted-foreground hover:bg-muted',
                            )}
                        >
                            {s.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <PageHeader title={ticket.subject || 'No Subject'} subtitle={new Date(ticket.created_at).toLocaleString()} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <Panel>
                        <div className="whitespace-pre-wrap rounded-2xl border border-border bg-eco/40 p-4 text-sm text-navy">{ticket.message}</div>
                    </Panel>

                    {ticket.pickup_request && (
                        <Panel className="border-sky-200 bg-sky-50/50">
                            <h3 className="mb-3 text-sm font-bold text-sky-800">Related Order Context</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Order ID</p>
                                    <p className="mt-1 font-semibold text-navy">#{ticket.pickup_request_id}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Type</p>
                                    <p className="mt-1 font-semibold capitalize text-navy">{ticket.pickup_request.request_type?.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Order Status</p>
                                    <p className="mt-1 font-semibold capitalize text-navy">{ticket.pickup_request.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Scheduled At</p>
                                    <p className="mt-1 font-semibold text-navy">{ticket.pickup_request.scheduled_at ? new Date(ticket.pickup_request.scheduled_at).toLocaleDateString() : '—'}</p>
                                </div>
                            </div>
                        </Panel>
                    )}
                </div>

                <Panel>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">User Details</h3>
                    <div className="mb-4 flex items-center gap-3">
                        <span className="grid size-12 place-items-center rounded-full bg-brand text-base font-bold text-brand-foreground">
                            {ticket.name?.charAt(0) || 'U'}
                        </span>
                        <div>
                            <p className="font-semibold text-navy">{ticket.name || ticket.user?.name}</p>
                            <p className="text-xs capitalize text-muted-foreground">{ticket.user_role || 'Visitor'}</p>
                        </div>
                    </div>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</p>
                            <p className="mt-1 text-navy">{ticket.email || ticket.user?.email || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone</p>
                            <p className="mt-1 text-navy">{ticket.phone || ticket.user?.phone || 'N/A'}</p>
                        </div>
                    </div>
                </Panel>
            </div>
        </AdminLayout>
    );
}
