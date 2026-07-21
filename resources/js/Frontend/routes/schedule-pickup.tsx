import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ShieldCheck, BadgeCheck, Clock, Lock, ArrowRight, Phone, Mail,
  MapPin, CheckCircle2, Send, Truck, Copy,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, motion } from "@/Frontend/components/anim";
import { company, companyMeta, scrapCategoryOptions } from "@/Frontend/lib/site-data";

export const Route = createFileRoute("/schedule-pickup")({
  validateSearch: (search: Record<string, unknown>): { category?: string; item?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
    item: typeof search.item === "string" ? search.item : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Schedule a Pickup | ABHYUTHANAM RECYCLERS" },
      { name: "description", content: "Book a doorstep scrap or e-waste pickup with ABHYUTHANAM RECYCLERS. Share your details and our team will contact you shortly." },
      { property: "og:title", content: "Schedule a Pickup | ABHYUTHANAM RECYCLERS" },
      { property: "og:description", content: "Book a doorstep scrap or e-waste pickup. Certified, secure and transparent recycling." },
    ],
  }),
  component: SchedulePickup,
});

const trust = [
  { icon: BadgeCheck, title: "Certified Recycler", desc: "R2 / CPCB / SPCB authorized" },
  { icon: ShieldCheck, title: "Transparent Process", desc: "Digital tracking & reporting" },
  { icon: Lock, title: "Secure Handling", desc: "Certified data destruction" },
  { icon: Clock, title: "Fast Response", desc: "Quick pickup scheduling" },
];

const steps = [
  "Share your scrap or e-waste details below",
  "Our team confirms the pickup slot with you",
  "Doorstep collection by trained crew",
  "Certified recycling with compliance reporting",
];

function SchedulePickup() {
  const [sent, setSent] = useState(false);
  const [query, setQuery] = useState<{ query_id: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { category, item } = Route.useSearch();
  const presetCategory = scrapCategoryOptions.includes(category ?? "") ? category : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      customer_type: String(fd.get("customerType") || ""),
      full_name: String(fd.get("name") || "").trim(),
      mobile_number: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      company_name: String(fd.get("company") || "").trim() || null,
      city: String(fd.get("city") || "").trim(),
      pickup_address: String(fd.get("address") || "").trim(),
      scrap_category: String(fd.get("scrapCategory") || ""),
      approximate_quantity: String(fd.get("quantity") || "").trim() || null,
      preferred_contact_method: String(fd.get("contactMethod") || "") || null,
      preferred_pickup_date: String(fd.get("date") || ""),
      preferred_pickup_time: String(fd.get("time") || ""),
      description: String(fd.get("description") || "").trim() || null,
      selected_scrap_item: item || null,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/pickup-queries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          const backendToFrontendName: Record<string, string> = {
            customer_type: "customerType",
            full_name: "name",
            mobile_number: "phone",
            email: "email",
            company_name: "company",
            city: "city",
            pickup_address: "address",
            scrap_category: "scrapCategory",
            approximate_quantity: "quantity",
            preferred_contact_method: "contactMethod",
            preferred_pickup_date: "date",
            preferred_pickup_time: "time",
            description: "description",
          };
          const fieldErrors: Record<string, string> = {};
          Object.entries(result.errors).forEach(([key, msgs]) => {
            const fieldName = backendToFrontendName[key] ?? key;
            fieldErrors[fieldName] = Array.isArray(msgs) ? String(msgs[0]) : String(msgs);
          });
          setErrors(fieldErrors);
          toast.error(Object.values(fieldErrors)[0] ?? "Please check the form and try again.");
        } else {
          toast.error(result.message || "Something went wrong. Please try again.");
        }
        return;
      }

      setQuery(result.data ?? null);
      setSent(true);
      formRef.current?.reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <SiteLayout>
        <PageHero breadcrumb="Home / Schedule Pickup" title="Schedule a Pickup" subtitle="Share your scrap or e-waste details and our team will contact you shortly." />
        <section className="section">
          <div className="container-px">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-card"
            >
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-brand">
                <CheckCircle2 className="size-9" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold text-navy">Enquiry received!</h2>
              <p className="mt-3 text-muted-foreground">
                Your pickup enquiry has been submitted. Our team will review the details and contact you shortly.
              </p>

              {query && (
                <div className="mt-6 rounded-2xl border border-border bg-eco p-5 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Enquiry Reference</p>
                      <p className="text-lg font-extrabold text-navy">{query.query_id}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(query.query_id);
                        toast.success("Reference copied.");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-navy hover:bg-background"
                    >
                      <Copy className="size-3.5" /> Copy
                    </button>
                  </div>
                  <p className="mt-4 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    Once our team confirms your pickup, you'll receive a booking ID and a private tracking link to follow its progress.
                  </p>
                </div>
              )}

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/" className="btn-primary">Back to Home <ArrowRight className="size-4" /></Link>
                <button onClick={() => setSent(false)} className="btn-outline">Submit Another</button>
              </div>
            </motion.div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero breadcrumb="Home / Schedule Pickup" title="Schedule a Pickup" subtitle="Share your scrap or e-waste details and our team will contact you shortly." />

      <section className="section">
        <div className="container-px">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trust.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <Icon className="size-7 text-brand" />
                  <h3 className="mt-3 text-sm font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left summary */}
            <Reveal>
              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-eco p-7 shadow-soft">
                  <span className="eyebrow"><Truck className="size-4" /> How it works</span>
                  <ul className="mt-5 space-y-4">
                    {steps.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">{i + 1}</span>
                        <span className="text-sm text-navy">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="font-bold text-navy">Prefer to talk to us?</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3"><Phone className="size-4 shrink-0 text-brand" />{companyMeta.phonesAll.slice(0, 2).join(", ")}</li>
                    <li className="flex gap-3"><Mail className="size-4 shrink-0 text-brand" />{companyMeta.emails[0]}</li>
                    <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-brand" />{companyMeta.plantAddress}</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Right form */}
            <Reveal delay={0.1}>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9"
              >
                <h2 className="text-2xl font-extrabold text-navy">Pickup Request</h2>
                <p className="mt-1 text-sm text-muted-foreground">Fields marked <span className="text-brand">*</span> are required.</p>

                <div className="mt-6">
                  <Label>Customer Type <Req /></Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["New Customer", "Existing Customer"].map((c) => (
                      <label key={c} className="flex cursor-pointer items-center gap-2 rounded-2xl border border-input bg-background px-4 py-3 text-sm font-medium text-navy transition-colors has-[:checked]:border-brand has-[:checked]:bg-accent">
                        <input type="radio" name="customerType" value={c} required className="accent-[var(--brand)]" defaultChecked={c === "New Customer"} />
                        {c}
                      </label>
                    ))}
                  </div>
                  {errors.customerType && <p className="mt-1 text-xs font-medium text-destructive">{errors.customerType}</p>}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" name="name" required error={errors.name} />
                  <Field label="Mobile Number" name="phone" type="tel" required error={errors.phone} />
                  <Field label="Email" name="email" type="email" required error={errors.email} />
                  <Field label="Company Name" name="company" error={errors.company} />
                  <Field label="City" name="city" required error={errors.city} />
                  <div>
                    <Label>Scrap Category <Req /></Label>
                    <select name="scrapCategory" key={presetCategory} required defaultValue={presetCategory} className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20">
                      <option value="" disabled>Select a category</option>
                      {scrapCategoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.scrapCategory && <p className="mt-1 text-xs font-medium text-destructive">{errors.scrapCategory}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <Field label="Pickup Address" name="address" required error={errors.address} />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Approximate Quantity" name="quantity" placeholder="e.g. 50 kg / 10 units" error={errors.quantity} />
                  <div>
                    <Label>Preferred Contact Method</Label>
                    <select name="contactMethod" defaultValue="Phone" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20">
                      <option>Phone</option><option>WhatsApp</option><option>Email</option>
                    </select>
                  </div>
                  <Field label="Preferred Pickup Date" name="date" type="date" required error={errors.date} />
                  <Field label="Preferred Pickup Time" name="time" type="time" required error={errors.time} />
                </div>

                <div className="mt-4">
                  <Label>Description / Scrap Details</Label>
                  <textarea name="description" key={item ?? "blank"} rows={4} defaultValue={item ? `I want to sell: ${item}` : ""} placeholder="Tell us about your scrap or e-waste..." className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
                  {errors.description && <p className="mt-1 text-xs font-medium text-destructive">{errors.description}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Pickup Request"} <Send className="size-4" />
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Req() {
  return <span className="text-brand">*</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-semibold text-navy">{children}</label>;
}

function Field({ label, name, type = "text", required, placeholder, error }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; error?: string }) {
  return (
    <div>
      <Label>{label} {required && <Req />}</Label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}