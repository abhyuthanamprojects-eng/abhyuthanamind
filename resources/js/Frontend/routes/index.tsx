import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Truck, CheckCircle2, Award, Recycle,
  Laptop, GraduationCap, HeartHandshake, Leaf, Star, Quote, Sparkles, Phone,
  Linkedin, MapPin, Gem, Smartphone, Code2, Layers,
} from "lucide-react";
import { SiteLayout } from "@/Frontend/components/SiteLayout";
import { Testimonials } from "@/Frontend/components/Testimonials";
import { Reveal, Counter, motion } from "@/Frontend/components/anim";
import {
  company, whyChoose, counters, advanced, founders, scrapify,
} from "@/Frontend/lib/site-data";
import { useServices, useIndustries } from "@/Frontend/lib/dynamic-content";
import { topPartners } from "@/Frontend/lib/partners";
import heroImg from "@/Frontend/assets/hero-westix.jpg";
import rec1 from "@/Frontend/assets/recycle-1.jpg";
import rec2 from "@/Frontend/assets/recycle-2.jpg";
import rec3 from "@/Frontend/assets/recycle-3.jpg";
import oem from "@/Frontend/assets/ind-oem.jpg";
import ecommerce from "@/Frontend/assets/ind-ecommerce.jpg";
import corporate from "@/Frontend/assets/ind-corporate.jpg";
import logistics from "@/Frontend/assets/ind-logistics.jpg";
import svcItad from "@/Frontend/assets/svc-itad.jpg";
import svcRecovery from "@/Frontend/assets/svc-recovery.jpg";
import svcLogistics from "@/Frontend/assets/svc-logistics.jpg";
import svcTraining from "@/Frontend/assets/svc-training.jpg";
import svcEpr from "@/Frontend/assets/svc-epr.jpg";
import svcCsr from "@/Frontend/assets/svc-csr.jpg";
import svcExchange from "@/Frontend/assets/svc-exchange.jpg";
import aboutMain from "@/Frontend/assets/about-main.jpg";
import aboutTruck from "@/Frontend/assets/about-truck.jpg";
import aboutWorker from "@/Frontend/assets/about-worker.jpg";
import owner1 from "@/Frontend/assets/owner-1.jpg";
import owner2 from "@/Frontend/assets/owner-2.jpg";
import plantExterior from "@/Frontend/assets/plant-exterior.jpg";
import plantFloor from "@/Frontend/assets/plant-floor.jpg";
import exchangePolicy from "@/Frontend/assets/svc-exchange.jpg";
const ownerImages: Record<string, string> = { owner1, owner2 };
const leaders = founders.map((f) => ({ ...f, img: ownerImages[f.img] ?? owner1 }));

const serviceIcons: Record<string, typeof Recycle> = {
  Laptop, Recycle, Truck, GraduationCap, ShieldCheck, HeartHandshake, Gem, Smartphone,
};
const advIcons: Record<string, typeof Recycle> = { Truck, ShieldCheck, Recycle };
const indImages: Record<string, string> = { oem, ecommerce, corporate, logistics };
const serviceImages: Record<string, string> = {
  "e-waste-recycling": svcRecovery,
  "it-mobility-asset-disposition": svcItad,
  "data-sanitization": svcEpr,
  "precious-metal-recovery": svcRecovery,
  "reverse-logistics": svcLogistics,
  "epr-csr-services": svcCsr,
  "training-awareness": svcTraining,
  "exchange-policy": svcExchange,
};

const marqueeItems = ["REDUCE REUSE RECYCLE", "GREEN FUTURE TOGETHER", "CLEAN EARTH INITIATIVE", "ZERO LANDFILL", "SUSTAINABLE TOMORROW"];

const ecosystem = [
  {
    icon: Recycle,
    title: "Abhyuthanam Recyclers",
    subtitle: "Certified E-Waste & Recycling Solutions",
    description: "We help businesses, institutions, and households manage e-waste and scrap through safe, compliant, and responsible recycling processes.",
    cta: "Explore Recycling",
    href: "/about",
    external: false,
  },
  {
    icon: Code2,
    title: "Devzign Technologies",
    subtitle: "IT & Software Development",
    description: "Our technology vertical supports businesses with websites, mobile apps, custom software, backend systems, and digital product development.",
    cta: "Visit Devzign",
    href: "https://devzign.com",
    external: true,
  },
  {
    icon: Smartphone,
    title: "Scrapify / Scrapi5",
    subtitle: "Day-to-Day Scrap Pickup",
    description: "Our scrap pickup platform helps households, shops, offices, and small businesses schedule daily scrap pickup with simple rates and transparent service.",
    cta: "Visit Scrapi5",
    href: "https://scrapi5.com",
    external: true,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABHYUTHANAM RECYCLER | India's Leading E-Waste Management Company" },
      { name: "description", content: "Secure, sustainable and certified e-waste recycling, ITAD, EPR and data sanitization across India. Schedule a doorstep pickup today." },
      { property: "og:title", content: "ABHYUTHANAM RECYCLER | E-Waste Management" },
      { property: "og:description", content: "Secure, sustainable and certified e-waste recycling and IT asset disposition." },
    ],
  }),
  component: Index,
});

function Index() {
  const services = useServices();
  const industries = useIndustries();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-eco via-background to-background text-navy">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--brand) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="pointer-events-none absolute -right-32 top-10 size-[30rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="container-px relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-brand"
            >
              <Leaf className="size-4" /> Welcome to ABHYUTHANAM
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl xl:text-6xl"
            >
              Smart <span className="text-brand">E-Waste</span> Disposal Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              We collect your scrap and e-waste, sort it properly, and recycle it through certified processes — with clear documentation whenever you need it. Safe, legal and hassle-free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="/schedule-pickup" className="btn-primary">
                Schedule Pickup <ArrowRight className="size-4" />
              </a>
              <Link to="/scrap-rate" className="btn-outline">View Scrap Rates</Link>
            </motion.div>
            <div className="mt-10 flex flex-wrap gap-8">
              {[["R2v3", "Certified"], ["8400 MT", "Annual Capacity"], ["Pan India", "Pickup Support"]].map(([a, b], i) => (
                <motion.div key={a} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}>
                  <p className="text-2xl font-extrabold text-brand">{a}</p>
                  <p className="text-sm text-muted-foreground">{b}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -right-4 -top-4 size-24 rounded-full border-4 border-dashed border-brand/40 animate-spin-slow" />
            <img src={heroImg} alt="Worker holding eco-friendly waste bag" width={1280} height={1280} className="relative w-full rounded-[2.5rem] object-cover shadow-card" />
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl bg-background p-4 text-navy shadow-card"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-brand"><Recycle className="size-6" /></span>
              <div>
                <p className="text-lg font-extrabold leading-none">100%</p>
                <p className="text-xs text-muted-foreground">Zero Landfill</p>
              </div>
            </motion.div>
          </motion.div>
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

      {/* Top partners — auto-scrolling green band */}
      <div className="overflow-hidden border-b border-brand/20 bg-brand py-5">
        <div className="marquee-track">
          {[...topPartners, ...topPartners, ...topPartners, ...topPartners, ...topPartners, ...topPartners].map((p, i) => (
            <span key={i} className="mx-4 inline-flex h-16 w-40 items-center justify-center rounded-2xl bg-white px-6 shadow-card">
              <img src={p.logo} alt={p.name} className="max-h-10 max-w-full object-contain" loading="lazy" />
            </span>
          ))}
        </div>
      </div>

      {/* About — Wastex-style collage */}
      <section className="section relative overflow-hidden bg-eco">
        <div className="container-px relative grid items-center gap-12 lg:grid-cols-2">
          {/* Image collage */}
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={aboutMain}
                alt="ABHYUTHANAM e-waste recycling facility"
                loading="lazy"
                width={768}
                height={1024}
                className="col-span-1 h-full max-h-[34rem] w-full rounded-[2rem] object-cover shadow-card"
              />
              <div className="flex flex-col gap-4">
                <img
                  src={aboutTruck}
                  alt="ABHYUTHANAM collection truck unloading e-waste"
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-44 w-full rounded-[2rem] object-cover shadow-card sm:h-56"
                />
                <img
                  src={aboutWorker}
                  alt="ABHYUTHANAM recycling plant worker"
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="h-44 w-full rounded-[2rem] object-cover shadow-card sm:h-56"
                />
              </div>
            </div>
            {/* Spinning years-of-experience badge */}
            <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 sm:size-44">
              <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow drop-shadow">
                <defs>
                  <path id="badgeCircle" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
                </defs>
                <circle cx="100" cy="100" r="96" className="fill-brand" />
                <text dominantBaseline="middle" className="fill-navy text-[15px] font-extrabold uppercase tracking-[0.08em]">
                  <textPath href="#badgeCircle" startOffset="0%">
                    3+ YEARS OF EXPERIENCE · ABHYUTHANAM ·
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid size-20 place-items-center rounded-full bg-navy text-center leading-none text-lime shadow-card sm:size-24">
                  <span className="text-3xl font-extrabold sm:text-4xl">3+</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.15}>
            <span className="eyebrow"><Sparkles className="size-4" /> About ABHYUTHANAM</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy sm:text-4xl xl:text-5xl">
              Turning responsible e-waste disposal into a <span className="text-brand">better future</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Abhyuthanam is a certified e-waste recycler helping homes and businesses across India dispose of old electronics safely. We collect, recycle and recover precious materials — with zero landfill and full documentation for every pickup.
            </p>
            {/* Committed pill card */}
            <div className="mt-7 flex items-center gap-4 rounded-full bg-card p-3 pr-8 shadow-card">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-brand">
                <Recycle className="size-8" />
              </span>
              <p className="text-lg font-bold leading-tight text-navy">
                Committed to safe and sustainable e-waste disposal
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link to="/about" className="btn-primary">About More <ArrowRight className="size-4" /></Link>
              <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-navy text-navy-foreground"><Phone className="size-5" /></span>
                <span>
                  <span className="block text-xs text-muted-foreground">Need Help</span>
                  <span className="block font-bold text-navy">{company.phones[0]}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership / Owners */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><HeartHandshake className="size-4" /> Leadership</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Meet the people behind ABHYUTHANAM</h2>
            <p className="mt-4 text-muted-foreground">Driven by a shared mission for a greener, safer and more prosperous tomorrow.</p>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
                  <div className="relative overflow-hidden">
                    {"linkedin_url" in l && l.linkedin_url ? (
                      <a href={l.linkedin_url} target="_blank" rel="noopener noreferrer" className="block">
                        <img src={l.img} alt={l.name} loading="lazy" width={1024} height={1024} className="h-80 w-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105" />
                      </a>
                    ) : (
                      <img src={l.img} alt={l.name} loading="lazy" width={1024} height={1024} className="h-80 w-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105" />
                    )}
                    {"linkedin_url" in l && l.linkedin_url ? (
                      <a href={l.linkedin_url} target="_blank" rel="noopener noreferrer" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-brand text-brand-foreground shadow-card transition hover:bg-navy">
                        <Linkedin className="size-5" />
                      </a>
                    ) : (
                      <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-brand/60 text-brand-foreground shadow-card"><Linkedin className="size-5" /></span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {"linkedin_url" in l && l.linkedin_url ? (
                      <a href={l.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-fit text-xl font-bold text-navy transition-colors hover:text-brand">
                        {l.name}
                      </a>
                    ) : (
                      <h3 className="text-xl font-bold text-navy">{l.name}</h3>
                    )}
                    <p className="text-sm font-semibold text-brand">{l.role}</p>
                    <p className="mt-3 flex-1 text-sm leading-8 text-muted-foreground">{l.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plant & facility gallery */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Award className="size-4" /> Our Plant</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">A look inside our facility</h2>
            <p className="mt-4 text-muted-foreground">State-of-the-art infrastructure with a government-approved capacity of 8400 metric tonnes per year.</p>
          </Reveal>
          <div className="mt-12 grid auto-rows-[14rem] gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { img: plantExterior, t: "ABHYUTHANAM Plant", span: "lg:col-span-2 lg:row-span-2 sm:col-span-2" },
              { img: plantFloor, t: "Segregation Floor", span: "lg:col-span-2" },
              { img: rec1, t: "Sorting Lines", span: "" },
              { img: rec2, t: "Collection Bins", span: "" },
            ].map((g, i) => (
              <Reveal key={g.t} delay={(i % 4) * 0.08} className={g.span}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] shadow-soft">
                  <img src={g.img} alt={`ABHYUTHANAM — ${g.t}`} loading="lazy" width={1024} height={768} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                  <p className="absolute bottom-4 left-5 flex items-center gap-2 text-sm font-bold text-navy-foreground">
                    <MapPin className="size-4 text-lime" /> {g.t}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced features */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Sparkles className="size-4" /> Why Advanced</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Advanced recycling, done right</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {advanced.map((a, i) => {
              const Icon = advIcons[a.icon] ?? Recycle;
              return (
                <Reveal key={a.title} delay={i * 0.1}>
                  <div className="card-soft h-full text-center">
                    <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-soft">
                      <Icon className="size-8" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-navy">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Recycle className="size-4" /> Our Services</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Complete e-waste solutions</h2>
            <p className="mt-4 text-muted-foreground">End-to-end services covering disposition, recovery, compliance and awareness.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon] ?? Recycle;
              return (
                <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="group relative block h-72 overflow-hidden rounded-[1.75rem] shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
                  >
                    <img
                      src={s.imageUrl ?? serviceImages[s.slug] ?? svcRecovery}
                      alt={s.title}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent" />
                    {/* Title */}
                    <div className="absolute inset-x-0 bottom-0 p-6 pr-24 text-navy-foreground">
                      <h3 className="text-xl font-extrabold leading-tight drop-shadow">{s.title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-navy-foreground/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        {s.short}
                      </p>
                    </div>
                    {/* Green corner badge */}
                    <span className="absolute bottom-0 right-0 grid size-20 place-items-center rounded-tl-[1.75rem] bg-brand text-brand-foreground shadow-card transition-colors group-hover:bg-lime">
                      <Icon className="size-9" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exchange Policy */}
      <section className="section">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] shadow-card">
                <img
                  src={exchangePolicy}
                  alt="Abhyuthanam Recyclers exchange your old electronics for new"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-5 top-5 rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-brand-foreground shadow-card">
                  Old for New
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow"><Recycle className="size-4" /> Exchange Policy</span>
              <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
                Give your old, get real value on the new
              </h2>
              <p className="mt-4 text-muted-foreground">
                Don't just scrap it — exchange it. Hand over your old laptops, phones,
                ACs, TVs and appliances to Abhyuthanam Recyclers and get an instant
                assessed value adjusted against your replacement. We collect the old,
                pay you a fair exchange amount, and help you upgrade responsibly.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Transparent, on-the-spot valuation of your old device",
                  "Exchange value adjusted towards your new purchase",
                  "Free doorstep pickup of the old item",
                  "Certified, zero-landfill recycling of what we collect",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className="text-navy/80">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/schedule-pickup" className="btn-primary">
                  Get exchange value <ArrowRight className="size-4" />
                </Link>
                <Link to="/scrap-rate" className="btn-outline">View scrap rates</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our recycling gallery */}
      <section className="section bg-eco text-navy">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Recycle className="size-4" /> Our Recycling</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Inside our recycling process</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { img: rec1, t: "Sorting & Segregation", d: "Careful sorting of e-waste streams" },
              { img: rec2, t: "Collection & Bins", d: "Smart green collection network" },
              { img: rec3, t: "Recover & Regrow", d: "Resources recovered, planet restored" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-3xl bg-card shadow-soft">
                  <div className="overflow-hidden">
                    <img src={c.img} alt={c.t} loading="lazy" width={800} height={600} className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{c.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="section">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {counters.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
                <p className="text-4xl font-extrabold text-brand">
                  <Counter to={c.value} suffix={c.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-eco">
        <div className="container-px grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow"><CheckCircle2 className="size-4" /> Why Choose Us</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Why choose our services</h2>
            <p className="mt-4 text-muted-foreground">
              We usually let our work do the talking, but since you asked — here are the top reasons to choose ABHYUTHANAM.
            </p>
            <a href="/schedule-pickup" className="btn-primary mt-7">
              Schedule a Pickup <ArrowRight className="size-4" />
            </a>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyChoose.map((item, i) => (
              <Reveal key={item} delay={(i % 2) * 0.08}>
                <li className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span className="text-sm text-navy">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Award className="size-4" /> Industries We Serve</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Industry vertical services</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) * 0.1}>
                <Link to={`/industries/${ind.slug}`} className="group relative block overflow-hidden rounded-3xl shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
                  <img src={ind.imageUrl ?? indImages[ind.image] ?? oem} alt={ind.title} loading="lazy" width={800} height={600} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-navy-foreground">
                    <h3 className="text-lg font-bold">{ind.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-navy-foreground/80">{ind.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ecosystem */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Layers className="size-4" /> Our Ecosystem</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Built for Recycling, Technology &amp; Daily Scrap Solutions</h2>
            <p className="mt-4 text-muted-foreground">
              ABHYUTHANAM is part of a small group of ventures working across recycling, technology, and everyday scrap solutions.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.12}>
                <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <item.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand">{item.subtitle}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{item.description}</p>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                    >
                      {item.cta} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                    >
                      {item.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scrapify */}
      <section className="section bg-navy text-navy-foreground">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-lime"><Smartphone className="size-4" /> Scrapify App</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Doorstep scrap pickup, <span className="text-brand">made effortless</span></h2>
            <p className="mt-5 max-w-xl text-navy-foreground/70">{scrapify.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {scrapify.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-navy-foreground/85">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lime" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/scrap-rate" className="btn-primary">Check Scrap Rate <ArrowRight className="size-4" /></Link>
              <a href="/schedule-pickup" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-semibold text-navy-foreground transition-colors hover:bg-white/10">Schedule Pickup</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <img src={rec2} alt="Scrapify doorstep pickup" loading="lazy" width={800} height={600} className="h-full w-full rounded-[2rem] object-cover shadow-card" />
              <img src={rec1} alt="Scrapify sorting" loading="lazy" width={800} height={600} className="mt-8 h-full w-full rounded-[2rem] object-cover shadow-card" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews marquee */}
      <div className="overflow-hidden border-y border-border bg-navy py-3 text-navy-foreground">
        <div className="marquee-track-rev">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-bold uppercase tracking-[0.25em] text-lime">
              {t} <Star className="size-4 fill-current" />
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="container-px py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-14 text-center text-navy-foreground shadow-card">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 size-56 rounded-full bg-lime/10 blur-2xl" />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">Ready to recycle responsibly?</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-navy-foreground/70">Our representative will collect your e-waste right from your doorstep.</p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <a href="/schedule-pickup" className="btn-primary">Schedule Pickup <ArrowRight className="size-4" /></a>
              <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-semibold text-navy-foreground transition-colors hover:bg-white/10"><Phone className="size-4" /> Call Now</a>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
