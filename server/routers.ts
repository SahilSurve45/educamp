import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { getCollege, COLLEGES, BRANCHES, CITIES, OFFICIAL_CUTOFF_SOURCE, OFFICIAL_EXPLORER_SOURCE, type College } from "@shared/collegeData";
import { CITY_DIRECTORY, MAHARASHTRA_CITIES } from "@shared/cityData";
import { CITY_CUTOFF_COLLEGES } from "@shared/official2026";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";

const ALL_COLLEGES = CITY_CUTOFF_COLLEGES;
const ALL_BRANCHES = Array.from(new Set(ALL_COLLEGES.flatMap((college) => college.branches.map((branch) => branch.branch)))).sort();

const searchInput = z.object({
  query: z.string().optional().default(""),
  city: z.string().optional().default("all"),
  branch: z.string().optional().default("all"),
  maxFee: z.number().optional().default(300000),
  minPercentile: z.number().optional().default(0),
});

function matchesFilters(college: College, input: z.infer<typeof searchInput>) {
  const q = input.query.trim().toLowerCase();
  const textMatch = !q || [college.name, college.shortName, college.city, ...college.highlights]
    .join(" ")
    .toLowerCase()
    .includes(q);
  const cityMatch = input.city === "all" || college.city === input.city;
  const branchMatch = input.branch === "all" || college.branches.some((branch) => branch.branch === input.branch);
  const feeMatch = college.annualFees <= input.maxFee;
  const percentileMatch = college.branches.some((branch) => branch.gopensPercentile >= input.minPercentile);
  return textMatch && cityMatch && branchMatch && feeMatch && percentileMatch;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  catalog: router({
    stats: publicProcedure.query(() => ({
      colleges: ALL_COLLEGES.length,
      branches: ALL_BRANCHES.length,
      cities: CITIES.length,
      cutoffYear: "2026–27",
      lastUpdated: "CAP Round I • Official CET Cell publication",
    })),
    filters: publicProcedure.query(() => ({ branches: ALL_BRANCHES, cities: CITIES })),
    list: publicProcedure.input(searchInput).query(({ input }) => {
      return ALL_COLLEGES.filter((college) => matchesFilters(college, input)).sort((a, b) => {
        const bestA = Math.max(...a.branches.map((branch) => branch.gopensPercentile));
        const bestB = Math.max(...b.branches.map((branch) => branch.gopensPercentile));
        return bestB - bestA;
      });
    }),
    get: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => {
      const college = ALL_COLLEGES.find((item) => item.slug === input.slug);
      if (!college) throw new TRPCError({ code: "NOT_FOUND", message: "College not found" });
      return college;
    }),
    compare: publicProcedure.input(z.object({ slugs: z.array(z.string()).max(3) })).query(({ input }) => {
      return input.slugs.map((slug) => ALL_COLLEGES.find((college) => college.slug === slug)).filter(Boolean) as College[];
    }),
    recommendations: publicProcedure.input(z.object({ percentile: z.number().min(0).max(100), branch: z.string().optional().default("all") })).query(({ input }) => {
      return ALL_COLLEGES.map((college) => {
        const branches = input.branch === "all" ? college.branches : college.branches.filter((branch) => branch.branch === input.branch);
        const closest = branches.sort((a, b) => Math.abs(a.gopensPercentile - input.percentile) - Math.abs(b.gopensPercentile - input.percentile))[0];
        if (!closest) return null;
        const gap = input.percentile - closest.gopensPercentile;
        const verdict = gap >= 1 ? "Strong chance" : gap >= -1.5 ? "Reach / borderline" : "Ambitious";
        return { college, branch: closest, verdict, gap: Number(gap.toFixed(2)) };
      }).filter(Boolean).sort((a, b) => Math.abs((a as any).gap) - Math.abs((b as any).gap));
    }),
  }),

  student: router({
    workspace: protectedProcedure.query(({ ctx }) => ({
      user: ctx.user,
      savedCollegeSlugs: [],
      nextSteps: [
        "Set your target percentile in the Finder",
        "Shortlist up to three colleges to compare",
        "Always cross-check the current CAP notice before applying",
      ],
    })),
  }),

  cities: router({
    list: publicProcedure.query(() => MAHARASHTRA_CITIES.map((name) => ({
      name,
      colleges: CITY_DIRECTORY.filter((college) => college.city === name),
    }))),
    colleges: publicProcedure.input(z.object({ city: z.string() })).query(({ input }) => {
      return CITY_DIRECTORY.filter((college) => college.city === input.city);
    }),
  }),

  admin: router({
    overview: protectedProcedure.query(({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      return {
        records: ALL_COLLEGES.length,
        cutoffSources: 1,
        status: "Verified source registry",
        colleges: ALL_COLLEGES,
      };
    }),
    sources: publicProcedure.query(() => ({
      officialCutoffPdf: OFFICIAL_CUTOFF_SOURCE,
      officialExplorer: OFFICIAL_EXPLORER_SOURCE,
      note: "Cutoffs shown are 2025–26 CAP Round I, GOPENS state-level percentiles from the official Maharashtra CET Cell publication. Category, round, domicile, and CAP year materially change the outcome.",
    })),
  }),
});

export type AppRouter = typeof appRouter;
