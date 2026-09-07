import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SeasonProvider, SprinkleCanvas } from "@/components/season";
import { Container, FullHeightWrapper } from "@/styles/layout";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <SeasonProvider>
      <FullHeightWrapper>
        <SprinkleCanvas />
        <Navbar />
        <Container>{children}</Container>
        <Footer />
      </FullHeightWrapper>
    </SeasonProvider>
  );
};

export default Layout;
