import React, { useEffect } from "react";
import { CSS } from "@stitches/react/types/css-util";
import { useImperativeRef } from "../../utils/hooks";
import { useCollapse } from "./collapseContext";
import { NavbarToggleWrapperVariantsProps, StyledNavbarToggleWrapper } from "./navbarToggle.styles";

interface Props {
    active?: boolean,
    onClick?: () => void,
    onActiveChange?: (isActive: boolean) => void,
    css?: CSS
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLButtonElement>, keyof Props>;
type VariantsProps = Omit<NavbarToggleWrapperVariantsProps, keyof Props>;
export type NavbarToggleProps = Props & VariantsProps & { html?: HTMLProps};

export const NavbarToggle = React.forwardRef<HTMLButtonElement, NavbarToggleProps>(({
    active,
    onClick,
    onActiveChange,
    css,
    html,
    ...props
}, ref) => {
    const { isOpened, setIsOpened } = useCollapse();
    const imperativeRef = useImperativeRef(ref);

    if ((active === undefined || onClick === undefined) &&
        (active !== undefined && onClick !== undefined)) {
        console.warn("Component is changing an uncontrolled NavbarToggle to be controlled");
    }

    const onToggleClick = () => {
        if (onClick)
            onClick();
        else
            setIsOpened(!isOpened);
    }

    useEffect(() => {
        if (active !== undefined)
            setIsOpened(active);
    }, [active, setIsOpened])

    useEffect(() => {
        if (onActiveChange)
            onActiveChange(isOpened);
    }, [onActiveChange, isOpened])

    return (
        <StyledNavbarToggleWrapper
            ref={imperativeRef}
            active={isOpened}
            onClick={onToggleClick}
            css={css}
            {...html}
            {...props}
        >
            <span className="line" />
            <span className="line" />
            <span className="line" />
        </StyledNavbarToggleWrapper>
    );
});

export default React.memo(NavbarToggle);