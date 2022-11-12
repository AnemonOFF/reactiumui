import React, { ReactNode, useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, FlexDirection, JustifyContent } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import GridItem from "./gridItem";
import { GridRowVariantsProps, StyledGridRow } from "./gridRow.styles";

interface Props {
    children: ReactNode,
    fixed?: boolean,
    columns?: number,
    gap?: number,
    rowGap?: number,
    columnGap?: number,
    justify?: JustifyContent,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    direction?: FlexDirection,
    css?: CSS
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<GridRowVariantsProps, keyof Props>;
export type GridRowProps = Props & VariantsProps & { html?: HTMLProps};

const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(({
    children,
    css,
    justify,
    alignItems,
    alignContent,
    rowGap,
    columnGap,
    gap,
    direction,
    html,
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
    }), [children, columns, fixed, gap, rowGap, columnGap]);

    return (
        <StyledGridRow
            ref={imperativeRef}
            css={{
                alignItems,
                alignContent,
                justifyContent: justify,
                flexDirection: direction,
                ...css
            }}
            {...html}
            {...props}
        >
            {propedChildren}
        </StyledGridRow>
    );
})

export default React.memo(GridRow);