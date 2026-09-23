export interface StackGroup {
  key: string;
  label: string;
  items: string[];
}

/** Tool-level names, short enough to sit under a plant. */
export const STACK_GROUPS: StackGroup[] = [
  {
    key: "ai",
    label: "AI/LLM",
    items: [
      "pgvector",
      "Postgres FTS",
      "Evals",
      "Structured outputs",
      "LangGraph",
      "MCP",
      "LanceDB",
      "ONNX",
    ],
  },
  {
    key: "backend",
    label: "Backend",
    items: [
      "Python",
      "FastAPI",
      "Pydantic v2",
      "SQLAlchemy",
      "PostgreSQL",
      "Node.js",
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind",
    ],
  },
  {
    key: "infra",
    label: "Infra",
    items: [
      "AWS",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "Sentry",
      "CloudWatch",
      "FFmpeg",
      "Fly.io",
    ],
  },
];
