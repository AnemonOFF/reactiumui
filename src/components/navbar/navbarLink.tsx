import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { Radii, Space, ThemedColors } from "../../utils";
import { useImperativeRef, useThemeColor } from "../../utils/hooks";
import NavbarItem, { NavbarItemProps } from "./navbarItem";
import { NavbarLinkVariantsProps, StyledNavbarLink } from "./navbarLink.styles";

interface Props {
    css?: CSS,
    itemCss?: CSS,
    navbarItemProps?: NavbarItemProps,
    children?: React.ReactNode,
    backgroundRadius?: Radii | string | number,
    backgroundPadding?: Space | string | number,
    backgroundColor?: ThemedColors | string,
    backgroundActiveColor?: ThemedColors | string,
    underlineWidth?: string | number,
    activeColor?: ThemedColors | string,
}

export type NavbarLinkProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<NavbarLinkVariantsProps, keyof Props>;

export const NavbarLink = React.forwardRef<HTMLAnchorElement, NavbarLinkProps>(({
    css,
    itemCss,
    navbarItemProps,
    children,
    backgroundRadius,
    backgroundPadding,
    backgroundColor,
    backgroundActiveColor,
    underlineWidth,
    activeColor,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);
    const activeThemeColor = useThemeColor(activeColor);
    const backgroundActiveThemeColor = useThemeColor(backgroundActiveColor);
    const themeBackground = useThemeColor(backgroundColor);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        };
        if(backgroundActiveThemeColor !== undefined)
            result["$$navbarLinkBackgroundColor"] = backgroundActiveThemeColor;
        if(activeThemeColor !== undefined)
            result["$$navbarLinkActiveColor"] = activeThemeColor;
        if(themeBackground !== undefined)
            result["$$navbarLinkBackground"] = themeBackground;
        if(backgroundRadius !== undefined)
            result["$$navbarLinkBackgroundRadius"] = backgroundRadius;
        if(backgroundPadding !== undefined)
            result["$$navbarLinkBackgroundPadding"] == backgroundPadding;
        if(underlineWidth !== undefined)
            result["$$navbarLinkUnderlineWidth"] = underlineWidth;
        return result;
    }, [css, activeThemeColor, themeBackground, themeBackground, backgroundRadius, backgroundPadding, underlineWidth]);

    return (
        <NavbarItem
            css={itemCss}
            {...navbarItemProps}
        >
            <StyledNavbarLink
                ref={imperativeRef}
                css={customCss}
                {...props}
            >
                {children}
            </StyledNavbarLink>
        </NavbarItem>
    );
})

export default React.memo(NavbarLink);