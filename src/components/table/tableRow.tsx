import { CSS } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableRow, TableRowVariantsProps } from "./tableRow.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableRowElement>, keyof Props>;
type VariantsProps = Omit<TableRowVariantsProps, keyof Props>;
export type TableRowProps = Props & VariantsProps & { html?: HTMLProps};

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledTableRow
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledTableRow>
    );
})

export default React.memo(TableRow);