import { Link } from '@inertiajs/react';

export default function AdminButton({
    variant = 'primary',
    size = 'md',
    children,
    href = null,
    onClick = null,
    disabled = false,
    icon = null,
    type = 'button',
    className = '',
    ...props
}) {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-outline-secondary',
        outline: 'btn-outline-primary',
        danger: 'btn-danger',
        success: 'btn-primary',
        warning: 'btn-warning',
        ghost: 'btn-light',
    };

    const sizeClasses = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    };

    const baseClass = `btn ${variantClasses[variant]} ${sizeClasses[size]} d-inline-flex align-items-center gap-2 ${className}`;

    if (href) {
        return (
            <Link href={href}>
                <button
                    className={baseClass}
                    type={type}
                    disabled={disabled}
                    {...props}
                >
                    {icon && <span>{icon}</span>}
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button
            className={baseClass}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
}

export function AdminActionButton({
    action = 'view',
    href = null,
    onClick = null,
    label,
    icon,
    disabled = false,
}) {
    const actionStyles = {
        view: 'btn-outline-info',
        edit: 'btn-outline-primary',
        delete: 'btn-outline-danger',
        copy: 'btn-outline-secondary',
        download: 'btn-outline-warning',
    };

    const baseClass = `btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 ${actionStyles[action]}`;

    if (href) {
        return (
            <Link href={href}>
                <button className={baseClass} disabled={disabled}>
                    {icon && <span>{icon}</span>}
                    {label}
                </button>
            </Link>
        );
    }

    return (
        <button
            className={baseClass}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span>{icon}</span>}
            {label}
        </button>
    );
}
