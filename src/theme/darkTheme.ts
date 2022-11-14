import { createReactiumTheme } from "./stitches.config";

const darkTheme = createReactiumTheme('dark', {
    colors: {
        background: "$black",
        backgroundAlpha: "rgba(0, 0, 0, 0.8)",
        backgroundAccent: "$grayDark200",
        backgroundAccentAlpha: "rgba(43, 47, 49, 0.8)",
        foreground: "$white",
        foregroundAlpha: "rgba(255, 255, 255, 0.8)",
        foregroundAccent: "$gray200",
        foregroundAccentAlpha: "rgba(230, 232, 235, 0.8)",
        text: "$white",
        link: "$blue600",
    },
    shadows: {
        md: "0px 0px 25px 0px rgba(255, 255, 255, 0.15)",
    },
    dropShadows: {
        md: "drop-shadow(0 0px 25px rgba(255, 255, 255, 0.15))",
    }
})

export default darkTheme;