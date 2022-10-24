import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { HTMLTarget, ThemedColors, useImperativeRef, useThemeColor } from "../../utils";
import NavbarCollapseItem, { NavbarCollapseItemProps } from "./navbarCollapseItem";
import { NavbarCollapseLinkVariantsProps, StyledNavbarCollapseLink } from "./navbarCollapseLink.styles";

interface Props {
    css?: CSS,
    itemCss?: CSS,
    collapseItemProps?: NavbarCollapseItemProps,
    children?: React.ReactNode,
    activeColor?: ThemedColors | string,
    href?: string,
    target?: HTMLTarget,
}

export type NavbarCollapseLinkProps = Props & Omit<React.HTMLAttributes<HTMLAnchorElement>, keyof Props> & Omit<NavbarCollapseLinkVariantsProps, keyof Props>;

export const NavbarCollapseLink = React.forwardRef<HTMLAnchorElement, NavbarCollapseLinkProps>(({
    css,
    itemCss,
    collapseItemProps,
    children,
    activeColor,
    href,
    target,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);
    const activeThemeColor = useThemeColor(activeColor);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        };
        if(activeThemeColor !== undefined)
            result["$$navbarCollapseLinkColor"] = activeThemeColor;
        return result;
    }, [css, activeThemeColor])

    return (
        <NavbarCollapseItem
            css={itemCss}
            {...collapseItemProps}
        >
            <StyledNavbarCollapseLink
                ref={imperativeRef}
                css={customCss}
                href={href}
                target={target}
                {...props}
            >
                {children}
            </StyledNavbarCollapseLink>
        </NavbarCollapseItem>
    );
})

export default React.memo(NavbarCollapseLink);