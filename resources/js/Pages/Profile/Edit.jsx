import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { usePage } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const initials = (user?.name || 'AU').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
    const roleLabel = user?.roles?.[0]?.name ? user.roles[0].name.replace(/_/g, ' ') : 'Admin';

    return (
        <AdminLayout title="Profile">
            <PageHeader title="Profile" subtitle="Manage your account information, password and security." />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-1">
                    <Panel className="text-center">
                        <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-xl font-bold text-brand-foreground">
                            {initials}
                        </span>
                        <h3 className="mt-4 text-base font-bold text-navy">{user?.name}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">{user?.email}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold capitalize text-accent-foreground">
                            <ShieldCheck className="size-3.5" />
                            {roleLabel}
                        </span>
                    </Panel>

                    <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-4 shadow-soft">
                        <DeleteUserForm compact />
                    </div>
                </div>

                <div className="space-y-6 lg:col-span-2">
                    <Panel>
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                    </Panel>

                    <Panel>
                        <UpdatePasswordForm />
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
