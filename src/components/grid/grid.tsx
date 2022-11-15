import React, { ReactNode, useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, JustifyContent } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { GridVariantsProps, StyledGrid } from "./grid.styles";
import GridItem from "./gridItem";
import GridRow from "./gridRow";

interface Props {
    children: ReactNode,
    fixed?: boolean | 'max',
    columns?: number,
    gap?: number,
    rowGap?: number,
    columnGap?: number,
    justify?: JustifyContent,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    css?: CSS
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<GridVariantsProps, keyof Props>;
export type GridProps = Props & VariantsProps & { html?: HTMLProps};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(({
    children,
    rowGap,
    columnGap,
    justify,
    alignItems,
    alignContent,
    html,
    css: gridCss,
    fixed = false,
    columns = 12,
    gap = 5,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const propedChildren = useMemo(() => React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            switch(child.type){
                case GridItem:
                    const gridItemProps = {
                        columns: child.props.columns ?? columns,
                        fixed: child.props.fixed ?? fixed,
                        gap,
                        rowGap,
                        columnGap
                    };
                    return React.cloneElement(child, gridItemProps);
                case GridRow:
                    const gridRowProps = {
                        columns: child.props.columns ?? columns,
                        fixed: child.props.fixed ?? fixed,
                        gap: child.props.gap ?? gap,
                        rowGap: child.props.rowGap ?? rowGap ?? gap,
                        columnGap: child.props.rowGap ?? columnGap ?? gap
                    }
                    return React.cloneElement(child, gridRowProps);
                default:
                    throw Error('Grid child can be only of GridItem or GridRow type (not in one time).');
            }
        }
        throw Error(`Grid child can be only valid react component. ${child} is not.`);
    }), [children, columns, fixed, gap, columnGap]);

    if(!propedChildren || propedChildren.length === 0)
        throw Error('Grid must have at least one child.');
    
    const isRowGrid = propedChildren[0].type === GridRow;
    
    const styledCss: CSS = useMemo(() => ({
        flexWrap: isRowGrid ? 'nowrap' : 'wrap',
        flexDirection: isRowGrid ? 'column' : 'row',
        justifyContent: justify,
        alignItems: alignItems,
        alignContent: alignContent,
        ...gridCss
    }), [gridCss, isRowGrid, justify, alignContent, alignItems]);

    return (
        <StyledGrid
            ref={imperativeRef}
            css={{...styledCss}}
            {...html}
            {...props}
        >
            {propedChildren}
        </StyledGrid>
    );
});

export default React.memo(Grid);