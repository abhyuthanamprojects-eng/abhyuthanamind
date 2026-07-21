import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck, Route as RouteIcon, Search, Wrench, Magnet, Gem, ShieldCheck,
  ArrowRight, Recycle, FileCheck2, Lock, Network, Leaf, BadgeCheck, ClipboardCheck,
} from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, motion } from "@/Frontend/components/anim";
import { processSteps, processFlow } from "@/Frontend/lib/site-data";
import imgCollect from "@/Frontend/assets/proc-collection.jpg";
import imgTransport from "@/Frontend/assets/svc-logistics.jpg";
import imgSort from "@/Frontend/assets/proc-dismantling.jpg";
import imgDismantle from "@/Frontend/assets/proc-shredding.jpg";
import imgSeparate from "@/Frontend/assets/proc-separation.jpg";
import imgRecover from "@/Frontend/assets/svc-recovery.jpg";
import imgDisposal from "@/Frontend/assets/recycle-1.jpg";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Scrap Recycling Process | ABHYUTHANAM RECYCLERS" },
      { name: "description", content: "Our 7-stage scrap and e-waste recycling process — collection, transportation, sorting, dismantling, advanced separation, material recovery and zero-landfill disposal." },
      { property: "og:title", content: "Scrap Recycling Process | ABHYUTHANAM" },
      { property: "og:description", content: "A transparent, certified, zero-landfill recycling journey." },
    ],
  }),
  component: ProcessPage,
});

const stepIcons: Record<string, typeof Truck> = {
  Truck, Route: RouteIcon, Search, Wrench, Magnet, Gem, ShieldCheck,
};
const stepImages: Record<string, string> = {
  collect: imgCollect, transport: imgTransport, sort: imgSort,
  dismantle: imgDismantle, separate: imgSeparate, recover: imgRecover, disposal: imgDisposal,
};

const compliance = [
  { icon: ClipboardCheck, title: "Chain of Custody", desc: "Every consignment tracked end to end." },
  { icon: Network, title: "Digital Tracking", desc: "Real-time visibility across the flow." },
  { icon: Lock, title: "Data Security", desc: "Certified destruction of all media." },
  { icon: BadgeCheck, title: "Certified Handling", desc: "R2 / CPCB / SPCB compliant." },
  { icon: Leaf, title: "Zero Landfill", desc: "Nothing dumped, everything recovered." },
  { icon: FileCheck2, title: "Compliance Reporting", desc: "Audit-ready documentation issued." },
];

function ProcessPage() {
  return (
    <SiteLayout>
      <PageHero
        breadcrumb="Home / Recycling Process"
        title="Scrap Recycling Process"
        subtitle="A transparent, certified and zero-landfill journey — from scrap collection to resource recovery."
      />

      {/* Flow strip */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><Recycle className="size-4" /> End-to-End Flow</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">From scrap to resource</h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {processFlow.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-navy shadow-soft">{f}</span>
                {i < processFlow.length - 1 && <ArrowRight className="size-4 text-brand" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed alternating step sections */}
      <section className="section bg-eco">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><ShieldCheck className="size-4" /> 7 Stages</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Inside our recycling process</h2>
          </Reveal>

          <div className="mt-14 space-y-16">
            {processSteps.map((s, i) => {
              const Icon = stepIcons[s.icon] ?? Recycle;
              const reversed = i % 2 === 1;
              return (
                <div key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                  <Reveal className={reversed ? "lg:order-2" : ""}>
                    <div className="relative overflow-hidden rounded-[2rem] shadow-card">
                      <motion.img
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        src={stepImages[s.image]}
                        alt={s.title}
                        loading="lazy"
                        width={1280}
                        height={960}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <span className="absolute left-5 top-5 grid size-14 place-items-center rounded-2xl bg-navy/90 text-xl font-extrabold text-lime backdrop-blur">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                  <Reveal delay={0.12} className={reversed ? "lg:order-1" : ""}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand shadow-soft">
                      <Icon className="size-4" /> Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-2xl font-extrabold text-navy sm:text-3xl">{s.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
                    {"bullets" in s && Array.isArray((s as any).bullets) && (
                      <ul className="mt-5 grid gap-2.5">
                        {(s as any).bullets.map((b: string) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-navy">
                            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" /> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance block */}
      <section className="section">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow"><BadgeCheck className="size-4" /> Trust & Compliance</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">Compliant at every step</h2>
            <p className="mt-4 text-muted-foreground">Security, traceability and accountability built into every stage of the journey.</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <div className="card-soft h-full">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent text-brand"><Icon className="size-6" /></span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-px">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-navy p-8 text-center text-navy-foreground sm:flex-row sm:text-left">
            <div>
              <h3 className="text-2xl font-extrabold">Ready to recycle responsibly?</h3>
              <p className="mt-1 text-navy-foreground/70">Schedule a pickup or talk to our recycling expert today.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/schedule-pickup" className="btn-primary group">Schedule Pickup <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 text-sm font-semibold text-navy-foreground transition-colors hover:bg-white/10">Talk to Our Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
