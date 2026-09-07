import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { INavLink } from "./types";

export const LogoContainer = styled.div`
  font-weight: 900;
  font-size: 30px;
  color: var(--color-primary);
  line-height: 0;
  position: relative;
`;

export const IconContainer = styled.a<{ $applyhoverstyle?: boolean }>`
  font-size: 25px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  ${({ $applyhoverstyle }) =>
    $applyhoverstyle
      ? css`
          color: var(--text-color-primary);
          :hover {
            color: var(--color-primary);
          }
        `
      : css`
          color: var(--text-color-primary);
        `}
  & > span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.7rem;
    line-height: 1rem;
  }
`;

export const IconWrapper = styled(IconContainer).attrs({ as: "button" })`
  text-decoration: none;
  font-size: 24px;
  cursor: pointer;
`;

export const NavbarContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
  background-color: var(--primary-background-transparent);
  transition: background-color var(--dur-micro) var(--ease-out);

  ${IconWrapper},${LogoContainer} {
    z-index: 10;
  }

  @media only screen and (max-width: 764px) {
    padding: 0 1rem;
  }
`;

export const NavbarBody = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
  max-height: 70px;
  max-width: var(--max-width);
`;

export const NavLinks = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavLink = styled(motion.li)<INavLink>`
  display: ${(props) => (props.$desktop ? "none" : "flex")};
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-left: 1.2rem;
  ${(props) =>
    props.$drawer &&
    css`
      margin-top: 1rem;
      font-size: 24px;
      font-weight: 700;
    `};

  @media only screen and (min-width: 764px) {
    display: ${(props) => (props.$mobile ? "none" : "flex")};
  }

  a {
    text-decoration: none;
  }
`;

export const SideDrawer = styled(motion.ul)<{ $visible: boolean }>`
  height: 100dvh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: var(--color-primary-transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.2;
  // fix: certain click events were getting blocked by presence of sidedrawer even if it wasn't in visible state
  ${({ $visible }) =>
    $visible
      ? css`
          pointer-events: auto;
        `
      : css`
          pointer-events: none;
        `}

  @media only screen and (min-width: 764px) {
    display: none;
  }
`;
