import { StatusBody, StatusKicker, StatusPulse, StatusWrap } from "./styles";

const CONTRACT_URL = "https://change-report.byraj.dev";
const SHOTGREP_URL = "https://shotgrep-demo.vercel.app";

export function StatusLine() {
  return (
    <StatusWrap>
      <StatusKicker>
        <StatusPulse aria-hidden="true" />
        AI Engineer · open to AI/LLM roles · remote-friendly
      </StatusKicker>
      <StatusBody>
        I build LLM systems that prove their work. Shipped{" "}
        <a href={CONTRACT_URL} target="_blank" rel="noopener noreferrer">
          Contract Change-Impact Intelligence
        </a>{" "}
        and{" "}
        <a href={SHOTGREP_URL} target="_blank" rel="noopener noreferrer">
          shotgrep
        </a>
        . Currently building a review-gated PR-risk agent.
      </StatusBody>
    </StatusWrap>
  );
}
