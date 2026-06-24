import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Users, Wallet, CreditCard, Wallet2, TrendingUp, MoreVertical, Plus, Pencil, Trash2, Info, ChevronUp, Eye, MessageSquare, Dot } from 'lucide-react';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* ============================================================ */}
            {/* Below: literal copy of MaterialM theme dashboard widgets.      */}
            {/* Placeholder/demo data — to be wired up or trimmed later.      */}
            {/* ============================================================ */}

            <div className="row">
                <div className="col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                <div className="mb-3 mb-sm-0">
                                    <h5 className="card-title fw-semibold">Sales Profit</h5>
                                </div>
                                <div>
                                    <select className="form-select">
                                        <option value="1">March 2025</option>
                                        <option value="2">April 2025</option>
                                        <option value="3">May 2025</option>
                                        <option value="4">June 2025</option>
                                    </select>
                                </div>
                            </div>
                            <div
                                className="d-flex align-items-center justify-content-center text-secondary"
                                style={{ height: '265px' }}
                            >
                                Chart placeholder &mdash; wire up real sales data later
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card bg-danger-subtle shadow-none w-100">
                                <div className="card-body">
                                    <div className="d-flex mb-10 pb-1 justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-6">
                                            <div className="rounded-circle-shape bg-danger px-3 py-2 rounded-pill d-inline-flex align-items-center justify-content-center">
                                                <Users size={18} className="text-white" />
                                            </div>
                                            <h6 className="mb-0 fs-4 fw-medium text-muted">Total followers</h6>
                                        </div>
                                        <div className="dropdown dropstart">
                                            <a href="#" className="text-muted" data-bs-toggle="dropdown" aria-expanded="false">
                                                <MoreVertical size={16} />
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Plus size={16} />Add</a></li>
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Pencil size={16} />Edit</a></li>
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Trash2 size={16} />Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row align-items-end justify-content-between">
                                        <div className="col-5">
                                            <h2 className="mb-6 fs-8">4,562</h2>
                                            <span className="badge rounded-pill border border-muted fw-bold text-muted fs-2 py-1">+23% last month</span>
                                        </div>
                                        <div className="col-5">
                                            <div className="d-flex align-items-center justify-content-end text-secondary fs-1">chart</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card bg-secondary-subtle shadow-none w-100">
                                <div className="card-body">
                                    <div className="d-flex mb-10 pb-1 justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-6">
                                            <div className="rounded-circle-shape bg-secondary px-3 py-2 rounded-pill d-inline-flex align-items-center justify-content-center">
                                                <Wallet size={18} className="text-white" />
                                            </div>
                                            <h6 className="mb-0 fs-4 fw-medium text-muted">Total Income</h6>
                                        </div>
                                        <div className="dropdown dropstart">
                                            <a href="#" className="text-muted" data-bs-toggle="dropdown" aria-expanded="false">
                                                <MoreVertical size={16} />
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Plus size={16} />Add</a></li>
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Pencil size={16} />Edit</a></li>
                                                <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Trash2 size={16} />Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row align-items-center justify-content-between pt-4">
                                        <div className="col-5">
                                            <h2 className="mb-6 fs-8 text-nowrap">$6,280</h2>
                                            <span className="badge rounded-pill border border-muted fw-bold text-muted fs-2 py-1">+18% last month</span>
                                        </div>
                                        <div className="col-5">
                                            <div className="d-flex align-items-center justify-content-end text-secondary fs-1">chart</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-8 d-flex align-items-stretch">
                    <div className="card w-100 overflow-hidden">
                        <div className="card-body pb-0">
                            <h4 className="fs-4 mb-1 card-title">Popular Products</h4>
                            <p className="mb-0 card-subtitle">Total 9k Visitors</p>
                        </div>
                        <div className="position-relative">
                            <div className="table-responsive products-tabel">
                                <table className="table text-nowrap mb-0 align-middle table-hover">
                                    <thead className="fs-4">
                                        <tr>
                                            <th className="fs-3 px-4">Products</th>
                                            <th className="fs-3">Payment</th>
                                            <th className="fs-3">Status</th>
                                            <th className="fs-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { title: 'iPhone 13 pro max-Pacific Blue-128GB storage', price: 180, status: 'Partially paid', progress: 40, progressClass: 'bg-warning', badge: 'Confirmed', badgeClass: 'bg-secondary-subtle text-secondary' },
                                            { title: 'Apple MacBook Pro 13 inch-M1-8/256GB-space', price: 120, status: 'Full paid', progress: 100, progressClass: 'bg-success', badge: 'Confirmed', badgeClass: 'bg-success-subtle text-success' },
                                            { title: 'PlayStation 5 DualSense Wireless Controller', price: 120, status: 'Cancelled', progress: 100, progressClass: 'bg-danger', badge: 'Cancelled', badgeClass: 'bg-danger-subtle text-danger' },
                                            { title: 'Amazon Basics Mesh, Mid-Back, Swivel Office De...', price: 120, status: 'Partially paid', progress: 40, progressClass: 'bg-warning', badge: 'Confirmed', badgeClass: 'bg-secondary-subtle text-secondary' },
                                        ].map((p, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    <div className="d-flex align-items-center product">
                                                        <div className="ms-0 product-title">
                                                            <h6 className="fs-3 mb-0 text-truncate-2">{p.title}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className="mb-0 fs-4">${p.price} <span className="text-muted">/499</span></h5>
                                                    <p className="text-muted mb-2">{p.status}</p>
                                                    <div className="progress bg-light w-100" style={{ height: '4px' }}>
                                                        <div className={`progress-bar ${p.progressClass}`} role="progressbar" style={{ width: `${p.progress}%` }} aria-valuenow={p.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge rounded-pill fs-2 fw-medium ${p.badgeClass}`}>{p.badge}</span>
                                                </td>
                                                <td>
                                                    <div className="dropdown dropstart">
                                                        <a href="#" className="text-muted" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <MoreVertical size={16} />
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Plus size={16} />Add</a></li>
                                                            <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Pencil size={16} />Edit</a></li>
                                                            <li><a className="dropdown-item d-flex align-items-center gap-3" href="#"><Trash2 size={16} />Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body">
                            <div className="d-flex mb-3 justify-content-between align-items-center">
                                <h4 className="mb-0 card-title">Earning Reports</h4>
                                <div className="dropdown">
                                    <button data-bs-toggle="dropdown" aria-expanded="false" className="rounded-circle btn-transparent rounded-circle btn-sm px-1 btn shadow-none">
                                        <MoreVertical size={16} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                            <ul className="list-unstyled mb-0">
                                {[
                                    { icon: <CreditCard size={16} className="text-primary" />, bg: 'bg-primary-subtle', label: 'Bank Transfer', more: '+1 more', pct: '16.3%' },
                                    { icon: <Wallet size={16} className="text-danger" />, bg: 'bg-danger-subtle', label: 'Net Profit', more: '+4 more', pct: '12.55%' },
                                    { icon: <TrendingUp size={16} className="text-secondary" />, bg: 'bg-secondary-subtle', label: 'Total Income', more: '+4 more', pct: '12.55%' },
                                    { icon: <Wallet2 size={16} className="text-body" />, bg: 'bg-light', label: 'Total Expenses', more: '+2 more', pct: '8.28%' },
                                    { icon: <Wallet2 size={16} className="text-warning" />, bg: 'bg-warning-subtle', label: 'Marketing', more: '+3 more', pct: '9.25%' },
                                ].map((r, idx) => (
                                    <li key={idx} className="d-flex align-items-center justify-content-between py-10 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <div className={`rounded-circle-shape ${r.bg} me-3 rounded-pill d-inline-flex align-items-center justify-content-center`}>
                                                {r.icon}
                                            </div>
                                            <div>
                                                <h6 className="mb-1 fs-3">{r.label}</h6>
                                                <p className="mb-0 fs-2 d-flex align-items-center gap-1">
                                                    and {r.more}<Info size={12} />
                                                </p>
                                            </div>
                                        </div>
                                        <span className="badge rounded-pill fw-medium fs-2 d-flex align-items-center bg-success-subtle text-success text-end">
                                            <ChevronUp size={12} />{r.pct}
                                        </span>
                                    </li>
                                ))}
                                <a href="#" className="fs-4 mt-7 text-center d-block">View more markets</a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {[
                    { badge: 'Social', title: 'Garmins Instinct Crossover is a rugged hybrid smartwatch', views: '9,125', comments: 3, date: 'Mon, Dec 19' },
                    { badge: 'Gadget', title: 'Intel loses bid to revive antitrust case against patent foe Fortress', views: '4,150', comments: 38, date: 'Sun, Dec 18' },
                    { badge: 'Health', title: 'COVID outbreak deepens as more lockdowns loom in China', views: '9,480', comments: 12, date: 'Sat, Dec 17' },
                ].map((b, idx) => (
                    <div className="col-lg-4" key={idx}>
                        <div className="card overflow-hidden hover-img">
                            <div className="position-relative">
                                <div className="card-img-top bg-secondary-subtle" style={{ height: '180px' }}></div>
                                <span className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">2 min Read</span>
                            </div>
                            <div className="card-body p-4">
                                <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm mt-3">{b.badge}</span>
                                <a className="d-block my-4 fs-5 text-dark fw-semibold link-primary" href="#">{b.title}</a>
                                <div className="d-flex align-items-center gap-4">
                                    <div className="d-flex align-items-center gap-2">
                                        <Eye size={16} className="text-dark" />{b.views}
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <MessageSquare size={16} className="text-dark" />{b.comments}
                                    </div>
                                    <div className="d-flex align-items-center fs-2 ms-auto">
                                        <Dot size={16} className="text-dark" />{b.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
