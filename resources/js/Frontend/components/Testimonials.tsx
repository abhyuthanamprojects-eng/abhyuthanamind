import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Quote, Star, PlayCircle, X, ChevronLeft, ChevronRight, Images, Video, MapPin,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion, Reveal } from "@/Frontend/components/anim";
import { testimonials as staticTestimonials } from "@/Frontend/lib/site-data";

/* ---------------- Types ---------------- */
export type TestimonialMediaItem = {
  type: "image" | "video";
  url?: string;
  videoUrl?: string;
  alt?: string;
};

export type NormalizedTestimonial = {
  key: string;
  name: string;
  role: string;
  company: string;
  businessType: string;
  location: string;
  rating: number;
  outcome: string;
  text: string;
  avatar?: string;
  initials: string;
  featured: boolean;
  media: TestimonialMediaItem[];
};

/**
 * Accepts testimonials in any of three shapes and normalizes them for display:
 *  - backend API rows (snake_case, with a `media` array)
 *  - this project's local site-data fallback (legacy camelCase, no media)
 *  - Lovable-style camelCase sample data (customerPhoto, mediaItems, isFeatured)
 */
const isVideoUrl = (url?: string) => /\.(mp4|mov|webm|m4v|avi)(\?.*)?$/i.test(url || "");

export function mapTestimonialForDisplay(raw: any): NormalizedTestimonial {
  const name = raw.customer_name ?? raw.customerName ?? raw.name ?? "Customer";
  const role = raw.designation ?? raw.role ?? "";
  const company = raw.company_name ?? raw.companyName ?? raw.company ?? "";
  const businessType = raw.industry ?? raw.businessType ?? "";
  const location = raw.city ?? raw.location ?? "";
  const rating = Number(raw.rating ?? 5) || 5;
  const text = raw.review_text ?? raw.reviewText ?? raw.text ?? "";

  const outcomeLabel = raw.outcome_label ?? raw.outcomeLabel ?? "";
  const outcomeValue = raw.outcome_text ?? raw.outcome_value ?? raw.outcomeValue ?? raw.outcome ?? "";
  const outcome = outcomeLabel && outcomeValue ? `${outcomeLabel}: ${outcomeValue}` : (outcomeValue || outcomeLabel);

  // A photo field sometimes ends up holding a video file (e.g. admin uploaded
  // a video through a generic "photo" picker) — never render that as an <img> avatar.
  const rawImageUrl = raw.image_url ?? raw.imageUrl;
  const avatar = raw.customer_photo ?? raw.customerPhoto ?? (isVideoUrl(rawImageUrl) ? undefined : rawImageUrl) ?? undefined;

  const rawMedia: any[] = raw.media ?? raw.media_items ?? raw.mediaItems ?? [];
  const media: TestimonialMediaItem[] = rawMedia
    .map((m): TestimonialMediaItem | null => {
      const mediaType = m.media_type ?? m.type;
      const isVideo = mediaType === "video" || mediaType === "video_url";
      if (isVideo) {
        const videoUrl = m.file_url ?? m.videoUrl ?? m.video_url ?? m.url;
        if (!videoUrl) return null;
        return { type: "video", videoUrl, url: m.thumbnail_url ?? m.thumbnailUrl, alt: m.title ?? m.alt };
      }
      const url = m.file_url ?? m.url ?? m.image_url;
      if (!url) return null;
      return { type: "image", url, alt: m.title ?? m.alt };
    })
    .filter((m): m is TestimonialMediaItem => m !== null);

  // Legacy fallback: a single imageUrl/videoUrl field with no rich media array.
  if (media.length === 0) {
    const legacyVideoUrl = raw.video_url ?? raw.videoUrl;
    const legacyImageUrl = raw.image_url ?? raw.imageUrl;
    if (legacyVideoUrl) {
      media.push({ type: "video", videoUrl: legacyVideoUrl, url: isVideoUrl(legacyImageUrl) ? undefined : legacyImageUrl });
    } else if (isVideoUrl(legacyImageUrl)) {
      media.push({ type: "video", videoUrl: legacyImageUrl });
    } else if (legacyImageUrl && legacyImageUrl !== avatar) {
      media.push({ type: "image", url: legacyImageUrl });
    }
  }

  const initials = name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
  const featured = Boolean(raw.is_featured ?? raw.isFeatured);
  const key = String(raw.id ?? `${name}-${company}`);

  return { key, name, role, company, businessType, location, rating, outcome, text, avatar, initials, featured, media };
}

type FilterKey = "all" | "text" | "image" | "video" | "corporate" | "pickup" | "compliance";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "text", label: "Text Reviews" },
  { key: "image", label: "Image Reviews" },
  { key: "video", label: "Video Reviews" },
  { key: "corporate", label: "Corporate Clients" },
  { key: "pickup", label: "Pickup Experience" },
  { key: "compliance", label: "Compliance Support" },
];

function matchesFilter(t: NormalizedTestimonial, f: FilterKey): boolean {
  const hasVideo = t.media.some((m) => m.type === "video");
  const hasImage = t.media.some((m) => m.type === "image");
  const hay = `${t.text} ${t.outcome} ${t.businessType} ${t.role}`.toLowerCase();
  switch (f) {
    case "all": return true;
    case "text": return t.media.length === 0;
    case "image": return hasImage;
    case "video": return hasVideo;
    case "corporate": return /it|electronic|finance|manufactur|commercial|enterprise|corporate/.test(hay);
    case "pickup": return /pickup|pick|collect|logistics|crew|door|return/.test(hay);
    case "compliance": return /compliance|epr|audit|certificat|document|report|target/.test(hay);
  }
}

/* ---------------- Lightbox ---------------- */
function Lightbox({
  item, onClose,
}: {
  item: { t: NormalizedTestimonial; index: number } | null;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(item?.index ?? 0);
  useEffect(() => { if (item) setIdx(item.index); }, [item]);
  const media = item?.t.media ?? [];
  const go = useCallback((dir: number) => {
    setIdx((p) => (p + dir + media.length) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!item) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [item, go, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-card shadow-card md:flex-row"
            initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-navy/60 text-navy-foreground transition hover:bg-navy/80"><X className="size-5" /></button>

            <div className="relative flex-1 bg-navy">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="grid aspect-video w-full place-items-center md:aspect-auto md:h-full"
                >
                  {media[idx]?.type === "video" && media[idx]?.videoUrl ? (
                    <video src={media[idx].videoUrl} poster={media[idx].url || undefined} controls playsInline className="h-full w-full object-contain" />
                  ) : media[idx]?.type === "image" ? (
                    <img src={media[idx]?.url} alt={media[idx]?.alt ?? item.t.name} className="h-full max-h-[70vh] w-full object-contain" />
                  ) : null}
                </motion.div>
              </AnimatePresence>
              {media.length > 1 && (
                <>
                  <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-navy/60 text-navy-foreground transition hover:bg-navy/80"><ChevronLeft className="size-5" /></button>
                  <button onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-navy/60 text-navy-foreground transition hover:bg-navy/80"><ChevronRight className="size-5" /></button>
                </>
              )}
            </div>

            <div className="flex w-full flex-col gap-3 p-5 md:w-72">
              <div className="flex gap-0.5 text-lime">
                {Array.from({ length: item.t.rating ?? 5 }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}
              </div>
              <p className="text-sm leading-relaxed text-navy">"{item.t.text}"</p>
              <div>
                <p className="text-sm font-bold text-navy">{item.t.name}</p>
                <p className="text-xs text-muted-foreground">{[item.t.role, item.t.company].filter(Boolean).join(" · ")}</p>
                <p className="text-xs font-medium text-brand">{[item.t.businessType, item.t.location].filter(Boolean).join(" · ")}</p>
              </div>
              {media.length > 1 && (
                <div className="mt-auto flex gap-2 overflow-x-auto pb-1">
                  {media.map((m, i) => (
                    <button key={i} onClick={() => setIdx(i)} className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 transition ${i === idx ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"}`}>
                      {m.url && <img src={m.url} alt="" className="size-full object-cover" />}
                      {m.type === "video" && <span className="absolute inset-0 grid place-items-center bg-navy/40 text-navy-foreground"><PlayCircle className="size-5" /></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Media preview block ---------------- */
function MediaPreview({ t, onOpen }: { t: NormalizedTestimonial; onOpen: (i: number) => void }) {
  if (t.media.length === 0) return null;
  const first = t.media[0];
  const extra = t.media.length - 1;
  const videoCount = t.media.filter((m) => m.type === "video").length;
  if (!first.url && first.type !== "video") return null;

  return (
    <button type="button" onClick={() => onOpen(0)} className="group relative mb-4 block w-full overflow-hidden rounded-2xl">
      {first.url ? (
        <img src={first.url} alt={first.alt ?? `${t.name} testimonial`} loading="lazy" className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="h-48 w-full bg-navy" />
      )}
      <span className="absolute left-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 text-[11px] font-semibold text-navy-foreground backdrop-blur">Customer Feedback</span>
      {first.type === "video" && (
        <span className="absolute inset-0 grid place-items-center bg-navy/25 transition-colors group-hover:bg-navy/35">
          <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-card"><PlayCircle className="size-8" /></motion.span>
        </span>
      )}
      {extra > 0 && (
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-navy/70 px-2.5 py-1 text-[11px] font-semibold text-navy-foreground backdrop-blur">
          {videoCount > 1 ? <Video className="size-3" /> : <Images className="size-3" />}
          +{extra} {videoCount > 1 && first.type === "video" ? "videos" : "photos"}
        </span>
      )}
    </button>
  );
}

/* ---------------- Card ---------------- */
function Card({ t, onOpen }: { t: NormalizedTestimonial; onOpen: (i: number) => void }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="card-soft flex h-full flex-col">
      <MediaPreview t={t} onOpen={onOpen} />
      <Quote className="size-8 text-brand/30" />
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex gap-0.5 text-lime">
          {Array.from({ length: t.rating ?? 5 }).map((_, k) => <Star key={k} className="size-4 fill-current" />)}
        </div>
        {t.outcome && <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand">{t.outcome}</span>}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-navy">{t.text}</p>
      <div className="mt-6 flex items-center gap-3">
        {t.avatar ? (
          <img src={t.avatar} alt={t.name} className="size-11 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-brand font-bold text-brand-foreground">{t.initials}</span>
        )}
        <div>
          <p className="text-sm font-bold text-navy">{t.name}</p>
          <p className="text-xs text-muted-foreground">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
          <p className="text-xs font-medium text-brand">{[t.businessType, t.location].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Featured hero ---------------- */
function Featured({ t, onOpen }: { t: NormalizedTestimonial; onOpen: (i: number) => void }) {
  const hero = t.media[0];
  return (
    <Reveal delay={0.05}>
      <div className="mt-12 grid overflow-hidden rounded-[2rem] bg-card shadow-card lg:grid-cols-2">
        {hero && hero.url ? (
          <button type="button" onClick={() => onOpen(0)} className="group relative min-h-[18rem]">
            <img src={hero.url} alt={hero.alt ?? t.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            {hero.type === "video" && (
              <span className="absolute inset-0 grid place-items-center">
                <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="grid size-20 place-items-center rounded-full bg-brand text-brand-foreground shadow-card"><PlayCircle className="size-10" /></motion.span>
              </span>
            )}
            {t.media.length > 1 && <span className="absolute bottom-4 right-4 rounded-full bg-navy/70 px-3 py-1 text-xs font-semibold text-navy-foreground backdrop-blur">View all {t.media.length} media</span>}
          </button>
        ) : (
          <div className="relative grid min-h-[18rem] place-items-center bg-gradient-to-br from-brand to-brand-dark p-10 text-center text-brand-foreground">
            <div>
              <Quote className="mx-auto size-12 opacity-50" />
              <p className="mt-4 text-lg font-semibold leading-snug">"{t.text}"</p>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">Featured Story</span>
          <div className="flex gap-0.5 text-lime">{Array.from({ length: t.rating ?? 5 }).map((_, k) => <Star key={k} className="size-5 fill-current" />)}</div>
          <p className="text-lg font-medium leading-relaxed text-navy">"{t.text}"</p>
          {t.outcome && <span className="inline-flex w-fit rounded-full bg-brand/10 px-3 py-1.5 text-sm font-bold text-brand">{t.outcome}</span>}
          <div className="flex items-center gap-3 pt-2">
            {t.avatar ? <img src={t.avatar} alt={t.name} className="size-12 rounded-full object-cover" /> : <span className="grid size-12 place-items-center rounded-full bg-brand font-bold text-brand-foreground">{t.initials}</span>}
            <div>
              <p className="font-bold text-navy">{t.name}</p>
              <p className="text-sm text-muted-foreground">{[t.role, t.company].filter(Boolean).join(" · ")}</p>
              {t.location && <p className="inline-flex items-center gap-1 text-xs font-medium text-brand"><MapPin className="size-3" /> {t.location}</p>}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Section ---------------- */
const fallbackTestimonials: NormalizedTestimonial[] = staticTestimonials.map(mapTestimonialForDisplay);

export function Testimonials() {
  const [rows, setRows] = useState<NormalizedTestimonial[]>(fallbackTestimonials);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        const data = json?.data ?? [];
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setRows(data.map(mapTestimonialForDisplay));
        }
      })
      .catch(() => {
        // keep fallback static testimonials on error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(
    () => rows.find((t) => t.featured) ?? rows.find((t) => t.media.length > 0) ?? rows[0],
    [rows],
  );
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<{ t: NormalizedTestimonial; index: number } | null>(null);

  const grid = useMemo(() => rows.filter((t) => matchesFilter(t, filter)), [rows, filter]);

  return (
    <section className="section bg-eco">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow"><Quote className="size-4" /> Client Feedback</span>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">What our clients say</h2>
          <p className="mt-3 text-muted-foreground">Real outcomes from businesses who recycle responsibly with us.</p>
        </Reveal>

        {featured && <Featured t={featured} onOpen={(i) => setLightbox({ t: featured, index: i })} />}

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const count = rows.filter((t) => matchesFilter(t, f.key)).length;
            if (count === 0 && f.key !== "all") return null;
            const active = filter === f.key;
            return (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "text-brand-foreground" : "text-navy hover:bg-brand/10"}`}>
                {active && <motion.span layoutId="tfilter" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 300, damping: 28 }} />}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {grid.map((t) => (
              <motion.div
                key={t.key} layout
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card t={t} onOpen={(i) => setLightbox({ t, index: i })} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {grid.length === 0 && <p className="mt-10 text-center text-muted-foreground">No reviews in this category yet.</p>}
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
