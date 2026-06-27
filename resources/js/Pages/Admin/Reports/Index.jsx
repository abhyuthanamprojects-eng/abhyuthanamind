import AdminLayout from '@/Layouts/AdminLayout';
import { Truck, MessageSquare, IndianRupee, Tags } from 'lucide-react';
import { PageHeader, Panel, MiniBars, EmptyState } from '@/Components/Admin/AdminUI';

export default function Index({ monthlyPickups, revenueTrend, scrapCategoryMix, leadConversion }) {
    const maxCategory = Math.max(...scrapCategoryMix.map((c) => c.count), 1);

    return (
        <AdminLayout title="Reports / Analytics">
            <PageHeader title="Reports / Analytics" subtitle="Pickup volume, lead conversion and scrap category analytics — last 6 months." />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Panel>
                    <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                            <Truck className="size-5" />
                        </span>
                        <div>
                            <p className="text-2xl font-extrabold text-navy">{leadConversion.pickups_rate}%</p>
                            <p className="text-sm text-muted-foreground">Pickup conversion · {leadConversion.pickups_completed} of {leadConversion.pickups_total} completed</p>
                        </div>
                    </div>
                </Panel>
                <Panel>
                    <div className="flex items-center gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                            <MessageSquare className="size-5" />
                        </span>
                        <div>
                            <p className="text-2xl font-extrabold text-navy">{leadConversion.contacts_rate}%</p>
                            <p className="text-sm text-muted-foreground">Enquiry resolution · {leadConversion.contacts_resolved} of {leadConversion.contacts_total} resolved</p>
                        </div>
                    </div>
                </Panel>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Panel>
                    <h3 className="mb-4 text-base font-bold text-navy">Monthly Pickups</h3>
                    {monthlyPickups.every((d) => d.v === 0) ? (
                        <EmptyState icon={Truck} title="No pickups yet" message="Pickup volume by month will appear here once requests start coming in." />
                    ) : (
                        <MiniBars data={monthlyPickups} />
                    )}
                </Panel>

                <Panel>
                    <h3 className="mb-4 text-base font-bold text-navy">Revenue Trend</h3>
                    {revenueTrend.every((d) => d.v === 0) ? (
                        <EmptyState icon={IndianRupee} title="No revenue yet" message="Revenue from completed pickups by month will appear here." />
                    ) : (
                        <MiniBars data={revenueTrend} />
                    )}
                </Panel>
            </div>

            <Panel className="mt-6">
                <h3 className="mb-4 text-base font-bold text-navy">Scrap Category Mix</h3>
                {scrapCategoryMix.length === 0 ? (
                    <EmptyState icon={Tags} title="No category data yet" message="Scrap categories selected by customers in pickup requests will be ranked here." />
                ) : (
                    <div className="space-y-3">
                        {scrapCategoryMix.map((c) => (
                            <div key={c.category} className="flex items-center gap-3">
                                <span className="w-36 shrink-0 truncate text-sm font-medium text-navy">{c.category}</span>
                                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-brand/70 to-brand"
                                        style={{ width: `${(c.count / maxCategory) * 100}%` }}
                                    />
                                </div>
                                <span className="w-10 shrink-0 text-right text-sm font-semibold text-muted-foreground">{c.count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </Panel>
        </AdminLayout>
    );
}
