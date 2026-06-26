import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Factory } from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { industries, company } from "@/Frontend/lib/site-data";
import oem from "@/Frontend/assets/ind-oem.jpg";
import ecommerce from "@/Frontend/assets/ind-ecommerce.jpg";
import corporate from "@/Frontend/assets/ind-corporate.jpg";
import logistics from "@/Frontend/assets/ind-logistics.jpg";

const indImages: Record<string, string> = { oem, ecommerce, corporate, logistics };

export const Route = createFileRoute("/industries/$industryId")({
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.industryId);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.industry.title} | ABHYUTHANAM RECYCLER` },
          { name: "description", content: loaderData.industry.short },
          { property: "og:title", content: loaderData.industry.title },
          { property: "og:description", content: loaderData.industry.short },
        ]
      : [],
  }),
  component: IndustryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Industry not found" subtitle="The page you are looking for doesn't exist." />
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <PageHero title="Something went wrong" />
    </SiteLayout>
  ),
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHero breadcrumb="Home / Industries" title={industry.title} subtitle={industry.short} />

      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <img src={indImages[industry.image]} alt={industry.title} loading="lazy" width={1280} height={960} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card" />
          <div>
            <span className="eyebrow"><Factory className="size-4" /> Industry Overview</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">{industry.title}</h2>
            <p className="mt-5 text-muted-foreground">{industry.intro}</p>
            <Link to="/schedule-pickup" className="btn-primary mt-7 group">Schedule Pickup <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/contact" className="btn-outline ml-3 mt-7">Talk to Expert</Link>
          </div>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Industry-specific Services</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">How we help</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industry.servicesOffered.map((s: { title: string; desc: string }) => (
              <div key={s.title} className="card-soft">
                <CheckCircle2 className="size-8 text-brand" />
                <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.filter((i) => i.slug !== industry.slug).map((i) => (
              <Link key={i.slug} to={`/industries/${i.slug}`} className="btn-outline">{i.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}