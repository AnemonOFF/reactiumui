import { CSS } from "../../theme";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useImperativeRef } from "../../utils";
import { DrawerVariantsProps, DrawerWrapperVariantsProps, StyledDrawer, StyledDrawerWrapper } from "./drawer.styles";

interface Props {
    isOpen: boolean,
    disableWrapper?: boolean,
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
    disableWrapper = false,
    ...props
}, ref) => {
    const [DOMContainer, setDOMContainer] = useState<HTMLDivElement>();
    const imperativeRef = useImperativeRef(ref);

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

    if(!DOMContainer || !isOpen)
        return null;
    
    const drawer = (
        <StyledDrawer
            ref={imperativeRef}
            onClick={(e) => {e.stopPropagation();}}
            css={css}
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
        >
            {drawer}
        </StyledDrawerWrapper>,
        DOMContainer);
})

export default React.memo(Drawer);