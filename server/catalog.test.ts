import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("catalog", () => {
  it("returns the seeded college and source-aware stats", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const stats = await caller.catalog.stats();
    expect(stats.colleges).toBe(24);
    expect(stats.cutoffYear).toBe("2026–27");
  });

  it("exposes eight Maharashtra cities in Finder refine search", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const filters = await caller.catalog.filters();
    expect(filters.cities).toEqual([
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Chhatrapati Sambhajinagar",
      "Amravati",
      "Kolhapur",
      "Solapur",
    ]);
  });

  it("returns official 2026 CAP I-IV data for every city bucket", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    for (const city of ["Mumbai", "Pune", "Nagpur", "Nashik", "Chhatrapati Sambhajinagar", "Amravati", "Kolhapur", "Solapur"]) {
      const colleges = await caller.catalog.list({ query: "", city, branch: "all", maxFee: 300000, minPercentile: 0 });
      const official = colleges.filter((college) => college.isOfficial2026);
      expect(official.length).toBeGreaterThanOrEqual(3);
      expect(official.every((college) => college.officialRoundSources && Object.keys(college.officialRoundSources).length === 4)).toBe(true);
      expect(official.some((college) => college.branches.some((branch) => (branch.officialRounds?.map((round) => round.round) ?? []).includes(4)))).toBe(true);
    }
  });

  it("filters by city and returns branch-wise cutoffs", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const results = await caller.catalog.list({
      query: "",
      city: "Pune",
      branch: "all",
      maxFee: 300000,
      minPercentile: 0,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((college) => college.city === "Pune")).toBe(true);
    expect(results[0]?.branches[0]?.exam).toBe("MHT-CET");
    expect(results[0]?.branches[0]?.officialCutoffSource).toBeUndefined();
  });
});


describe("city directory", () => {
  it("returns all eight Maharashtra cities with five entries each", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const cities = await caller.cities.list();
    expect(cities).toHaveLength(8);
    expect(cities.every((item) => item.colleges.length === 5)).toBe(true);
  });
});
