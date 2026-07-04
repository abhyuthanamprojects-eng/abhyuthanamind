import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { PageHeader, Panel } from '@/Components/Admin/AdminUI';

const inputClass = 'h-11 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20';
const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

export default function Form({ section = null }) {
    const isEditing = !!section;

    // Split the stored json_data into friendly fields (badge / bullets / buttons)
    // and leave everything else in the advanced JSON box so other section types
    // (contact, footer, …) keep working unchanged.
    const initialJson = section?.json_data && typeof section.json_data === 'object' ? section.json_data : {};
    const { badge: initBadge, bullets: initBullets, buttons: initButtons, ...restJson } = initialJson;

    const { data, setData, post, transform, processing, errors } = useForm({
        page_key: section?.page_key || '',
        section_key: section?.section_key || '',
        title: section?.title || '',
        subtitle: section?.subtitle || '',
        content: section?.content || '',
        _badge: initBadge || '',
        _bullets: Array.isArray(initBullets) ? initBullets : [],
        _buttons: Array.isArray(initButtons) ? initButtons : [],
        json_data: Object.keys(restJson).length ? JSON.stringify(restJson, null, 2) : '',
        is_active: section?.is_active ?? true,
        image: null,
        _method: isEditing ? 'put' : 'post',
    });

    // Bullet helpers
    const addBullet = () => setData('_bullets', [...data._bullets, '']);
    const updateBullet = (i, val) => setData('_bullets', data._bullets.map((b, idx) => (idx === i ? val : b)));
    const removeBullet = (i) => setData('_bullets', data._bullets.filter((_, idx) => idx !== i));

    // Button helpers
    const addButton = () => setData('_buttons', [...data._buttons, { label: '', href: '', style: 'primary' }]);
    const updateButton = (i, key, val) => setData('_buttons', data._buttons.map((b, idx) => (idx === i ? { ...b, [key]: val } : b)));
    const removeButton = (i) => setData('_buttons', data._buttons.filter((_, idx) => idx !== i));

    const handleSubmit = (e) => {
        e.preventDefault();

        transform((d) => {
            let extra = {};
            if (d.json_data && d.json_data.trim()) {
                try { extra = JSON.parse(d.json_data); } catch { extra = {}; }
            }
            const out = { ...extra };
            if (d._badge && d._badge.trim()) out.badge = d._badge.trim();
            const bullets = (d._bullets || []).map((b) => (b || '').trim()).filter(Boolean);
            if (bullets.length) out.bullets = bullets;
            const buttons = (d._buttons || [])
                .filter((b) => b && b.label && b.label.trim())
                .map((b) => ({ label: b.label.trim(), href: (b.href || '#').trim(), style: b.style || 'primary' }));
            if (buttons.length) out.buttons = buttons;

            const { _badge, _bullets, _buttons, ...rest } = d;
            return { ...rest, json_data: Object.keys(out).length ? JSON.stringify(out) : '' };
        });

        const url = isEditing ? route('admin.page-sections.update', section.id) : route('admin.page-sections.store');
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Page Section' : 'Add Page Section'}>
            <a href={route('admin.page-sections.index')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                <ArrowLeft className="size-4" /> Back to Page Sections
            </a>

            <PageHeader title={isEditing ? `Edit: ${section.page_key} / ${section.section_key}` : 'Add New Page Section'} />

            <Panel className="max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Page Key</label>
                            <input className={inputClass} value={data.page_key} onChange={(e) => setData('page_key', e.target.value)} placeholder="home, about, contact…" required />
                            {errors.page_key && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.page_key}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Section Key</label>
                            <input className={inputClass} value={data.section_key} onChange={(e) => setData('section_key', e.target.value)} placeholder="hero, intro, cta…" required />
                            {errors.section_key && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.section_key}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Eyebrow / Small label (subtitle)</label>
                        <input className={inputClass} value={data.subtitle} onChange={(e) => setData('subtitle', e.target.value)} placeholder="e.g. Exchange Policy" />
                    </div>

                    <div>
                        <label className={labelClass}>Title / Heading</label>
                        <input className={inputClass} value={data.title} onChange={(e) => setData('title', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Content / Description</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={5} value={data.content} onChange={(e) => setData('content', e.target.value)} />
                    </div>

                    <div>
                        <label className={labelClass}>Badge / tag on image (optional)</label>
                        <input className={inputClass} value={data._badge} onChange={(e) => setData('_badge', e.target.value)} placeholder="e.g. Old for New" />
                    </div>

                    <div>
                        <label className={labelClass}>Image</label>
                        {section?.image_url && !data.image && (
                            <img src={section.image_url} alt={section.title} className="mb-2 size-20 rounded-2xl border border-border object-cover" />
                        )}
                        <input type="file" accept="image/*" className={inputClass} onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.image}</p>}
                    </div>

                    {/* Bullet points */}
                    <div>
                        <label className={labelClass}>Bullet points (optional)</label>
                        <div className="space-y-2">
                            {data._bullets.map((b, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input className={inputClass} value={b} onChange={(e) => updateBullet(i, e.target.value)} placeholder={`Point ${i + 1}`} />
                                    <button type="button" onClick={() => removeBullet(i)} className="shrink-0 rounded-xl border border-border p-2.5 text-rose-600 transition hover:bg-rose-50" aria-label="Remove point">
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addBullet} className="mt-2 inline-flex items-center gap-1.5 rounded-2xl border border-border px-3 py-2 text-sm font-semibold text-navy transition hover:bg-muted">
                            <Plus className="size-4" /> Add point
                        </button>
                    </div>

                    {/* Buttons */}
                    <div>
                        <label className={labelClass}>Buttons (optional)</label>
                        <div className="space-y-3">
                            {data._buttons.map((b, i) => (
                                <div key={i} className="flex flex-wrap items-center gap-2 rounded-2xl border border-border p-3">
                                    <input className={`${inputClass} min-w-[8rem] flex-1`} value={b.label || ''} onChange={(e) => updateButton(i, 'label', e.target.value)} placeholder="Button text" />
                                    <input className={`${inputClass} min-w-[8rem] flex-1`} value={b.href || ''} onChange={(e) => updateButton(i, 'href', e.target.value)} placeholder="Link e.g. /schedule-pickup" />
                                    <select className={`${inputClass} w-32`} value={b.style || 'primary'} onChange={(e) => updateButton(i, 'style', e.target.value)}>
                                        <option value="primary">Primary</option>
                                        <option value="outline">Outline</option>
                                    </select>
                                    <button type="button" onClick={() => removeButton(i)} className="shrink-0 rounded-xl border border-border p-2.5 text-rose-600 transition hover:bg-rose-50" aria-label="Remove button">
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addButton} className="mt-2 inline-flex items-center gap-1.5 rounded-2xl border border-border px-3 py-2 text-sm font-semibold text-navy transition hover:bg-muted">
                            <Plus className="size-4" /> Add button
                        </button>
                    </div>

                    <div>
                        <label className={labelClass}>Advanced JSON Data (optional — other structured data)</label>
                        <textarea className="w-full rounded-2xl border border-border bg-card p-4 font-mono text-xs outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20" rows={4} value={data.json_data} onChange={(e) => setData('json_data', e.target.value)} placeholder='{"emails": [], "phones": []}' />
                        <p className="mt-1.5 text-xs text-muted-foreground">Badge, bullet points and buttons above are merged into this automatically — only use this for other keys (e.g. emails, phones).</p>
                        {errors.json_data && <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.json_data}</p>}
                    </div>

                    <label className="flex items-center gap-2.5 text-sm font-medium text-navy">
                        <input type="checkbox" className="size-4 rounded border-border text-brand focus:ring-brand/30" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} />
                        Active (visible on public website)
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <a href={route('admin.page-sections.index')} className="rounded-2xl border border-border px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:bg-brand-dark disabled:opacity-60">
                            {isEditing ? 'Update Section' : 'Create Section'}
                        </button>
                    </div>
                </form>
            </Panel>
        </AdminLayout>
    );
}
