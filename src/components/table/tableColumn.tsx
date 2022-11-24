import { CSS, styled } from "../../theme";
import { ReactNode } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledSortIconWrapper, StyledTableColumn, StyledTableColumnContent, TableColumnVariantsProps } from "./tableColumn.styles";
import SortIcon from "./icons/SortIcon";
import { useTableContext } from "./tableContext";

interface Props {
    children?: ReactNode,
    uid?: string,
    sort?: boolean | ((a: ReactNode, b: ReactNode) => number),
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLTableCellElement>, keyof Props>;
type VariantsProps = Omit<TableColumnVariantsProps, keyof Props | 'clickable' | 'active'>;
export type TableColumnProps = Props & VariantsProps & { html?: HTMLProps};

const TableColumn = React.forwardRef<HTMLTableCellElement, TableColumnProps>(({
    children,
    css,
    html,
    sort,
    uid,
    ...props
}, ref) => {
    const { sortColumn } = useTableContext();
    const imperativeRef = useImperativeRef(ref);

    const isCurrentSortColumn = sortColumn?.key === uid;

    return (
        <StyledTableColumn
            ref={imperativeRef}
            css={css}
            clickable={Boolean(sort)}
            active={isCurrentSortColumn}
            {...html}
            {...props}
        >
            <StyledTableColumnContent>
                {children}
                {sort &&
                <StyledSortIconWrapper>
                    <SortIcon direction={isCurrentSortColumn ? sortColumn?.direction == 'ascending' ? 'top' : 'bottom' : 'none'}/>
                </StyledSortIconWrapper>
                }
            </StyledTableColumnContent>
        </StyledTableColumn>
    );
})

export default React.memo(TableColumn);