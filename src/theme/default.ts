import type * as StitchesTypes from "@stitches/react";
import { defaultThemeMap as defaultStitchesThemeMap } from "@stitches/react";
import colors from "./colors";

export const defaultColors = {
    white: "#ffffff",
    black: "#000000",
    ...colors,

    primary: "$blue600",
    primaryBorder: "$blue500",
    primaryBorderHover: "$blue700",
    primaryShadow: "$blue500",

    secondary: "$purple600",
    secondaryBorder: "$purple500",
    secondaryBorderHover: "$purple700",
    secondaryShadow: "$purple500",

    disable: "$gray600",
    disableBorder: "$gray500",
    disableBorderHover: "$gray700",
    disableShadow: "$gray500",

    success: "$green600",
    successBorder: "$green500",
    successBorderHover: "$green700",
    successShadow: "$green500",

    warning: "$yellow600",
    warningBorder: "$yellow500",
    warningBorderHover: "$yellow700",
    warningShadow: "$yellow500",

    error: "$red600",
    errorBorder: "$red500",
    errorBorderHover: "$red700",
    errorShadow: "$red500",
}

export const defaultTokens = {
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    zIndices: {
        auto: "auto",
        min: "-1",
        0: "0",
        1: "100",
        2: "200",
        3: "300",
        4: "400",
        5: "500",
        6: "600",
        7: "700",
        8: "800",
        9: "900",
        10: "1000",
        max: "9999"
    },
    borderWidths: {
        thin: "1px",
        normal: "2px",
        bold: "3px",
        extrabold: "4px",
        black: "5px"
    },
    transitions: {
        default: "all .2 linear"
    },
    fontSizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        default: "1rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        xxl: "1.5rem",
        xxxl: "2rem"
    },
    borderStyles: {},
    fonts: {},
    letterSpacings: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
    },
    lineHeights: {
        xs: 1,
        sm: 1.25,
        default: 1.5,
        md: 1.5,
        lg: 1.75,
        xl: 2,
        "2xl": 2.25,
        "3xl": 2.5,
        "4xl": 3,
    },
    radii: {
        xs: "7px",
        sm: "9px",
        md: "12px",
        base: "14px",
        lg: "14px",
        xl: "18px",
        xxl: "24px",
        "3xl": "32px",
        squared: "33%",
        rounded: "50%",
        pill: "9999px",
    },
    sizes: {},
    shadows: {
        mdDark: "0px 0px 25px 0px rgba(0, 0, 0, 0.15)",
        mdLight: "0px 0px 25px 0px rgba(255, 255, 255, 0.15)",
        md: "$mdDark",
    },
    space: {
        xxs: "0.5rem",
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        xxl: "1.5rem",
        "3xl": "2rem",
        "4xl": "3rem",
        "5xl": "5rem",
        "6xl": "10rem",
        "7xl": "14rem",
        "8xl": "18rem",
        "9xl": "24rem",
        "10xl": "32rem",
        "11xl": "40rem",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        screenWidth: "100vw",
        full: "100%",
    },
    colors: {
        ...defaultColors,
        background: "$white",
        backgroundAlpha: "rgba(255, 255, 255, 0.8)",
        backgroundAccent: "$gray200",
        backgroundAccentAlpha: "rgba(230, 232, 235, 0.8)",
        foreground: "$black",
        foregroundAlpha: "rgba(0, 0, 0, 0.8)",
        foregroundAccent: "$grayDark200",
        foregroundAccentAlpha: "rgba(43, 47, 49, 0.8)",
        accent: "$gray700",
        accentAlpha: "rgba(126, 134, 140, 0.8)",
        text: "$black",
        link: "$blue600",
        border: "rgba(127, 127, 127, 0.5)",
    },
    breakpoints: {
        xs: "650px",
        sm: "960px",
        md: "1280px",
        lg: "1400px",
        xl: "1920px",
    }
}

export const defaultMedia = {
    xs: `(min-width: ${defaultTokens.breakpoints.xs})`,
    sm: `(min-width: ${defaultTokens.breakpoints.sm})`,
    md: `(min-width: ${defaultTokens.breakpoints.md})`,
    lg: `(min-width: ${defaultTokens.breakpoints.lg})`,
    xl: `(min-width: ${defaultTokens.breakpoints.xl})`,
    xsMin: `(min-width: ${defaultTokens.breakpoints.xs})`,
    smMin: `(min-width: ${defaultTokens.breakpoints.sm})`,
    mdMin: `(min-width: ${defaultTokens.breakpoints.md})`,
    lgMin: `(min-width: ${defaultTokens.breakpoints.lg})`,
    xlMin: `(min-width: ${defaultTokens.breakpoints.xl})`,
    xsMax: `(max-width: ${defaultTokens.breakpoints.xs})`,
    smMax: `(max-width: ${defaultTokens.breakpoints.sm})`,
    mdMax: `(max-width: ${defaultTokens.breakpoints.md})`,
    lgMax: `(max-width: ${defaultTokens.breakpoints.lg})`,
    xlMax: `(max-width: ${defaultTokens.breakpoints.xl})`,
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
};

export const defaultUtils = {
    p: (value: StitchesTypes.PropertyValue<"padding">) => ({
        padding: value,
    }),
    pt: (value: StitchesTypes.PropertyValue<"paddingTop">) => ({
        paddingTop: value,
    }),
    pr: (value: StitchesTypes.PropertyValue<"paddingRight">) => ({
        paddingRight: value,
    }),
    pl: (value: StitchesTypes.PropertyValue<"paddingLeft">) => ({
        paddingLeft: value,
    }),
    px: (value: StitchesTypes.PropertyValue<"padding">) => ({
        paddingLeft: value,
        paddingRight: value,
    }),
    py: (value: StitchesTypes.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
    }),
    m: (value: StitchesTypes.PropertyValue<"margin">) => ({
        margin: value,
    }),
    mt: (value: StitchesTypes.PropertyValue<"marginTop">) => ({
        marginTop: value,
    }),
    mr: (value: StitchesTypes.PropertyValue<"marginRight">) => ({
        marginRight: value,
    }),
    ml: (value: StitchesTypes.PropertyValue<"marginLeft">) => ({
        marginLeft: value,
    }),
    mx: (value: StitchesTypes.PropertyValue<"margin">) => ({
        marginLeft: value,
        marginRight: value,
    }),
    my: (value: StitchesTypes.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
    }),
    bgColor: (value: StitchesTypes.PropertyValue<"backgroundColor">) => ({
        backgroundColor: value
    }),
    bg: (value: StitchesTypes.PropertyValue<"background">) => ({
        background: value
    }),
    bgBlur: (value: StitchesTypes.PropertyValue<"background">) => ({
        backdropFilter: "saturate(180%) blur(10px)",
        bg: value
    }),
    size: (value: StitchesTypes.PropertyValue<"width">) => ({
        width: value,
        height: value
    }),
    minSize: (value: StitchesTypes.PropertyValue<"width">) => ({
        minWidth: value,
        minHeight: value
    }),
    maxSize: (value: StitchesTypes.PropertyValue<"width">) => ({
        maxWidth: value,
        maxHeight: value
    }),
    linearGradient: (value: StitchesTypes.PropertyValue<"backgroundImage">) => ({
        backgroundImage: `linear-gradient(${value})`,
    }),
    textGradient: (value: StitchesTypes.PropertyValue<"backgroundImage">) => ({
        backgroundImage: `linear-gradient(${value})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        "&::selection": {
            WebkitTextFillColor: "$colors$text",
        },
    }),
    scale: (value: StitchesTypes.PropertyValue<"scale">) => ({
        transform: `scale(${value})`,
    }),
    shadow: (value: StitchesTypes.PropertyValue<"boxShadow">) => ({
        boxShadow: value,
    }),
    defaultShadow: (value: StitchesTypes.PropertyValue<"color">) => ({
        boxShadow: `0px 0px 15px 3px ${value}`,
    }),
}

export const defaultThemeMap = {
    ...defaultStitchesThemeMap
}

export default {
    prefix: "reactiumui",
    theme: defaultTokens,
    media: defaultMedia,
    utils: defaultUtils,
    themeMap: defaultThemeMap,
}