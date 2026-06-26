import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Building2, Factory, ArrowRight, ExternalLink } from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { company, companyMeta } from "@/Frontend/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | ABHYUTHANAM RECYCLER" },
      { name: "description", content: "Get in touch with ABHYUTHANAM RECYCLER for secure e-waste recycling, ITAD and bulk pickup enquiries across India." },
      { property: "og:title", content: "Contact ABHYUTHANAM RECYCLER" },
      { property: "og:description", content: "Reach our team for e-waste pickup and enquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const cards = [
    { icon: Factory, title: "Plant Address", lines: [companyMeta.plantAddress] },
    { icon: Building2, title: "Corporate Office", lines: [companyMeta.corporateAddress] },
    { icon: Phone, title: "Phone", lines: companyMeta.phonesAll },
    { icon: Mail, title: "Email", lines: companyMeta.emails },
    { icon: Clock, title: "Working Hours", lines: [company.hours] },
  ];
  return (
    <SiteLayout>
      <PageHero breadcrumb="Home / Contact" title="Contact Us" subtitle="We'd love to hear from you. Reach out for pickups, quotes and enquiries." />
      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            {cards.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-brand"><Icon className="size-6" /></span>
                <div>
                  <h3 className="font-bold text-navy">{title}</h3>
                  {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="/schedule-pickup" className="btn-primary">Schedule Pickup <ArrowRight className="size-4" /></a>
              <a href={`mailto:${companyMeta.emails[0]}`} className="btn-outline">Request a Quote</a>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <h2 className="text-2xl font-bold text-navy">Send an Enquiry</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fill the form and our team will get back to you.</p>
            <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy">Message</label>
                <textarea required rows={4} className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">Submit Enquiry <Send className="size-4" /></button>
              {sent && <p className="text-center text-sm font-semibold text-brand">Thank you! Your enquiry has been received.</p>}
            </form>
          </div>
        </div>
        <div className="container-px mt-12">
          <div className="overflow-hidden rounded-3xl border border-border shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-navy px-6 py-4 text-navy-foreground">
              <p className="flex items-center gap-2 text-sm font-semibold"><MapPin className="size-4 text-lime" /> {companyMeta.plantAddress}</p>
              <a href={companyMeta.mapLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition-colors hover:bg-lime">Open in Google Maps <ExternalLink className="size-3.5" /></a>
            </div>
            <iframe
              title="ABHYUTHANAM plant location"
              src={companyMeta.mapEmbed}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      <input required name={name} type={type} className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20" />
    </div>
  );
}