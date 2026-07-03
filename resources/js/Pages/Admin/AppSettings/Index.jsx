import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';
import { cn } from '@/lib/utils';

const tabs = [
    ['features', 'Feature Toggles'],
    ['config', 'General Config'],
    ['intervals', 'Performance & Intervals'],
    ['msg91', 'SMS Gateway'],
    ['banners', 'Home Banners'],
    ['founders', 'Founders'],
];

export default function Index({ settings, homeBanners = [], foundersData = [], ownerMedia = [] }) {
    const normalizeCsvValue = (value) => Array.isArray(value) ? value.join(', ') : (value ?? '');

    const { data, setData, post, processing, errors } = useForm({
        ...settings,
        donation_products: normalizeCsvValue(settings.donation_products),
        corporate_meeting_types: normalizeCsvValue(settings.corporate_meeting_types),
        scrap_proof_image_labels: normalizeCsvValue(settings.scrap_proof_image_labels),
        serviceable_pincodes: normalizeCsvValue(settings.serviceable_pincodes),
    });

    const [activeTab, setActiveTab] = useState('features');

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.app-settings.update'));
    };

    const Toggle = ({ name, label, description }) => (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-eco/40 p-4">
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={!!data[name]}
                onClick={() => setData(name, !data[name])}
                className={cn('relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition', data[name] ? 'bg-brand' : 'bg-muted')}
            >
                <span className={cn('inline-block size-5 rounded-full bg-white shadow transition', data[name] ? 'translate-x-5' : 'translate-x-1')} />
            </button>
        </div>
    );

    const Input = ({ name, label, type = 'text', description, ...props }) => (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-navy">{label}</label>
            <input
                {...props}
                type={type}
                value={data[name] ?? ''}
                onChange={(e) => setData(name, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.currentTarget.blur();
                    }
                    props.onKeyDown?.(e);
                }}
                className="h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {errors[name] && <p className="text-xs font-medium text-rose-600">{errors[name]}</p>}
        </div>
    );

    return (
        <AdminLayout title="App Settings">
            <PageHeader title="App Settings" subtitle="Manage mobile app feature flags and global configurations." />

            <div className="mb-4 flex flex-wrap gap-2">
                {tabs.map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setActiveTab(key)}
                        className={cn(
                            'rounded-2xl px-4 py-2 text-sm font-semibold transition',
                            activeTab === key ? 'bg-brand text-brand-foreground shadow-soft' : 'border border-border bg-card text-navy hover:bg-muted',
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {activeTab === 'banners' ? (
                <Panel>
                    <HomeBanners banners={homeBanners} />
                </Panel>
            ) : activeTab === 'founders' ? (
                <Panel>
                    <FoundersEditor foundersData={foundersData} ownerMedia={ownerMedia} />
                </Panel>
            ) : (
                <Panel>
                    <form onSubmit={submit}>
                        {activeTab === 'features' && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Toggle name="donation_enabled" label="Donations" description="Enable scrap donation feature in app" />
                                <Toggle name="scrap_pickup_enabled" label="Scrap Pickup" description="Enable scrap pickup booking feature" />
                                <Toggle name="reschedule_enabled" label="Rescheduling" description="Allow customers to reschedule bookings" />
                                <Toggle name="verification_required" label="KYC Verification" description="Require KYC for certain features" />
                                <Toggle name="manual_item_add_edit_enabled" label="Manual Item Edit" description="Allow users to edit items during pickup" />
                                <Toggle name="bill_generation_enabled" label="Bill Generation" description="Auto-generate digital bills after pickup" />
                                <Toggle name="scrap_proof_images_required" label="Mandatory Scrap Proof Images" description="Require all proof labels before scrap booking submit" />
                            </div>
                        )}

                        {activeTab === 'config' && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Input name="app_version" label="App Version" description="Current stable version (e.g. 1.0.5)" />
                                <Input name="customer_support_number" label="Customer Support Number" />
                                <Input name="support_phone" label="Secondary Support Phone" />
                                <Input name="feedback_url" label="Feedback Link (Sent via SMS)" description="The URL sent to customers for feedback after pickup" />
                                <Input name="default_city_id" label="Default City ID" type="number" />
                                <Input name="minimum_free_pickup_amount" label="Minimum Free Pickup Amount (₹)" type="number" description="If estimated amount is below this, shipping charge will be deducted." />
                                <Input name="low_value_shipping_charge" label="Low Value Shipping Charge (₹)" type="number" description="Shipping deduction applied when booking value is below minimum free pickup amount." />
                                <Input name="serviceable_pincodes" label="Serviceable Pincodes (comma separated)" description="Pincodes where pickup/donation booking is allowed. Leave empty to serve everywhere." />
                                <Input name="donation_products" label="Donation Products (comma separated)" description="Example: Cloth, Shoes, Toys, Books" />

                                <div className="col-span-full border-t border-border pt-4">
                                    <h3 className="text-sm font-bold text-navy">App Update / Force Update</h3>
                                    <p className="mt-1 text-xs text-muted-foreground">Controls the old-version update popup shown to users.</p>
                                </div>
                                <Input name="latest_version" label="Latest Version" description="Newest version available on the stores (e.g. 2.1.0)" />
                                <Input name="min_version" label="Minimum Supported Version" description="Versions below this are forced to update" />
                                <Toggle name="force_update" label="Force Update" description="If enabled, users below Minimum Supported Version cannot use the app until they update" />
                                <Input name="android_url" label="Android Play Store URL" />
                                <Input name="ios_url" label="iOS App Store URL" />

                                <div className="col-span-full rounded-2xl border border-sky-200 bg-sky-50 p-4">
                                    <p className="text-sm font-semibold text-sky-900">Corporate Categories</p>
                                    <p className="mt-1 text-sm text-sky-800">{normalizeCsvValue(settings.corporate_categories) || 'No corporate categories enabled.'}</p>
                                    <p className="mt-1 text-xs text-sky-700">Use Category Types and enable "Show In Corporate Booking" for the corporate flow.</p>
                                </div>
                                <Input name="corporate_meeting_types" label="Corporate Meeting Types (comma separated)" description="Example: in_person, google_meet, skype" />
                                <Input name="scrap_proof_image_labels" label="Scrap Proof Image Labels (comma separated)" description="Example: front, back, left, right" />
                            </div>
                        )}

                        {activeTab === 'intervals' && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Input name="pickup_boy_location_interval_seconds" label="Location Update Interval" type="number" description="Seconds between pickup boy GPS updates" />
                                <Input name="tracking_refresh_interval_seconds" label="Tracking Refresh Interval" type="number" description="Seconds for customer tracking map refresh" />
                                <Input name="dashboard_refresh_interval_seconds" label="Dashboard Sync Interval" type="number" description="Seconds for data re-sync on mobile home" />
                                <Input name="max_reschedule_hours_before_slot" label="Reschedule Buffer (Hours)" type="number" description="Minimum hours before slot to allow reschedule" />
                            </div>
                        )}

                        {activeTab === 'msg91' && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="col-span-full rounded-2xl border border-sky-200 bg-sky-50 p-4">
                                    <p className="text-sm font-medium text-sky-900">
                                        Configure your MSG91 (SMS Gateway) credentials here. These settings will override any values set in the environment files.
                                    </p>
                                </div>
                                <Input name="msg91_auth_key" label="Auth Key" description="Your MSG91 API Authentication Key" />
                                <Input name="msg91_sender_id" label="Sender ID" description="6-character approved Sender ID (e.g., SCRPI)" />
                                <Input name="msg91_otp_template_id" label="OTP Template ID" description="DLT approved template ID for OTPs" />
                                <Input name="msg91_sms_template_id" label="SMS Flow ID" description="Default Flow/Template ID for transactional SMS" />

                                <div className="col-span-full border-t border-border pt-4">
                                    <h3 className="text-sm font-bold text-navy">Event Specific Templates (Flow IDs)</h3>
                                </div>

                                <Input name="msg91_pickup_booked_template_id" label="Pickup Booked Template ID" />
                                <Input name="msg91_pickup_completed_template_id" label="Pickup Completed Template ID" />
                                <Input name="msg91_payment_feedback_template_id" label="Payment & Feedback Template ID" />
                                <Input name="msg91_pickup_rescheduled_template_id" label="Pickup Rescheduled Template ID" />

                                <div className="col-span-full border-t border-border pt-4">
                                    <Input name="msg91_country_code" label="Country Code" description="Default country code (e.g., 91 for India)" />
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                            >
                                {processing ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </Panel>
            )}
        </AdminLayout>
    );
}

function FoundersEditor({ foundersData = [], ownerMedia = [] }) {
    const [founders, setFounders] = useState(
        foundersData.length > 0 ? foundersData : [
            { name: '', role: '', bio: '', leads: '', linkedin_url: '', tagline: '', message: '', media_id: null },
            { name: '', role: '', bio: '', leads: '', linkedin_url: '', tagline: '', message: '', media_id: null },
        ]
    );
    const [saving, setSaving] = useState(false);

    const update = (index, field, value) => {
        setFounders((prev) => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
    };

    const handleSave = () => {
        setSaving(true);
        router.post(route('admin.app-settings.update'), { founders_data: founders }, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    const inputCls = 'h-10 w-full rounded-xl border border-border bg-card px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';

    return (
        <div>
            <div className="mb-5">
                <h3 className="text-sm font-bold text-navy">Founder Profiles</h3>
                <p className="mt-1 text-xs text-muted-foreground">Edit founder info shown on the About page. Upload owner photos in Media &rarr; Owner category first.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {founders.map((f, i) => (
                    <div key={i} className="rounded-2xl border border-border p-5 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Founder {i + 1}</p>
                        {/* Photo select */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Photo (Owner Media)</label>
                            <div className="flex items-center gap-3">
                                {f.media_id && ownerMedia.find((m) => m.id === f.media_id) && (
                                    <img
                                        src={ownerMedia.find((m) => m.id === f.media_id)?.file_url}
                                        alt="owner"
                                        className="size-16 rounded-xl object-cover border border-border"
                                    />
                                )}
                                <select
                                    value={f.media_id ?? ''}
                                    onChange={(e) => update(i, 'media_id', e.target.value ? Number(e.target.value) : null)}
                                    className={inputCls + ' flex-1'}
                                >
                                    <option value="">— select photo —</option>
                                    {ownerMedia.map((m) => (
                                        <option key={m.id} value={m.id}>{m.title || `Owner #${m.id}`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Full Name</label>
                            <input className={inputCls} value={f.name} onChange={(e) => update(i, 'name', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Role / Designation</label>
                            <input className={inputCls} value={f.role} onChange={(e) => update(i, 'role', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Bio</label>
                            <textarea
                                rows={3}
                                value={f.bio}
                                onChange={(e) => update(i, 'bio', e.target.value)}
                                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Leads / Focus Area</label>
                            <input className={inputCls} value={f.leads} placeholder="e.g. Leads: Strategy & Operations" onChange={(e) => update(i, 'leads', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">LinkedIn URL</label>
                            <input className={inputCls} type="url" value={f.linkedin_url} placeholder="https://linkedin.com/in/..." onChange={(e) => update(i, 'linkedin_url', e.target.value)} />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Tagline</label>
                            <input className={inputCls} value={f.tagline ?? ''} placeholder="e.g. Building a greener India, one pickup at a time." onChange={(e) => update(i, 'tagline', e.target.value)} />
                            <p className="mt-1 text-xs text-muted-foreground">Short one-liner shown below the founder's name on the About page.</p>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-navy">Personal Message / Quote</label>
                            <textarea
                                rows={3}
                                value={f.message ?? ''}
                                onChange={(e) => update(i, 'message', e.target.value)}
                                placeholder='e.g. "We believe every device deserves a responsible end-of-life."'
                                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                            />
                            <p className="mt-1 text-xs text-muted-foreground">Optional quote shown as a highlighted callout on the About page.</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-2xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                >
                    {saving ? 'Saving…' : 'Save Founders'}
                </button>
            </div>
        </div>
    );
}

const MAX_BANNER_SIZE_MB = 8;
const MAX_BANNER_SIZE_BYTES = MAX_BANNER_SIZE_MB * 1024 * 1024;

function HomeBanners({ banners = [] }) {
    const [newFile, setNewFile] = useState(null);
    const [newPreview, setNewPreview] = useState(null);
    const [newText, setNewText] = useState('');
    const [newFileError, setNewFileError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [replaceErrors, setReplaceErrors] = useState({});
    const [textDrafts, setTextDrafts] = useState(() =>
        Object.fromEntries(banners.map((banner) => [banner.id, banner.text ?? '']))
    );
    const [savingTextId, setSavingTextId] = useState(null);

    const handleNewFileChange = (file) => {
        if (file && file.size > MAX_BANNER_SIZE_BYTES) {
            setNewFileError(`Image is too large. Maximum allowed size is ${MAX_BANNER_SIZE_MB} MB.`);
            setNewFile(null);
            setNewPreview(null);
            return;
        }

        setNewFileError(null);
        setNewFile(file);
        setNewPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newFile) return;

        const formData = new FormData();
        formData.append('image', newFile);
        formData.append('text', newText ?? '');

        setProcessing(true);
        router.post(route('admin.home-banners.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setNewFile(null);
                setNewPreview(null);
                setNewText('');
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleTextUpdate = (banner, text) => {
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('text', text ?? '');

        setSavingTextId(banner.id);
        router.post(route('admin.home-banners.update', banner.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSavingTextId(null),
        });
    };

    const handleImageReplace = (banner, file) => {
        if (!file) return;

        if (file.size > MAX_BANNER_SIZE_BYTES) {
            setReplaceErrors((prev) => ({
                ...prev,
                [banner.id]: `Image is too large. Maximum allowed size is ${MAX_BANNER_SIZE_MB} MB.`,
            }));
            return;
        }

        setReplaceErrors((prev) => ({ ...prev, [banner.id]: null }));

        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('image', file);

        router.post(route('admin.home-banners.update', banner.id), formData, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleRemove = (banner) => {
        if (!window.confirm('Remove this banner?')) return;

        router.delete(route('admin.home-banners.destroy', banner.id), {
            preserveScroll: true,
        });
    };

    const handleMove = (index, direction) => {
        const newOrder = [...banners];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newOrder.length) return;

        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

        router.post(route('admin.home-banners.reorder'), {
            ids: newOrder.map((b) => b.id),
        }, {
            preserveScroll: true,
        });
    };

    const fileInputClass = 'block w-full text-xs text-muted-foreground file:mr-3 file:rounded-xl file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent-foreground';
    const textInputClass = 'h-9 w-full rounded-xl border border-border bg-card px-3 text-xs outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';

    return (
        <div>
            <div className="mb-5">
                <h3 className="text-sm font-bold text-navy">Home Screen Banner Slider</h3>
                <p className="mt-1 text-xs text-muted-foreground">Add any number of images shown in the rotating banner on the customer app home screen. Tapping any banner takes the user to the category selection screen.</p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {banners.map((banner, index) => (
                    <div key={banner.id} className="flex flex-col gap-2 rounded-2xl border border-border p-3">
                        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                            <img src={banner.image_url} alt={`Banner ${index + 1}`} className="h-full w-full object-cover" />
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageReplace(banner, e.target.files?.[0] ?? null)} className={fileInputClass} />
                        {replaceErrors[banner.id] && <p className="text-xs font-medium text-rose-600">{replaceErrors[banner.id]}</p>}
                        <input
                            type="text"
                            value={textDrafts[banner.id] ?? ''}
                            onChange={(e) => setTextDrafts((prev) => ({ ...prev, [banner.id]: e.target.value }))}
                            placeholder="Optional overlay text (e.g. Sell your scrap today!)"
                            maxLength={120}
                            className={textInputClass}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground">Change text and click save.</p>
                            <button
                                type="button"
                                onClick={() => handleTextUpdate(banner, textDrafts[banner.id] ?? '')}
                                disabled={savingTextId === banner.id}
                                className="rounded-xl bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground transition hover:bg-brand-dark disabled:opacity-60"
                            >
                                {savingTextId === banner.id ? 'Saving…' : 'Save Text'}
                            </button>
                        </div>
                        <div className="flex items-center justify-between border-t border-border pt-2">
                            <div className="flex gap-1">
                                <button type="button" onClick={() => handleMove(index, -1)} disabled={index === 0} className="grid size-7 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted disabled:opacity-40">
                                    <ArrowUp className="size-3.5" />
                                </button>
                                <button type="button" onClick={() => handleMove(index, 1)} disabled={index === banners.length - 1} className="grid size-7 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted disabled:opacity-40">
                                    <ArrowDown className="size-3.5" />
                                </button>
                            </div>
                            <button type="button" onClick={() => handleRemove(banner)} className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline">
                                <Trash2 className="size-3.5" /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAdd} className="border-t border-border pt-5">
                <h3 className="mb-3 text-sm font-bold text-navy">Add New Banner</h3>
                <div className="flex max-w-md flex-col gap-2.5">
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-eco/40">
                        {newPreview ? (
                            <img src={newPreview} alt="New banner preview" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-xs text-muted-foreground">No image selected</span>
                        )}
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleNewFileChange(e.target.files?.[0] ?? null)} className={fileInputClass} />
                    {newFileError && <p className="text-xs font-medium text-rose-600">{newFileError}</p>}
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Optional overlay text (e.g. Sell your scrap today!)"
                        maxLength={120}
                        className={textInputClass}
                    />
                    <button
                        type="submit"
                        disabled={processing || !newFile}
                        className="self-start rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60"
                    >
                        {processing ? 'Adding…' : 'Add Banner'}
                    </button>
                </div>
            </form>
        </div>
    );
}
