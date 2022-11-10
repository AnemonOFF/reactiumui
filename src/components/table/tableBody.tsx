import { CSS } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableBody, TableBodyVariantsProps } from "./tableBody.styles";

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

    const imperativeRef = useImperativeRef(ref);

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