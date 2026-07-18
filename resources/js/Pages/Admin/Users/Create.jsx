import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { ArrowLeft, Loader2, Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CreateUser({ userTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: 'manager',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout title="Add User">
            <div className="mb-6 flex items-center gap-3">
                <Link href={route('admin.users.index')} className="rounded-lg p-2 hover:bg-muted">
                    <ArrowLeft className="size-5 text-navy" />
                </Link>
                <PageHeader title="Add User" subtitle="Create a new admin, manager, or accountant account." />
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
                                    placeholder="John Doe"
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
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-navy mb-2">Password</label>
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

                            {/* Submit */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90 disabled:opacity-50"
                                >
                                    {processing ? <Loader2 className="animate-spin size-4" /> : <Shield className="size-4" />}
                                    Create User
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
                </div>

                {/* Help panel */}
                <div className="lg:col-span-1">
                    <Panel>
                        <h4 className="font-bold text-navy mb-3">User Roles</h4>
                        <div className="space-y-3 text-sm">
                            <div>
                                <p className="font-semibold text-rose-700">Admin</p>
                                <p className="text-xs text-muted-foreground">Full access to all features and settings</p>
                            </div>
                            <div>
                                <p className="font-semibold text-blue-700">Manager</p>
                                <p className="text-xs text-muted-foreground">Can manage pickups, queries, and customer interactions</p>
                            </div>
                            <div>
                                <p className="font-semibold text-green-700">Accountant</p>
                                <p className="text-xs text-muted-foreground">Can view reports and manage scrap rates</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Customer</p>
                                <p className="text-xs text-muted-foreground">Default role for website users</p>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        </AdminLayout>
    );
}
