export type SpecimenState = "growing" | "in bloom" | "pressed";

export interface FieldMeasurement {
  label: string;
  value: string;
}

/** A field measurement is always paired with the source and date it came from. */
export interface MeasurementSet {
  rows: FieldMeasurement[];
  provenance: string;
}

export interface FieldNote {
  label: string;
  body: string;
}

export interface Project {
  /** Stable anchor and specimen seed. */
  slug: string;
  name: string;
  family: string;
  state: SpecimenState;
  collected: string;
  summary: string;
  live?: string;
  source?: string;
  /** Featured projects get a specimen sheet; "seedling" is its compact form. */
  sheet?: "full" | "seedling";
  habitat?: string[];
  measurements?: MeasurementSet;
  notes?: FieldNote[];
}

/** Newest first. */
export const PROJECTS: Project[] = [
  {
    slug: "shotgrep",
    name: "shotgrep",
    family: "Video retrieval",
    state: "in bloom",
    collected: "Sep 2026",
    summary:
      "Video search that finds the moment, not the file: fused visual and transcript retrieval over a stage-cached ingest.",
    live: "https://shotgrep-demo.vercel.app",
    source: "https://github.com/rajprakash00/shotgrep",
    sheet: "full",
    habitat: ["FFmpeg", "faster-whisper", "SigLIP", "LanceDB", "ONNX", "MCP"],
    measurements: {
      rows: [
        { label: "Recall@5", value: "0.688" },
        { label: "MRR", value: "0.495" },
        { label: "latency", value: "189 ms p50 / 234 ms p95" },
      ],
      provenance: "frozen eval set, 64 queries over 3,797 moments, Sep 2026",
    },
    notes: [
      {
        label: "the problem",
        body: "Searching video usually means searching titles and descriptions. The moments inside stay invisible until someone scrubs through them.",
      },
      {
        label: "the approach",
        body: "Stage-cached ingest with FFmpeg, faster-whisper, and SigLIP; fused visual and transcript retrieval over LanceDB; served over REST and MCP tools.",
      },
      {
        label: "what it proved",
        body: "Measured, not claimed: 0.688 Recall@5 against a 0.578 keyword baseline, on the same 64 frozen queries.",
      },
    ],
  },
  {
    slug: "contract-change-intel",
    name: "Contract Change-Impact Intelligence",
    family: "Retrieval",
    state: "in bloom",
    collected: "Aug 2026 – Sep 2026",
    summary:
      "A multi-tenant LLM platform for agreements and amendments: extract the obligations, explain the diff, map each change to the clauses it impacts.",
    live: "https://change-report.byraj.dev",
    source: "https://github.com/rajprakash00/contract-change-intel",
    sheet: "full",
    habitat: [
      "Python",
      "FastAPI",
      "Postgres + pgvector",
      "Postgres FTS",
      "Structured outputs",
    ],
    measurements: {
      rows: [
        { label: "citation validity", value: "1.0" },
        { label: "extraction precision", value: "0.90" },
        { label: "recall@10", value: "0.96" },
      ],
      provenance: "project evaluation runs, 2026",
    },
    notes: [
      {
        label: "the problem",
        body: "Amendments rewrite agreements a clause at a time. A reviewer does not need a list of what changed; they need to know which clauses each change touches, and they need to be able to check the answer.",
      },
      {
        label: "the approach",
        body: "Citation-gated extraction over hybrid retrieval. Every obligation cites the clause it came from, keyword and vector search run together, and per-tenant spend limits keep cost visible call by call.",
      },
      {
        label: "what it proved",
        body: "A gate beats a score. Citation validity of 1.0 means the system would rather return nothing than return an answer it cannot support.",
      },
    ],
  },
  {
    slug: "portfolio",
    name: "This site",
    family: "Frontend craft",
    state: "in bloom",
    collected: "2026",
    summary:
      "A seasonal portfolio and blog: four tuned light themes, a generative journey vine, and now an herbarium of the work itself.",
    live: "https://byraj.dev",
    source: "https://github.com/rajprakash00/portfolio",
  },
  {
    slug: "rn-otp-timer",
    name: "rn-otp-timer",
    family: "Mobile / OSS",
    state: "pressed",
    collected: "2021",
    summary:
      "A standalone, fully customizable OTP resend timer, published as a React Native library on npm.",
    source: "https://github.com/rajprakash00/rn-otp-timer",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(
  (project) => project.sheet !== undefined
);
