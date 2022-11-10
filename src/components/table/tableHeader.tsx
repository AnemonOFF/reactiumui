import { CSS } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableHeader, TableHeaderVariantsProps } from "./tableHeader.styles";
import { StyledTableRow } from "./tableRow.styles";

interface Props {
    children?: ReactNode,
    css?: CSS,
    spaceToBody?: number | string
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableSectionElement>, keyof Props>;
type VariantsProps = Omit<TableHeaderVariantsProps, keyof Props>;
export type TableHeaderProps = Props & VariantsProps & { html?: HTMLProps};

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({
    children,
    css,
    spaceToBody,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledTableHeader
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
            <StyledTableRow css={{height: spaceToBody}} />
        </StyledTableHeader>
    );
})

export default React.memo(TableHeader);