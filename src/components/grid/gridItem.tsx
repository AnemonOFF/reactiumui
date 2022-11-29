import React, { ReactNode, useCallback, useMemo } from "react";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { CSS } from "../../theme";
import { GridItemVariantsProps, StyledGridItem } from "./gridItem.styles";
import { useGridContext } from "./gridContext";

interface Props {
    children?: ReactNode,
    all?: number | boolean,
    xs?: number | boolean,
    sm?: number | boolean,
    md?: number | boolean,
    lg?: number | boolean,
    xl?: number | boolean,
    fixed?: boolean | 'max',
    uid?: string,
    css?: CSS
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<GridItemVariantsProps, keyof Props>;
export type GridItemProps = Props & VariantsProps & { html?: HTMLProps};

type GenerateCSSResultType = {
    display: string,
    flexBasis: string | number,
    flexGrow: number,
    maxWidth?: string | number,
    width?: string | number
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(({
    xs,
    sm,
    md,
    lg,
    xl,
    children,
    css,
    html,
    // uid setting in grid or gridRow components, so it wont be undefined
    uid,
    all = false,
    fixed = false,
    ...props
}, ref) => {
    const { gridColumns, rows, gridColumnGap, gridRowGap } = useGridContext();

    if(!xs && !sm && !md && !lg && !xl)
        all = all === false ? true : all;

    const row = useMemo(() => {
        const result = rows.find(r => r.itemsUids.find(i => i === uid) !== undefined)
        // console.log(uid, result);
        // if (result === undefined && fixed !== false)
        //     console.warn('You are using fixed GridItem without GridRow parent. This may cause unexpected behavior');
        return result;
    }, [rows])

    const columns = useMemo(() => (
        row !== undefined ? row.columns : gridColumns
    ), [gridColumns, row])

    const imperativeRef = useImperativeRef(ref);
    
    const generateCss = useCallback((value: number | boolean | undefined, fixedWidth?: number) => {
        if (value === undefined)
            return {};
        const display = value === 0 || value === false ? 'none' : 'inherit';
        let result: GenerateCSSResultType = {
            display,
            flexBasis: 0,
            flexGrow: 0,
        }
        if (typeof value !== 'number') {
            result.flexGrow = value ? 1 : 0;
            result.maxWidth = value ? '100%' : 0;
            if (fixed === true)
                result.width = '100%';
            return result;
        }
        if (fixed !== false) {
            result.flexBasis = value;
            if(fixed === 'max')
                result.maxWidth = value;
            else
                result.width = value;
            return result;
        }
        if(row === undefined) {
            let procentWidth = 100 / columns * value;
            if (procentWidth > 100) procentWidth = 100;
            if (procentWidth < 0) procentWidth = 0;
            const width = `${procentWidth}%`;
            result.flexBasis = width;
            result.width = width;
            return result;
        }
        let procentWidth = 100 / columns * value;
        if (procentWidth > 100) procentWidth = 100;
        if (procentWidth < 0) procentWidth = 0;
        const width = fixedWidth ? `calc(${procentWidth}% - ${value / columns * fixedWidth}px)` : `${procentWidth}%`;
        result.flexBasis = width;
        result.width = width;
        return result;
    }, [columns, row, fixed])

    const styledCss: CSS = useMemo(() => {
        const result = {
            px: row?.columnGap ?? gridColumnGap,
            py: gridRowGap,
            ...generateCss(all, row?.fixedWidth['all']),
            '@xs': {
                ...generateCss(xs, row?.fixedWidth['xs'])
            },
            '@sm': {
                ...generateCss(sm, row?.fixedWidth['sm'])
            },
            '@md': {
                ...generateCss(md, row?.fixedWidth['md'])
            },
            '@lg': {
                ...generateCss(lg, row?.fixedWidth['lg'])
            },
            '@xl': {
                ...generateCss(xl, row?.fixedWidth['xl'])
            },
            ...css
        }
        return result;
    }, [all, xs, sm, md, lg, xl, css, row, gridColumnGap, gridRowGap]);

    return (
        <StyledGridItem
            ref={imperativeRef}
            css={styledCss}
            {...html}
            {...props}
        >
            {children}
        </StyledGridItem>
    );
})

export default React.memo(GridItem);