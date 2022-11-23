import React, { ReactElement, ReactNode, useContext, useMemo, useState } from "react";

export type RowData = {
    element: ReactElement,
}

export type SortColumn = {
    key: string | number,
    direction: 'ascending' | 'descending',
} | undefined;

type SortFunc = ((rows: RowData[]) => ReactElement[]) | undefined;

export type TableContextType = {
    setSort: React.Dispatch<React.SetStateAction<SortFunc>>,
    setSortColumn: React.Dispatch<React.SetStateAction<SortColumn>>,
    sort?: SortFunc,
    sortColumn?: SortColumn,
}

const defaultContext: TableContextType = {
    setSort: () => {},
    setSortColumn: () => {},
};

export const TableContext = React.createContext<TableContextType>(defaultContext);
export const useTableContext = () => useContext(TableContext);

export type TableContextProviderProps = {
    children: ReactNode,
}

const TableContextProvider: React.FunctionComponent<TableContextProviderProps> = ({
    children,
}) => {
    const [sort, setSort] = useState<(rows: RowData[]) => ReactElement[]>();
    const [sortColumn, setSortColumn] = useState<SortColumn>();

    const value = useMemo<TableContextType>(() => ({
        sort,
        setSort,
        sortColumn,
        setSortColumn,
    }), [sort, sortColumn]);

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
}

export default TableContextProvider;