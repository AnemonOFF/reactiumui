import { CSS, styled } from "../../theme";
import { ReactNode, useEffect, useRef } from "react";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import { StyledSortIconWrapper, StyledTableColumn, StyledTableColumnContent, StyledTableColumnResizer, TableColumnVariantsProps } from "./tableColumn.styles";
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
    const { sortColumn, isResizableColumns } = useTableContext();
    const imperativeRef = useImperativeRef(ref);
    const resizerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!resizerRef?.current || !imperativeRef?.current)
            return;
        
        let cursorX = 0;
        let oldWidth = 0;
        const resizer = resizerRef.current;
        const resizable = imperativeRef.current;

        const mouseMoveHandler = (e: MouseEvent) => {
            e.stopPropagation();
            const newWidth = oldWidth - (cursorX - e.screenX);
            cursorX = e.screenX;
            oldWidth = newWidth;
            resizable.style.width = `${newWidth}px`;
        }

        const mouseUpHandler = (e: MouseEvent) => {
            e.stopPropagation();
            window.removeEventListener('mousemove', mouseMoveHandler);
            resizer.style.opacity = '';
        }

        const mouseDownHandler = (e: MouseEvent) => {
            e.stopPropagation();
            resizer.style.opacity = '1';
            cursorX = e.screenX;
            oldWidth = parseFloat(getComputedStyle(resizable).getPropertyValue('width').replace('px', ''));
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('mouseup', mouseUpHandler)
        }

        const stopPropagation = (e: MouseEvent) => e.stopPropagation();

        resizer.addEventListener('click', stopPropagation);
        resizer.addEventListener('mousedown', mouseDownHandler);
        return () => {
            resizer.removeEventListener('click', stopPropagation);
            resizer.removeEventListener('mousedown', mouseDownHandler);
        }
    }, [resizerRef, imperativeRef])

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
            {isResizableColumns && <StyledTableColumnResizer ref={resizerRef} />}
        </StyledTableColumn>
    );
})

export default React.memo(TableColumn);