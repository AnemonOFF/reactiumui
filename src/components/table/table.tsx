import { CSS } from "../../theme";
import { ReactNode } from "react";
import { StyledTable, TableVariantsProps } from "./table.styles";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import TableContext from "./tableContext";

interface Props {
    children: ReactNode,
    css?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLTableElement>, keyof Props>;
type VariantsProps = Omit<TableVariantsProps, keyof Props>;
export type TableProps = Props & VariantsProps & { html?: HTMLProps};

const Table = React.forwardRef<HTMLTableElement, TableProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    return (
        <TableContext>
            <StyledTable
                ref={imperativeRef}
                css={css}
                {...html}
                {...props}
            >
                {children}
            </StyledTable>
        </TableContext>
    );
})

export default React.memo(Table);