import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout title="Profile">
            <PageHeader title="Profile" subtitle="Manage your account information, password and security." />

            <div className="max-w-2xl space-y-6">
                <Panel>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Panel>

                <Panel>
                    <UpdatePasswordForm />
                </Panel>

                <Panel>
                    <DeleteUserForm />
                </Panel>
            </div>
        </AdminLayout>
    );
}
