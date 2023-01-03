import React, { ReactNode } from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { Button } from "../button";
import { Group } from "../group";
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
                    <Group>
                        {page > 1 && <Button type={"border"} onClick={onPageClick} value={page - 1}>{'<'}</Button>}
                        {page > 2 && <Button type={"border"} onClick={onPageClick} value={1}>1</Button>}
                        {page > 3 && <Button type={"border"} onClick={onPageClick} value={Math.round(page / 2)}>{Math.round(page / 2)}</Button>}
                        {page > 1 && <Button type={"border"} onClick={onPageClick} value={page - 1}>{page - 1}</Button>}
                        <Button>{page}</Button>
                        {page < totalPages && <Button type={"border"} onClick={onPageClick} value={page + 1}>{page + 1}</Button>}
                        {page < totalPages - 2 && <Button type={"border"} onClick={onPageClick} value={Math.round((totalPages + page) / 2)}>{Math.round((totalPages + page) / 2)}</Button>}
                        {page < totalPages - 1 && <Button type={"border"} onClick={onPageClick} value={totalPages}>{totalPages}</Button>}
                        {page < totalPages && <Button type={"border"} onClick={onPageClick} value={page + 1}>{'>'}</Button>}
                    </Group>
                </StyledTablePagination>
                {children}
            </StyledTableCell>
        </tr>
    );
})

export default React.memo(TablePagination);