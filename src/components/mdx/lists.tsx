import { Children, HTMLAttributes, isValidElement, PropsWithChildren } from "react";
import { GiDiamonds } from "react-icons/gi";

import { UnorderedListPointer, UnorderedListStyled } from "./styles";

export const ListItem = ({
  children,
  ...props
}: PropsWithChildren<Record<string, unknown>>) => (
  <li {...props}>
    <UnorderedListPointer />
    {children}
  </li>
);

export const UnorderedList = (props: HTMLAttributes<HTMLUListElement>) => (
  <UnorderedListStyled {...props}>
    {Children.map(props.children, (child) => {
      if (isValidElement<Record<string, unknown>>(child)) {
        const childProps = child.props;
        return <ListItem {...childProps} />;
      }
      return null;
    })}
  </UnorderedListStyled>
);
