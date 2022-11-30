import { CSS } from "../../theme";
import { ReactNode, useMemo } from "react";
import { StyledTable, StyledTableWrapper, TableVariantsProps, TableWrapperVariantsProps } from "./table.styles";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import TableContext, { SelectType } from "./tableContext";

export type OnLoadMoreEvent = (rowsPerPage: number, page: number) => Promise<{ rows: ReactNode, totalRowsCount: number }>;

interface Props {
    children: ReactNode,
    hideCheckboxColumn?: boolean,
    select?: SelectType,
    selectedUids?: string[],
    resizableColumns?: boolean,
    defaultSelectedUids?: string[],
    onSelectChange?: (selectedUids: string[]) => void,
    rowsPerPage?: number,
    onLoadMore?: OnLoadMoreEvent,
    totalRows?: number,
    css?: CSS,
    wrapperCss?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLTableElement>, keyof Props>;
type VariantsProps = Omit<TableVariantsProps, keyof Props | 'clickable'>;
type WrapperVarinatsProps = Omit<TableWrapperVariantsProps, keyof Props>;
export type TableProps = Props & VariantsProps & WrapperVarinatsProps & { html?: HTMLProps};

const Table = React.forwardRef<HTMLTableElement, TableProps>(({
    children,
    hideCheckboxColumn = false,
    select,
    selectedUids,
    defaultSelectedUids,
    onSelectChange,
    resizableColumns = false,
    css,
    wrapperCss,
    html,
    rowsPerPage,
    totalRows,
    onLoadMore,
    bordered,
    cloud,
    blur,
    type,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const customProps = useMemo(() => {
        const result: typeof props =  {
            hoverable: select !== undefined ? true : props.hoverable,
            ...props
        }
        return result;
    }, [props, select])

    return (
        <TableContext
            isResizableColumns={resizableColumns}
            selectedUids={selectedUids}
            onSelectChange={onSelectChange}
            defaultSelectedUids={defaultSelectedUids}
            hideCheckboxColumn={select === 'multiple' ? hideCheckboxColumn : true}
            selectType={select}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onLoadMore={onLoadMore}
        >
            <StyledTableWrapper
                bordered={bordered}
                cloud={cloud}
                css={wrapperCss}
                blur={blur}
                type={type}
            >
                <StyledTable
                    ref={imperativeRef}
                    css={css}
                    clickable={select !== undefined}
                    {...html}
                    {...customProps}
                >
                    {children}
                </StyledTable>
            </StyledTableWrapper>
        </TableContext>
    );
})

export default React.memo(Table);