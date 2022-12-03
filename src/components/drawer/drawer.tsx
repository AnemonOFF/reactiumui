import { CSS } from "../../theme";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useImperativeRef } from "../../utils";
import { DrawerVariantsProps, DrawerWrapperVariantsProps, StyledDrawer, StyledDrawerWrapper } from "./drawer.styles";

interface Props {
    isOpen: boolean,
    size?: number,
    disableWrapper?: boolean,
    onWrapperClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    children?: React.ReactNode,
    css?: CSS,
    wrapperCss?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<DrawerVariantsProps, keyof Props>;
type WrapperVariantsProps = Omit<DrawerWrapperVariantsProps, keyof Props>;
export type DrawerProps = Props & VariantsProps & WrapperVariantsProps & { html?: HTMLProps};

const Drawer =  React.forwardRef<HTMLDivElement, DrawerProps>(({
    isOpen,
    children,
    disableBlur,
    html,
    css,
    wrapperCss,
    onWrapperClick,
    size,
    disableWrapper = false,
    ...props
}, ref) => {
    const [DOMContainer, setDOMContainer] = useState<HTMLDivElement>();
    const imperativeRef = useImperativeRef(ref);

    const wrapperClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if(onWrapperClick)
            onWrapperClick(e);
    }

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if(html?.onClick)
            html.onClick(e);
    }

    useEffect(() => {
        if(DOMContainer)
            return;
        
        let container = document.querySelector<HTMLDivElement>("#reactiumui__drawerContainer");
        if(!container) {
            const div = document.createElement("div");
            div.id = "reactiumui__drawerContainer";
            document.body.appendChild(div);
            container = div;
        }
        setDOMContainer(container);
    }, [])

    const customCss = useMemo(() => {
        const result = {...css};
        if(size !== undefined)
            result['$$drawerSize'] = `${size}px`;
        return result;
    }, [css, size])

    if(!DOMContainer || !isOpen)
        return null;
    
    const drawer = (
        <StyledDrawer
            ref={imperativeRef}
            onClick={clickHandler}
            css={customCss}
            {...props}
            {...html}
        >
            {children}
        </StyledDrawer>
    );

    if(disableWrapper)
        return createPortal(drawer, DOMContainer);
    
    return createPortal(
        <StyledDrawerWrapper
            css={wrapperCss}
            disableBlur={disableBlur}
            onClick={wrapperClickHandler}
        >
            {drawer}
        </StyledDrawerWrapper>,
        DOMContainer);
})

export default React.memo(Drawer);