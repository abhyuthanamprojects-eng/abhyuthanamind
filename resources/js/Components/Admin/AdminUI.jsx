import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ---------- Form section ---------- */
export function FormSection({ title, description, children, className }) {
    return (
        <div className={cn('border-b border-border pb-6 last:border-0 last:pb-0', className)}>
            {(title || description) && (
                <div className="mb-4">
                    {title && <h3 className="text-sm font-bold text-navy">{title}</h3>}
                    {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}

/* ---------- Confirm dialog ---------- */
export function ConfirmDialog({
    open, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Delete', tone = 'danger', processing = false,
}) {
    const toneClasses = tone === 'danger'
        ? 'bg-rose-600 hover:bg-rose-700'
        : 'bg-brand hover:bg-brand-dark';

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-navy/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                        className="fixed left-1/2 top-1/2 z-[60] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-card p-6 shadow-card"
                    >
                        <span className="grid size-11 place-items-center rounded-2xl bg-rose-100 text-rose-600">
                            <AlertTriangle className="size-5" />
                        </span>
                        <h3 className="mt-4 text-base font-bold text-navy">{title}</h3>
                        {message && <p className="mt-1.5 text-sm text-muted-foreground">{message}</p>}
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={onClose} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={processing}
                                className={cn('rounded-2xl px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition disabled:opacity-60', toneClasses)}
                            >
                                {processing ? 'Working…' : confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ---------- Page header ---------- */
export function PageHeader({ title, subtitle, action }) {
    return (
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold text-navy">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

/* ---------- Stat card ---------- */
const statTones = {
    brand: 'bg-accent text-accent-foreground',
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-sky-100 text-sky-700',
    rose: 'bg-rose-100 text-rose-700',
    navy: 'bg-navy/10 text-navy',
    violet: 'bg-violet-100 text-violet-700',
};
export function StatCard({ icon: Icon, label, value, trend, tone = 'brand', i = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
        >
            <div className="flex items-center justify-between">
                <span className={cn('grid size-11 place-items-center rounded-2xl', statTones[tone])}>
                    <Icon className="size-5" />
                </span>
                {trend && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">{trend}</span>}
            </div>
            <p className="mt-4 text-3xl font-extrabold text-navy">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </motion.div>
    );
}

/* ---------- Status badge ---------- */
const badgeTones = {
    New: 'bg-sky-100 text-sky-700',
    Pending: 'bg-amber-100 text-amber-700',
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-accent text-accent-foreground',
    rejected: 'bg-rose-100 text-rose-700',
    'In Progress': 'bg-violet-100 text-violet-700',
    in_progress: 'bg-violet-100 text-violet-700',
    confirmed: 'bg-sky-100 text-sky-700',
    driver_on_the_way: 'bg-violet-100 text-violet-700',
    picked_up: 'bg-indigo-100 text-indigo-700',
    processing: 'bg-indigo-100 text-indigo-700',
    Completed: 'bg-accent text-accent-foreground',
    completed: 'bg-accent text-accent-foreground',
    resolved: 'bg-accent text-accent-foreground',
    Cancelled: 'bg-rose-100 text-rose-700',
    cancelled: 'bg-rose-100 text-rose-700',
    closed: 'bg-muted text-muted-foreground',
    Replied: 'bg-accent text-accent-foreground',
    Active: 'bg-accent text-accent-foreground',
    Inactive: 'bg-muted text-muted-foreground',
};
export function StatusBadge({ status }) {
    const label = typeof status === 'string' ? status.replace(/_/g, ' ') : status;
    return (
        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize', badgeTones[status] ?? 'bg-muted text-muted-foreground')}>
            <span className="size-1.5 rounded-full bg-current opacity-70" />
            {label}
        </span>
    );
}

/* ---------- Filter / search bar ---------- */
export function FilterBar({ query, onQuery, placeholder = 'Search…', children }) {
    return (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    value={query}
                    onChange={(e) => onQuery(e.target.value)}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
            </div>
            {children}
        </div>
    );
}

export function FilterSelect({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-11 rounded-2xl border border-border bg-card px-4 text-sm font-medium text-navy outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
            {options.map((o) => (
                <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
            ))}
        </select>
    );
}

/* ---------- Card container ---------- */
export function Panel({ className, children }) {
    return <div className={cn('rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6', className)}>{children}</div>;
}

/* ---------- Empty state ---------- */
export function EmptyState({ icon: Icon, title, message, action }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-eco/50 px-6 py-16 text-center">
            <span className="grid size-16 place-items-center rounded-3xl bg-accent text-accent-foreground">
                <Icon className="size-7" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

/* ---------- Action button ---------- */
const actionTones = {
    ghost: 'text-muted-foreground hover:bg-muted hover:text-navy',
    danger: 'text-rose-600 hover:bg-rose-50',
    brand: 'text-brand hover:bg-accent',
};
export function ActionBtn({ icon: Icon, label, onClick, tone = 'ghost', href }) {
    const Comp = href ? 'a' : 'button';
    return (
        <Comp
            href={href}
            type={href ? undefined : 'button'}
            onClick={onClick}
            title={label}
            className={cn('inline-flex size-9 items-center justify-center rounded-xl transition', actionTones[tone])}
        >
            <Icon className="size-4" />
            <span className="sr-only">{label}</span>
        </Comp>
    );
}

/* ---------- Mini bar chart ---------- */
export function MiniBars({ data }) {
    const max = Math.max(...data.map((d) => d.v), 1);
    return (
        <div className="flex h-40 items-end gap-3">
            {data.map((d) => (
                <div key={d.m} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.v / max) * 100}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-brand/70 to-brand"
                    />
                    <span className="text-xs font-medium text-muted-foreground">{d.m}</span>
                </div>
            ))}
        </div>
    );
}

/* ---------- Right-side drawer panel ---------- */
export function DrawerPanel({ open, onClose, title, children, footer }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm"
                    />
                    <motion.aside
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-card"
                    >
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <h3 className="text-lg font-bold text-navy">{title}</h3>
                            <button onClick={onClose} className="grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">{children}</div>
                        {footer && <div className="border-t border-border p-4">{footer}</div>}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

/* ---------- Pagination ---------- */
export function Pagination({ links }) {
    if (!links || links.length <= 3) return null;
    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {links.map((link, i) => (
                <a
                    key={i}
                    href={link.url || undefined}
                    className={cn(
                        'inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-medium transition',
                        link.active ? 'bg-brand text-brand-foreground' : 'text-navy hover:bg-muted',
                        !link.url && 'pointer-events-none opacity-40',
                    )}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
