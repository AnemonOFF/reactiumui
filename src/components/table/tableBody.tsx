import { CSS } from "../../theme";
import { ReactNode, useMemo } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableBody, TableBodyVariantsProps } from "./tableBody.styles";
import TableRow from "./tableRow";
import { RowData, useTableContext } from "./tableContext";
import { StyledTableRow } from "./tableRow.styles";

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
    const { page, sort, rowsPerPage, loadedPageRows } = useTableContext();
    const imperativeRef = useImperativeRef(ref);

    children = useMemo(() => {
        let paginatedChildren = loadedPageRows;
        if(!paginatedChildren)
            paginatedChildren = rowsPerPage ? React.Children.toArray(children).slice(rowsPerPage * (page - 1), rowsPerPage * page) : children;
        const rows = React.Children.map(paginatedChildren, (child, index) => {
            if(!React.isValidElement(child) || child.type !== TableRow)
                throw new Error('Table children must be valid react element of TableRow type');
            
            const childProps = {
                uid: child.props.uid ?? index,
                key: child.props.uid ?? index,
                ...child.props,
            }
            const clone = React.cloneElement(child, childProps);
            if(sort === undefined)
                return clone;

            const row: RowData = {
                element: clone,
            };
            return row;
        }) ?? [];

        let sorted: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
        if(sort === undefined)
            sorted =  rows as React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
        else
            sorted = sort(rows as RowData[]);
        if(spaceBetweenRows) {
            const len = rows.length;
            for(let i = 0; i < len - 1; i++)
                sorted.splice(1 + i * 2, 0, <StyledTableRow key={`sbr${i}`} css={{height: spaceBetweenRows}} />);
        }
        return sorted;
    }, [children, sort, spaceBetweenRows, rowsPerPage, page, loadedPageRows])

    return (
        <StyledTableBody
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledTableBody>
    );
})

export default React.memo(TableBody);