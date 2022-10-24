import { useEffect, useState } from "react";

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

    const isOnTop = scrollY < 5;
    const isOnBottom = scrollY > maxY - windowHeight - 5;
    const isOnLeft = scrollX < 5;
    const isOnRight = scrollX > maxX - windowWidth - 5;

    return {
        scrollX,
        scrollY,
        isOnTop,
        isOnBottom,
        isOnLeft,
        isOnRight,
    };
}

export default function useScroll(
    isOnTopInit: boolean = false,
    isOnBottomInit: boolean = false,
    isOnLeftInit: boolean = false,
    isOnRightInit: boolean = false,
    onScroll?: (x: number, y: number) => void
    ) {
    const [isOnTop, setIsOnTop] = useState(isOnTopInit);
    const [isOnBottom, setIsOnBottom] = useState(isOnBottomInit);
    const [isOnLeft, setIsOnLeft] = useState(isOnLeftInit);
    const [isOnRight, setIsOnRight] = useState(isOnRightInit);

    const handleScroll = () => {
        const data = getScrollData();
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
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    useEffect(() => {
        handleScroll();
    }, [])

    return {
        isOnTop,
        isOnBottom,
        isOnLeft,
        isOnRight,
    };
} 