import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { Plus, Edit2, Trash2, Shield, Mail, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

const USER_TYPE_COLORS = {
    admin: { bg: 'bg-red-100', text: 'text-red-700' },
    manager: { bg: 'bg-blue-100', text: 'text-blue-700' },
    accountant: { bg: 'bg-green-100', text: 'text-green-700' },
    customer: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export default function UsersIndex({ users, userTypes }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
            window.location.href = route('admin.users.destroy', id);
        }
    };

    return (
        <AdminLayout title="User Management">
            <PageHeader
                title="User Management"
                subtitle="Create and manage admin, manager, and accountant accounts."
            />

            <Panel>
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-navy">Users</h3>
                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
                    >
                        <Plus className="size-4" />
                        Add User
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-4 py-3 text-left font-semibold text-navy">Name</th>
                                <th className="px-4 py-3 text-left font-semibold text-navy">Email</th>
                                <th className="px-4 py-3 text-left font-semibold text-navy">Role</th>
                                <th className="px-4 py-3 text-left font-semibold text-navy">Status</th>
                                <th className="px-4 py-3 text-right font-semibold text-navy">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        No users found. <Link href={route('admin.users.create')} className="font-semibold text-brand hover:underline">Create one</Link>.
                                    </td>
                                </tr>
                            ) : (
                                users.data.map(user => {
                                    const colors = USER_TYPE_COLORS[user.user_type] || USER_TYPE_COLORS.customer;
                                    return (
                                        <tr key={user.id} className="border-b border-border/50 hover:bg-eco/30">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="grid size-9 place-items-center rounded-lg bg-brand/10 text-xs font-bold text-brand">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-medium text-navy">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Mail className="size-3.5" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${colors.bg} ${colors.text} capitalize`}>
                                                    <Shield className="size-3" />
                                                    {user.user_type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                    user.status
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {user.status ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-200"
                                                    >
                                                        <Edit2 className="size-3.5" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-rose-100 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-200"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {users.last_page > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {users.links.map((link, i) => (
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        link.active
                                            ? 'bg-brand text-brand-foreground'
                                            : 'border border-border hover:bg-muted'
                                    }`}
                                >
                                    {link.label.replace(/&laquo;/, '«').replace(/&raquo;/, '»')}
                                </Link>
                            ) : (
                                <span key={i} className="px-3 py-2 text-sm text-muted-foreground">
                                    {link.label.replace(/&laquo;/, '«').replace(/&raquo;/, '»')}
                                </span>
                            )
                        ))}
                    </div>
                )}
            </Panel>
        </AdminLayout>
    );
}
