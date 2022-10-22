import { CSS } from "@stitches/react/types/css-util";
import React, { useEffect, useMemo } from "react";
import { useImperativeRef } from "../../utils/hooks";
import { useCollapse } from "./collapseContext";
import { StyledNavbarCollapse } from "./navbarCollapse.styles";
import { NavbarCollapseItemVariantsProps } from "./navbarCollapseItem.styles";
import { StyledNavbarCollapseWrapper } from "./navbarCollapseWrapper.styles";

interface Props {
    open?: boolean,
    onOpenChange?: (isOpen: boolean) => void,
    children?: React.ReactNode,
    gap?: number | string,
    css?: CSS,
}

export type NavbarCollapseProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<NavbarCollapseItemVariantsProps, keyof Props>;

export const NavbarCollapse = React.forwardRef<HTMLUListElement, NavbarCollapseProps>(({
    open,
    onOpenChange,
    children,
    gap,
    css,
    ...props
}, ref) => {
    const { isOpened, setIsOpened } = useCollapse();
    const imperativeRef = useImperativeRef(ref);

    useEffect(() => {
        if(open !== undefined)
            setIsOpened(open);
    }, [open, setIsOpened])

    useEffect(() => {
        if(onOpenChange)
            onOpenChange(isOpened);
    }, [onOpenChange])

    const customCss = useMemo(() => {
        const result: CSS = {...css};
        if (gap !== undefined)
            result.gap = gap;
        return result;
    }, [css, gap])

    return (
        <StyledNavbarCollapseWrapper open={isOpened} {...props}>
            <StyledNavbarCollapse css={customCss} ref={imperativeRef}>
                {children}
            </StyledNavbarCollapse>
        </StyledNavbarCollapseWrapper>
    );
});

export default React.memo(NavbarCollapse);