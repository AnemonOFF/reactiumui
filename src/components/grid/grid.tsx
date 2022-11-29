import React, { ReactNode, useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, JustifyContent } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { GridVariantsProps, StyledGrid } from "./grid.styles";
import GridContextProvider from "./gridContext";
import GridItem from "./gridItem";
import GridRow from "./gridRow";

interface Props {
    children: ReactNode,
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
    columns = 12,
    gap = 5,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const propedChildren = useMemo(() => React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child))
            throw Error('Grid child can be only valid react component');
        switch(child.type){
            case GridItem:
                const gridItemProps = {
                    uid: child.props.uid ?? index,
                    ...child.props
                };
                return React.cloneElement(child, gridItemProps);
            case GridRow:
                const gridRowProps = {
                    uid: child.props.uid ?? index,
                    columns: child.props.columns ?? columns,
                    columnGap: child.props.columnGap ?? columnGap ?? gap,
                    ...child.props
                }
                return React.cloneElement(child, gridRowProps);
            default:
                throw Error('Grid child can be only of GridItem or GridRow type');
        }
    }), [children, columns, gap, columnGap]);

    if(!propedChildren || propedChildren.length === 0)
        throw Error('Grid must have at least one child.');
    
    const styledCss: CSS = useMemo(() => ({
        flexWrap: 'wrap',
        justifyContent: justify,
        alignItems: alignItems,
        alignContent: alignContent,
        ...gridCss
    }), [gridCss, justify, alignContent, alignItems]);

    return (
        <GridContextProvider
            columns={columns}
            columnGap={columnGap ?? gap}
            rowGap={rowGap?? gap}
        >
            <StyledGrid
                ref={imperativeRef}
                css={{...styledCss}}
                {...html}
                {...props}
            >
                {propedChildren}
            </StyledGrid>
        </GridContextProvider>
    );
});

export default React.memo(Grid);