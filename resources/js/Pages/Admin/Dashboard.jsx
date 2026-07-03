import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    Truck, Clock, CheckCircle2, MessageSquare, ArrowRight,
    IndianRupee, Wrench, Star, Award, Image as ImageIcon,
} from 'lucide-react';
import { PageHeader, StatCard, StatusBadge, Panel, EmptyState } from '@/Components/Admin/AdminUI';

const contentIcons = {
    'Scrap Rate Items': IndianRupee,
    'Active Services': Wrench,
    Testimonials: Star,
    Certificates: Award,
    'Media / Gallery': ImageIcon,
};

export default function Dashboard({ stats, contentHealth = [], recentPickups, recentQueries }) {
    return (
        <AdminLayout title="Dashboard">
            <PageHeader title="Dashboard" subtitle="Overview of pickups, queries and website content." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Truck} label="Total Pickup Requests" value={stats.pickups_total} tone="brand" i={0} />
                <StatCard icon={Clock} label="Pending Pickups" value={stats.pickups_pending} tone="amber" i={1} />
                <StatCard icon={CheckCircle2} label="Completed Pickups" value={stats.pickups_completed} tone="blue" i={2} />
                <StatCard icon={MessageSquare} label="Contact Queries" value={stats.contact_queries} trend={stats.contact_queries_pending ? `${stats.contact_queries_pending} pending` : undefined} tone="rose" i={3} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Panel>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-bold text-navy">Recent Pickup Requests</h3>
                        <Link href={route('admin.pickups.index')} className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                            View all <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                    {recentPickups.length === 0 ? (
                        <EmptyState icon={Truck} title="No pickup requests yet" message="New pickup requests will show up here as customers book them." />
                    ) : (
                        <ul className="space-y-3">
                            {recentPickups.map((p) => (
                                <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-navy">{p.customer_name || 'Unknown'}</p>
                                        <p className="text-xs text-muted-foreground">{p.booking_id || p.pickup_code} · {p.city?.name ?? '—'}</p>
                                    </div>
                                    <StatusBadge status={p.tracking_status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>

                <Panel>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-base font-bold text-navy">Recent Contact Queries</h3>
                        <Link href={route('admin.contacts.index')} className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
                            View all <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                    {recentQueries.length === 0 ? (
                        <EmptyState icon={MessageSquare} title="No contact queries yet" message="Messages submitted from the website contact form will show up here." />
                    ) : (
                        <ul className="space-y-3">
                            {recentQueries.map((q) => (
                                <li key={q.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-navy">{q.name}</p>
                                        <p className="truncate text-xs text-muted-foreground">{q.subject || q.email}</p>
                                    </div>
                                    <StatusBadge status={q.status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </Panel>
            </div>

            <Panel className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-navy">Website Content Health</h3>
                    <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">Live</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {contentHealth.map((m) => {
                        const Icon = contentIcons[m.label] ?? Star;
                        return (
                            <Link
                                key={m.label}
                                href={route(m.route)}
                                className="flex items-center gap-3 rounded-2xl border border-border bg-eco/40 p-4 transition hover:border-brand/40 hover:bg-eco/70"
                            >
                                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                                    <Icon className="size-4.5" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-navy">{m.label}</p>
                                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <CheckCircle2 className="size-3 text-brand" /> {m.count} total{m.active !== m.count ? ` · ${m.active} active` : ''}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Panel>
        </AdminLayout>
    );
}
