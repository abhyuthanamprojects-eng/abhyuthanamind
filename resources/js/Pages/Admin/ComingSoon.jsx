import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { Hourglass, CheckCircle2, IndianRupee, Star, Award, Images, Users, BarChart3 } from 'lucide-react';

const icons = { IndianRupee, Star, Award, Images, Users, BarChart3 };

export default function ComingSoon({ title, description, icon = 'IndianRupee', fields = [] }) {
    const Icon = icons[icon] ?? Hourglass;

    return (
        <AdminLayout title={title}>
            <PageHeader title={title} subtitle={description} />

            <Panel className="overflow-hidden">
                <div className="flex flex-col items-center px-6 py-12 text-center">
                    <span className="grid size-16 place-items-center rounded-3xl bg-accent text-accent-foreground">
                        <Icon className="size-7" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-navy">Backend integration pending</h3>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                        This module's UI is ready. It will go live once the matching database tables and API endpoints
                        are built — let your developer know when you're ready to wire it up.
                    </p>
                </div>

                {fields.length > 0 && (
                    <div className="border-t border-border bg-eco/30 px-6 py-6">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Planned fields for this module</p>
                        <div className="flex flex-wrap gap-2">
                            {fields.map((f) => (
                                <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-navy">
                                    <CheckCircle2 className="size-3.5 text-brand" />
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </Panel>
        </AdminLayout>
    );
}
