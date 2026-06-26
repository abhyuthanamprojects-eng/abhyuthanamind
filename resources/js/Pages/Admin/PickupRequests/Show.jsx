import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, MapPin, Phone, Mail, Calendar, IndianRupee } from 'lucide-react';
import { PageHeader, StatusBadge, Panel } from '@/Components/Admin/AdminUI';

export default function Show({ pickup }) {
    return (
        <AdminLayout title={`Pickup ${pickup.pickup_code || pickup.id}`}>
            <Link href={route('admin.pickups.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Pickup Requests
            </Link>

            <PageHeader
                title={pickup.pickup_code || `Pickup #${pickup.id}`}
                subtitle={`Created ${new Date(pickup.created_at).toLocaleString()}`}
                action={<StatusBadge status={pickup.status} />}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Panel className="lg:col-span-2">
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
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</dt>
                            <dd className="mt-1 text-sm font-medium text-navy">{pickup.city?.name || '—'}</dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Address</dt>
                            <dd className="mt-1 flex items-start gap-1.5 text-sm font-medium text-navy"><MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" />{pickup.address || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pickup Date</dt>
                            <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-navy">
                                <Calendar className="size-3.5 text-brand" />
                                {pickup.scheduled_at ? new Date(pickup.scheduled_at).toLocaleString() : '—'}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Request Type</dt>
                            <dd className="mt-1 text-sm font-medium capitalize text-navy">{pickup.request_type?.replace(/_/g, ' ') || '—'}</dd>
                        </div>
                    </dl>

                    {pickup.items?.length > 0 && (
                        <>
                            <h3 className="mb-3 mt-6 text-base font-bold text-navy">Scrap Items</h3>
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
        </AdminLayout>
    );
}
