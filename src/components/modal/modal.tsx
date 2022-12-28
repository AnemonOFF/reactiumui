import { CSS } from "../../theme";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useBodyOverflow, useImperativeRef } from "../../utils";
import { ModalVariantsProps, ModalWrapperVariantsProps, StyledModal, StyledModalWrapper } from "./modal.styles";

interface Props {
    children?: React.ReactNode,
    isOpen: boolean,
    width?: number | string,
    height?: number | string,
    x?: string | number,
    y?: string | number,
    insideContainer?: boolean,
    disableWrapper?: boolean,
    onWrapperClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    css?: CSS,
    wrapperCss?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<ModalVariantsProps, keyof Props | 'position'>;
type WrapperVariantsProps = Omit<ModalWrapperVariantsProps, keyof Props | 'position'>;
export type ModalProps = Props & VariantsProps & WrapperVariantsProps & { html?: HTMLProps};

const Modal =  React.forwardRef<HTMLDivElement, ModalProps>(({
    isOpen,
    children,
    disableBlur,
    html,
    css,
    wrapperCss,
    onWrapperClick,
    width,
    height,
    x,
    y,
    placement,
    insideContainer = false,
    disableWrapper = false,
    ...props
}, ref) => {
    const [DOMContainer, setDOMContainer] = useState<HTMLDivElement>();
    const imperativeRef = useImperativeRef(ref);
    const setBodyOverflow = useBodyOverflow();

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
        if(isOpen && !insideContainer && !disableWrapper)
            setBodyOverflow('hidden');
        else
            setBodyOverflow(undefined);
    }, [isOpen, insideContainer])

    useEffect(() => {
        if(DOMContainer)
            return;
        
        let container = document.querySelector<HTMLDivElement>("#reactiumui__modalContainer");
        if(!container) {
            const div = document.createElement("div");
            div.id = "reactiumui__modalContainer";
            document.body.appendChild(div);
            container = div;
        }
        setDOMContainer(container);
    }, [])

    const customCss = useMemo(() => {
        const result = {...css};
        if(width !== undefined)
            result.width = typeof width === 'number' ? `${width}px` : width;
        if(height !== undefined)
            result.height = typeof height === 'number' ? `${height}px` : height;
        if(x !== undefined)
            result.left = x;
        if(y !== undefined)
            result.top = y;
        return result;
    }, [css, x, y])

    if(!DOMContainer || !isOpen)
        return null;
    
    const modal = (
        <StyledModal
            ref={imperativeRef}
            onClick={clickHandler}
            css={customCss}
            position={insideContainer ? 'absolute' : 'fixed'}
            placement={x !== undefined || y !== undefined ? undefined : placement ?? 'center'}
            {...props}
            {...html}
        >
            {children}
        </StyledModal>
    );

    if(disableWrapper)
        return insideContainer ? modal : createPortal(modal, DOMContainer);
    
    const wrapper = (
        <StyledModalWrapper
            css={wrapperCss}
            disableBlur={disableBlur}
            onClick={wrapperClickHandler}
            position={insideContainer ? 'absolute' : 'fixed'}
        >
            {modal}
        </StyledModalWrapper>
    );
    return insideContainer ? wrapper : createPortal(wrapper, DOMContainer);
})

export default React.memo(Modal);