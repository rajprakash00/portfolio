import { ViewCounter } from "@/components/viewCounter";

import { FooterContainer, FooterNote } from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNote>
        Made with <a href="https://nextjs.org">Next.js</a> ·{" "}
        <a href="https://github.com/rajprakash00/portfolio">Source</a>
      </FooterNote>
      <ViewCounter />
    </FooterContainer>
  );
};

export default Footer;
