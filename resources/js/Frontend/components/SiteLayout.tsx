import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-navy-foreground sm:py-24">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-lime/10 blur-3xl" />
      <div className="container-px relative text-center">
        {breadcrumb && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-lime">{breadcrumb}</p>
        )}
        <h1 className="text-3xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-navy-foreground/70">{subtitle}</p>}
      </div>
    </section>
  );
}