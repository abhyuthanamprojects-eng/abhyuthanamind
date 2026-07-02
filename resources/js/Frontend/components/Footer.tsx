import { Link } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Building2 } from "lucide-react";
import { company, companyMeta } from "@/Frontend/lib/site-data";
import { useServices, usePageSection } from "@/Frontend/lib/dynamic-content";
const logo = "/images/logo.png";

export function Footer() {
  const services = useServices();
  const contactSection = usePageSection("footer", "contact");
  const contactJson = contactSection?.json ?? {};
  const footerEmail = contactJson.email ?? companyMeta.emails[0];
  const footerPhones: string[] = Array.isArray(contactJson.phones) && contactJson.phones.length > 0
    ? contactJson.phones
    : companyMeta.phonesAll.slice(0, 2);
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-px py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center">
              <span className="rounded-xl bg-white/95 px-3 py-2">
                <img src={logo} alt="ABHYUTHANAM RECYCLER" width={160} height={48} className="h-10 w-auto" />
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-navy-foreground/70">
              {company.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-lime">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
              <li><Link to="/" className="hover:text-lime">Home</Link></li>
              <li><Link to="/about" className="hover:text-lime">About Us</Link></li>
              <li><Link to="/scrap-rate" className="hover:text-lime">Scrap Rate</Link></li>
              <li><Link to="/contact" className="hover:text-lime">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-lime">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/70">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-lime">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-lime">Get In Touch</h4>
            <ul className="mt-5 space-y-4 text-sm text-navy-foreground/70">
              <li className="flex gap-3"><Building2 className="mt-0.5 size-4 shrink-0 text-lime" /><span>Plant: {companyMeta.plantAddress}</span></li>
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-lime" /><span>Corporate: {companyMeta.corporateAddress}</span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-lime" /><a href={`mailto:${footerEmail}`} className="hover:text-lime">{companyMeta.emails.join(" · ")}</a></li>
              <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-lime" /><span>{footerPhones.join(", ")}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ABHYUTHANAM RECYCLER. All rights reserved.</p>
          <p>Reduce • Reuse • Recycle</p>
        </div>
      </div>
    </footer>
  );
}