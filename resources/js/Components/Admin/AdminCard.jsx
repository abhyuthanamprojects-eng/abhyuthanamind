export default function AdminCard({
    title,
    value,
    icon,
    color = 'green',
    subtext = null,
    trend = null
}) {
    const bsColor = {
        green: 'primary',
        blue: 'info',
        red: 'danger',
        purple: 'secondary',
        orange: 'warning',
    }[color] || 'primary';

    return (
        <div className="card w-100">
            <div className="card-body">
                <div className="d-flex align-items-start justify-content-between">
                    <div className="flex-grow-1">
                        <p className="mb-1 text-secondary">{title}</p>
                        <h2 className="mb-0 fw-bold">{value}</h2>
                        {subtext && (
                            <p className="mb-0 mt-2 text-secondary fs-2">{subtext}</p>
                        )}
                        {trend && (
                            <div className="d-flex align-items-center gap-1 mt-2 fs-2 fw-semibold">
                                <span className={trend.direction === 'up' ? 'text-success' : 'text-danger'}>
                                    {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                                </span>
                                <span className="text-secondary">{trend.label}</span>
                            </div>
                        )}
                    </div>
                    {icon && (
                        <div className={`rounded-circle p-2 bg-${bsColor}-subtle text-${bsColor}`}>
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
