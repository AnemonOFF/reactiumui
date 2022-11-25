import { CSS } from "../../theme";
import { ReactElement, ReactNode, useCallback, useMemo } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledTableHeader, TableHeaderVariantsProps } from "./tableHeader.styles";
import { StyledTableRow } from "./tableRow.styles";
import { RowData, useTableContext } from "./tableContext";
import TableCell from "./tableCell";
import TableColumn from "./tableColumn";

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
    const { setSort, sortColumn, setSortColumn, hideCheckboxColumn } = useTableContext();
    const imperativeRef = useImperativeRef(ref);

    const onColumnClick = useCallback((column: ReactElement, index: number) => {
        const key = column.props.uid ?? index;
        if(sortColumn?.key === key && sortColumn?.direction === 'descending') {
            setSort(undefined);
            setSortColumn(undefined);
            return;
        }
        const currentDirection = sortColumn?.key === key ? sortColumn?.direction : undefined;
        const direction = currentDirection === undefined ? 'ascending' : 'descending';
        setSort(() => (rows: RowData[]) => (
            rows.sort((a, b) => {
                const aCell = a.element.props.children[index];
                const bCell = b.element.props.children[index];
                if(!aCell || !bCell || aCell.type !== TableCell || bCell.type !== TableCell)
                    throw new Error('TableRow children must be of type TableCell');
                const aCellChildren = aCell.props.children;
                const bCellChildren = bCell.props.children;
                let result: number;
                if(Boolean(column.props.sort) && typeof column.props.sort === 'function')
                    result = column.props.sort(aCellChildren, bCellChildren);
                else if(aCellChildren === bCellChildren)
                    return 0;
                else result = aCellChildren < bCellChildren ? -1 : 1;
                return direction == 'ascending' ? result : (-1) * result;
            }).map(r => r.element)
        ));
        setSortColumn({
            key: key,
            direction: direction,
        });
    }, [sortColumn]);

    children = useMemo(() => (
        React.Children.map(children, (child, index) => {
            if(!React.isValidElement(child) || child.type !== TableColumn)
                throw new Error('TableHeader children must be valid react elements of TableColumn type');
            const childProps = {
                uid: child.props.uid ?? index,
                html: {
                    onClick: (e: React.MouseEvent<HTMLTableCellElement>) => {
                        if(Boolean(child.props.sort))
                            onColumnClick(child, index);
                        if(child.props.html?.onClick)
                            child.props.html.onClick(e);
                    },
                    ...child.props.html
                },
                ...child.props,
            };
            return React.cloneElement(child, childProps);
        })
    ), [children, onColumnClick])

    return (
        <StyledTableHeader
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            <StyledTableRow>
                {!hideCheckboxColumn &&
                <TableColumn>
                    {/* TODO: Create general input button */}
                </TableColumn>
                }
                {children}
            </StyledTableRow>
            <StyledTableRow css={{height: spaceToBody}} />
        </StyledTableHeader>
    );
})

export default React.memo(TableHeader);