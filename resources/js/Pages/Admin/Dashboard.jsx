import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import {
    Truck, Clock, CheckCircle2, MessageSquare, FileText, Users, ArrowRight,
    IndianRupee, Wrench, Star, Award, Hourglass,
} from 'lucide-react';
import { PageHeader, StatCard, StatusBadge, Panel, EmptyState } from '@/Components/Admin/AdminUI';

const pendingModules = [
    { label: 'Scrap Rate Items', icon: IndianRupee, route: 'admin.scrap-rate.index' },
    { label: 'Active Services', icon: Wrench, route: 'admin.pages.index' },
    { label: 'Testimonials', icon: Star, route: 'admin.testimonials.index' },
    { label: 'Certificates', icon: Award, route: 'admin.certificates.index' },
];

export default function Dashboard({ stats, recentPickups, recentQueries }) {
    return (
        <AdminLayout title="Dashboard">
            <PageHeader title="Dashboard" subtitle="Overview of pickups, queries and website content." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Truck} label="Total Pickup Requests" value={stats.pickups_total} tone="brand" i={0} />
                <StatCard icon={Clock} label="Pending Pickups" value={stats.pickups_pending} tone="amber" i={1} />
                <StatCard icon={CheckCircle2} label="Completed Pickups" value={stats.pickups_completed} tone="blue" i={2} />
                <StatCard icon={MessageSquare} label="Contact Queries" value={stats.contact_queries} trend={stats.contact_queries_pending ? `${stats.contact_queries_pending} pending` : undefined} tone="rose" i={3} />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={FileText} label="Static Pages" value={stats.pages_count} tone="navy" i={4} />
                {stats.users_count !== null && (
                    <StatCard icon={Users} label="System Users" value={stats.users_count} tone="navy" i={5} />
                )}
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
                                        <p className="text-xs text-muted-foreground">{p.pickup_code} · {p.city?.name ?? '—'}</p>
                                    </div>
                                    <StatusBadge status={p.status} />
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
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">Backend integration pending</span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {pendingModules.map((m) => {
                        const Icon = m.icon;
                        return (
                            <Link
                                key={m.label}
                                href={route(m.route)}
                                className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-eco/40 p-4 transition hover:border-brand/40 hover:bg-eco/70"
                            >
                                <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                                    <Icon className="size-4.5" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-navy">{m.label}</p>
                                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Hourglass className="size-3" /> Not connected yet</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Panel>
        </AdminLayout>
    );
}
