import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

export default function Show({ ticket }) {
    const { data, setData, post, processing } = useForm({
        status: ticket.status,
    });

    const updateStatus = (newStatus) => {
        setData('status', newStatus);
        post(route('admin.help-support.update-status', ticket.id), {
            preserveScroll: true,
        });
    };

    const statusColors = {
        pending: 'btn-warning',
        in_progress: 'btn-info',
        resolved: 'btn-success',
        closed: 'btn-secondary',
    };

    return (
        <AdminLayout>
            <Head title="Ticket Detail" />

            <div className="mx-auto" style={{ maxWidth: '56rem' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <Link href={route('admin.help-support.index')} className="text-secondary text-decoration-none d-inline-flex align-items-center">
                        <ChevronLeft size={16} className="me-1" />
                        Back to tickets
                    </Link>
                    <div className="btn-group" role="group">
                        {['pending', 'in_progress', 'resolved', 'closed'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => updateStatus(s)}
                                disabled={processing || data.status === s}
                                className={`btn btn-sm text-uppercase ${
                                    data.status === s ? statusColors[s] : 'btn-outline-secondary'
                                }`}
                            >
                                {s.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-lg-8 d-flex flex-column gap-4">
                        <div className="card">
                            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{ticket.subject || 'No Subject'}</h5>
                                <span className="text-secondary fs-2">{new Date(ticket.created_at).toLocaleString()}</span>
                            </div>
                            <div className="card-body">
                                <div className="bg-light rounded p-3 border" style={{ whiteSpace: 'pre-wrap' }}>
                                    {ticket.message}
                                </div>
                            </div>
                        </div>

                        {ticket.pickup_request && (
                            <div className="card border-info">
                                <div className="card-header bg-info-subtle border-info">
                                    <h6 className="mb-0 text-info-emphasis">Related Order Context</h6>
                                </div>
                                <div className="card-body row g-3">
                                    <div className="col-6">
                                        <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Order ID</label>
                                        <p className="fw-semibold mb-0">#{ticket.pickup_request_id}</p>
                                    </div>
                                    <div className="col-6">
                                        <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Type</label>
                                        <p className="fw-semibold text-capitalize mb-0">{ticket.pickup_request.request_type.replace('_', ' ')}</p>
                                    </div>
                                    <div className="col-6">
                                        <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Order Status</label>
                                        <p className="fw-semibold text-capitalize mb-0">{ticket.pickup_request.status}</p>
                                    </div>
                                    <div className="col-6">
                                        <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Scheduled At</label>
                                        <p className="fw-semibold mb-0">{new Date(ticket.pickup_request.scheduled_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-secondary text-uppercase fs-2 fw-bold mb-3">User Details</h6>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3" style={{ width: '48px', height: '48px' }}>
                                        {ticket.name?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <h6 className="mb-0">{ticket.name || ticket.user?.name}</h6>
                                        <p className="text-secondary fs-2 text-capitalize mb-0">{ticket.user_role || 'Visitor'}</p>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Email Address</label>
                                    <p className="mb-0">{ticket.email || ticket.user?.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-secondary fs-2 text-uppercase fw-bold d-block">Phone Number</label>
                                    <p className="mb-0">{ticket.phone || ticket.user?.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
