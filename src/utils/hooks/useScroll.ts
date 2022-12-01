import React, { useEffect, useState } from "react";

const inaccuracy = 5;

function getScrollData() {
    const { scrollX, scrollY } = window;

    const maxY = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    const windowHeight = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const windowWidth = Math.max(
        window.innerWidth,
        document.documentElement.clientWidth
    );

    const maxX = Math.max(
        document.body.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.scrollWidth,
        document.documentElement.offsetWidth
    );

    const isOnTop = scrollY < inaccuracy;
    const isOnBottom = scrollY > maxY - windowHeight - inaccuracy;
    const isOnLeft = scrollX < inaccuracy;
    const isOnRight = scrollX > maxX - windowWidth - inaccuracy;

    return {
        scrollX,
        scrollY,
        isOnTop,
        isOnBottom,
        isOnLeft,
        isOnRight,
    };
}

function getCustomElementScrollData(customElement: React.RefObject<HTMLElement>) {
    const element = customElement.current!;
    const scrollY = element.scrollTop;
    const scrollX = element.scrollLeft;
    const elementHeight = element.clientHeight;
    const elementWidth = element.clientWidth;

    const isOnTop = scrollY < inaccuracy;
    const isOnBottom = scrollY > element.scrollHeight - elementHeight - inaccuracy;
    const isOnLeft = scrollX < inaccuracy;
    const isOnRight = scrollX > element.scrollWidth - elementWidth - inaccuracy;

    return {
        scrollX,
        scrollY,
        isOnTop,
        isOnBottom,
        isOnLeft,
        isOnRight,
    }
}

export default function useScroll(
    isOnTopInit: boolean = false,
    isOnBottomInit: boolean = false,
    isOnLeftInit: boolean = false,
    isOnRightInit: boolean = false,
    onScroll?: (x: number, y: number) => void,
    customElement?: React.RefObject<HTMLElement>,
    ) {
    const [isOnTop, setIsOnTop] = useState(isOnTopInit);
    const [isOnBottom, setIsOnBottom] = useState(isOnBottomInit);
    const [isOnLeft, setIsOnLeft] = useState(isOnLeftInit);
    const [isOnRight, setIsOnRight] = useState(isOnRightInit);

    const handleScroll = () => {
        const data = customElement ? getCustomElementScrollData(customElement) : getScrollData();
        if(onScroll)
            onScroll(data.scrollX, data.scrollY);
        if (isOnTop != data.isOnTop)
            setIsOnTop(data.isOnTop);
        if (isOnBottom != data.isOnBottom)
            setIsOnBottom(data.isOnBottom);
        if (isOnRight != data.isOnRight)
            setIsOnRight(data.isOnRight);
        if (isOnLeft != data.isOnLeft)
            setIsOnLeft(data.isOnLeft);
    };

    useEffect(() => {
        handleScroll();
        if(customElement) {
            const element = customElement.current;
            if(element === null)
                throw new Error("Current of ref, provided in useScroll hook, is null");
            element.addEventListener("scroll", handleScroll);
            return () => element.removeEventListener("scroll", handleScroll);
        }
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    return {
        isOnTop,
        isOnBottom,
        isOnLeft,
        isOnRight,
    };
} 