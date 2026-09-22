import { DocumentHead } from "@/components/shared/seo";
import { TitleHighlight } from "@/components/shared/typography";
import { Center } from "@/styles/layout";
import Link from "next/link";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <>
      <DocumentHead title="404!" />
      <div className="content">
        <Center>
          <TitleHighlight as={"h2"}>404!</TitleHighlight>
          <SubTitle>Page Not Found:(</SubTitle>
          <Description>
            Don&apos;t know how you ended up here; nevertheless, you can always{" "}
            <br /> <HomeAnchor href="/" passHref>Go back to home</HomeAnchor> 🏡
          </Description>
        </Center>
      </div>
    </>
  );
};

export default PageNotFound;

const SubTitle = styled.h2`
  padding-top: 0;
`;
const Description = styled.h3`
  text-align: center;
  margin-top: 100px;
`;
const HomeAnchor = styled(Link)`
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
`;
