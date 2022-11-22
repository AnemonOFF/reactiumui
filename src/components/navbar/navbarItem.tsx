import React from "react";
import { ReactNode, useMemo } from "react";
import { CSS } from "../../theme";
import { useScroll } from "../../utils/hooks";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { NavbarItemVariantsProps, StyledNavbarItem } from "./navbarItem.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    hideOnScroll?: boolean,
    showOnScroll?: boolean,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLLIElement>, keyof Props>;
type VariantsProps = Omit<NavbarItemVariantsProps, keyof Props>;
export type NavbarItemProps = Props & VariantsProps & { html?: HTMLProps};

const NavbarItem = React.forwardRef<HTMLLIElement, NavbarItemProps>(({
    children,
    css,
    html,
    hideOnScroll = false,
    showOnScroll = false,
    ...props
}, ref) => {
    const { isOnTop } = useScroll();
    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {...css};
        if (hideOnScroll && !isOnTop || showOnScroll && isOnTop)
            result.display = 'none';

        return result;
    }, [css, isOnTop, hideOnScroll, showOnScroll]);

    return (
        <StyledNavbarItem
            ref={imperativeRef}
            css={customCss}
            {...html}
            {...props}
        >
            {children}
        </StyledNavbarItem>
    );
});

export default React.memo(NavbarItem);