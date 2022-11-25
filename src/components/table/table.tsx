import { CSS } from "../../theme";
import { ReactNode, useMemo } from "react";
import { StyledTable, TableVariantsProps } from "./table.styles";
import React from "react";
import { useImperativeRef } from "../../utils/hooks";
import TableContext, { SelectType } from "./tableContext";

interface Props {
    children: ReactNode,
    hideCheckboxColumn?: boolean,
    select?: SelectType,
    selectedUids?: string[],
    defaultSelectedUids?: string[],
    onSelectChange?: (selectedUids: string[]) => void,
    css?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLTableElement>, keyof Props>;
type VariantsProps = Omit<TableVariantsProps, keyof Props | 'clickable'>;
export type TableProps = Props & VariantsProps & { html?: HTMLProps};

const Table = React.forwardRef<HTMLTableElement, TableProps>(({
    children,
    hideCheckboxColumn = false,
    select,
    selectedUids,
    defaultSelectedUids,
    onSelectChange,
    css,
    html,
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
            selectedUids={selectedUids}
            onSelectChange={onSelectChange}
            defaultSelectedUids={defaultSelectedUids}
            hideCheckboxColumn={select === 'multiple' ? hideCheckboxColumn : true}
            selectType={select}
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
        </TableContext>
    );
})

export default React.memo(Table);