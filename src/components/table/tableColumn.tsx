import { CSS } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableColumn, TableColumnVariantsProps } from "./tableColumn.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableCellElement>, keyof Props>;
type VariantsProps = Omit<TableColumnVariantsProps, keyof Props>;
export type TableColumnProps = Props & VariantsProps & { html?: HTMLProps};


const TableColumn = React.forwardRef<HTMLTableCellElement, TableColumnProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledTableColumn
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledTableColumn>
    );
})

export default React.memo(TableColumn);