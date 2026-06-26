import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminHeader from '@/Components/Admin/AdminHeader';
import AdminTable, { AdminTablePagination } from '@/Components/Admin/AdminTable';
import { AdminActionButton } from '@/Components/Admin/AdminButton';
import { Search, FileText } from 'lucide-react';

export default function Index({ pages, filters }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this page?')) {
            router.delete(route('admin.pages.destroy', id));
        }
    };

    const handleSearch = (e) => {
        router.get(route('admin.pages.index'), {
            ...filters,
            search: e.target.value,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = [
        {
            key: 'title',
            label: 'Title / Slug',
            render: (_, page) => (
                <>
                    <div className="fw-medium">{page.title}</div>
                    <div className="text-secondary fs-2">/{page.slug}</div>
                </>
            ),
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (_, page) => (
                <span className={`badge rounded-pill ${page.is_active ? 'text-bg-success' : 'text-bg-danger'}`}>
                    {page.is_active ? 'Active' : 'Draft'}
                </span>
            ),
        },
        {
            key: 'updated_at',
            label: 'Last Updated',
            render: (_, page) => new Date(page.updated_at).toLocaleDateString(),
        },
        {
            key: 'actions',
            label: 'Actions',
            align: 'right',
            render: (_, page) => (
                <div className="d-flex justify-content-end gap-2">
                    <AdminActionButton action="edit" label="Edit" href={route('admin.pages.edit', page.id)} />
                    <AdminActionButton action="delete" label="Delete" onClick={() => handleDelete(page.id)} />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <Head title="Static Pages" />

            <AdminHeader
                title="Static Pages"
                icon={<FileText size={20} />}
                action={{ label: 'Create New Page', href: route('admin.pages.create') }}
            />

            <div className="card mb-4">
                <div className="card-body">
                    <div className="col-12 col-md-4 position-relative">
                        <Search size={16} className="position-absolute ms-3 text-secondary" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by title or slug..."
                            value={filters.search || ''}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <AdminTable
                columns={columns}
                data={pages.data}
                emptyMessage="No pages found."
            />

            <AdminTablePagination links={pages.links} />
        </AdminLayout>
    );
}
