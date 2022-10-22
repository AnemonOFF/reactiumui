import { useEffect, useState } from "react";
import { Overflow } from "../types";

const overflows: { [id: symbol]: Overflow } = {};
const symbols: symbol[] = [];

const getLastSymbol = () => symbols[symbols.length - 1];

const setLastFromStack = () => {
    const lastOverflowSymbol = getLastSymbol();
    const lastOverflow = overflows[lastOverflowSymbol];
    document.body.style.overflow = lastOverflow ?? '';
}

const removeFromStack = (symbol: symbol) => {
    delete overflows[symbol];
    symbols.splice(symbols.indexOf(symbol), 1);
}

const addToStack = (symbol: symbol, overflow: Overflow) => {
    symbols.push(symbol);
    overflows[symbol] = overflow;
}

const useBodyOverflow = (initOverflow: Overflow | undefined = undefined) => {
    const [overflow, setOverflow] = useState<Overflow | undefined>(initOverflow);
    const [symbol, setSymbol] = useState<symbol>();

    useEffect(() => {
        if(overflow === undefined && symbol !== undefined) {
            removeFromStack(symbol);
            setLastFromStack();
            setSymbol(undefined);
        }
        if(overflow !== undefined && symbol !== undefined) {
            overflows[symbol] = overflow;
            if(getLastSymbol() === symbol)
                setLastFromStack();
        }
        if(overflow !== undefined && symbol === undefined) {
            const newSymbol = Symbol();
            setSymbol(newSymbol);
            addToStack(newSymbol, overflow);
            setLastFromStack();
        }
    }, [overflow])

    return setOverflow;
}

export default useBodyOverflow;