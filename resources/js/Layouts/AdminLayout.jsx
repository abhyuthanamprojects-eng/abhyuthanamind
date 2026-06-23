import { useState } from 'react';
import { Link, Head, usePage, router } from '@inertiajs/react';
import { LayoutGrid, Settings, FileText, Mail, HelpCircle, Menu, Search, User, LogOut, CheckCircle2, XCircle } from 'lucide-react';
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
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-sidebartype="full">
            <Head>
                <link rel="stylesheet" href="/admin-theme/css/styles.min.css" />
                <link rel="stylesheet" href="/admin-theme/css/overrides.css" />
            </Head>

            {/* Sidebar Overlay for Mobile */}
            <div
                className={`fixed z-20 inset-0 bg-black/50 transition-opacity lg:hidden ${
                    showingSidebar ? 'block' : 'hidden'
                }`}
                onClick={() => setShowingSidebar(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`left-sidebar fixed z-30 inset-y-0 left-0 transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
                    showingSidebar ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                }`}
            >
                <div className="brand-logo d-flex align-items-center justify-content-center py-4">
                    <a href="/" className="text-nowrap logo-img">
                        <ApplicationLogo className="w-auto" style={{ height: '40px' }} />
                    </a>
                </div>

                <nav className="sidebar-nav scroll-sidebar">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
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
                    </ul>
                </nav>
            </aside>

            <div className="body-wrapper">
                <header className="app-header">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <ul className="navbar-nav">
                            <li className="nav-item d-block d-xl-none">
                                <a className="nav-link sidebartoggler" href="javascript:void(0)" onClick={(e) => { e.preventDefault(); setShowingSidebar(true); }}>
                                    <Menu size={20} />
                                </a>
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
