import React, { ReactNode, useEffect } from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { Text } from "../text";
import { StyledTableCell } from "./tableCell.styles";
import { useTableContext } from "./tableContext";
import { StyledTablePagination, TablePaginationVariantsProps } from "./tablePagination.styles";
import { StyledTableRow } from "./tableRow.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<TablePaginationVariantsProps, keyof Props>;
export type TablePaginationProps = Props & VariantsProps & { html?: HTMLProps};

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {
    const { page, setPage, rowsPerPage, totalRows, setRowsPerPage, isLoading } = useTableContext();
    const imperativeRef = useImperativeRef(ref);

    if(isLoading)
        return <tr><td><Text span color="warning">Loading...</Text></td></tr>

    if(!rowsPerPage || !totalRows)
            throw new Error('To use TablePagination, you must set rowsPerPage and totalRows props to table component');

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const onPageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newPage = parseInt(e.currentTarget.value);
        setPage(newPage);
    }

    return (
        <tr>
            <StyledTableCell colSpan={"100%" as any}>
                <StyledTablePagination
                    ref={imperativeRef}
                    css={css}
                    {...html}
                    {...props}
                >
                    {page > 1 && <button onClick={onPageClick} value={page - 1}>{'<'}</button>}
                    {page > 2 && <button onClick={onPageClick} value={1}>1</button>}
                    {page > 3 && <button onClick={onPageClick} value={Math.round(page / 2)}>{Math.round(page / 2)}</button>}
                    {page > 1 && <button onClick={onPageClick} value={page - 1}>{page - 1}</button>}
                    <button disabled>{page}</button>
                    {page < totalPages && <button onClick={onPageClick} value={page + 1}>{page + 1}</button>}
                    {page < totalPages - 2 && <button onClick={onPageClick} value={Math.round((totalPages + page) / 2)}>{Math.round((totalPages + page) / 2)}</button>}
                    {page < totalPages - 1 && <button onClick={onPageClick} value={totalPages}>{totalPages}</button>}
                    {page < totalPages && <button onClick={onPageClick} value={page + 1}>{'>'}</button>}
                </StyledTablePagination>
                {children}
            </StyledTableCell>
        </tr>
    );
})

export default React.memo(TablePagination);