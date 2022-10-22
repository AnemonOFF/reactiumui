import React, { useContext } from "react";

export type CollapseContextType = {
    isOpened: boolean,
    setIsOpened: (value: boolean) => void
}

export const CollapseContext = React.createContext<CollapseContextType | undefined>(undefined);

export interface CollapseProviderProps {
    children?: React.ReactNode,
}

const CollapseProvider: React.FunctionComponent<CollapseProviderProps> = ({ children }) => {
    const [isOpened, setIsOpened] = React.useState<boolean>(false);

    return (
        <CollapseContext.Provider value={{isOpened, setIsOpened}}>
            {children}
        </CollapseContext.Provider>
    );
}

export const useCollapse = (): CollapseContextType => {
    const context = useContext(CollapseContext);
    if(context === undefined)
        throw new Error("Context is undefined. Are you set CollapseProvider?");
    return {
        isOpened: context.isOpened,
        setIsOpened: context.setIsOpened
    };
}

export default CollapseProvider;
