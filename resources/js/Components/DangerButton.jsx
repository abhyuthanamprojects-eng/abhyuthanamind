export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
