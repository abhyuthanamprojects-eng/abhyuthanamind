import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function AdminHeader({
    title,
    subtitle,
    action = null,
    icon = null
}) {
    return (
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                    {icon && (
                        <div className="rounded p-2 bg-primary-subtle text-primary d-flex align-items-center">
                            {icon}
                        </div>
                    )}
                    <h3 className="fw-bold mb-0">
                        {title}
                    </h3>
                </div>
                {subtitle && (
                    <p className="text-secondary mb-0">{subtitle}</p>
                )}
            </div>
            {action && (
                <div>
                    {action.href ? (
                        <Link href={action.href}>
                            <button className="btn btn-primary d-inline-flex align-items-center gap-2">
                                {action.icon || <Plus size={16} />}
                                {action.label}
                            </button>
                        </Link>
                    ) : (
                        <button
                            onClick={action.onClick}
                            className="btn btn-primary d-inline-flex align-items-center gap-2"
                        >
                            {action.icon || <Plus size={16} />}
                            {action.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
