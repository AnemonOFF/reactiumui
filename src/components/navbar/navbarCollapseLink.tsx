import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { ThemedColors, useImperativeRef, useThemeColor } from "../../utils";
import NavbarCollapseItem, { NavbarCollapseItemProps } from "./navbarCollapseItem";
import { NavbarCollapseLinkVariantsProps, StyledNavbarCollapseLink } from "./navbarCollapseLink.styles";

interface Props {
    css?: CSS,
    itemCss?: CSS,
    collapseItemProps?: NavbarCollapseItemProps,
    children?: React.ReactNode,
    activeColor?: ThemedColors | string,
}

export type NavbarCollapseLinkProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<NavbarCollapseLinkVariantsProps, keyof Props>;

export const NavbarCollapseLink = React.forwardRef<HTMLAnchorElement, NavbarCollapseLinkProps>(({
    css,
    itemCss,
    collapseItemProps,
    children,
    activeColor,
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
                {...props}
            >
                {children}
            </StyledNavbarCollapseLink>
        </NavbarCollapseItem>
    );
})

export default React.memo(NavbarCollapseLink);