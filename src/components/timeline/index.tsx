import { TIMELINE } from "@/data/timeline";

import {
  Entry,
  Org,
  Period,
  Points,
  ProjectLink,
  Role,
  RoleLine,
  TimelineList,
} from "./styles";

export function Timeline() {
  return (
    <TimelineList>
      {TIMELINE.map((item) => (
        <Entry key={`${item.period}-${item.role}`}>
          <Period>{item.period}</Period>
          <RoleLine>
            <Role>{item.role}</Role>
            {item.org ? <Org> · {item.org}</Org> : null}
            {item.link ? (
              <ProjectLink
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {item.link.label} →
              </ProjectLink>
            ) : null}
          </RoleLine>
          <Points>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </Points>
        </Entry>
      ))}
    </TimelineList>
  );
}
