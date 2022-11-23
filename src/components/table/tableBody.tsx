import { CSS } from "../../theme";
import { ReactNode, useMemo } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableBody, TableBodyVariantsProps } from "./tableBody.styles";
import TableRow from "./tableRow";
import { RowData, useTableContext } from "./tableContext";

interface Props {
    children?: ReactNode,
    css?: CSS,
    spaceBetweenRows?: number | string,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof Props>;
type VariantsProps = Omit<TableBodyVariantsProps, keyof Props>;
export type TableBodyProps = Props & VariantsProps & { html?: HTMLProps};

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({
    children,
    css,
    spaceBetweenRows,
    html,
    ...props
}, ref) => {
    const { sort } = useTableContext();
    const imperativeRef = useImperativeRef(ref);

    const rows = useMemo(() => {
        if(sort === undefined)
            return children;

        const rowsDatas = React.Children.map(children, child => {
            if(!React.isValidElement(child) || child.type !== TableRow)
                throw new Error('Table children must be valid react element of TableRow type');
            
            const row: RowData = {
                element: child,
            };
            return row;
        }) ?? [];
        
        return sort(rowsDatas);
    }, [children, sort])

    return (
        <StyledTableBody
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {rows}
        </StyledTableBody>
    );
})

export default React.memo(TableBody);