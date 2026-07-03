import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Recycle } from "lucide-react";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, motion } from "@/Frontend/components/anim";
import { fetchServices } from "@/Frontend/lib/dynamic-content";
import imgEwaste from "@/Frontend/assets/svc-ewaste.jpg";
import imgItad from "@/Frontend/assets/svc-itad.jpg";
import imgData from "@/Frontend/assets/svc-data.jpg";
import imgRecovery from "@/Frontend/assets/svc-recovery.jpg";
import imgLogistics from "@/Frontend/assets/svc-logistics.jpg";
import imgCsr from "@/Frontend/assets/svc-csr.jpg";
import imgTraining from "@/Frontend/assets/svc-training.jpg";
import imgExchange from "@/Frontend/assets/svc-exchange.jpg";

const svcImages: Record<string, string> = {
  ewaste: imgEwaste, itad: imgItad, data: imgData, recovery: imgRecovery,
  logistics: imgLogistics, csr: imgCsr, training: imgTraining, exchange: imgExchange,
};

export const Route = createFileRoute("/services/$serviceId")({
  loader: async ({ params }) => {
    const services = await fetchServices();
    const service = services.find((s) => s.slug === params.serviceId);
    if (!service) throw notFound();
    return { service, services };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} | ABHYUTHANAM RECYCLER` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: loaderData.service.title },
          { property: "og:description", content: loaderData.service.short },
        ]
      : [],
  }),
  component: ServicePage,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Service not found" subtitle="The service you are looking for doesn't exist." />
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <PageHero title="Something went wrong" />
    </SiteLayout>
  ),
});

function ServicePage() {
  const { service, services } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHero breadcrumb="Home / Services" title={service.title} subtitle={service.short} />

      <section className="section">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <motion.img
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              src={service.imageUrl ?? svcImages[service.image] ?? imgEwaste}
              alt={service.title}
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <span className="eyebrow"><Recycle className="size-4" /> Service Overview</span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">{service.title}</h2>
            <p className="mt-5 text-muted-foreground">{service.intro}</p>
            <Link to="/schedule-pickup" className="btn-primary mt-7 group">Schedule Pickup <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          </Reveal>
        </div>
      </section>

      {service.why && (
        <section className="section bg-secondary">
          <div className="container-px max-w-4xl">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Why do we require these services?</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.why}</p>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-px">
          {service.benefits.length > 0 && (
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Benefits</span>
              <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">What you get with us</h2>
            </div>
          )}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((b: { title: string; desc: string }) => (
              <div key={b.title} className="card-soft">
                <CheckCircle2 className="size-8 text-brand" />
                <h3 className="mt-4 text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {services.filter((s: { slug: string }) => s.slug !== service.slug).slice(0, 3).map((s: { slug: string; title: string }) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="btn-outline">{s.title}</Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
