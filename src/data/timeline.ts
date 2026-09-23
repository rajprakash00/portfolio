export interface TimelineEntry {
  period: string;
  role: string;
  org?: string;
  link?: { href: string; label: string };
  points: string[];
}

export const TIMELINE: TimelineEntry[] = [
  {
    period: "May 2026 – now",
    role: "Independent AI engineering",
    link: { href: "https://change-report.byraj.dev", label: "live" },
    points: [
      "Built and deployed Contract Change-Impact Intelligence: a multi-tenant LLM platform that extracts obligations from agreements and amendments, explains version diffs, and maps each change to the clauses it impacts.",
      "Citation-gated extraction (1.0 citation validity, 0.90 extraction precision) over hybrid retrieval at 0.96 recall@10, with per-tenant spend limits and per-call cost accounting.",
      "Built shotgrep, a video search engine: stage-cached ingest (FFmpeg, faster-whisper ASR, SigLIP embeddings), fused visual + transcript retrieval over LanceDB, served over REST and MCP tools.",
      "Measured, not claimed: 64 frozen queries over 3,797 moments — Recall@5 0.688 vs 0.578 baseline, MRR 0.495, p50 189 ms / p95 234 ms.",
    ],
  },
  {
    period: "Apr 2024 – May 2026",
    role: "Career break",
    org: "UPSC Civil Services preparation",
    points: [
      "Full-time self-directed study, concluded May 2026; pivoted into AI engineering.",
    ],
  },
  {
    period: "Aug 2022 – Feb 2024",
    role: "Senior Software Engineer (Fullstack)",
    org: "Geeks Invention",
    points: [
      "Built an appointment scheduler (a Calendly replacement) covering booking, cancellation and video-link flows with Next.js, Redux Toolkit and Firebase — 3x user growth.",
      "Led OAuth, email verification and transactional email flows, lifting user retention 20%.",
    ],
  },
  {
    period: "Jan 2022 – Aug 2022",
    role: "Software Developer 1 (Frontend)",
    org: "Innovaccer",
    points: [
      "Fixed 120+ failing unit tests and wrote 80+ new ones, raising frontend coverage from 10% to 75%.",
      "Closed 150+ bugs (70% of open frontend defects) to a zero-bug state in 3–4 months; best team award.",
    ],
  },
];
