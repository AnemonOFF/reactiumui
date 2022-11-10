import { CSS } from "@stitches/react/types/css-util";
import React, { useEffect, useMemo } from "react";
import { useBodyOverflow, useImperativeRef } from "../../utils/hooks";
import { useCollapse } from "./collapseContext";
import { StyledNavbarCollapse } from "./navbarCollapse.styles";
import { NavbarCollapseWrapperVariantsProps, StyledNavbarCollapseWrapper } from "./navbarCollapseWrapper.styles";

interface Props {
    open?: boolean,
    onOpenChange?: (isOpen: boolean) => void,
    children?: React.ReactNode,
    gap?: number | string,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<NavbarCollapseWrapperVariantsProps, keyof Props>;
export type NavbarCollapseProps = Props & VariantsProps & { html?: HTMLProps};

export const NavbarCollapse = React.forwardRef<HTMLUListElement, NavbarCollapseProps>(({
    open,
    onOpenChange,
    children,
    gap,
    css,
    fullScreen,
    html,
    ...props
}, ref) => {
    const { isOpened, setIsOpened } = useCollapse();
    const imperativeRef = useImperativeRef(ref);
    const setBodyOverflow = useBodyOverflow();

    useEffect(() => {
        if(open !== undefined)
            setIsOpened(open);
    }, [open, setIsOpened])

    useEffect(() => {
        if(onOpenChange)
            onOpenChange(isOpened);
    }, [onOpenChange])

    useEffect(() => {
        if(isOpened && fullScreen)
            setBodyOverflow('hidden');
        else
            setBodyOverflow(undefined);
        return () => setBodyOverflow(undefined);
    }, [fullScreen, isOpened])

    const customCss = useMemo(() => {
        const result: CSS = {...css};
        if (gap !== undefined)
            result.gap = gap;
        return result;
    }, [css, gap])

    return (
        <StyledNavbarCollapseWrapper open={isOpened} fullScreen={fullScreen} {...html} {...props}>
            <StyledNavbarCollapse css={customCss} ref={imperativeRef}>
                {children}
            </StyledNavbarCollapse>
        </StyledNavbarCollapseWrapper>
    );
});

export default React.memo(NavbarCollapse);