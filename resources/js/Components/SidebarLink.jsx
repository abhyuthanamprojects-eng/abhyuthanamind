import { Link } from '@inertiajs/react';

export default function SidebarLink({ active = false, icon = null, className = '', children, ...props }) {
    return (
        <li className={'sidebar-item' + (active ? ' selected' : '')}>
            <Link
                {...props}
                className={'sidebar-link' + (active ? ' active' : '') + ' ' + className}
            >
                {icon}
                <span className="hide-menu">{children}</span>
            </Link>
        </li>
    );
}
