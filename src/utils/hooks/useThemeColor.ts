import { useMemo } from "react";
import { themedColors } from "../types";

const useThemeColor = (color: string | undefined, defaultColor: string = "$colors$text") => {
    return useMemo(() => {
        if(color === undefined)
            return undefined;
        if(color == "default")
            return defaultColor;
        if(themedColors.find((el) => el == color) !== undefined) {
            return `$colors$${color}`;
        }
        return color;
    }, [color, defaultColor]);
}

export default useThemeColor;