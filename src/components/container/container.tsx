import React, { useMemo } from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { ContainerVariantsProps, StyledContainer } from "./container.styles";

interface Props {
    children?: ReactNode,
    all?: number | boolean,
    xs?: number | boolean,
    sm?: number | boolean,
    md?: number | boolean,
    lg?: number | boolean,
    xl?: number | boolean,
    fixed?: boolean,
    css?: CSS
}

export type ContainerProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<ContainerVariantsProps, keyof Props>;

const generateCss = (value: number | boolean | undefined, fixed: boolean): CSS => {
    if (value === undefined)
        return {};
    
    const isNumber = typeof value === 'number';
    const display = value === 0 || value === false ? 'none' : 'block';
    const cssValue = isNumber ? value : '100%';

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
    all = false,
    fixed = false,
    ...props
}, ref) => {
    if(!xs && !sm && !md && !lg && !xl)
        all = all === false ? true : all;
    
    const imperativeRef = useImperativeRef(ref);
    
    const styledCss: CSS = useMemo(() => ({
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
    }), [all, xs, sm, md, lg, xl, css, fixed])

    return (
        <StyledContainer ref={imperativeRef} css={styledCss} {...props}>
            {children}
        </StyledContainer>
    );
})

export default React.memo(Container);