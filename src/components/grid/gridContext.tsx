import React, { useCallback, useContext, useMemo, useState } from "react";

export type GridRowData = {
    uid: string,
    columns: number,
    columnGap: number,
    itemsUids: string[],
    fixedWidth: {[breakpoint: string]: number},
}

export type GridContextType = {
    gridColumns: number,
    gridRowGap: number,
    gridColumnGap: number,
    rows: GridRowData[],
    setRowData: (data: GridRowData) => void,
}

const defaultContext: GridContextType = {
    gridColumns: 0,
    gridRowGap: 0,
    gridColumnGap: 0,
    rows: [],
    setRowData: () => {},
}

export const GridContext = React.createContext<GridContextType>(defaultContext);
export const useGridContext = () => useContext(GridContext);

export type GridContextProviderProps = {
    children: React.ReactNode,
    columns: number,
    rowGap: number,
    columnGap: number,
}

const GridContextProvider: React.FunctionComponent<GridContextProviderProps> = ({
    children,
    columns,
    rowGap,
    columnGap,
}) => {
    const [rows, setRows] = useState<GridRowData[]>([]);

    const setRowData = useCallback((data: GridRowData) => {
        setRows(prev => [data, ...prev.filter(r => r.uid !== data.uid)]);
    }, []);

    const value = useMemo<GridContextType>(() => ({
        rows,
        setRowData,
        gridColumns: columns,
        gridRowGap: rowGap,
        gridColumnGap: columnGap,
    }), [columns, rows])

    return (
        <GridContext.Provider value={value}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContextProvider;