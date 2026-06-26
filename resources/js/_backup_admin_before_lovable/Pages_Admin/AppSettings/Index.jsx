import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminHeader from '@/Components/Admin/AdminHeader';
import { Settings } from 'lucide-react';

export default function Index({ settings, homeBanners = [] }) {
    const normalizeCsvValue = (value) => Array.isArray(value) ? value.join(', ') : (value ?? '');

    const { data, setData, post, processing, errors } = useForm({
        ...settings,
        donation_products: normalizeCsvValue(settings.donation_products),
        corporate_meeting_types: normalizeCsvValue(settings.corporate_meeting_types),
        scrap_proof_image_labels: normalizeCsvValue(settings.scrap_proof_image_labels),
    });

    const [activeTab, setActiveTab] = useState('features');

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.app-settings.update'));
    };

    const Toggle = ({ name, label, description }) => (
        <div className="d-flex align-items-center justify-content-between gap-3 p-3 bg-light rounded border">
            <div className="flex-grow-1">
                <label className="fw-semibold d-block">{label}</label>
                <p className="text-secondary fs-2 mb-0">{description}</p>
            </div>
            <div className="form-check form-switch m-0">
                <input
                    type="checkbox"
                    role="switch"
                    className="form-check-input"
                    checked={!!data[name]}
                    onChange={() => setData(name, !data[name])}
                />
            </div>
        </div>
    );

    const Input = ({ name, label, type = "text", description, ...props }) => (
        <div className="d-flex flex-column gap-1">
            <label className="fw-semibold">{label}</label>
            <input
                {...props}
                type={type}
                value={data[name] ?? ''}
                onChange={e => setData(name, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.currentTarget.blur();
                    }
                    props.onKeyDown?.(e);
                }}
                className="form-control"
            />
            {description && <p className="text-secondary fs-2 mb-0">{description}</p>}
            {errors[name] && <p className="text-danger fs-2 mt-1 mb-0">{errors[name]}</p>}
        </div>
    );

    return (
        <AdminLayout>
            <Head title="App Settings" />

            <div className="mx-auto" style={{ maxWidth: '64rem' }}>
                <AdminHeader
                    title="App Settings"
                    subtitle="Manage mobile app feature flags and global configurations."
                    icon={<Settings size={20} />}
                />

                <div className="card w-100">
                    <div className="card-header bg-transparent p-0">
                        <ul className="nav nav-tabs px-3">
                            {[
                                ['features', 'Feature Toggles'],
                                ['config', 'General Config'],
                                ['intervals', 'Performance & Intervals'],
                                ['msg91', 'SMS Gateway'],
                                ['banners', 'Home Banners'],
                            ].map(([key, label]) => (
                                <li className="nav-item" key={key}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab(key)}
                                        className={`nav-link ${activeTab === key ? 'active' : ''}`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {activeTab === 'banners' && (
                        <div className="card-body">
                            <HomeBanners banners={homeBanners} />
                        </div>
                    )}

                    {activeTab !== 'banners' && (
                    <form onSubmit={submit} className="card-body">
                        {activeTab === 'features' && (
                            <div className="row g-3">
                                <div className="col-12 col-md-6"><Toggle name="donation_enabled" label="Donations" description="Enable scrap donation feature in app" /></div>
                                <div className="col-12 col-md-6"><Toggle name="scrap_pickup_enabled" label="Scrap Pickup" description="Enable scrap pickup booking feature" /></div>
                                <div className="col-12 col-md-6"><Toggle name="reschedule_enabled" label="Rescheduling" description="Allow customers to reschedule bookings" /></div>
                                <div className="col-12 col-md-6"><Toggle name="verification_required" label="KYC Verification" description="Require KYC for certain features" /></div>
                                <div className="col-12 col-md-6"><Toggle name="manual_item_add_edit_enabled" label="Manual Item Edit" description="Allow users to edit items during pickup" /></div>
                                <div className="col-12 col-md-6"><Toggle name="bill_generation_enabled" label="Bill Generation" description="Auto-generate digital bills after pickup" /></div>
                                <div className="col-12 col-md-6"><Toggle name="scrap_proof_images_required" label="Mandatory Scrap Proof Images" description="Require all proof labels before scrap booking submit" /></div>
                            </div>
                        )}

                        {activeTab === 'config' && (
                            <div className="row g-3">
                                <div className="col-12 col-md-6"><Input name="app_version" label="App Version" description="Current stable version (e.g. 1.0.5)" /></div>
                                <div className="col-12 col-md-6"><Input name="customer_support_number" label="Customer Support Number" /></div>
                                <div className="col-12 col-md-6"><Input name="support_phone" label="Secondary Support Phone" /></div>
                                <div className="col-12 col-md-6"><Input name="feedback_url" label="Feedback Link (Sent via SMS)" description="The URL sent to customers for feedback after pickup" /></div>
                                <div className="col-12 col-md-6"><Input name="default_city_id" label="Default City ID" type="number" /></div>
                                <div className="col-12 col-md-6"><Input name="minimum_free_pickup_amount" label="Minimum Free Pickup Amount (₹)" type="number" description="If estimated amount is below this, shipping charge will be deducted." /></div>
                                <div className="col-12 col-md-6"><Input name="low_value_shipping_charge" label="Low Value Shipping Charge (₹)" type="number" description="Shipping deduction applied when booking value is below minimum free pickup amount." /></div>
                                <div className="col-12 col-md-6"><Input name="warehouse_service_pincodes_limit" label="Warehouse Service Pincode Limit" type="number" description="Maximum number of service pincodes allowed per warehouse." /></div>
                                <div className="col-12 col-md-6"><Input name="donation_products" label="Donation Products (comma separated)" description="Example: Cloth, Shoes, Toys, Books" /></div>

                                <div className="col-12 border-top pt-3 mt-2">
                                    <h6 className="fw-semibold mb-1">App Update / Force Update</h6>
                                    <p className="text-secondary fs-2 mb-3">Controls the old-version update popup shown to users.</p>
                                </div>
                                <div className="col-12 col-md-6"><Input name="latest_version" label="Latest Version" description="Newest version available on the stores (e.g. 2.1.0)" /></div>
                                <div className="col-12 col-md-6"><Input name="min_version" label="Minimum Supported Version" description="Versions below this are forced to update" /></div>
                                <div className="col-12 col-md-6"><Toggle name="force_update" label="Force Update" description="If enabled, users below Minimum Supported Version cannot use the app until they update" /></div>
                                <div className="col-12 col-md-6"><Input name="android_url" label="Android Play Store URL" /></div>
                                <div className="col-12 col-md-6"><Input name="ios_url" label="iOS App Store URL" /></div>

                                <div className="col-12">
                                    <div className="rounded border border-info bg-info-subtle p-3">
                                        <label className="fw-semibold">Corporate Categories</label>
                                        <p className="mt-1 mb-1 text-info-emphasis">{normalizeCsvValue(settings.corporate_categories) || 'No corporate categories enabled.'}</p>
                                        <p className="mt-1 mb-0 text-info fs-2">Use Category Types and enable "Show In Corporate Booking" for the corporate flow.</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6"><Input name="corporate_meeting_types" label="Corporate Meeting Types (comma separated)" description="Example: in_person, google_meet, skype" /></div>
                                <div className="col-12 col-md-6"><Input name="scrap_proof_image_labels" label="Scrap Proof Image Labels (comma separated)" description="Example: front, back, left, right" /></div>
                            </div>
                        )}

                        {activeTab === 'intervals' && (
                            <div className="row g-3">
                                <div className="col-12 col-md-6"><Input name="pickup_boy_location_interval_seconds" label="Location Update Interval" type="number" description="Seconds between pickup boy GPS updates" /></div>
                                <div className="col-12 col-md-6"><Input name="tracking_refresh_interval_seconds" label="Tracking Refresh Interval" type="number" description="Seconds for customer tracking map refresh" /></div>
                                <div className="col-12 col-md-6"><Input name="dashboard_refresh_interval_seconds" label="Dashboard Sync Interval" type="number" description="Seconds for data re-sync on mobile home" /></div>
                                <div className="col-12 col-md-6"><Input name="max_reschedule_hours_before_slot" label="Reschedule Buffer (Hours)" type="number" description="Minimum hours before slot to allow reschedule" /></div>
                            </div>
                        )}

                        {activeTab === 'msg91' && (
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className="rounded border border-info bg-info-subtle p-3">
                                        <p className="text-info-emphasis fs-2 fw-medium mb-0">
                                            Configure your MSG91 (SMS Gateway) credentials here. These settings will override any values set in the environment files.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6"><Input name="msg91_auth_key" label="Auth Key" description="Your MSG91 API Authentication Key" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_sender_id" label="Sender ID" description="6-character approved Sender ID (e.g., SCRPI)" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_otp_template_id" label="OTP Template ID" description="DLT approved template ID for OTPs" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_sms_template_id" label="SMS Flow ID" description="Default Flow/Template ID for transactional SMS" /></div>

                                <div className="col-12 border-top pt-3 mt-2">
                                    <h6 className="fw-semibold mb-3">Event Specific Templates (Flow IDs)</h6>
                                </div>

                                <div className="col-12 col-md-6"><Input name="msg91_pickup_booked_template_id" label="Pickup Booked Template ID" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_pickup_completed_template_id" label="Pickup Completed Template ID" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_payment_feedback_template_id" label="Payment & Feedback Template ID" /></div>
                                <div className="col-12 col-md-6"><Input name="msg91_pickup_rescheduled_template_id" label="Pickup Rescheduled Template ID" /></div>

                                <div className="col-12 border-top pt-3">
                                    <Input name="msg91_country_code" label="Country Code" description="Default country code (e.g., 91 for India)" />
                                </div>
                            </div>
                        )}

                        <div className="mt-4 d-flex justify-content-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </AdminLayout>
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

    return (
        <div>
            <div className="mb-3">
                <h6 className="fw-semibold mb-1">Home Screen Banner Slider</h6>
                <p className="text-secondary fs-2 mb-0">Add any number of images shown in the rotating banner on the customer app home screen. Tapping any banner takes the user to the category selection screen.</p>
            </div>

            <div className="row g-3 mb-4">
                {banners.map((banner, index) => (
                    <div key={banner.id} className="col-12 col-md-4 d-flex flex-column gap-2">
                        <div className="ratio ratio-16x9 rounded border bg-light overflow-hidden">
                            <img src={banner.image_url} alt={`Banner ${index + 1}`} className="w-100 h-100 object-fit-cover" />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageReplace(banner, e.target.files?.[0] ?? null)}
                            className="form-control form-control-sm"
                        />
                        {replaceErrors[banner.id] && (
                            <p className="text-danger fs-2 mb-0">{replaceErrors[banner.id]}</p>
                        )}
                        <input
                            type="text"
                            value={textDrafts[banner.id] ?? ''}
                            onChange={(e) => setTextDrafts((prev) => ({
                                ...prev,
                                [banner.id]: e.target.value,
                            }))}
                            placeholder="Optional overlay text (e.g. Sell your scrap today!)"
                            maxLength={120}
                            className="form-control form-control-sm"
                        />
                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <p className="text-secondary fs-2 mb-0">
                                Change text and click save.
                            </p>
                            <button
                                type="button"
                                onClick={() => handleTextUpdate(banner, textDrafts[banner.id] ?? '')}
                                disabled={savingTextId === banner.id}
                                className="btn btn-sm btn-primary"
                            >
                                {savingTextId === banner.id ? 'Saving...' : 'Save Text'}
                            </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleMove(index, -1)}
                                    disabled={index === 0}
                                    className="btn btn-sm btn-link p-0 fw-semibold"
                                >
                                    ↑ Move up
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleMove(index, 1)}
                                    disabled={index === banners.length - 1}
                                    className="btn btn-sm btn-link p-0 fw-semibold"
                                >
                                    ↓ Move down
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(banner)}
                                className="btn btn-sm btn-link p-0 fw-semibold text-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleAdd} className="border-top pt-3">
                <h6 className="fw-semibold mb-2">Add New Banner</h6>
                <div className="d-flex flex-column gap-2" style={{ maxWidth: '28rem' }}>
                    <div className="ratio ratio-16x9 rounded border border-dashed bg-light overflow-hidden d-flex align-items-center justify-content-center">
                        {newPreview ? (
                            <img src={newPreview} alt="New banner preview" className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <span className="text-secondary fs-2">No image selected</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleNewFileChange(e.target.files?.[0] ?? null)}
                        className="form-control form-control-sm"
                    />
                    {newFileError && (
                        <p className="text-danger fs-2 mb-0">{newFileError}</p>
                    )}
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Optional overlay text (e.g. Sell your scrap today!)"
                        maxLength={120}
                        className="form-control form-control-sm"
                    />
                    <button
                        type="submit"
                        disabled={processing || !newFile}
                        className="btn btn-primary align-self-start"
                    >
                        {processing ? 'Adding...' : 'Add Banner'}
                    </button>
                </div>
            </form>
        </div>
    );
}
