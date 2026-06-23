import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { AdminTablePagination } from '@/Components/Admin/AdminTable';
import { ChevronRight, HelpCircle } from 'lucide-react';

export default function Index({ tickets, filters }) {
    const handleFilter = (key, value) => {
        router.get(route('admin.help-support.index'), { ...filters, [key]: value }, { preserveState: true });
    };

    const statusColors = {
        pending: 'text-bg-warning',
        in_progress: 'text-bg-info',
        resolved: 'text-bg-success',
        closed: 'text-bg-secondary',
    };

    return (
        <AdminLayout>
            <Head title="Help & Support" />

            <AdminHeader
                title="Help & Support Tickets"
                subtitle="Manage customer and partner support queries submitted via mobile app."
                icon={<HelpCircle size={20} />}
            />

            <div className="card w-100">
                <div className="card-header bg-transparent d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                    <div className="btn-group flex-wrap" role="group">
                        {['all', 'pending', 'in_progress', 'resolved', 'closed'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => handleFilter('status', s === 'all' ? '' : s)}
                                className={`btn btn-sm text-capitalize ${
                                    (filters.status === s || (!filters.status && s === 'all'))
                                        ? 'btn-primary'
                                        : 'btn-outline-secondary'
                                }`}
                            >
                                {s.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={filters.search || ''}
                        onChange={e => handleFilter('search', e.target.value)}
                        className="form-control"
                        style={{ maxWidth: '16rem' }}
                    />
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>User</th>
                                    <th>Subject</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-secondary fst-italic">No support tickets found.</td>
                                    </tr>
                                ) : (
                                    tickets.data.map((t) => (
                                        <tr key={t.id}>
                                            <td>
                                                <div className="fw-semibold">{t.name || t.user?.name || 'Guest'}</div>
                                                <div className="text-secondary fs-2 text-capitalize">{t.user_role || 'Visitor'}</div>
                                            </td>
                                            <td>
                                                <div className="text-truncate fw-medium" style={{ maxWidth: '200px' }}>{t.subject}</div>
                                                {t.pickup_request_id && (
                                                    <div className="text-info fs-2 fw-bold text-uppercase mt-1">Order #{t.pickup_request_id}</div>
                                                )}
                                            </td>
                                            <td className="text-capitalize">{t.type}</td>
                                            <td>
                                                <span className={`badge rounded-pill ${statusColors[t.status]}`}>
                                                    {t.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>{new Date(t.created_at).toLocaleDateString()}</td>
                                            <td className="text-end">
                                                <Link
                                                    href={route('admin.help-support.show', t.id)}
                                                    className="d-inline-flex align-items-center text-primary fw-semibold text-decoration-none"
                                                >
                                                    View <ChevronRight size={16} className="ms-1" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {tickets.links.length > 3 && (
                        <div className="card-footer bg-transparent">
                            <AdminTablePagination links={tickets.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
