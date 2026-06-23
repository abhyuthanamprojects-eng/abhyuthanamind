import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { ArrowLeft } from 'lucide-react';

export default function Show({ message }) {
    const { patch, processing } = useForm({
        status: message.status === 'pending' ? 'resolved' : 'pending'
    });

    const toggleStatus = () => {
        patch(route('admin.contacts.update-status', message.id));
    };

    return (
        <AdminLayout>
            <Head title="Contact Message Details" />

            <AdminHeader
                title="Message Details"
                action={{ label: 'Back to List', icon: <ArrowLeft size={16} />, href: route('admin.contacts.index') }}
            />

            <div className="card" style={{ maxWidth: '56rem' }}>
                <div className="card-body p-4">
                    <div className="row g-4 mb-4 pb-4 border-bottom">
                        <div className="col-12 col-md-6">
                            <h6 className="text-secondary mb-2">Sender Information</h6>
                            <p className="fs-4 fw-semibold mb-1">{message.name}</p>
                            <p className="text-secondary mb-1">{message.email}</p>
                            <p className="text-secondary mb-1">{message.phone || 'No phone provided'}</p>
                            {message.user_role && (
                                <span className="badge text-bg-secondary">{message.user_role}</span>
                            )}
                            {message.user && (
                                <p className="text-secondary fs-2 mt-1 mb-0">
                                    User #{message.user.id} ({message.user.phone})
                                </p>
                            )}
                        </div>
                        <div className="col-12 col-md-6">
                            <h6 className="text-secondary mb-2">Message Metadata</h6>
                            <div className="d-flex align-items-center mb-1">
                                <span className="text-secondary me-2">Status:</span>
                                <span className={`badge rounded-pill ${message.status === 'resolved' ? 'text-bg-success' : 'text-bg-warning'}`}>
                                    {message.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="d-flex align-items-center mb-1">
                                <span className="text-secondary me-2">Type:</span>
                                <span className={`badge ${message.type === 'order' ? 'text-bg-info' : 'text-bg-light'}`}>{message.type || 'general'}</span>
                            </div>
                            {message.pickup_request_id && (
                                <div className="d-flex align-items-center mb-1">
                                    <span className="text-secondary me-2">Order:</span>
                                    <span className="font-monospace">
                                        #{message.pickup_request_id}
                                        {message.pickup_request?.pickup_code && ` (${message.pickup_request.pickup_code})`}
                                    </span>
                                </div>
                            )}
                            <p className="text-secondary mb-1">Received: {new Date(message.created_at).toLocaleString()}</p>
                            <p className="text-secondary mb-0">ID: #{message.id}</p>
                        </div>
                    </div>

                    <div className="mb-4 pb-4 border-bottom">
                        <h6 className="text-secondary mb-2">Subject</h6>
                        <p className="fs-3 fw-medium mb-0">{message.subject || '(No Subject)'}</p>
                    </div>

                    <div className="mb-4">
                        <h6 className="text-secondary mb-2">Message Body</h6>
                        <div className="bg-light rounded p-3 border" style={{ whiteSpace: 'pre-wrap' }}>
                            {message.message}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-primary" onClick={toggleStatus} disabled={processing}>
                            Mark as {message.status === 'pending' ? 'Resolved' : 'Pending'}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this message?')) {
                                    router.delete(route('admin.contacts.destroy', message.id));
                                }
                            }}
                        >
                            Delete Message
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
