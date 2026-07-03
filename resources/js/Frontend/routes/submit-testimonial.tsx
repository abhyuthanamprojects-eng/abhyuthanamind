import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  ImagePlus,
  ShieldCheck,
  Star,
  Upload,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/Frontend/components/Header";
import { Footer } from "@/Frontend/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/submit-testimonial")({
  head: () => ({
    meta: [
      { title: "Share Your Feedback — Abhyuthanam Recyclers" },
      {
        name: "description",
        content:
          "Tell us about your experience with Abhyuthanam Recyclers. Your feedback helps us improve and may be featured on our website.",
      },
    ],
  }),
  component: SubmitTestimonialPage,
});

const STEPS = ["Your Details & Feedback", "Add Media & Submit"];
const MAX_IMAGES = 6;

function SubmitTestimonialPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [city, setCity] = useState("");

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [outcomeLabel, setOutcomeLabel] = useState("");
  const [outcomeText, setOutcomeText] = useState("");

  const [customerPhoto, setCustomerPhoto] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const [consent, setConsent] = useState(false);
  // Honeypot — left blank by real visitors, invisible to them.
  const [website, setWebsite] = useState("");

  const source = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("source") ?? "";

  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (customerName.trim().length < 2) return "Please enter your name";
      if (companyName.trim().length < 2) return "Please enter your company name";
      if (reviewText.trim().length < 20) return "Please share at least 20 characters of feedback";
    }
    return null;
  };

  const goNext = () => {
    const err = validateStep(step);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleImagesChange = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files).slice(0, MAX_IMAGES - images.length);
    const tooBig = incoming.find((f) => f.size > 5 * 1024 * 1024);
    if (tooBig) {
      toast.error("Each image must be under 5 MB");
      return;
    }
    setImages((prev) => [...prev, ...incoming].slice(0, MAX_IMAGES));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (website) return; // honeypot tripped, silently drop

    if (!consent) {
      toast.error("Please confirm you allow us to publish your feedback");
      return;
    }
    const err = validateStep(0);
    if (err) {
      toast.error(err);
      setStep(0);
      return;
    }
    if (customerPhoto && customerPhoto.size > 2 * 1024 * 1024) {
      toast.error("Customer photo must be under 2 MB");
      return;
    }
    if (video && video.size > 50 * 1024 * 1024) {
      toast.error("Video must be under 50 MB");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("customer_name", customerName.trim());
      fd.append("company_name", companyName.trim());
      if (designation.trim()) fd.append("designation", designation.trim());
      if (city.trim()) fd.append("city", city.trim());
      fd.append("rating", String(rating));
      fd.append("review_text", reviewText.trim());
      if (outcomeLabel.trim()) fd.append("outcome_label", outcomeLabel.trim());
      if (outcomeText.trim()) fd.append("outcome_text", outcomeText.trim());
      if (source) fd.append("source", source);
      fd.append("consent_to_publish", "1");
      if (customerPhoto) fd.append("customer_photo", customerPhoto);
      images.forEach((img) => fd.append("images[]", img));
      if (video) fd.append("video", video);
      if (!video && videoUrl.trim()) fd.append("video_url", videoUrl.trim());

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          const firstError = Object.values(result.errors).flat()[0] as string;
          toast.error(firstError || "Please check the form and try again.");
        } else {
          toast.error(result.message || "Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
      formRef.current?.reset();
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-20">
          <div className="mx-auto w-[min(700px,94%)] text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border/60 bg-card p-10 shadow-soft"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                <CheckCircle2 className="h-10 w-10 text-brand" />
              </div>
              <h1 className="text-3xl font-extrabold text-foreground mb-4">Thank You!</h1>
              <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
                Thank you for sharing your feedback. Our team will review it before publishing.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-bold text-brand-foreground shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero / intro */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand to-brand-dark opacity-10" />
        <div className="absolute -top-20 right-0 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 left-0 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto w-[min(900px,94%)] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand backdrop-blur"
          >
            <Heart className="h-3.5 w-3.5" />
            Share Your Experience
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Tell us how we did, <span className="text-brand">in your words</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"
          >
            Your feedback helps us improve and helps other businesses trust us with their
            recycling needs. It only takes a couple of minutes.
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="mx-auto w-[min(800px,94%)]">
          {/* Progress indicator */}
          <div className="mb-6 flex items-center justify-between gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i <= step
                      ? "bg-brand text-brand-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`hidden sm:block text-xs font-semibold ${
                    i <= step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 rounded transition-colors ${
                      i < step ? "bg-primary" : "bg-border/60"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border/60 bg-card p-6 md:p-10 shadow-soft"
          >
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
            />

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-extrabold text-foreground">Your Details &amp; Feedback</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell us a little about yourself and how we did.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-sm font-semibold">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        maxLength={150}
                        placeholder="Rohit Sharma"
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">
                        Company Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        maxLength={150}
                        placeholder="Infinite Systems Pvt. Ltd."
                        className="mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Designation</Label>
                      <Input
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        maxLength={150}
                        placeholder="Operations Head"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">City</Label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        maxLength={150}
                        placeholder="Bengaluru"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-semibold">
                      Rating <span className="text-destructive">*</span>
                    </Label>
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          onMouseEnter={() => setHoverRating(n)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              n <= (hoverRating || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-border"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-semibold">
                      Your Review <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={5}
                      minLength={20}
                      maxLength={2000}
                      placeholder="Tell us what stood out about your experience…"
                      className="mt-2"
                      required
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {reviewText.trim().length}/2000 characters (minimum 20)
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="text-sm font-semibold">Outcome Label (optional)</Label>
                      <Input
                        value={outcomeLabel}
                        onChange={(e) => setOutcomeLabel(e.target.value)}
                        maxLength={150}
                        placeholder="e.g. Devices recycled"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Outcome Value (optional)</Label>
                      <Input
                        value={outcomeText}
                        onChange={(e) => setOutcomeText(e.target.value)}
                        maxLength={255}
                        placeholder="e.g. 120+ devices"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-extrabold text-foreground">Add Media &amp; Submit</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Photo and video are optional — adds credibility, but feel free to skip.
                  </p>

                  <div className="mt-6">
                    <Label className="text-sm font-semibold">Your Photo (optional)</Label>
                    <label
                      htmlFor="customerPhoto"
                      className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input bg-background px-3 py-2.5 text-sm hover:border-primary transition-colors"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Upload className="h-4 w-4 text-brand shrink-0" />
                        <span className="truncate text-muted-foreground">
                          {customerPhoto ? customerPhoto.name : "Upload JPG/PNG/WebP (max 2 MB)"}
                        </span>
                      </span>
                      {customerPhoto && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setCustomerPhoto(null);
                          }}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </label>
                    <input
                      id="customerPhoto"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      onChange={(e) => setCustomerPhoto(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-semibold">Testimonial Images (optional, up to 6)</Label>
                    <label
                      htmlFor="images"
                      className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input bg-background px-3 py-2.5 text-sm hover:border-primary transition-colors"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <ImagePlus className="h-4 w-4 text-brand shrink-0" />
                        <span className="truncate text-muted-foreground">
                          {images.length > 0
                            ? `${images.length} image(s) selected`
                            : "Upload JPG/PNG/WebP (max 5 MB each)"}
                        </span>
                      </span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      className="sr-only"
                      onChange={(e) => handleImagesChange(e.target.files)}
                    />
                    {images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {images.map((img, i) => (
                          <span
                            key={`${img.name}-${i}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs"
                          >
                            {img.name}
                            <button
                              type="button"
                              onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <Label className="text-sm font-semibold">Video Testimonial (optional)</Label>
                    <label
                      htmlFor="video"
                      className="mt-2 flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-input bg-background px-3 py-2.5 text-sm hover:border-primary transition-colors"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Video className="h-4 w-4 text-brand shrink-0" />
                        <span className="truncate text-muted-foreground">
                          {video ? video.name : "Upload MP4/MOV/WebM (max 50 MB)"}
                        </span>
                      </span>
                      {video && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setVideo(null);
                          }}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </label>
                    <input
                      id="video"
                      type="file"
                      accept="video/mp4,video/quicktime,video/webm"
                      className="sr-only"
                      onChange={(e) => setVideo(e.target.files?.[0] ?? null)}
                    />
                    {!video && (
                      <div className="mt-3">
                        <Label className="text-xs text-muted-foreground">
                          Or paste a video link instead (YouTube, Drive, etc.)
                        </Label>
                        <Input
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          placeholder="https://…"
                          className="mt-2"
                          type="url"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-8 rounded-2xl bg-secondary/60 p-5 flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={consent}
                      onCheckedChange={(v) => setConsent(v === true)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="consent" className="text-sm font-medium leading-relaxed cursor-pointer">
                      I allow Abhyuthanam Recyclers to review and publish my feedback on their
                      website. <span className="text-destructive">*</span>
                    </Label>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-5 text-sm text-foreground">
                    <ShieldCheck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <p>
                      Your feedback will be reviewed by our team before it appears on the
                      website. We will never publish your contact details.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-3 text-sm font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-bold text-brand-foreground shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-bold text-brand-foreground shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {submitting ? "Submitting…" : "Submit Feedback"}
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
