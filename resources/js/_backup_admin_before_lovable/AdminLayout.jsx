import { useState } from 'react';
import { Link, Head, usePage, router } from '@inertiajs/react';
import {
    LayoutGrid, Settings, FileText, Mail, HelpCircle, Menu, Search, User, LogOut, CheckCircle2, XCircle, MoreHorizontal, X, Bell,
    SlidersHorizontal, AlertTriangle, BookMarked, Type, Smile, Globe2,
} from 'lucide-react';
import SidebarLink from '@/Components/SidebarLink';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AdminLayout({ children }) {
    const [showingSidebar, setShowingSidebar] = useState(false);
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash || {};

    const isAdmin = user.roles.some(r => r.name === 'admin');

    return (
        <div
            className={`page-wrapper${showingSidebar ? ' show-sidebar' : ''}`}
            id="main-wrapper"
            data-layout="vertical"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
        >
            <Head>
                <link rel="stylesheet" href="/admin-theme/css/styles.min.css" />
                <style>{`
                    #main-wrapper[data-layout="vertical"][data-sidebar-position="fixed"] .left-sidebar { top: 0 !important; }
                    #main-wrapper[data-layout="vertical"][data-header-position="fixed"] .app-header {
                        top: 0 !important;
                        left: 260px !important;
                        width: calc(100% - 260px) !important;
                        box-shadow: 0 1px 10px rgba(0,0,0,0.06);
                    }
                    @media (max-width: 1199px) {
                        #main-wrapper[data-header-position="fixed"] .app-header { left: 0 !important; width: 100% !important; }
                    }
                    .body-wrapper .container-fluid { padding-top: 94px !important; }
                    @media (max-width: 991.98px) {
                        .body-wrapper .container-fluid { padding-top: 100px !important; }
                    }
                    .app-header .navbar { flex-wrap: nowrap !important; }
                    .app-header .navbar-nav { flex-direction: row !important; }
                    .app-header .navbar-nav .nav-link { height: auto !important; line-height: normal !important; }
                `}</style>
            </Head>

            {/* Sidebar Overlay for Mobile */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 d-xl-none ${showingSidebar ? 'd-block' : 'd-none'}`}
                style={{ zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={() => setShowingSidebar(false)}
            ></div>

            {/* Sidebar */}
            <aside className="left-sidebar">
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <a href="/" className="text-nowrap logo-img">
                            <ApplicationLogo className="w-auto" style={{ height: '40px' }} />
                        </a>
                        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" onClick={() => setShowingSidebar(false)}>
                            <X size={18} />
                        </div>
                    </div>

                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <MoreHorizontal size={16} className="nav-small-cap-icon fs-4" />
                                <span className="hide-menu">Main menu</span>
                            </li>

                            <SidebarLink href={route('dashboard')} active={route().current('dashboard')} icon={<LayoutGrid size={18} />}>
                                Dashboard
                            </SidebarLink>

                            {isAdmin && (
                                <>
                                    <SidebarLink href={route('admin.app-settings.index')} active={route().current('admin.app-settings.*')} icon={<Settings size={18} />}>
                                        App Settings
                                    </SidebarLink>

                                    <li className="nav-small-cap">
                                        <MoreHorizontal size={16} className="nav-small-cap-icon fs-4" />
                                        <span className="hide-menu">Content</span>
                                    </li>

                                    <SidebarLink href={route('admin.pages.index')} active={route().current('admin.pages.*')} icon={<FileText size={18} />}>
                                        Static Pages
                                    </SidebarLink>

                                    <SidebarLink href={route('admin.contacts.index')} active={route().current('admin.contacts.*')} icon={<Mail size={18} />}>
                                        Contact Queries
                                    </SidebarLink>

                                    <SidebarLink href={route('admin.help-support.index')} active={route().current('admin.help-support.*')} icon={<HelpCircle size={18} />}>
                                        Help & Support
                                    </SidebarLink>
                                </>
                            )}

                            <li><span className="sidebar-divider lg"></span></li>
                            <li className="nav-small-cap">
                                <MoreHorizontal size={16} className="nav-small-cap-icon fs-4" />
                                <span className="hide-menu">UI</span>
                            </li>
                            <SidebarLink href={route('admin.theme.buttons')} active={route().current('admin.theme.buttons')} icon={<SlidersHorizontal size={18} />}>Buttons</SidebarLink>
                            <SidebarLink href={route('admin.theme.alerts')} active={route().current('admin.theme.alerts')} icon={<AlertTriangle size={18} />}>Alerts</SidebarLink>
                            <SidebarLink href={route('admin.theme.card')} active={route().current('admin.theme.card')} icon={<BookMarked size={18} />}>Card</SidebarLink>
                            <SidebarLink href={route('admin.theme.forms')} active={route().current('admin.theme.forms')} icon={<FileText size={18} />}>Forms</SidebarLink>
                            <SidebarLink href={route('admin.theme.typography')} active={route().current('admin.theme.typography')} icon={<Type size={18} />}>Typography</SidebarLink>

                            <li><span className="sidebar-divider lg"></span></li>
                            <li className="nav-small-cap">
                                <MoreHorizontal size={16} className="nav-small-cap-icon fs-4" />
                                <span className="hide-menu">Extra</span>
                            </li>
                            <SidebarLink href={route('admin.theme.icons')} active={route().current('admin.theme.icons')} icon={<Smile size={18} />}>Tabler Icon</SidebarLink>
                            <SidebarLink href={route('admin.theme.sample-page')} active={route().current('admin.theme.sample-page')} icon={<Globe2 size={18} />}>Sample Page</SidebarLink>
                        </ul>
                    </nav>
                </div>
            </aside>

            <div className="body-wrapper">
                <header className="app-header">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item d-block d-xl-none">
                                <a className="nav-link sidebartoggler" href="javascript:void(0)" onClick={(e) => { e.preventDefault(); setShowingSidebar(true); }}>
                                    <Menu size={20} />
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="nav-link border-0 bg-transparent position-relative">
                                            <Bell size={20} />
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content width="auto" contentClasses="dropdown-menu dropdown-menu-animate-up show position-static border-0 shadow">
                                        <div className="message-body">
                                            <a href="javascript:void(0)" className="dropdown-item">No new notifications</a>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                            <li className="nav-item d-none d-md-block">
                                <div className="d-flex align-items-center position-relative">
                                    <Search size={16} className="position-absolute ms-3 text-secondary" />
                                    <input type="text" className="form-control ps-5" style={{ minWidth: '280px' }} placeholder="Search data, users, or reports" />
                                </div>
                            </li>
                        </ul>

                        <div className="navbar-collapse justify-content-end px-0">
                            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="nav-link border-0 bg-transparent d-flex align-items-center">
                                            <img
                                                className="rounded-circle"
                                                width="35"
                                                height="35"
                                                src={user.profile_photo_url || `https://ui-avatars.com/api/?name=${user.name}&background=f4f7f6&color=2F7D4F`}
                                                alt={user.name}
                                            />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="auto" contentClasses="dropdown-menu dropdown-menu-end dropdown-menu-animate-up show position-static border-0 shadow">
                                        <div className="message-body">
                                            <DropdownLink href={route('profile.edit')} className="d-flex align-items-center gap-2 dropdown-item">
                                                <User size={16} /> Profile
                                            </DropdownLink>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="d-flex align-items-center gap-2 dropdown-item w-100 border-0 bg-transparent text-start"
                                            >
                                                <LogOut size={16} /> Log Out
                                            </Link>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                            </ul>
                        </div>
                    </nav>
                </header>

                <div className="body-wrapper-inner">
                    <div className="container-fluid">
                        {flash.success && (
                            <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
                                <CheckCircle2 size={18} className="flex-shrink-0" />
                                <span>{flash.success}</span>
                            </div>
                        )}
                        {flash.error && (
                            <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                                <XCircle size={18} className="flex-shrink-0" />
                                <span>{flash.error}</span>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
