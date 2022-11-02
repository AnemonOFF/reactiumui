import React, { useEffect, useMemo } from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import { Position } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { ContainerVariantsProps, StyledContainer } from "./container.styles";

interface Props {
    children?: ReactNode,
    all?: number | string | boolean,
    xs?: number | string | boolean,
    sm?: number | string | boolean,
    md?: number | string | boolean,
    lg?: number | string | boolean,
    xl?: number | string | boolean,
    fixed?: boolean,
    center?: boolean,
    css?: CSS,
    position?: Position | 'fixed-overflow',
}

export type ContainerProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<ContainerVariantsProps, keyof Props>;

const generateCss = (value: number | string | boolean | undefined, fixed: boolean): CSS => {
    if (value === undefined)
        return {};
    
    const isBoolean = typeof value === 'boolean';
    const display = value == 0 || value === false ? 'none' : 'block';
    const cssValue = isBoolean ? '100%' : value;

    return {
        display,
        width: fixed ? cssValue : 'initial',
        maxWidth: cssValue
    };
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(({
    children,
    xs,
    sm,
    md,
    lg,
    xl,
    css,
    position,
    all = false,
    fixed = false,
    center = false,
    ...props
}, ref) => {
    if(!xs && !sm && !md && !lg && !xl)
        all = all === false ? true : all;
    
    const imperativeRef = useImperativeRef(ref);
    
    const styledCss: CSS = useMemo(() => {
        const result = {
            ...generateCss(all, fixed),
            '@xs': {
                ...generateCss(xs, fixed)
            },
            '@sm': {
                ...generateCss(sm, fixed)
            },
            '@md': {
                ...generateCss(md, fixed)
            },
            '@lg': {
                ...generateCss(lg, fixed)
            },
            '@xl': {
                ...generateCss(xl, fixed)
            },
            ...css
        }
        if(center)
            result.mx = 'auto';
        if(position) {
            result.position = position == 'fixed-overflow' ? 'fixed' : position;
            if(position == 'fixed-overflow')
                result.overflow = 'auto';
        }
        return result;
    }, [all, xs, sm, md, lg, xl, css, fixed, center, position])

    useEffect(() => {
        const changeMaxSize = () => {
            const element = imperativeRef.current;
            if(!element)
                return;
            const rect = element?.getBoundingClientRect();
            element.style.maxHeight = `calc(100vh - ${rect.top}px)`;
            element.style.maxWidth = `calc(100vw - ${rect.left}px)`;
        }

        if(position == 'fixed-overflow'){
            changeMaxSize();
            document.addEventListener('scroll', changeMaxSize, true);
        } else {
            document.removeEventListener('scroll', changeMaxSize, true);
        }

        return () => document.removeEventListener('scroll', changeMaxSize, true);
    }, [position])

    return (
        <StyledContainer ref={imperativeRef} css={styledCss} {...props}>
            {children}
        </StyledContainer>
    );
})

export default React.memo(Container);