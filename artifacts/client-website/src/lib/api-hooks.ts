/**
 * Static data hooks — drop-in replacements for @workspace/api-client-react.
 * All data is inlined so the site runs with zero backend dependency.
 */

import { company, services, projects, caseStudies } from "./static-data";

// ─── Generic hook shape (mirrors react-query) ────────────────────────────────

function ok<T>(data: T) {
  return { data, isLoading: false, isError: false, error: null };
}

function loading() {
  return { data: undefined, isLoading: false, isError: false, error: null };
}

// ─── Company ──────────────────────────────────────────────────────────────────

export function useGetCompany() {
  return ok(company);
}

// ─── Services ────────────────────────────────────────────────────────────────

export function useListServices() {
  return ok(services);
}

export function useGetService(id: number) {
  return ok(services.find((s) => s.id === id) ?? null);
}

export function getGetServiceQueryKey(id: number) {
  return [`/api/services/${id}`] as const;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export function useListProjects(params?: { featured?: string; category?: string }) {
  let result = projects;
  if (params?.featured === "true") {
    result = result.filter((p) => p.featured);
  }
  if (params?.category) {
    result = result.filter((p) => p.category === params.category);
  }
  return ok(result);
}

export function getListProjectsQueryKey(params?: { featured?: string; category?: string }) {
  return [`/api/projects`, ...(params ? [params] : [])] as const;
}

export function useGetProject(
  id: number,
  _options?: { query?: { enabled?: boolean; queryKey?: readonly unknown[] } }
) {
  return ok(projects.find((p) => p.id === id) ?? null);
}

export function getGetProjectQueryKey(id: number) {
  return [`/api/projects/${id}`] as const;
}

// ─── Case Studies ────────────────────────────────────────────────────────────

export function useListCaseStudies() {
  return ok(caseStudies);
}

export function useGetCaseStudy(id: number) {
  return ok(caseStudies.find((c) => c.id === id) ?? null);
}

export function getGetCaseStudyQueryKey(id: number) {
  return [`/api/case-studies/${id}`] as const;
}
