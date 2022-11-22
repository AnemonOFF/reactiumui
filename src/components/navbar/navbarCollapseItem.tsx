import React from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { NavbarCollapseItemVariantsProps, StyledNavbarCollapseItem } from "./navbarCollapseItem.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLLIElement>, keyof Props>;
type VariantsProps = Omit<NavbarCollapseItemVariantsProps, keyof Props>;
export type NavbarCollapseItemProps = Props & VariantsProps & { html?: HTMLProps};

const NavbarCollapseItem = React.forwardRef<HTMLLIElement, NavbarCollapseItemProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledNavbarCollapseItem
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledNavbarCollapseItem>
    );
});

export default React.memo(NavbarCollapseItem);