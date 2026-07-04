import { useEffect, useState } from "react";
import {
  services as staticServices,
  industries as staticIndustries,
  type Service,
  type Industry,
} from "@/Frontend/lib/site-data";

/**
 * Admin-managed content overlaid on the static site-data fallback.
 *
 * The DB rows (via /api/services, /api/industries, /api/page-sections)
 * override title/short/intro/image for matching slugs; static site-data
 * keeps providing the fields the DB doesn't store (icon, why, benefits,
 * servicesOffered). If the API is unreachable the static content renders
 * unchanged, mirroring the pattern used by the scrap-rate page.
 */

export type ServiceView = Service & { imageUrl: string | null };
export type IndustryView = Industry & { imageUrl: string | null };
export type PageSectionView = {
  pageKey: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  imageUrl: string | null;
  json: Record<string, any> | null;
};

const staticServiceViews: ServiceView[] = staticServices.map((s) => ({ ...s, imageUrl: null }));
const staticIndustryViews: IndustryView[] = staticIndustries.map((i) => ({ ...i, imageUrl: null }));

const blankService = (slug: string): Service => ({
  slug,
  title: slug,
  short: "",
  icon: "Recycle",
  image: "",
  intro: "",
  why: "",
  benefits: [],
});

const blankIndustry = (slug: string): Industry => ({
  slug,
  title: slug,
  short: "",
  image: "",
  intro: "",
  servicesOffered: [],
});

function mergeServices(rows: any[]): ServiceView[] {
  if (!rows.length) return staticServiceViews;
  return rows.map((row) => {
    const fallback = staticServices.find((s) => s.slug === row.slug) ?? blankService(row.slug);
    return {
      ...fallback,
      title: row.title || fallback.title,
      short: row.short_description || fallback.short,
      intro: row.long_description || fallback.intro,
      icon: row.icon || fallback.icon,
      imageUrl: row.image_url ?? null,
    };
  });
}

function mergeIndustries(rows: any[]): IndustryView[] {
  if (!rows.length) return staticIndustryViews;
  return rows.map((row) => {
    const fallback = staticIndustries.find((i) => i.slug === row.slug) ?? blankIndustry(row.slug);
    return {
      ...fallback,
      title: row.title || fallback.title,
      short: row.short_description || fallback.short,
      intro: row.long_description || fallback.intro,
      imageUrl: row.image_url ?? null,
    };
  });
}

function mergePageSections(rows: any[]): PageSectionView[] {
  return rows.map((row) => ({
    pageKey: row.page_key,
    sectionKey: row.section_key,
    title: row.title ?? null,
    subtitle: row.subtitle ?? null,
    content: row.content ?? null,
    imageUrl: row.image_url ?? null,
    json: row.json_data ?? null,
  }));
}

// Module-level promise caches so Header, Footer and pages share one request
// per endpoint for the lifetime of the SPA session.
const cache: Record<string, Promise<any[]> | undefined> = {};

function fetchRows(endpoint: string): Promise<any[]> {
  cache[endpoint] ??= fetch(endpoint)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => (Array.isArray(json?.data) ? json.data : []))
    .catch(() => {
      cache[endpoint] = undefined; // allow retry on next mount
      return [];
    });
  return cache[endpoint]!;
}

export function fetchServices(): Promise<ServiceView[]> {
  return fetchRows("/api/services").then(mergeServices);
}

export function fetchIndustries(): Promise<IndustryView[]> {
  return fetchRows("/api/industries").then(mergeIndustries);
}

export function fetchPageSections(): Promise<PageSectionView[]> {
  return fetchRows("/api/page-sections").then(mergePageSections);
}

function useFetched<T>(fetcher: () => Promise<T>, initial: T): T {
  const [data, setData] = useState<T>(initial);
  useEffect(() => {
    let cancelled = false;
    fetcher().then((rows) => {
      if (!cancelled) setData(rows);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}

export function useServices(): ServiceView[] {
  return useFetched(fetchServices, staticServiceViews);
}

export function useIndustries(): IndustryView[] {
  return useFetched(fetchIndustries, staticIndustryViews);
}

export function usePageSection(pageKey: string, sectionKey: string): PageSectionView | null {
  const sections = useFetched(fetchPageSections, [] as PageSectionView[]);
  return sections.find((s) => s.pageKey === pageKey && s.sectionKey === sectionKey) ?? null;
}

export type FounderView = {
  name: string;
  role: string;
  bio: string;
  leads: string;
  linkedin_url: string;
  tagline: string;
  message: string;
  image_url: string | null;
};

function mergeFounders(rows: any[]): FounderView[] {
  return rows.map((row) => ({
    name: row.name ?? "",
    role: row.role ?? "",
    bio: row.bio ?? "",
    leads: row.leads ?? "",
    linkedin_url: row.linkedin_url ?? "",
    tagline: row.tagline ?? "",
    message: row.message ?? "",
    image_url: row.image_url ?? null,
  }));
}

export function fetchFoundersList(): Promise<FounderView[]> {
  return fetchRows("/api/founders").then(mergeFounders);
}

export function useFounders(): FounderView[] {
  return useFetched(fetchFoundersList, [] as FounderView[]);
}
