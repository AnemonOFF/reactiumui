import { createReactiumTheme } from "./stitches.config";

const darkTheme = createReactiumTheme('dark', {
    colors: {
        background: "$black",
        foreground: "$white",
        text: "$white",
        link: "$blue600",
    },
    shadows: {
        xs: "0 2px 8px 1px rgb(0 0 0 / 0.07), 0 1px 1px -1px rgb(0 0 0 / 0.04)",
        sm: "0 2px 8px 2px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.04)",
        md: "0 12px 20px 6px rgb(0 0 0 / 0.08)",
        lg: "0 12px 34px 6px rgb(0 0 0 / 0.18)",
        xl: "0 25px 65px 0px rgb(0 0 0 / 0.35)",
      },
      dropShadows: {
        xs: "drop-shadow(0 2px 4px rgb(0 0 0 / 0.07)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.04))",
        sm: "drop-shadow(0 2px 8px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 4px rgb(0 0 0 / 0.04))",
        md: "drop-shadow(0 4px 12px rgb(0 0 0 / 0.08)) drop-shadow(0 20px 8px rgb(0 0 0 / 0.04))",
        lg: "drop-shadow(0 12px 24px rgb(0 0 0 / 0.15)) drop-shadow(0 12px 14px rgb(0 0 0 / 0.1))",
        xl: "drop-shadow(0 25px 34px rgb(0 0 0 / 0.35))",
    },
})

export default darkTheme;