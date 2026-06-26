import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import AdminTable, { AdminTablePagination } from '@/Components/Admin/AdminTable';
import { Search, Mail } from 'lucide-react';

export default function Index({ messages, filters }) {
    const handleSearch = (e) => {
        router.get(route('admin.contacts.index'), {
            ...filters,
            search: e.target.value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusFilter = (e) => {
        router.get(route('admin.contacts.index'), {
            ...filters,
            status: e.target.value,
        }, {
            preserveState: true,
        });
    };

    const handleTypeFilter = (e) => {
        router.get(route('admin.contacts.index'), {
            ...filters,
            type: e.target.value,
        }, { preserveState: true });
    };

    const handleRoleFilter = (e) => {
        router.get(route('admin.contacts.index'), {
            ...filters,
            user_role: e.target.value,
        }, { preserveState: true });
    };

    const columns = [
        {
            key: 'name',
            label: 'Contact Information',
            render: (_, msg) => (
                <>
                    <div className="fw-medium">{msg.name}</div>
                    <div className="text-secondary fs-3">{msg.email}</div>
                    <div className="text-secondary fs-2">{msg.phone}</div>
                </>
            ),
        },
        {
            key: 'subject',
            label: 'Subject / Type',
            render: (_, msg) => (
                <>
                    <div className="text-truncate" style={{ maxWidth: '20rem' }}>{msg.subject || 'No Subject'}</div>
                    <span className={`badge mt-1 ${msg.type === 'order' ? 'text-bg-info' : 'text-bg-light'}`}>
                        {msg.type || 'general'}
                    </span>
                </>
            ),
        },
        {
            key: 'pickup_request_id',
            label: 'Order',
            render: (_, msg) => msg.pickup_request_id ? (
                <span className="font-monospace">
                    #{msg.pickup_request_id}
                    {msg.pickup_request?.pickup_code && (
                        <div className="text-secondary fs-2">{msg.pickup_request.pickup_code}</div>
                    )}
                </span>
            ) : <span className="text-secondary">—</span>,
        },
        {
            key: 'user_role',
            label: 'Role',
            render: (_, msg) => msg.user_role ? (
                <span className="badge text-bg-secondary">{msg.user_role}</span>
            ) : <span className="text-secondary">—</span>,
        },
        {
            key: 'status',
            label: 'Status',
            render: (_, msg) => (
                <span className={`badge rounded-pill ${msg.status === 'resolved' ? 'text-bg-success' : 'text-bg-warning'}`}>
                    {msg.status.toUpperCase()}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Received At',
            render: (_, msg) => new Date(msg.created_at).toLocaleString(),
        },
        {
            key: 'actions',
            label: 'Actions',
            align: 'right',
            render: (_, msg) => (
                <Link href={route('admin.contacts.show', msg.id)} className="btn btn-sm btn-outline-primary">
                    View Details
                </Link>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Contact Messages" />

            <AdminHeader title="Contact Queries" icon={<Mail size={20} />} />

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-4 position-relative">
                            <Search size={16} className="position-absolute ms-3 text-secondary" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Search by name, email or subject..."
                                value={filters.search || ''}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="col-6 col-md-2">
                            <select className="form-select" value={filters.status || ''} onChange={handleStatusFilter}>
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-2">
                            <select className="form-select" value={filters.type || ''} onChange={handleTypeFilter}>
                                <option value="">All Types</option>
                                <option value="general">General</option>
                                <option value="order">Order</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-3">
                            <select className="form-select" value={filters.user_role || ''} onChange={handleRoleFilter}>
                                <option value="">All Roles</option>
                                <option value="customer">Customer</option>
                                <option value="channel_partner">Channel Partner</option>
                                <option value="warehouse">Warehouse</option>
                                <option value="pickup_boy">Pickup Boy</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <AdminTable columns={columns} data={messages.data} emptyMessage="No messages found." />

            <AdminTablePagination links={messages.links} />
        </AdminLayout>
    );
}
