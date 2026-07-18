import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Shield, Loader2, Check, X, Save } from 'lucide-react';

const MENU_ITEMS = [
    // Main
    { key: 'dashboard', label: 'Dashboard', group: 'Main' },
    { key: 'pickup-queries', label: 'Pickup Queries', group: 'Main' },
    { key: 'pickup-requests', label: 'Pickup Requests', group: 'Main' },
    { key: 'contact-queries', label: 'Contact Queries', group: 'Main' },
    { key: 'help-support', label: 'Help & Support', group: 'Main' },
    { key: 'customers-leads', label: 'Customers / Leads', group: 'Main' },
    // Website Content
    { key: 'static-pages', label: 'Static Pages', group: 'Website Content' },
    { key: 'page-sections', label: 'Page Sections (CMS)', group: 'Website Content' },
    { key: 'services', label: 'Services', group: 'Website Content' },
    { key: 'industries', label: 'Industries', group: 'Website Content' },
    { key: 'testimonials', label: 'Testimonials', group: 'Website Content' },
    { key: 'certificates', label: 'Certificates', group: 'Website Content' },
    { key: 'media-gallery', label: 'Media / Gallery', group: 'Website Content' },
    // Business Data
    { key: 'scrap-rate', label: 'Scrap Rate Management', group: 'Business Data' },
    { key: 'reports', label: 'Reports / Analytics', group: 'Business Data' },
    // Settings
    { key: 'app-settings', label: 'App Settings', group: 'Settings' },
];

export default function RolePermissions() {
    const { csrf_token } = usePage().props;
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (selectedRole) {
            fetchPermissions(selectedRole);
        }
    }, [selectedRole]);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin/roles');
            setRoles(data.data.roles);
            setSelectedRole(data.data.roles[0]);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load roles' });
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async (role) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/admin/role-permissions/${role}`);
            const permsMap = {};
            data.data.forEach(perm => {
                permsMap[perm.menu_key] = { can_access: perm.can_access, can_edit: perm.can_edit };
            });
            setPermissions(permsMap);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load permissions' });
        } finally {
            setLoading(false);
        }
    };

    const togglePermission = (menuKey, field) => {
        setPermissions(prev => ({
            ...prev,
            [menuKey]: {
                ...prev[menuKey],
                [field]: !prev[menuKey]?.[field]
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const permissionsArray = Object.entries(permissions).map(([menu_key, perm]) => ({
                menu_key,
                can_access: perm.can_access ?? false,
                can_edit: perm.can_edit ?? false,
            }));

            await axios.put(`/api/admin/role-permissions/${selectedRole}`, {
                permissions: permissionsArray
            });

            setMessage({ type: 'success', text: 'Permissions updated successfully' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save permissions' });
        } finally {
            setSaving(false);
        }
    };

    const groupedMenus = MENU_ITEMS.reduce((acc, item) => {
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
    }, {});

    return (
        <AdminLayout title="Role Permissions">
            <PageHeader title="Role Permissions" subtitle="Manage menu access for different user roles." />

            {message && (
                <div className={`mb-4 rounded-xl px-4 py-3 ${
                    message.type === 'success' 
                        ? 'border border-green-200 bg-green-50 text-green-800' 
                        : 'border border-red-200 bg-red-50 text-red-800'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Role Selector */}
                <div className="lg:col-span-1">
                    <Panel>
                        <h3 className="mb-3 text-sm font-bold text-navy">Select Role</h3>
                        <div className="space-y-2">
                            {roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                                        selectedRole === role
                                            ? 'bg-brand text-brand-foreground'
                                            : 'border border-border bg-card hover:bg-muted'
                                    }`}
                                >
                                    <span className="capitalize">{role}</span>
                                </button>
                            ))}
                        </div>
                    </Panel>
                </div>

                {/* Permissions List */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="animate-spin text-brand" />
                        </div>
                    ) : (
                        <>
                            {Object.entries(groupedMenus).map(([group, items]) => (
                                <Panel key={group} className="mb-4">
                                    <h4 className="mb-4 text-sm font-bold uppercase text-navy/80">{group}</h4>
                                    <div className="space-y-3">
                                        {items.map(item => {
                                            const perm = permissions[item.key];
                                            return (
                                                <div key={item.key} className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0">
                                                    <label className="flex-1 cursor-pointer text-sm font-medium text-navy">
                                                        {item.label}
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => togglePermission(item.key, 'can_access')}
                                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                                                                perm?.can_access
                                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                            title="Can Access"
                                                        >
                                                            {perm?.can_access ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                                                            <span>Access</span>
                                                        </button>
                                                        <button
                                                            onClick={() => togglePermission(item.key, 'can_edit')}
                                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                                                                perm?.can_edit
                                                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                            title="Can Edit"
                                                        >
                                                            {perm?.can_edit ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                                                            <span>Edit</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Panel>
                            ))}

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground transition hover:bg-brand/90 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="animate-spin size-4" /> : <Save className="size-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
