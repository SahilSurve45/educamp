export type Cutoff = {
  branch: string;
  code: string;
  gopensPercentile: number;
  lastRank: number;
  round: string;
  year: string;
  exam: "MHT-CET";
  category: "GOPENS";
  officialRounds?: Array<{
    round: 1 | 2 | 3 | 4;
    source: string;
    branch: string;
    code: string;
    stage: string;
    categories: Record<string, { rank: number; percentile: number }>;
  }>;
};

export type College = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  type: "Government" | "Government-aided" | "Unaided";
  autonomous: boolean;
  established: number;
  description: string;
  website: string;
  officialCutoffSource: string;
  mapUrl: string;
  annualFees: number;
  intake: number;
  placement: {
    average: number;
    highest: number;
    placementRate: number;
    recruiters: string[];
  };
  highlights: string[];
  branches: Cutoff[];
  isOfficial2026?: boolean;
  officialRoundSources?: Partial<Record<1 | 2 | 3 | 4, string>>;
};

export const OFFICIAL_CUTOFF_SOURCE =
  "https://fe2026.mahacet.org/2025/2025ENGG_CAP1_CutOff.pdf";
export const OFFICIAL_EXPLORER_SOURCE = "https://cetcell.mahacet.org/cutoff-explorer/";

const cutoff = (
  branch: string,
  code: string,
  percentile: number,
  rank: number,
): Cutoff => ({
  branch,
  code,
  gopensPercentile: percentile,
  lastRank: rank,
  round: "CAP Round I",
  year: "2025–26",
  exam: "MHT-CET",
  category: "GOPENS",
});

export const COLLEGES: College[] = [
  {
    id: "vjti",
    slug: "vjti-mumbai",
    name: "Veermata Jijabai Technological Institute",
    shortName: "VJTI",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Government-aided",
    autonomous: true,
    established: 1887,
    description:
      "A pioneering autonomous engineering institute in Matunga with a strong technology, research, and industry ecosystem.",
    website: "https://vjti.ac.in/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=VJTI+Matunga+Mumbai",
    annualFees: 86000,
    intake: 720,
    placement: {
      average: 14.5,
      highest: 62,
      placementRate: 96,
      recruiters: ["Google", "Microsoft", "Deloitte", "Tata Motors"],
    },
    highlights: ["Government-aided autonomous", "Mumbai industry network", "Research-led programs"],
    branches: [
      cutoff("Computer Engineering", "0301224510", 99.9522882, 103),
      cutoff("Information Technology", "0301224610", 99.8985029, 242),
      cutoff("Electronics & Telecommunication", "0301237210", 99.7268438, 742),
      cutoff("Electrical Engineering", "0301229310", 99.5244755, 1437),
      cutoff("Civil Engineering", "0301219110", 98.4709161, 5245),
    ],
  },
  {
    id: "pict",
    slug: "pict-pune",
    name: "Pune Institute of Computer Technology",
    shortName: "PICT",
    city: "Pune",
    state: "Maharashtra",
    type: "Unaided",
    autonomous: true,
    established: 1983,
    description:
      "A focused technology institute known for computer engineering, strong peer culture, and close industry engagement.",
    website: "https://pict.edu/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=PICT+Pune",
    annualFees: 164000,
    intake: 720,
    placement: {
      average: 11.8,
      highest: 54,
      placementRate: 97,
      recruiters: ["Amazon", "Infosys", "Persistent", "PhonePe"],
    },
    highlights: ["Technology-first curriculum", "Strong coding culture", "Autonomous institute"],
    branches: [
      cutoff("Computer Engineering", "0627124510", 99.7116474, 791),
      cutoff("Information Technology", "0627124610", 99.6021953, 1159),
      cutoff("AI & Data Science", "0627126310", 99.6203413, 1101),
      cutoff("Electronics & Telecommunication", "0627137210", 99.2992853, 2245),
      cutoff("Electronics & Computer Engineering", "0627184410", 99.5764117, 1267),
    ],
  },
  {
    id: "walchand",
    slug: "walchand-sangli",
    name: "Walchand College of Engineering",
    shortName: "WCE",
    city: "Sangli",
    state: "Maharashtra",
    type: "Government-aided",
    autonomous: true,
    established: 1947,
    description:
      "An autonomous engineering college in Sangli with a legacy of hands-on engineering education and strong alumni outcomes.",
    website: "https://www.walchandsangli.ac.in/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=Walchand+College+of+Engineering+Sangli",
    annualFees: 112000,
    intake: 540,
    placement: {
      average: 10.6,
      highest: 46,
      placementRate: 94,
      recruiters: ["TCS", "Cognizant", "Mercedes-Benz", "Oracle"],
    },
    highlights: ["Legacy engineering campus", "Autonomous programs", "High-value alumni network"],
    branches: [
      cutoff("Information Technology", "0600724610", 99.2498437, 2390),
      cutoff("Electronics Engineering", "0600737610", 98.9927909, 3349),
      cutoff("Electrical Engineering", "0600729310", 98.4901238, 5168),
      cutoff("Mechanical Engineering", "0600761210", 98.3468729, 5686),
    ],
  },
  {
    id: "vit",
    slug: "vit-pune",
    name: "Vishwakarma Institute of Technology",
    shortName: "VIT Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "Unaided",
    autonomous: true,
    established: 1983,
    description:
      "A well-established autonomous institute offering a broad set of engineering branches with a Pune innovation ecosystem.",
    website: "https://www.vit.edu/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=Vishwakarma+Institute+of+Technology+Pune",
    annualFees: 196000,
    intake: 960,
    placement: {
      average: 9.2,
      highest: 44,
      placementRate: 92,
      recruiters: ["Accenture", "IBM", "Capgemini", "ZS Associates"],
    },
    highlights: ["Wide branch choice", "Pune startup ecosystem", "Autonomous institute"],
    branches: [
      cutoff("Computer Science & Engineering (AI)", "0627391310", 98.2046366, 6163),
      cutoff("Computer Engineering (Software Engineering)", "0627392710", 98.1993682, 6191),
      cutoff("AI & Data Science", "0627399510", 98.1051898, 6531),
      cutoff("CSE (IoT & Cyber Security)", "0627392010", 97.9240683, 7218),
    ],
  },
  {
    id: "pccoe",
    slug: "pccoe-pune",
    name: "Pimpri Chinchwad College of Engineering",
    shortName: "PCCOE",
    city: "Pune",
    state: "Maharashtra",
    type: "Unaided",
    autonomous: true,
    established: 1999,
    description:
      "An autonomous institute in the Pimpri-Chinchwad education corridor offering industry-aligned engineering programs.",
    website: "https://www.pccoepune.com/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=PCCOE+Pimpri+Chinchwad+Pune",
    annualFees: 148000,
    intake: 900,
    placement: {
      average: 8.6,
      highest: 36,
      placementRate: 90,
      recruiters: ["Deloitte", "Bajaj", "NVIDIA", "Tech Mahindra"],
    },
    highlights: ["Industry-linked learning", "Large engineering campus", "Active student clubs"],
    branches: [
      cutoff("CSE (AI & Machine Learning)", "0617591110", 98.5222885, 5039),
    ],
  },
  {
    id: "gcoea",
    slug: "gcoea-amravati",
    name: "Government College of Engineering, Amravati",
    shortName: "GCOEA",
    city: "Amravati",
    state: "Maharashtra",
    type: "Government",
    autonomous: true,
    established: 1964,
    description:
      "A government autonomous engineering college serving the Vidarbha region with a wide public-institute branch portfolio.",
    website: "https://www.gcoea.ac.in/",
    officialCutoffSource: OFFICIAL_CUTOFF_SOURCE,
    mapUrl: "https://maps.google.com/?q=Government+College+of+Engineering+Amravati",
    annualFees: 72000,
    intake: 780,
    placement: {
      average: 6.4,
      highest: 24,
      placementRate: 83,
      recruiters: ["TCS", "L&T", "Persistent", "Wipro"],
    },
    highlights: ["Government institute", "Affordable fee profile", "Regional engineering hub"],
    branches: [
      cutoff("Computer Science & Engineering", "0100224210", 97.3737374, 9196),
      cutoff("Information Technology", "0100224610", 96.3316055, 12891),
      cutoff("Civil Engineering", "0100219110", 91.1459607, 30071),
    ],
  },
];

export const BRANCHES = Array.from(
  new Set(COLLEGES.flatMap((college) => college.branches.map((branch) => branch.branch))),
).sort();

export const CITIES = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Chhatrapati Sambhajinagar",
  "Amravati",
  "Kolhapur",
  "Solapur",
];

export function getCollege(slug: string) {
  return COLLEGES.find((college) => college.slug === slug);
}
