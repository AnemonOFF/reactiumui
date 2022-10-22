import { createReactiumTheme } from "./stitches.config";

const lightTheme = createReactiumTheme('light', {
    colors: {
        background: "$white",
        backgroundAlpha: "rgba(255, 255, 255, 0.8)",
        foreground: "$black",
        foregroundAlpha: "rgba(0, 0, 0, 0.8)",
        text: "$black",
        link: "$blue600",
    },
    shadows: {
        md: "$mdDark",
    },
});

export default lightTheme;