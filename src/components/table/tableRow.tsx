import { CSS } from "../../theme";
import { ReactNode, useEffect } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableRow, TableRowVariantsProps } from "./tableRow.styles";
import { useTableContext } from "./tableContext";
import TableCell from "./tableCell";

interface Props {
    children?: ReactNode,
    uid?: string,
    disableSelection?: boolean,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableRowElement>, keyof Props>;
type VariantsProps = Omit<TableRowVariantsProps, keyof Props | 'disable'>;
export type TableRowProps = Props & VariantsProps & { html?: HTMLProps};

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({
    children,
    css,
    // uid auto proping in tableBody component, so it`s never undefined if in inside table
    uid,
    html,
    disableSelection = false,
    ...props
}, ref) => {
    const { hideCheckboxColumn, selectedRows, toggleRowSelect, setDisableKey } = useTableContext();
    const isChecked = selectedRows.find(ruid => uid === ruid) !== undefined;
    const imperativeRef = useImperativeRef(ref);

    useEffect(() => {
        setDisableKey(uid!, disableSelection);
    }, [disableSelection])

    const onRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if(!disableSelection)
            toggleRowSelect(uid!);
        if(html?.onClick)
            html.onClick(e);
    }

    return (
        <StyledTableRow
            ref={imperativeRef}
            css={css}
            onClick={onRowClick}
            checked={isChecked}
            disable={disableSelection}
            {...html}
            {...props}
        >
            {!hideCheckboxColumn &&
            <TableCell>
                <input type="checkbox" disabled={disableSelection} checked={isChecked} onChange={() => {}} />
            </TableCell>
            }
            {children}
        </StyledTableRow>
    );
})

export default React.memo(TableRow);