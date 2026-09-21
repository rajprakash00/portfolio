import { StatusBody, StatusKicker, StatusWrap } from "./styles";

const LIVE_PROJECT_URL = "https://change-report.byraj.dev";

export function StatusLine() {
  return (
    <StatusWrap>
      <StatusKicker>
        AI Engineer · open to AI/LLM roles · remote-friendly
      </StatusKicker>
      <StatusBody>
        I build LLM systems that prove their work. Currently building a
        review-gated PR-risk agent; shipped{" "}
        <a href={LIVE_PROJECT_URL} target="_blank" rel="noopener noreferrer">
          Contract Change-Impact Intelligence
        </a>
        .
      </StatusBody>
    </StatusWrap>
  );
}
