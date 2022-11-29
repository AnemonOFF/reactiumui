import React from "react";
import { ReactNode } from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { StyledTableFooter, TableFooterVariantsProps } from "./tableFooter.styles";
import { StyledTableRow } from "./tableRow.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    spaceToBody?: number | string
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof Props>;
type VariantsProps = Omit<TableFooterVariantsProps, keyof Props>;
export type TableFooterProps = Props & VariantsProps & { html?: HTMLProps};

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(({
    children,
    css,
    html,
    spaceToBody,
    ...props
}, ref) => {
    
    const imperativeRef = useImperativeRef(ref);
    
    return (
        <StyledTableFooter
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            <StyledTableRow css={{height: spaceToBody}} />
            {children}
        </StyledTableFooter>
    )
})

export default React.memo(TableFooter);