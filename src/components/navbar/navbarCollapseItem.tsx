import React from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { NavbarCollapseItemVariantsProps, StyledNavbarCollapseItem } from "./navbarCollapseItem.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}

export type NavbarCollapseItemProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<NavbarCollapseItemVariantsProps, keyof Props>;

export const NavbarCollapseItem = React.forwardRef<HTMLLIElement, NavbarCollapseItemProps>(({
    children,
    css,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledNavbarCollapseItem ref={imperativeRef} css={css} {...props}>
            {children}
        </StyledNavbarCollapseItem>
    );
});

export default React.memo(NavbarCollapseItem);