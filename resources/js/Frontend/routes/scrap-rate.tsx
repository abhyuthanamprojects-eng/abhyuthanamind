import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Info, Phone, ArrowRight, Search, Refrigerator, Laptop, Layers,
  Tv, Printer, BatteryCharging, Boxes, IndianRupee, ShoppingBag,
} from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, motion } from "@/Frontend/components/anim";
import { company, scrapCategories } from "@/Frontend/lib/site-data";
import { scrapItemImage, scrapFallbackImage } from "@/Frontend/lib/scrap-images";

export const Route = createFileRoute("/scrap-rate")({
  head: () => ({
    meta: [
      { title: "Scrap Rates | ABHYUTHANAM RECYCLER" },
      { name: "description", content: "Browse current indicative scrap rates for appliances, electronics, metals, batteries and more. Request a bulk quote or schedule a pickup." },
      { property: "og:title", content: "Scrap Rates | ABHYUTHANAM RECYCLER" },
      { property: "og:description", content: "Latest e-waste and scrap rates by category." },
    ],
  }),
  component: ScrapRate,
});

const icons: Record<string, typeof Refrigerator> = {
  Refrigerator, Laptop, Layers, Tv, Printer, BatteryCharging, Boxes,
};

function ScrapRate() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scrapCategories
      .filter((c) => active === "all" || c.slug === active)
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => i.name.toLowerCase().includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [active, query]);

  return (
    <SiteLayout>
      <PageHero
        breadcrumb="Home / Scrap Rate"
        title="Scrap Rate"
        subtitle="Check indicative rates for scrap and e-waste items."
      />

      <section className="section">
        <div className="container-px">
          {/* Note */}
          <Reveal>
            <div className="flex gap-4 rounded-3xl border border-brand/30 bg-accent p-5 shadow-soft sm:p-6">
              <Info className="size-6 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-navy">
                Scrap rates are indicative and may change based on market demand, material condition,
                quantity and pickup location. For bulk or corporate pickup, please request a quote.
              </p>
            </div>
          </Reveal>

          {/* Search */}
          <Reveal delay={0.05}>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-input bg-card px-4 py-3 shadow-soft">
              <Search className="size-5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search item name (e.g. AC, laptop, copper)..."
                className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-muted-foreground"
              />
            </div>
          </Reveal>

          {/* Category tabs */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Tab label="All Categories" activeKey={active} value="all" onClick={setActive} />
            {scrapCategories.map((c) => (
              <Tab key={c.slug} label={c.title} activeKey={active} value={c.slug} onClick={setActive} />
            ))}
          </div>

          {/* Category sections */}
          <div className="mt-10 space-y-14">
            {filtered.map((cat) => {
              const Icon = icons[cat.icon] ?? Boxes;
              return (
                <div key={cat.slug}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-soft">
                      <Icon className="size-6" />
                    </span>
                    <h2 className="text-xl font-extrabold text-navy sm:text-2xl">{cat.title}</h2>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {cat.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -6 }}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-card"
                      >
                        <div className="relative aspect-square overflow-hidden bg-eco">
                          <img
                            src={scrapItemImage(item.name) ?? scrapFallbackImage}
                            alt={item.name}
                            loading="lazy"
                            width={768}
                            height={768}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute left-2 top-2 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand shadow-soft backdrop-blur">
                            {cat.title}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold text-navy">{item.name}</h3>
                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="flex items-center text-xl font-extrabold text-brand">
                              <IndianRupee className="size-4" />{item.rate.replace("₹", "")}
                            </span>
                            {item.unit && <span className="text-xs font-medium text-muted-foreground">/{item.unit}</span>}
                          </div>
                          <Link
                            to="/schedule-pickup"
                            search={{ category: cat.title, item: item.name }}
                            className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-foreground transition-transform hover:-translate-y-0.5 active:scale-95"
                          >
                            <ShoppingBag className="size-3.5" /> Sell Now
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
                No items match "{query}". Try a different search.
              </p>
            )}
          </div>

          {/* CTA */}
          <Reveal>
            <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-navy p-8 text-navy-foreground sm:flex-row">
              <div>
                <h3 className="text-xl font-bold">Need a bulk or corporate quote?</h3>
                <p className="mt-1 text-navy-foreground/70">Get tailored pricing based on volume, material and location.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-brand transition-transform hover:-translate-y-0.5"><Phone className="size-4" /> Request Bulk Quote</a>
                <Link to="/schedule-pickup" className="btn-primary group">Schedule Pickup <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function Tab({ label, value, activeKey, onClick }: { label: string; value: string; activeKey: string; onClick: (v: string) => void }) {
  const isActive = activeKey === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        isActive
          ? "border-brand bg-brand text-brand-foreground shadow-soft"
          : "border-border bg-card text-navy/80 hover:border-brand/40 hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}
