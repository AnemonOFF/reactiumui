import React, { useMemo } from "react";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { CSS } from "../../theme";
import { GridItemVariantsProps, StyledGridItem } from "./gridItem.styles";
import { AlignContent, AlignItems, Display, FlexDirection, JustifyContent } from "../../utils";

interface Props {
    all?: number | boolean,
    xs?: number | boolean,
    sm?: number | boolean,
    md?: number | boolean,
    lg?: number | boolean,
    xl?: number | boolean,
    fixed?: boolean,
    columns?: number,
    gap?: number,
    rowGap?: number,
    columnGap?: number,
    display?: Display,
    justify?: JustifyContent,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    direction?: FlexDirection,
    css?: CSS
}

export type GridItemProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<GridItemVariantsProps, keyof Props>;

const generateCss = (value: number | boolean | undefined, columns: number, fixed: boolean): CSS => {
    if (value === undefined)
        return {};
    const display = value === 0 || value === false ? 'none' : 'inherit';
    if (typeof value !== 'number') {
        return {
            display,
            flexBasis: '0',
            maxWidth: value ? '100%' : 0,
            flexGrow: value ? 1 : 0,
        };
    }
    const procentWidth = 100 / columns * value;
    const width = fixed ? value : (procentWidth > 100 ? '100%' : procentWidth < 0 ? '0' : `${procentWidth}%`);
    return {
        display,
        flexBasis: width,
        maxWidth: width,
        flexGrow: 0,
    };
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({
    xs,
    sm,
    md,
    lg,
    xl,
    children,
    css,
    gap,
    rowGap,
    columnGap,
    display,
    justify,
    alignContent,
    alignItems,
    direction,
    all = false,
    fixed = false,
    columns = 12,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);
    if(!xs && !sm && !md && !lg && !xl)
        all = all === false ? true : all;

    const styledCss: CSS = useMemo(() => {
        const result = {
            px: columnGap ?? gap ?? 0,
            py: rowGap ?? gap ?? 0,
            display,
            ...generateCss(all, columns, fixed),
            '@xs': {
                ...generateCss(xs, columns, fixed)
            },
            '@sm': {
                ...generateCss(sm, columns, fixed)
            },
            '@md': {
                ...generateCss(md, columns, fixed)
            },
            '@lg': {
                ...generateCss(lg, columns, fixed)
            },
            '@xl': {
                ...generateCss(xl, columns, fixed)
            },
            ...css
        }
        if(display === undefined || display =='inherit' || display == 'flex'){
            if(justify)
                result['justifyContent'] = justify;
            if(direction)
                result['flexDirection'] = direction;
            if(alignContent)
                result['alignContent'] = alignContent;
            if(alignItems)
                result['alignItems'] = alignItems;
        }
        return result;
    }, [all, xs, sm, md, lg, xl, columns, fixed, css, columnGap, rowGap, gap, display]);

    return (
        <StyledGridItem ref={imperativeRef} css={styledCss} {...props}>
            {children}
        </StyledGridItem>
    );
})

export default React.memo(GridItem);