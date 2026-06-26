import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target, Eye, Gem, Award, CheckCircle2, Factory, ArrowRight, Leaf,
  Recycle, ShieldCheck, Truck, Sparkles, PlayCircle, Linkedin, Users,
} from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, Counter, motion } from "@/Frontend/components/anim";
import { GrowthTimeline } from "@/Frontend/components/GrowthTimeline";
import {
  counters, founders, missionVisionValues, companyMeta,
  companyStory, companyScale, revenueFY26, certificates, ecoImpact,
} from "@/Frontend/lib/site-data";
import aboutImg from "@/Frontend/assets/about.jpg";
import rec1 from "@/Frontend/assets/recycle-1.jpg";
import rec3 from "@/Frontend/assets/recycle-3.jpg";
import owner1 from "@/Frontend/assets/owner-1.jpg";
import owner2 from "@/Frontend/assets/owner-2.jpg";
import plantExterior from "@/Frontend/assets/plant-exterior.jpg";

const ownerImages: Record<string, string> = { owner1, owner2 };

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | ABHYUTHANAM RECYCLER" },
      { name: "description", content: "Abhyuthanam Recyclers — a certified Indian e-waste recycling company founded in 2023, helping businesses and homes dispose of electronics safely with zero landfill." },
      { property: "og:title", content: "About ABHYUTHANAM RECYCLER" },
      { property: "og:description", content: "Certified e-waste management company in India." },
    ],
  }),
  component: About,
});

const mvv = [
  { icon: Target, title: "Our Mission", text: missionVisionValues.mission },
  { icon: Eye, title: "Our Vision", text: missionVisionValues.vision },
];

const skills = [
  { label: "Eco-Friendly Recycling", value: 98 },
  { label: "Data Security & Sanitization", value: 100 },
  { label: "Precious Metal Recovery", value: 95 },
  { label: "Client Satisfaction", value: 99 },
];

const process = [
  { icon: Truck, title: "Collection", text: "Doorstep pickup of e-waste scheduled across India with real-time tracking." },
  { icon: Recycle, title: "Segregation", text: "Careful sorting and segregation of every e-waste stream at our facility." },
  { icon: Factory, title: "Processing", text: "Scientific recycling and metal recovery with a strict zero-dumping policy." },
  { icon: ShieldCheck, title: "Reporting", text: "Transparent, certified documentation and audit trail for every asset." },
];

const marqueeItems = ["REDUCE REUSE RECYCLE", "GREEN FUTURE TOGETHER", "CLEAN EARTH INITIATIVE", "ZERO LANDFILL"];

function About() {
  return (
    <SiteLayout>
      <PageHero breadcrumb="Home / About Us" title="About Us" subtitle="A certified Indian e-waste recycling company built on responsibility, safety and trust." />

      {/* Intro */}
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-8 select-none text-center">
          <span className="text-stroke text-[12vw] font-extrabold leading-none">RECYCLE</span>
        </div>
        <div className="container-px relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 size-24 rounded-full border-4 border-dashed border-brand/40 animate-spin-slow" />
            <img src={aboutImg} alt="ABHYUTHANAM facility" loading="lazy" width={1024} height={1024} className="relative w-full rounded-[2rem] object-cover shadow-card" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-3xl bg-navy p-6 text-navy-foreground shadow-card sm:block">
              <p className="text-3xl font-extrabold text-lime">{companyMeta.founded}</p>
              <p className="text-sm text-navy-foreground/70">Founded</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow"><Sparkles className="size-4" /> About ABHYUTHANAM</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Helping India recycle the <span className="text-brand">right way</span></h2>
            <p className="mt-5 text-muted-foreground">{companyStory.intro}</p>
            <p className="mt-3 text-muted-foreground">{companyStory.problem}</p>
            <p className="mt-3 text-muted-foreground">{companyStory.solution}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Founded", String(companyMeta.founded)], ["Team", companyMeta.teamSize], ["Capacity", "8,400 MT"], ["Landfill", "Zero"]].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-border bg-card p-3 text-center shadow-soft">
                  <p className="text-lg font-extrabold text-brand">{v}</p>
                  <p className="text-xs text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/schedule-pickup" className="btn-primary">Schedule Pickup <ArrowRight className="size-4" /></a>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story — why we started */}
      <section className="section bg-eco">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow"><Leaf className="size-4" /> Our Story</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Why we started Abhyuthanam</h2>
            <p className="mt-5 text-muted-foreground">{companyStory.problem}</p>
            <p className="mt-3 text-muted-foreground">{companyStory.today}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {companyScale.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
                  <p className="text-base font-extrabold text-brand">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="overflow-hidden rounded-[2rem] shadow-card">
            <img src={plantExterior} alt="Abhyuthanam recycling facility" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-brand/20 bg-brand py-4 text-brand-foreground">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 text-lg font-extrabold uppercase tracking-wide">
              {t} <Leaf className="size-5" />
            </span>
          ))}
        </div>
      </div>

      {/* Counters */}
      <section className="section">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
                <p className="text-4xl font-extrabold text-brand"><Counter to={c.value} suffix={c.suffix} /></p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Users className="size-4" /> Leadership</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Meet our founders</h2>
            <p className="mt-4 text-muted-foreground">Committed to responsible recycling, sustainability, compliance and the circular economy.</p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
                  <div className="relative overflow-hidden">
                    <img src={ownerImages[f.img] ?? owner1} alt={f.name} loading="lazy" width={1024} height={1024} className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-brand text-brand-foreground shadow-card"><Linkedin className="size-5" /></span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy">{f.name}</h3>
                    <p className="text-sm font-semibold text-brand">{f.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{f.bio}</p>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-eco px-3 py-1.5 text-xs font-semibold text-navy"><CheckCircle2 className="size-3.5 text-brand" /> {f.leads}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Target className="size-4" /> Mission • Vision • Values</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">What drives us forward</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {mvv.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="card-soft h-full">
                  <span className="grid size-16 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-soft"><Icon className="size-8" /></span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="card-soft h-full">
                <span className="grid size-16 place-items-center rounded-2xl bg-navy text-navy-foreground shadow-soft"><Gem className="size-8" /></span>
                <h3 className="mt-5 text-lg font-bold text-navy">Our Values</h3>
                <ul className="mt-3 grid gap-1.5">
                  {missionVisionValues.values.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-brand" /> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills / Why choose with progress bars + video */}
      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-[2rem] shadow-card">
            <img src={rec1} alt="Recycling facility" loading="lazy" width={800} height={600} className="h-full w-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-navy/40">
              <a href="/schedule-pickup" className="grid size-20 place-items-center rounded-full bg-brand text-brand-foreground shadow-card transition-transform hover:scale-110">
                <PlayCircle className="size-10" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow"><CheckCircle2 className="size-4" /> Why Choose Us</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Expertise you can trust</h2>
            <p className="mt-4 text-muted-foreground">Built around the 3R mantra — Reduce, Reuse and Recycle — with a government-approved capacity of 8400 metric tonnes per year and a strict zero-dumping commitment.</p>
            <div className="mt-7 space-y-5">
              {skills.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-navy">
                      <span>{s.label}</span><span className="text-brand">{s.value}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-accent">
                      <motion.div
                        className="h-full rounded-full bg-brand"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-navy text-navy-foreground">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime"><Recycle className="size-4" /> Our Process</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">How we work</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="relative h-full rounded-3xl bg-white/5 p-7 text-center">
                  <span className="absolute right-5 top-5 text-3xl font-extrabold text-white/10">0{i + 1}</span>
                  <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand text-brand-foreground"><Icon className="size-8" /></span>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-navy-foreground/60">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Journey */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Sparkles className="size-4" /> Our Growth Journey</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">From 2023 to today</h2>
            <p className="mt-4 text-muted-foreground">A young company growing fast — follow the milestones that built Abhyuthanam Recyclers, one step at a time.</p>
          </Reveal>

          <GrowthTimeline />

          {/* Growth stats strip */}
          <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:grid-cols-4">
              {[["2023", "Founded"], ["20+", "Team"], ["8,400 MT", "Capacity"], ["13+", "Industries"]].map(([v, k]) => (
                <div key={k} className="text-center">
                  <p className="text-2xl font-extrabold text-brand">{v}</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{k}</p>
                </div>
              ))}
            </div>
          </Reveal>
          {/* Revenue placeholder — only shows real figure once confirmed */}
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-3xl border border-dashed border-brand/40 bg-eco p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{revenueFY26.label}</p>
              <p className="mt-2 text-2xl font-extrabold text-navy">{revenueFY26.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{revenueFY26.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certifications — proof cards */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Award className="size-4" /> Certifications & Compliance</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Proof you can rely on</h2>
            <p className="mt-4 text-muted-foreground">We hold the approvals needed to handle e-waste legally and safely. Certificate copies are available on request.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c, i) => (
              <Reveal key={c.code} delay={(i % 3) * 0.1}>
                <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                  <div className="relative grid aspect-[4/3] place-items-center bg-gradient-to-br from-eco to-card">
                    {c.available ? null : (
                      <div className="text-center">
                        <span className="grid size-16 mx-auto place-items-center rounded-2xl bg-brand/10 text-brand"><Award className="size-8" /></span>
                        <p className="mt-3 text-2xl font-extrabold text-navy">{c.code}</p>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Certificate preview</p>
                      </div>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-brand-foreground">VERIFIED</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-navy">{c.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Impact */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Leaf className="size-4" /> Sustainability in Action</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">What recycling with us actually changes</h2>
            <p className="mt-4 text-muted-foreground">Real outcomes for your business and the environment — not just promises.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecoImpact.map((e, i) => (
              <Reveal key={e.title} delay={(i % 3) * 0.08}>
                <div className="card-soft h-full">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand"><Leaf className="size-6" /></span>
                  <h3 className="mt-4 text-base font-bold text-navy">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-14 text-center text-navy-foreground shadow-card">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand/20 blur-2xl" />
            <img src={rec3} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10" />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">Partner with a certified green recycler</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-navy-foreground/70">Join hundreds of organisations recycling responsibly with ABHYUTHANAM.</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <a href="/schedule-pickup" className="btn-primary">Schedule Pickup <ArrowRight className="size-4" /></a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-semibold text-navy-foreground transition-colors hover:bg-white/10">Contact Us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
