import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { ArrowLeft, Loader2, Shield, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EditUser({ user, userTypes }) {
    const [showDelete, setShowDelete] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        user_type: user.user_type || 'customer',
        status: user.status ? 1 : 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure? This cannot be undone.')) {
            window.location.href = route('admin.users.destroy', user.id);
        }
    };

    return (
        <AdminLayout title="Edit User">
            <div className="mb-6 flex items-center gap-3">
                <Link href={route('admin.users.index')} className="rounded-lg p-2 hover:bg-muted">
                    <ArrowLeft className="size-5 text-navy" />
                </Link>
                <PageHeader title={`Edit ${user.name}`} subtitle="Update user information and role." />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Panel>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
                                        errors.name ? 'border-rose-500 bg-rose-50' : 'border-border hover:border-brand focus:border-brand focus:ring-2 focus:ring-brand/20'
                                    }`}
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
                                        errors.email ? 'border-rose-500 bg-rose-50' : 'border-border hover:border-brand focus:border-brand focus:ring-2 focus:ring-brand/20'
                                    }`}
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                            </div>

                            {/* Password (optional) */}
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">New Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
                                        errors.password ? 'border-rose-500 bg-rose-50' : 'border-border hover:border-brand focus:border-brand focus:ring-2 focus:ring-brand/20'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
                            </div>

                            {/* User Type */}
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">User Role</label>
                                <select
                                    value={data.user_type}
                                    onChange={(e) => setData('user_type', e.target.value)}
                                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition hover:border-brand focus:border-brand focus:ring-2 focus:ring-brand/20"
                                >
                                    {userTypes.map(type => (
                                        <option key={type} value={type} className="capitalize">
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.user_type && <p className="mt-1 text-xs text-rose-600">{errors.user_type}</p>}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.status === 1}
                                        onChange={(e) => setData('status', e.target.checked ? 1 : 0)}
                                        className="size-5 rounded border-border accent-brand"
                                    />
                                    <span className="text-sm font-semibold text-navy">Active</span>
                                </label>
                                {errors.status && <p className="mt-1 text-xs text-rose-600">{errors.status}</p>}
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90 disabled:opacity-50"
                                >
                                    {processing ? <Loader2 className="animate-spin size-4" /> : <Shield className="size-4" />}
                                    Save Changes
                                </button>
                                <Link
                                    href={route('admin.users.index')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-2.5 text-sm font-bold text-navy transition hover:bg-muted"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </Panel>

                    {/* Delete Section */}
                    <Panel className="mt-6 border-rose-200 bg-rose-50">
                        <h4 className="font-bold text-rose-700 mb-3 flex items-center gap-2">
                            <Trash2 className="size-4" />
                            Danger Zone
                        </h4>
                        <p className="text-sm text-rose-600 mb-4">Permanently delete this user account. This action cannot be undone.</p>
                        <button
                            onClick={() => setShowDelete(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
                        >
                            <Trash2 className="size-4" />
                            Delete User
                        </button>

                        {showDelete && (
                            <div className="mt-4 rounded-lg border border-rose-300 bg-white p-4">
                                <p className="text-sm font-semibold text-navy mb-3">Confirm deletion?</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDelete}
                                        className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-700"
                                    >
                                        Yes, delete
                                    </button>
                                    <button
                                        onClick={() => setShowDelete(false)}
                                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-navy hover:bg-muted"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Panel>
                </div>

                {/* Info panel */}
                <div className="lg:col-span-1">
                    <Panel>
                        <h4 className="font-bold text-navy mb-3">Account Info</h4>
                        <div className="space-y-2 text-sm">
                            <div>
                                <p className="text-xs text-muted-foreground">User ID</p>
                                <p className="font-mono text-xs text-navy">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Created</p>
                                <p className="text-xs text-navy">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Last Updated</p>
                                <p className="text-xs text-navy">{new Date(user.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
