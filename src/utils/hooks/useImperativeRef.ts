import { Ref, RefObject, useImperativeHandle, useRef } from "react";

const useImperativeRef = <T extends HTMLElement = HTMLElement>(ref?: RefObject<T | null> | Ref<T | null>) => {
    const resultRef = useRef<T>(null);
    useImperativeHandle(ref, () => resultRef.current);
    return resultRef;
}

export default useImperativeRef;