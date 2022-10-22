import { createReactiumTheme } from "./stitches.config";

const darkTheme = createReactiumTheme('dark', {
    colors: {
        background: "$black",
        backgroundAlpha: "rgba(0, 0, 0, 0.8)",
        foreground: "$white",
        foregroundAlpha: "rgba(255, 255, 255, 0.8)",
        text: "$white",
        link: "$blue600",
    },
    shadows: {
        md: "$mdLight",
    },
})

export default darkTheme;