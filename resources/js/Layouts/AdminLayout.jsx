import { useState, useRef, useEffect } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { Bell, Search, Menu, X, ChevronDown, LogOut, User, CheckCircle2, XCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { adminNav } from '@/lib/admin-nav';
import { cn } from '@/lib/utils';
import axios from 'axios';

function NavLinks({ onNavigate }) {
    const { url, props } = usePage();
    const auth = props.auth || {};
    const [accessibleMenus, setAccessibleMenus] = useState(null);

    useEffect(() => {
        fetchAccessibleMenus();
    }, []);

    const defaultMenusForRole = (userType) => {
        const defaults = {
            admin: null, // null = show all
            manager: ['dashboard', 'pickup-queries', 'pickup-requests', 'contact-queries', 'help-support', 'customers-leads'],
            accountant: ['dashboard', 'scrap-rate', 'reports'],
        };
        return defaults[userType] !== undefined ? defaults[userType] : [];
    };

    const fetchAccessibleMenus = async () => {
        const userType = auth?.user?.user_type || auth?.user?.roles?.[0]?.name || 'customer';
        try {
            const { data } = await axios.get('/admin/available-menus');
            const menus = data?.data?.accessible_menus;
            if (Array.isArray(menus) && menus.length > 0) {
                setAccessibleMenus(menus);
            } else {
                // DB permissions not seeded — fall back to role defaults
                setAccessibleMenus(defaultMenusForRole(userType));
            }
        } catch (error) {
            setAccessibleMenus(defaultMenusForRole(userType));
        }
    };

    return (
        <nav className="flex flex-col gap-6 px-3 py-4">
            {adminNav.map((grp) => {
                const visibleItems = grp.items.filter(item => {
                    // If accessibleMenus is null, show all (admin fallback)
                    if (accessibleMenus === null) return true;

                    const keyMap = {
                        'dashboard': 'dashboard',
                        'admin.pickup-queries.index': 'pickup-queries',
                        'admin.pickups.index': 'pickup-requests',
                        'admin.contacts.index': 'contact-queries',
                        'admin.help-support.index': 'help-support',
                        'admin.customers.index': 'customers-leads',
                        'admin.pages.index': 'static-pages',
                        'admin.page-sections.index': 'page-sections',
                        'admin.services.index': 'services',
                        'admin.industries.index': 'industries',
                        'admin.testimonials.index': 'testimonials',
                        'admin.certificates.index': 'certificates',
                        'admin.media.index': 'media-gallery',
                        'admin.scrap-rate.index': 'scrap-rate',
                        'admin.reports.index': 'reports',
                        'admin.users.index': 'user-management',
                        'admin.role-permissions.index': 'user-management',
                        'admin.app-settings.index': 'app-settings',
                    };
                    const menuKey = keyMap[item.route];
                    return !menuKey || accessibleMenus.includes(menuKey);
                });

                if (visibleItems.length === 0) return null;

                return (
                    <div key={grp.group}>
                        <p className="px-3 pb-2 text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">{grp.group}</p>
                        <ul className="space-y-1">
                            {visibleItems.map((item) => {
                                const href = route(item.route);
                                const active = url === new URL(href, window.location.origin).pathname;
                                const Icon = item.icon;
                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={href}
                                            onClick={onNavigate}
                                            className={cn(
                                                'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all',
                                                active
                                                    ? 'bg-brand text-brand-foreground shadow-soft'
                                                    : 'text-navy/80 hover:bg-accent hover:text-accent-foreground',
                                            )}
                                        >
                                            <Icon className={cn('size-[1.15rem] shrink-0', active ? '' : 'text-muted-foreground group-hover:text-accent-foreground')} />
                                            <span className="flex-1 truncate">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </nav>
    );
}

function Brand() {
    return (
        <Link href={route('dashboard')} className="flex items-center gap-2 px-5 py-5">
            <span className="rounded-xl bg-white px-2.5 py-1.5 shadow-soft ring-1 ring-border">
                <img src="/images/logo.png" alt="ABHYUTHANAM" width={130} height={36} className="h-8 w-auto" />
            </span>
        </Link>
    );
}

function ProfileMenu({ user, initials, roleLabel }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-2 py-1.5 pr-3 transition hover:bg-muted"
            >
                <span className="grid size-8 place-items-center rounded-xl bg-brand text-sm font-bold text-brand-foreground">{initials}</span>
                <span className="hidden text-left sm:block">
                    <span className="block text-xs font-semibold leading-tight text-navy">{user?.name}</span>
                    <span className="block text-[0.65rem] capitalize leading-tight text-muted-foreground">{roleLabel}</span>
                </span>
                <ChevronDown className={cn('hidden size-4 text-muted-foreground transition-transform sm:block', open && 'rotate-180')} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-card"
                    >
                        <Link
                            href={route('admin.app-settings.index')}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-muted"
                        >
                            <Settings className="size-4 text-muted-foreground" /> Settings
                        </Link>
                        <Link
                            href={route('profile.edit')}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-navy transition hover:bg-muted"
                        >
                            <User className="size-4 text-muted-foreground" /> Profile
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                        >
                            <LogOut className="size-4" /> Logout
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AdminLayout({ title, children }) {
    const [open, setOpen] = useState(false);
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const initials = (user?.name || 'AU').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
    const roleLabel = user?.roles?.[0]?.name ? user.roles[0].name.replace(/_/g, ' ') : 'Admin';

    return (
        <div className="min-h-screen bg-eco/40">
            <Head title={title} />

            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card lg:flex">
                <Brand />
                <div className="flex-1 overflow-y-auto">
                    <NavLinks />
                </div>
                <div className="border-t border-border p-3">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                        <LogOut className="size-[1.15rem]" /> Logout
                    </Link>
                </div>
            </aside>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card lg:hidden"
                        >
                            <div className="flex items-center justify-between pr-3">
                                <Brand />
                                <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-muted">
                                    <X className="size-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto"><NavLinks onNavigate={() => setOpen(false)} /></div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main */}
            <div className="lg:pl-64">
                {/* Topbar */}
                <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
                    <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
                        <button onClick={() => setOpen(true)} className="grid size-10 shrink-0 place-items-center rounded-xl text-navy hover:bg-muted lg:hidden">
                            <Menu className="size-5" />
                        </button>
                        <h1 className="truncate text-lg font-bold text-navy lg:hidden">{title}</h1>
                        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                placeholder="Search requests, customers, scrap items…"
                                className="h-10 w-full rounded-2xl border border-border bg-eco/60 pl-10 pr-4 text-sm outline-none transition focus:border-brand focus:bg-card focus:ring-2 focus:ring-brand/20"
                            />
                        </div>
                        <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-3">
                            <button className="relative grid size-10 place-items-center rounded-xl text-navy hover:bg-muted">
                                <Bell className="size-5" />
                            </button>
                            <ProfileMenu user={user} initials={initials} roleLabel={roleLabel} />
                        </div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-brand/30 bg-accent px-4 py-3 text-sm font-medium text-accent-foreground">
                            <CheckCircle2 className="size-4 shrink-0" />
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                            <XCircle className="size-4 shrink-0" />
                            {flash.error}
                        </div>
                    )}
                    {children}
                </main>
            </div>
            <Toaster richColors position="top-right" />
        </div>
    );
}
