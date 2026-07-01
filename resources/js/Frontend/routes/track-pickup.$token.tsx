import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft, BadgeCheck, Calendar, CheckCircle2, Clock, Download,
  MapPin, Package, Search, ShieldAlert, Truck, FileText, Award, ClipboardList, Recycle,
  Copy, HelpCircle, Phone, Activity, Warehouse, Factory, ScanSearch, ListChecks, Flag,
  PackageCheck, RefreshCcw, Wrench, Info,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/Frontend/components/SiteLayout";
import { Reveal, motion } from "@/Frontend/components/anim";
import { company } from "@/Frontend/lib/site-data";

export const Route = createFileRoute("/track-pickup/$token")({
  head: () => ({
    meta: [
      { title: "Track Your Pickup | ABHYUTHANAM RECYCLER" },
      { name: "description", content: "Check the live status of your scrap pickup request." },
    ],
  }),
  component: TrackPickup,
});

const DOCUMENT_ICONS: Record<string, typeof FileText> = {
  form_6: FileText,
  form_2: ClipboardList,
  green_certificate: Award,
};

const DOCUMENT_HINTS: Record<string, string> = {
  form_6: "Available after pickup is completed.",
  form_2: "Available after material processing.",
  green_certificate: "Available at final completion stage.",
};

const STEP_ICONS: Record<string, typeof Clock> = {
  pending: Clock,
  in_progress: RefreshCcw,
  driver_on_the_way: Truck,
  pickup_done: PackageCheck,
  on_the_way_to_local_warehouse: Truck,
  local_warehouse_received: Warehouse,
  on_the_way_to_plant: Truck,
  plant_received: Factory,
  segregation_in_progress: ScanSearch,
  segregation_completed: ListChecks,
  dismantling_recycling: Recycle,
  dismantling_refurbish: Wrench,
  certificate_ready: Award,
  completed: Flag,
};

const STATUS_MESSAGES: Record<string, string> = {
  pending: "Your pickup request has been created and our team will review the details.",
  in_progress: "Our team has started processing your pickup request.",
  driver_on_the_way: "The pickup partner is on the way to your location.",
  pickup_done: "Your material has been collected successfully.",
  on_the_way_to_local_warehouse: "Your material is moving to the local warehouse.",
  local_warehouse_received: "Your material has reached the local warehouse.",
  on_the_way_to_plant: "Your material is now moving to the recycling plant.",
  plant_received: "Your material has reached our recycling facility.",
  segregation_in_progress: "Our team is sorting and checking the collected material.",
  segregation_completed: "Segregation is completed and the next process is ready.",
  dismantling_recycling: "The material is being processed for recycling.",
  dismantling_refurbish: "Reusable material is being processed for refurbishing.",
  certificate_ready: "Your certificates are ready for download.",
  completed: "The complete pickup and recycling process is finished.",
  cancelled: "This pickup request has been cancelled.",
};

type DocumentInfo = {
  type: string;
  label: string;
  ready: boolean;
  issued_at: string | null;
  download_url: string | null;
};

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
  step_order: string[];
  public_notes: string | null;
  status_history: { status: string; status_label: string; public_note: string | null; created_at: string }[];
  material_processing: {
    total_quantity: string | null;
    recycled_percentage: string | null;
    refurbished_percentage: string | null;
    disposed_percentage: string | null;
  };
  documents: DocumentInfo[];
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

  const copyBookingId = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.booking_id);
    toast.success("Booking ID copied.");
  };

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
  const stepOrder = data.step_order;
  const activeStepIndex = stepOrder.indexOf(data.tracking_status);
  const progressRatio = stepOrder.length > 1 ? activeStepIndex / (stepOrder.length - 1) : 0;
  const mp = data.material_processing;
  const hasProcessingData = mp && (mp.total_quantity || mp.recycled_percentage || mp.refurbished_percentage || mp.disposed_percentage);
  const statusMessage = STATUS_MESSAGES[data.tracking_status] ?? data.tracking_status_label;

  return (
    <SiteLayout>
      <PageHero
        breadcrumb="Home / Track Pickup"
        title="Track Your Pickup"
        subtitle="Follow your pickup status, movement updates, and available certificates in one place."
      />

      <section className="section">
        <div className="container-px mx-auto max-w-6xl space-y-6">
          {/* Hero info bar */}
          <Reveal>
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={copyBookingId}
                  className="inline-flex items-center gap-2 rounded-full bg-eco px-4 py-2 text-sm font-bold text-navy transition hover:bg-eco/70"
                  title="Copy booking ID"
                >
                  {data.booking_id} <Copy className="size-3.5 text-brand" />
                </button>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold ${isCancelled ? "bg-rose-100 text-rose-700" : "bg-accent text-accent-foreground"}`}>
                  {isCancelled ? <ShieldAlert className="size-4" /> : <CheckCircle2 className="size-4" />}
                  {data.tracking_status_label}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`/track-pickup/${token}/download`} target="_blank" rel="noreferrer" className="btn-outline">
                  <Download className="size-4" /> Download Details
                </a>
                <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                  <HelpCircle className="size-4" /> Need help?
                </a>
              </div>
            </div>
          </Reveal>

          {/* Status timeline */}
          {!isCancelled && (
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-navy">Your Pickup Journey</h3>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Step {activeStepIndex + 1} of {stepOrder.length}
                  </span>
                </div>

                {/* Desktop two-row stepper, each row with its own connecting line */}
                <div className="mt-8 hidden space-y-10 lg:block">
                  {[stepOrder.slice(0, 7), stepOrder.slice(7)].map((row, rowIdx) => (
                    <div key={rowIdx} className="flex items-start">
                      {row.map((step, j) => {
                        const i = rowIdx * 7 + j;
                        return (
                          <div key={step} className="flex flex-1 items-start last:flex-none">
                            <StepNode step={step} index={i} activeStepIndex={activeStepIndex} label={data.status_options[step]} />
                            {j < row.length - 1 && (
                              <div className="relative mt-5 h-1 flex-1 overflow-hidden rounded-full bg-border">
                                <motion.div
                                  className="absolute inset-y-0 left-0 origin-left rounded-full bg-brand"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: activeStepIndex > i ? 1 : 0 }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  style={{ width: "100%" }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Tablet horizontal-scroll stepper */}
                <div className="mt-8 hidden overflow-x-auto pb-2 sm:block lg:hidden">
                  <div className="relative" style={{ width: stepOrder.length * 104 }}>
                    <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-border" />
                    <motion.div
                      className="absolute left-0 top-5 h-1 origin-left rounded-full bg-brand"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progressRatio }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: "100%" }}
                    />
                    <div className="relative flex">
                      {stepOrder.map((step, i) => (
                        <div key={step} className="w-26" style={{ width: 104 }}>
                          <StepNode step={step} index={i} activeStepIndex={activeStepIndex} label={data.status_options[step]} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile vertical stepper */}
                <div className="mt-6 space-y-0 sm:hidden">
                  {stepOrder.map((step, i) => {
                    const reached = activeStepIndex >= i;
                    const isActive = activeStepIndex === i;
                    const Icon = STEP_ICONS[step] ?? Clock;
                    return (
                      <div key={step} className="relative flex gap-4 pb-7 last:pb-0">
                        {i < stepOrder.length - 1 && (
                          <span className={`absolute left-[15px] top-8 h-full w-0.5 ${activeStepIndex > i ? "bg-brand" : "bg-border"}`} />
                        )}
                        <span className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full ${reached ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"} ${isActive ? "ring-4 ring-brand/20" : ""}`}>
                          {reached && !isActive ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                        </span>
                        <div className="-mt-0.5">
                          <p className={`text-sm font-bold ${reached ? "text-navy" : "text-muted-foreground"}`}>{data.status_options[step]}</p>
                          {isActive && <p className="mt-1 text-xs text-muted-foreground">{STATUS_MESSAGES[step]}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          {/* Active status message */}
          <Reveal delay={0.1}>
            <div className={`flex items-start gap-4 rounded-3xl border p-5 shadow-soft sm:p-6 ${isCancelled ? "border-rose-200 bg-rose-50" : "border-brand/20 bg-accent"}`}>
              <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${isCancelled ? "bg-rose-100 text-rose-600" : "bg-card text-brand"}`}>
                {isCancelled ? <ShieldAlert className="size-5" /> : <Activity className="size-5" />}
              </span>
              <div>
                <p className={`text-sm font-extrabold ${isCancelled ? "text-rose-700" : "text-accent-foreground"}`}>{data.tracking_status_label}</p>
                <p className={`mt-1 text-sm ${isCancelled ? "text-rose-700/80" : "text-accent-foreground/80"}`}>{statusMessage}</p>
                {data.public_notes && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-navy">
                    <Info className="mt-0.5 size-3.5 shrink-0 text-brand" /> {data.public_notes}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Pickup details */}
            <Reveal delay={0.12} className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:shadow-card sm:p-8">
                <h3 className="text-base font-bold text-navy">Pickup Details</h3>
                <p className="mt-1 text-xs text-muted-foreground">Everything we have on record for this booking.</p>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Detail icon={BadgeCheck} label="Customer Name" value={data.customer_name} />
                  <Detail icon={MapPin} label="City" value={data.city} />
                  <Detail icon={Package} label="Scrap Category" value={data.scrap_category} />
                  {data.selected_scrap_item && <Detail icon={Search} label="Selected Item" value={data.selected_scrap_item} />}
                  <Detail icon={Truck} label="Approx. Quantity" value={data.approximate_quantity} />
                  <Detail icon={Calendar} label="Pickup Date/Time" value={data.scheduled_at ? new Date(data.scheduled_at).toLocaleString() : null} />
                  <Detail icon={Clock} label="Submitted" value={new Date(data.submitted_at).toLocaleString()} />
                </dl>
              </div>
            </Reveal>

            {/* Status history */}
            <Reveal delay={0.16}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:shadow-card sm:p-8">
                <h3 className="text-base font-bold text-navy">Activity Timeline</h3>
                {data.status_history.length > 0 ? (
                  <ul className="mt-5 space-y-4">
                    {[...data.status_history].reverse().map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${i === 0 ? "bg-brand text-brand-foreground" : "bg-accent text-accent-foreground"}`}>
                          <Clock className="size-3.5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy">{h.status_label}</p>
                          {h.public_note && <p className="text-xs text-muted-foreground">{h.public_note}</p>}
                          <p className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">No updates yet.</p>
                )}
              </div>
            </Reveal>
          </div>

          {/* Material processing summary */}
          {hasProcessingData && (
            <Reveal delay={0.18}>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h3 className="flex items-center gap-2 text-base font-bold text-navy"><Recycle className="size-4 text-brand" /> Material Processing</h3>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {mp.total_quantity && (
                    <div className="rounded-2xl bg-eco/60 p-4 text-center transition hover:-translate-y-0.5">
                      <p className="text-xl font-extrabold text-navy">{mp.total_quantity} kg</p>
                      <p className="text-xs text-muted-foreground">Total Quantity</p>
                    </div>
                  )}
                  {mp.recycled_percentage && (
                    <div className="rounded-2xl bg-eco/60 p-4 text-center transition hover:-translate-y-0.5">
                      <p className="text-xl font-extrabold text-brand">{mp.recycled_percentage}%</p>
                      <p className="text-xs text-muted-foreground">Recycled</p>
                    </div>
                  )}
                  {mp.refurbished_percentage && (
                    <div className="rounded-2xl bg-eco/60 p-4 text-center transition hover:-translate-y-0.5">
                      <p className="text-xl font-extrabold text-brand">{mp.refurbished_percentage}%</p>
                      <p className="text-xs text-muted-foreground">Refurbished</p>
                    </div>
                  )}
                  {mp.disposed_percentage && (
                    <div className="rounded-2xl bg-eco/60 p-4 text-center transition hover:-translate-y-0.5">
                      <p className="text-xl font-extrabold text-navy">{mp.disposed_percentage}%</p>
                      <p className="text-xs text-muted-foreground">Disposed / Other</p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* Documents & downloads */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-base font-bold text-navy">Documents &amp; Certificates</h3>
              <p className="mt-1 text-xs text-muted-foreground">Download available paperwork for this pickup, as it becomes ready.</p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-border p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
                  <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground"><ClipboardList className="size-4" /></span>
                  <p className="mt-2.5 text-sm font-bold text-navy">Pickup Details</p>
                  <a href={`/track-pickup/${token}/download`} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline">
                    <Download className="size-3.5" /> Download
                  </a>
                </div>

                {data.documents.map((doc) => {
                  const Icon = DOCUMENT_ICONS[doc.type] ?? FileText;
                  return (
                    <div key={doc.type} className="rounded-2xl border border-border p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
                      <span className={`grid size-9 place-items-center rounded-xl ${doc.ready ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="size-4" />
                      </span>
                      <p className="mt-2.5 text-sm font-bold text-navy">{doc.label}</p>
                      {doc.ready ? (
                        <a href={doc.download_url ?? "#"} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline">
                          <Download className="size-3.5" /> Download
                        </a>
                      ) : (
                        <p className="mt-2 text-xs text-muted-foreground">{DOCUMENT_HINTS[doc.type] ?? "Not available yet"}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

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

function StepNode({ step, index, activeStepIndex, label }: { step: string; index: number; activeStepIndex: number; label: string }) {
  const reached = activeStepIndex >= index;
  const isActive = activeStepIndex === index;
  const Icon = STEP_ICONS[step] ?? Clock;
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="relative grid size-10 place-items-center">
        {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />}
        <span className={`relative grid size-10 place-items-center rounded-full transition-colors ${reached ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"} ${isActive ? "ring-4 ring-brand/20" : ""}`}>
          {reached && !isActive ? <CheckCircle2 className="size-4.5" /> : <Icon className="size-4.5" />}
        </span>
      </span>
      <span className={`max-w-[7rem] text-[11px] font-semibold leading-tight ${reached ? "text-navy" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
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
