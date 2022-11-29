import React, { ReactNode, useEffect, useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, breakpoints, JustifyContent } from "../../utils";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import { useGridContext } from "./gridContext";
import GridItem from "./gridItem";
import { GridRowVariantsProps, StyledGridRow } from "./gridRow.styles";

interface Props {
    children: ReactNode,
    fixed?: boolean | 'max',
    columns?: number,
    columnGap?: number,
    justify?: JustifyContent,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    uid?: string,
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
    columnGap,
    html,
    // uid setting in grid component, so it wont be undefined
    uid,
    fixed = false,
    columns = 12,
    ...props
}, ref) => {
    const { setRowData } = useGridContext();
    const imperativeRef = useImperativeRef(ref);

    const { itemsUids, fixedData, propedChildren } = useMemo(() => {
        const itemsUids: string[] = [];
        const fixedData: {[breakpoint: string]: number} = {};
        const propedChildren = React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child) || child.type !== GridItem)
                throw Error('GridRow child can be only GridItem type');
            
            const itemUid = child.props.uid ?? `${uid}r${index}`;
            const itemFixed = child.props.fixed ?? fixed;
            itemsUids.push(itemUid);
            Object.keys(child.props)
                .filter(p => ['all', ...breakpoints].includes(p))
                .forEach(p => fixedData[p] = (fixedData[p] === undefined ? 0 : fixedData[p]) + child.props[p]);
            const childProps = {
                uid: itemUid,
                fixed: itemFixed,
                ...child.props
            };
            return React.cloneElement(child, childProps);
        });
        return { itemsUids, fixedData, propedChildren };
    }, [children, uid, fixed])

    useEffect(() => {
        setRowData({
            itemsUids,
            columns,
            fixedWidth: fixedData,
            uid: uid!,
            columnGap: columnGap!,
        });
    }, [itemsUids, fixedData, columns, uid, columnGap])
    console.log('rerender')

    return (
        <StyledGridRow
            ref={imperativeRef}
            css={{
                alignItems,
                alignContent,
                justifyContent: justify,
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