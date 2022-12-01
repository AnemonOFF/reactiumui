import React, { ReactElement, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { OnLoadMoreEvent } from "./table";

export type RowData = {
    element: ReactElement,
}

export type SortColumn = {
    key: string | number,
    direction: 'ascending' | 'descending',
} | undefined;

type SortFunc = ((rows: RowData[]) => ReactElement[]) | undefined;
export type SelectType = 'single' | 'multiple' | undefined;

export type TableContextType = {
    setSort: React.Dispatch<React.SetStateAction<SortFunc>>,
    setSortColumn: React.Dispatch<React.SetStateAction<SortColumn>>,
    selectedRows: string[],
    toggleRowSelect: (uid: string) => void,
    hideCheckboxColumn: boolean,
    disabledKeys: string[],
    setDisableKey: (uid: string, disable: boolean) => void,
    isResizableColumns: boolean,
    page: number,
    setPage: (page: number) => void,
    setRowsPerPage: (count: number) => void,
    isLoading: boolean,
    isInfinityScroll?: boolean,
    loadedPageRows?: ReactNode,
    rowsPerPage?: number,
    totalRows?: number,
    selectType?: SelectType,
    sort?: SortFunc,
    sortColumn?: SortColumn,
}

const defaultContext: TableContextType = {
    setSort: () => {},
    setSortColumn: () => {},
    selectedRows: [],
    toggleRowSelect: () => {},
    hideCheckboxColumn: true,
    disabledKeys: [],
    setDisableKey: () => {},
    isResizableColumns: false,
    page: 1,
    setPage: () => {},
    setRowsPerPage: () => {},
    isLoading: true,
};

export const TableContext = React.createContext<TableContextType>(defaultContext);
export const useTableContext = () => useContext(TableContext);

export type TableContextProviderProps = {
    children: ReactNode,
    hideCheckboxColumn: boolean,
    isResizableColumns: boolean,
    page: number,
    setPage: (page: number) => void,
    setTotalRows: (totalRows: number) => void,
    totalRows?: number,
    rowsPerPage?: number,
    onLoadMore?: OnLoadMoreEvent,
    infinityScroll?: boolean,
    selectedUids?: string[],
    onSelectChange?: (selectedUids: string[]) => void,
    selectType?: SelectType,
    defaultSelectedUids?: string[],
}

const TableContextProvider: React.FunctionComponent<TableContextProviderProps> = ({
    children,
    defaultSelectedUids,
    selectedUids,
    onSelectChange,
    isResizableColumns,
    page,
    setPage,
    rowsPerPage: propRowsPerPage,
    totalRows,
    setTotalRows,
    onLoadMore,
    infinityScroll,
    hideCheckboxColumn: propHideCheckbox,
    selectType: propSelectType,
}) => {
    const [sort, setSort] = useState<(rows: RowData[]) => ReactElement[]>();
    const [sortColumn, setSortColumn] = useState<SortColumn>();
    const [selectType, setSelectType] = useState<SelectType>(propSelectType);
    const [selectedRows, setSelectedRows] = useState<string[]>(defaultSelectedUids ?? []);
    const [disabledKeys, setDisabledKeys] = useState<string[]>([]);
    const [hideCheckboxColumn, setHideCheckboxColumn] = useState<boolean>(propHideCheckbox);
    const [loadedPageRows, setLoadedPageRows] = useState<ReactNode[]>();
    const [rowsPerPage, setRowsPerPage] = useState<number | undefined>(propRowsPerPage);
    const [isLoading, setIsLoading] = useState<boolean>(onLoadMore !== undefined ? true : false);

    useEffect(() => {
        setSelectType(propSelectType);
    }, [propSelectType])

    useEffect(() => {
        setHideCheckboxColumn(propHideCheckbox);
    }, [propHideCheckbox])

    useEffect(() => {
        if(selectedUids)
            setSelectedRows(selectedUids);
    }, [selectedUids])

    useEffect(() => {
        if(!onLoadMore)
            return;
        if(!rowsPerPage)
            throw new Error('Since you are using onLoadMore to paginate table, rowsPerPage prop is required');
        setIsLoading(true);
        onLoadMore(rowsPerPage, page)
            .then(data => {
                setTotalRows(data.totalRowsCount);
                setLoadedPageRows(old => {
                    old = old ?? [];
                    return infinityScroll ? [...old, ...data.rows] : data.rows;
                });
                setIsLoading(false);
            })
            .catch(console.error);
    }, [page])

    const toggleRowSelect = useCallback((uid: string) => {
        if(onSelectChange !== undefined)
        {
            if(selectType === 'multiple')
                onSelectChange(selectedRows.find(ruid => ruid === uid) === undefined ? [uid, ...selectedRows] : selectedRows.filter(ruid => ruid !== uid));
            else if (selectType === 'single')
                onSelectChange(selectedRows.find(ruid => ruid === uid) === undefined ? [uid] : []);
            if(selectedUids !== undefined)
                return;
        }
        if(selectType === 'multiple')
            setSelectedRows(prev => prev.find(ruid => ruid === uid) === undefined ? [uid, ...prev] : prev.filter(ruid => ruid !== uid));
        else if (selectType === 'single')
            setSelectedRows(prev => prev.find(ruid => ruid === uid) === undefined ? [uid] : []);
    }, [selectType, onSelectChange, selectedRows, selectedUids]);

    const setDisableKey = useCallback((uid: string, disable: boolean) => {
        setDisabledKeys(prev => disable ? [uid, ...prev] : prev.filter(ruid => ruid !== uid));
    }, []);

    const value = useMemo<TableContextType>(() => ({
        sort,
        setSort,
        sortColumn,
        setSortColumn,
        selectType,
        selectedRows,
        toggleRowSelect,
        hideCheckboxColumn,
        disabledKeys,
        setDisableKey,
        isResizableColumns,
        page,
        setPage,
        rowsPerPage,
        totalRows,
        loadedPageRows,
        setRowsPerPage,
        isLoading,
        isInfinityScroll: infinityScroll,
    }), [sort, sortColumn, selectType, selectedRows, hideCheckboxColumn, disabledKeys, isResizableColumns, page, rowsPerPage, totalRows, loadedPageRows, isLoading, infinityScroll]);

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
}

export default TableContextProvider;