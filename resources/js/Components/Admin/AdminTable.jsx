import { Link } from '@inertiajs/react';
import { Package } from 'lucide-react';

export default function AdminTable({
    columns,
    data,
    emptyMessage = 'No records found',
    emptyIcon = <Package className="mx-auto mb-3 text-secondary" size={48} />
}) {
    return (
        <div className="card w-100">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        scope="col"
                                        style={{
                                            width: column.width || 'auto',
                                            textAlign: column.align || 'left'
                                        }}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                style={{ textAlign: column.align || 'left' }}
                                            >
                                                {column.render
                                                    ? column.render(row[column.key], row)
                                                    : row[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center py-5"
                                    >
                                        <div>
                                            {emptyIcon}
                                            <p className="text-secondary fs-4 mb-0">{emptyMessage}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export function AdminTablePagination({ links }) {
    if (!links || links.length <= 1) return null;

    return (
        <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination mb-0">
                {links.map((link, i) => (
                    <li key={i} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="page-link"
                            />
                        ) : (
                            <span
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="page-link"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
