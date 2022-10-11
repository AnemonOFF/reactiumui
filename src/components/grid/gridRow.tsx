import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, JustifyContent } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import GridItem from "./gridItem";
import { GridRowVariantsProps, StyledGridRow } from "./gridRow.styles";

interface Props {
    fixed?: boolean,
    columns?: number,
    gap?: number,
    rowGap?: number,
    columnGap?: number,
    justify?: JustifyContent,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    css?: CSS
}

export type GridRowProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<GridRowVariantsProps, keyof Props>;

const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(({
    children,
    css,
    justify,
    alignItems,
    alignContent,
    rowGap,
    columnGap,
    gap,
    fixed = false,
    columns = 12,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const propedChildren = useMemo(() => React.Children.map(children, child => {
        if (!React.isValidElement(child) || child.type !== GridItem)
            throw Error('GridRow child can be only GridItem type');
        const childProps = {
            columns: child.props.columns ?? columns,
            fixed: child.props.fixed ?? fixed,
            gap,
            rowGap,
            columnGap
        };
        return React.cloneElement(child, childProps);
    }), [children, columns, fixed]);

    return (
        <StyledGridRow ref={imperativeRef} css={{
            alignItems,
            alignContent,
            justifyContent: justify,
            ...css
        }} {...props}>
            {propedChildren}
        </StyledGridRow>
    );
})

export default GridRow;