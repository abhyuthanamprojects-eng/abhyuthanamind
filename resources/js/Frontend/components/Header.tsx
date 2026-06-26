import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Mail, Clock, MapPin, Phone } from "lucide-react";
import { company, services, industries } from "@/Frontend/lib/site-data";
const logo = "/images/logo.png";

const resources = [
  { title: "Recycling Process", to: "/process" as const, desc: "Our 7-stage recycling flow" },
  { title: "Scrap Rates", to: "/scrap-rate" as const, desc: "Latest material rates" },
  { title: "Schedule Pickup", to: "/schedule-pickup" as const, desc: "Doorstep collection" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden border-b border-border bg-accent/60 text-navy/80 lg:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-brand" />{company.hours}</span>
            <a href={`mailto:${company.email}`} className="flex items-center gap-1.5 hover:text-brand"><Mail className="size-3.5 text-brand" />{company.email}</a>
            <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-brand" />{company.address}</span>
          </div>
          <div className="flex items-center gap-4">
            {company.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-1.5 font-semibold hover:text-brand">
                <Phone className="size-3.5 text-brand" />{p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className={`border-b border-border bg-background/90 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-soft" : ""}`}>
        <div className="container-px flex h-[72px] items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="ABHYUTHANAM RECYCLER" width={150} height={48} className="h-10 w-auto" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <Dropdown
              label="Services"
              items={services.map((s) => ({ title: s.title, to: `/services/${s.slug}`, desc: s.short }))}
            />
            <Dropdown
              label="Industries"
              items={industries.map((i) => ({ title: i.title, to: `/industries/${i.slug}`, desc: i.short }))}
            />
            <Dropdown
              label="Resources"
              items={resources.map((r) => ({ title: r.title, to: r.to, desc: r.desc }))}
            />
            <NavLink to="/scrap-rate">Scrap Rate</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="hidden lg:block">
            <a href="/schedule-pickup" className="btn-primary">Schedule Pickup</a>
          </div>

          <button className="rounded-xl p-2 text-navy lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background p-5 shadow-card">
            <div className="flex items-center justify-between">
              <img src={logo} alt="ABHYUTHANAM RECYCLER" width={130} height={42} className="h-9 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="size-6 text-navy" /></button>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
              <MobileLink to="/about" onClick={() => setOpen(false)}>About Us</MobileLink>
              <MobileGroup label="Services" id="s" open={mobileSub} setOpen={setMobileSub}
                items={services.map((s) => ({ title: s.title, to: `/services/${s.slug}` }))} onNavigate={() => setOpen(false)} />
              <MobileGroup label="Industries" id="i" open={mobileSub} setOpen={setMobileSub}
                items={industries.map((i) => ({ title: i.title, to: `/industries/${i.slug}` }))} onNavigate={() => setOpen(false)} />
              <MobileLink to="/process" onClick={() => setOpen(false)}>Recycling Process</MobileLink>
              <MobileLink to="/scrap-rate" onClick={() => setOpen(false)}>Scrap Rate</MobileLink>
              <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
              <a href="/schedule-pickup" className="btn-primary mt-4 justify-center">Schedule Pickup</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3.5 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-accent hover:text-brand [&.active]:text-brand"
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}

type DItem = { title: string; desc?: string; to?: string; href?: string };

function Dropdown({ label, items }: { label: string; items: DItem[] }) {
  const wide = items.length > 4;
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold text-navy/80 transition-colors group-hover:bg-accent group-hover:text-brand">
        {label}
        <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
      </button>
      <div
        className={`invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${wide ? "w-[34rem]" : "w-72"}`}
      >
        <div className={`rounded-2xl border border-border bg-card p-2 shadow-card ${wide ? "grid grid-cols-2 gap-1" : "grid gap-1"}`}>
          {items.map((item) => {
            const inner = (
              <span className="flex items-start gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  <span className="block text-sm font-semibold text-navy">{item.title}</span>
                  {item.desc && <span className="mt-0.5 block text-xs text-muted-foreground">{item.desc}</span>}
                </span>
              </span>
            );
            return item.to ? (
              <Link key={item.title} to={item.to} className="rounded-xl px-3 py-2.5 transition-colors hover:bg-accent">{inner}</Link>
            ) : (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="rounded-xl px-3 py-2.5 transition-colors hover:bg-accent">{inner}</a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link to={to} onClick={onClick} className="rounded-xl px-4 py-3 font-semibold text-navy hover:bg-accent">
      {children}
    </Link>
  );
}

function MobileGroup({
  label, id, open, setOpen, items, onNavigate,
}: {
  label: string; id: string; open: string | null; setOpen: (v: string | null) => void;
  items: { title: string; to: string }[]; onNavigate: () => void;
}) {
  const isOpen = open === id;
  return (
    <div>
      <button onClick={() => setOpen(isOpen ? null : id)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-navy hover:bg-accent">
        {label}
        <ChevronDown className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="ml-3 flex flex-col border-l border-border pl-3">
          {items.map((i) => (
            <Link key={i.title} to={i.to} onClick={onNavigate} className="rounded-lg px-3 py-2 text-sm text-navy/80 hover:text-brand">
              {i.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}