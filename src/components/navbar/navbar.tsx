import React, { useMemo, useState } from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import { breakpoints, NavbarWidth } from "../../utils";
import { useScroll } from "../../utils/hooks";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import CollapseProvider from "./collapseContext";
import { NavbarVariantsProps, StyledNavbar } from "./navbar.styles";
import NavbarCollapse from "./navbarCollapse";
import NavbarCollapseLink from "./navbarCollapseLink";
import NavbarLink, { NavbarLinkProps } from "./navbarLink";
import { StyledNavbarWrapper } from "./navbarWrapper.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    wrapperCss?: CSS,
    width?: NavbarWidth | string | number,
    compactOnScroll?: boolean,
    hideOnScroll?: boolean,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<NavbarVariantsProps, keyof Props>;
export type NavbarProps = Props & VariantsProps & { html?: HTMLProps};

const getNavbarLinks = (children: ReactNode) => {
    let links: NavbarLinkProps[] = [];
    React.Children.forEach(children, child => {
        if(!React.isValidElement(child))
            return;
        if(child.type === NavbarLink)
            links.push(child.props);
        else {
            const childChildren: ReactNode | undefined = child.props.children;
            if(childChildren === undefined)
                return;
            
            const childLinks = getNavbarLinks(childChildren);
            links = links.concat(childLinks);
        }
    });
    return links;
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(({
    children,
    css,
    wrapperCss,
    html,
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
    const { isOnTop } = useScroll(true);

    const isCollapseProvided = useMemo(() => {
        let result = false;
        React.Children.forEach(children, child => {

            if(React.isValidElement(child) && child.type === NavbarCollapse)
                result = true;
        });
        return result;
    }, [children])

    const collapse = useMemo(() => {
        if(isCollapseProvided)
            return undefined;
        const links = getNavbarLinks(children)
            .map((link, i) => <NavbarCollapseLink
                            key={i}
                            href={link.href}
                            target={link.target}
                            active={link.active}
                            activeColor={link.activeColor}
                            children={link.children}
                        />);
        return links;
    }, [isCollapseProvided, children])

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
        const result: CSS = {...wrapperCss};
        if (type == 'sticky' && isOnTop) {
            result.background = 'transparent';
            result.shadow = 'none';
            result.border = 'none';
        }
        if (compactOnScroll && !isOnTop) {
            result['$$navbarHeight'] = "$$navbarHeightCompact";
        }
        if (hideOnScroll && !isOnTop) {
            result.transform = 'translateY(calc(-$$navbarHeight - 30px))';
        }
        return result;
    }, [isOnTop, type, compactOnScroll, hideOnScroll, wrapperCss]);

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
                {...html}
                {...props}
            >
                <StyledNavbarWrapper ref={imperativeRef} css={customCss}>
                    {!isCollapseProvided &&
                    <NavbarCollapse>
                        {collapse}
                    </NavbarCollapse>
                    }
                    {children}
                </StyledNavbarWrapper>
            </StyledNavbar>
        </CollapseProvider>
    );
});

export default React.memo(Navbar);