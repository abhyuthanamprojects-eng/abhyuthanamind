export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-navy shadow-sm transition hover:bg-muted focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
