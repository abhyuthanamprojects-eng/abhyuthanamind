import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft, BadgeCheck, Calendar, CheckCircle2, Clock, Download,
  MapPin, Package, Search, ShieldAlert, Truck,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";

export const Route = createFileRoute("/track-pickup/$token")({
  head: () => ({
    meta: [
      { title: "Track Your Pickup | ABHYUTHANAM RECYCLER" },
      { name: "description", content: "Check the live status of your scrap pickup request." },
    ],
  }),
  component: TrackPickup,
});

const STEP_ORDER = ["pending", "confirmed", "driver_on_the_way", "picked_up", "processing", "completed"];

type TrackingData = {
  booking_id: string;
  customer_name: string;
  city: string | null;
  scrap_category: string | null;
  selected_scrap_item: string | null;
  approximate_quantity: string | null;
  scheduled_at: string | null;
  submitted_at: string;
  tracking_status: string;
  tracking_status_label: string;
  status_options: Record<string, string>;
  public_notes: string | null;
  status_history: { status: string; status_label: string; created_at: string }[];
  has_certificate: boolean;
  certificate_number: string | null;
  certificate_issued_at: string | null;
};

function TrackPickup() {
  const { token } = Route.useParams();
  const [data, setData] = useState<TrackingData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/track-pickup/${token}`, { headers: { Accept: "application/json" } })
      .then(async (res) => {
        if (!res.ok) {
          if (!cancelled) setNotFound(true);
          return;
        }
        const json = await res.json();
        if (!cancelled) setData(json.data);
      })
      .catch(() => {
        if (!cancelled) toast.error("Could not load tracking details. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <SiteLayout>
        <PageHero breadcrumb="Home / Track Pickup" title="Track Your Pickup" subtitle="Checking your booking status…" />
        <section className="section">
          <div className="container-px text-center text-muted-foreground">Loading…</div>
        </section>
      </SiteLayout>
    );
  }

  if (notFound || !data) {
    return (
      <SiteLayout>
        <PageHero breadcrumb="Home / Track Pickup" title="Track Your Pickup" />
        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-card">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-rose-100 text-rose-600">
                <ShieldAlert className="size-8" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-navy">Tracking link not found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This tracking link is invalid or has expired. Please check the link shared with you, or contact our team for help.
              </p>
              <Link to="/" className="btn-primary mt-6 inline-flex">
                <ArrowLeft className="size-4" /> Back to Home
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  const isCancelled = data.tracking_status === "cancelled";
  const activeStepIndex = STEP_ORDER.indexOf(data.tracking_status);

  return (
    <SiteLayout>
      <PageHero
        breadcrumb="Home / Track Pickup"
        title="Track Your Pickup"
        subtitle={`Booking ID: ${data.booking_id}`}
      />

      <section className="section">
        <div className="container-px mx-auto max-w-3xl space-y-6">
          {/* Status header */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Status</p>
                <p className="mt-1 text-2xl font-extrabold text-navy">{data.tracking_status_label}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold ${isCancelled ? "bg-rose-100 text-rose-700" : "bg-accent text-accent-foreground"}`}>
                {isCancelled ? <ShieldAlert className="size-4" /> : <CheckCircle2 className="size-4" />}
                {data.tracking_status_label}
              </span>
            </div>

            {data.public_notes && (
              <div className="mt-4 rounded-2xl border border-primary/10 bg-eco p-4 text-sm text-navy">
                {data.public_notes}
              </div>
            )}

            {/* Timeline */}
            {!isCancelled && (
              <div className="mt-8 flex items-center justify-between overflow-x-auto pb-2">
                {STEP_ORDER.map((step, i) => {
                  const reached = activeStepIndex >= i;
                  return (
                    <div key={step} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center gap-1.5 px-1">
                        <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${reached ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"}`}>
                          {reached ? <CheckCircle2 className="size-4" /> : i + 1}
                        </span>
                        <span className={`whitespace-nowrap text-[10px] font-semibold ${reached ? "text-navy" : "text-muted-foreground"}`}>
                          {data.status_options[step]}
                        </span>
                      </div>
                      {i < STEP_ORDER.length - 1 && (
                        <div className={`h-0.5 flex-1 rounded ${activeStepIndex > i ? "bg-brand" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pickup details */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-base font-bold text-navy">Pickup Details</h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Detail icon={BadgeCheck} label="Customer Name" value={data.customer_name} />
              <Detail icon={MapPin} label="City" value={data.city} />
              <Detail icon={Package} label="Scrap Category" value={data.scrap_category} />
              {data.selected_scrap_item && <Detail icon={Search} label="Selected Item" value={data.selected_scrap_item} />}
              <Detail icon={Truck} label="Approx. Quantity" value={data.approximate_quantity} />
              <Detail icon={Calendar} label="Pickup Date/Time" value={data.scheduled_at ? new Date(data.scheduled_at).toLocaleString() : null} />
              <Detail icon={Clock} label="Submitted" value={new Date(data.submitted_at).toLocaleString()} />
            </dl>
          </div>

          {/* Status history */}
          {data.status_history.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-base font-bold text-navy">Status History</h3>
              <ul className="mt-4 space-y-3">
                {[...data.status_history].reverse().map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                      <Clock className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-navy">{h.status_label}</p>
                      <p className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Downloads */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h3 className="text-base font-bold text-navy">Downloads</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`/track-pickup/${token}/download`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                <Download className="size-4" /> Download Request Details
              </a>

              {data.tracking_status === "completed" && data.has_certificate && (
                <a href={`/track-pickup/${token}/certificate`} className="btn-primary">
                  <Download className="size-4" /> Download Certificate
                </a>
              )}
            </div>

            {data.tracking_status !== "completed" && (
              <p className="mt-3 text-xs text-muted-foreground">Certificate will be available after completion.</p>
            )}
            {data.tracking_status === "completed" && !data.has_certificate && (
              <p className="mt-3 text-xs text-muted-foreground">Certificate is being prepared and will appear here shortly.</p>
            )}
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof BadgeCheck; label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5 text-brand" /> {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-navy">{value || "—"}</dd>
    </div>
  );
}
