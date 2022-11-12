import React from "react";
import { ReactNode, useMemo } from "react";
import { CSS } from "../../theme";
import { useScroll } from "../../utils/hooks";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { NavbarItemListVariantsProps, StyledNavbarItemList } from "./navbarItem.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    gap?: number | string,
    hideOnScroll?: boolean,
    showOnScroll?: boolean,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLUListElement>, keyof Props>;
type VariantsProps = Omit<NavbarItemListVariantsProps, keyof Props>;
export type NavbarContentProps = Props & VariantsProps & { html?: HTMLProps};

export const NavbarContent = React.forwardRef<HTMLUListElement, NavbarContentProps>(({
    children,
    css,
    gap,
    html,
    hideOnScroll = false,
    showOnScroll = false,
    ...props
}, ref) => {
    const { isOnTop } = useScroll();
    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {...css};
        if (gap !== undefined)
            result.gap = gap;
        if (hideOnScroll && !isOnTop || showOnScroll && isOnTop)
            result.display = 'none';

        return result;
    }, [css, gap, isOnTop, hideOnScroll, showOnScroll]);

    return (
        <StyledNavbarItemList
            ref={imperativeRef}
            css={customCss}
            {...html}
            {...props}
        >
            {children}
        </StyledNavbarItemList>
    );
});

export default React.memo(NavbarContent);