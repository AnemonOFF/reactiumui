import React, { useMemo, useState } from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import { breakpoints, NavbarWidth } from "../../utils";
import { useScroll } from "../../utils/hooks";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import CollapseProvider from "./collapseContext";
import { NavbarVariantsProps, StyledNavbar } from "./navbar.styles";
import { StyledNavbarWrapper } from "./navbarWrapper.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    width?: NavbarWidth | string | number,
    compactOnScroll?: boolean,
    hideOnScroll?: boolean,
}

export type NavbarProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<NavbarVariantsProps, keyof Props>;

export const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(({
    children,
    css,
    type = "sticky",
    compact = false,
    square = false,
    disableBlur = false,
    disableShadow = false,
    width = 'lg',
    compactOnScroll = false,
    hideOnScroll = false,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);
    const { isOnTop } = useScroll();

    const widthCss = useMemo(() => {
        let result = width;
        if(breakpoints.find(el => el == width) !== undefined)
            result = `$breakpoints$${width}`;
        else if (width == 'full')
            result = '100%';
        else
            result = width;
        return result;
    }, [width])

    const navbarCss: CSS = useMemo(() => {
        const result: CSS = {};
        if (type == 'sticky' && isOnTop) {
            result.background = 'transparent';
            result.shadow = 'none';
            result.border = 'none';
        }
        if (compactOnScroll && !isOnTop) {
            result['$$navbarHeight'] = "$$navbarHeightCompact";
            result['$$navbarBorderRadius'] = "$radii$md";
        }
        if (hideOnScroll && !isOnTop) {
            result.transform = 'translateY(calc(-$$navbarHeight - 30px))';
        }
        return result;
    }, [isOnTop, type, compactOnScroll, hideOnScroll]);

    const customCss: CSS = useMemo(() => {
        const result = {
            maxWidth: widthCss,
            ...css
        };
        return result;
    }, [css, widthCss]);

    return (
        <CollapseProvider>
            <StyledNavbar
                type={type}
                compact={compact}
                square={square}
                disableBlur={disableBlur}
                disableShadow={disableShadow}
                css={navbarCss}
                {...props}
            >
                <StyledNavbarWrapper ref={imperativeRef} css={customCss}>
                    {children}
                </StyledNavbarWrapper>
            </StyledNavbar>
        </CollapseProvider>
    );
});

export default React.memo(Navbar);