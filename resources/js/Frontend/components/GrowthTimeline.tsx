import { useRef } from "react";
import { motion, useScroll, useSpring, useInView, useTransform } from "framer-motion";
import {
  Flag, Factory, Award, Gauge, Users, TrendingUp, MapPin, type LucideIcon,
} from "lucide-react";
import { growthJourney } from "@/Frontend/lib/site-data";
import jFounded from "@/Frontend/assets/journey/founded.jpg";
import jPlant from "@/Frontend/assets/journey/plant.jpg";
import jCert from "@/Frontend/assets/journey/certifications.jpg";
import jCapacity from "@/Frontend/assets/journey/capacity.jpg";
import jTeam from "@/Frontend/assets/journey/team.jpg";
import jCustomers from "@/Frontend/assets/journey/customers.jpg";

const journeyImages: Record<string, string> = {
  founded: jFounded, plant: jPlant, certifications: jCert,
  capacity: jCapacity, team: jTeam, customers: jCustomers,
};

const journeyIcons: Record<string, LucideIcon> = {
  Flag, Factory, Award, Gauge, Users, TrendingUp,
};

type Milestone = (typeof growthJourney)[number];

function MilestoneRow({ m, i }: { m: Milestone; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Active when the row's middle sits in the central scroll zone.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = journeyIcons[m.icon] ?? Flag;
  const left = i % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row md:items-center ${left ? "" : "md:flex-row-reverse"}`}
    >
      {/* Connector marker */}
      <motion.span
        className="absolute left-5 top-6 z-20 grid -translate-x-1/2 place-items-center rounded-full md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        animate={{
          width: inView ? 46 : 36,
          height: inView ? 46 : 36,
          backgroundColor: inView ? "var(--brand)" : "var(--card)",
          color: inView ? "var(--brand-foreground)" : "var(--brand)",
          boxShadow: inView
            ? "0 0 0 6px color-mix(in oklab, var(--brand) 22%, transparent), 0 0 22px color-mix(in oklab, var(--brand) 55%, transparent)"
            : "0 0 0 4px color-mix(in oklab, var(--brand) 12%, transparent)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ border: "1px solid color-mix(in oklab, var(--brand) 30%, transparent)" }}
      >
        <Icon className="size-5" />
      </motion.span>

      {/* Card */}
      <motion.div
        className={`ml-14 md:ml-0 md:w-1/2 ${left ? "md:pr-14" : "md:pl-14"}`}
        initial={{ opacity: 0, x: left ? -48 : 48, y: 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="group relative overflow-hidden rounded-[1.75rem] border bg-card"
          animate={{
            scale: inView ? 1.02 : 1,
            opacity: inView ? 1 : 0.62,
            borderColor: inView
              ? "color-mix(in oklab, var(--brand) 55%, transparent)"
              : "var(--border)",
            boxShadow: inView
              ? "0 24px 50px -18px color-mix(in oklab, var(--navy) 38%, transparent)"
              : "0 8px 22px -16px color-mix(in oklab, var(--navy) 30%, transparent)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          whileHover={{ y: -6 }}
        >
          <div className="relative overflow-hidden">
            <motion.img
              src={journeyImages[m.img]}
              alt={m.title}
              loading="lazy"
              width={800}
              height={600}
              className="h-48 w-full object-cover"
              animate={{
                scale: inView ? 1.06 : 1,
                filter: inView
                  ? "brightness(1.05) saturate(1.08)"
                  : "brightness(0.82) saturate(0.85)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
              animate={{ opacity: inView ? 0.55 : 0.9 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span
              className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-brand-foreground shadow-card"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1.4, 0.36, 1] }}
              animate={{ scale: inView ? 1.06 : 1 }}
            >
              {m.year}
            </motion.span>
            <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-card/90 text-[11px] font-extrabold text-brand shadow-soft backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/90">{m.caption}</span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-navy">{m.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Opposite-side spacer on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

export function GrowthTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const fillHeight = useTransform(fill, (v) => `${v * 100}%`);

  const finalRef = useRef<HTMLDivElement>(null);
  const finalInView = useInView(finalRef, { margin: "-45% 0px -45% 0px" });

  return (
    <div ref={trackRef} className="relative mx-auto mt-16 max-w-5xl">
      {/* Backbone line */}
      <div className="absolute left-5 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-brand/10 md:left-1/2">
        {/* Scroll-linked fill */}
        <motion.div
          className="absolute inset-x-0 top-0 w-full rounded-full bg-gradient-to-b from-brand via-brand to-brand/60"
          style={{ height: fillHeight }}
        >
          {/* Glowing head of the progress line */}
          <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_16px_4px_color-mix(in_oklab,var(--brand)_60%,transparent)]" />
        </motion.div>
      </div>

      <div className="space-y-10 md:space-y-2">
        {growthJourney.map((m, i) => (
          <MilestoneRow key={i} m={m} i={i} />
        ))}

        {/* Journey continues final marker */}
        <div ref={finalRef} className="relative flex flex-col md:flex-row md:justify-center">
          <motion.span
            className="absolute left-5 top-0 z-20 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy text-navy-foreground shadow-card md:left-1/2 md:top-10"
            animate={{ scale: finalInView ? 1.1 : 1, boxShadow: finalInView ? "0 0 0 6px color-mix(in oklab, var(--navy) 14%, transparent)" : "0 0 0 4px color-mix(in oklab, var(--navy) 8%, transparent)" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <MapPin className="size-5" />
          </motion.span>
          <motion.div
            className="ml-14 md:ml-0 md:mt-20 md:w-full md:max-w-md md:text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.75rem] border border-dashed border-brand/40 bg-eco p-6 text-center">
              <p className="text-sm font-extrabold uppercase tracking-wide text-brand">The journey continues</p>
              <p className="mt-2 text-sm text-muted-foreground">Scaling capacity, services and impact across India — with zero landfill at the heart of everything we do.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
