import { CSS } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableCell, TableCellVariantsProps } from "./tableCell.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableCellElement>, keyof Props>;
type VariantsProps = Omit<TableCellVariantsProps, keyof Props>;
export type TableCellProps = Props & VariantsProps & { html?: HTMLProps};

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledTableCell
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledTableCell>
    );
})

export default React.memo(TableCell);