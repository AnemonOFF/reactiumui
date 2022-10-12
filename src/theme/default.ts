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
    letterSpacings: {},
    lineHeights: {},
    radii: {},
    sizes: {},
    shadows: {},
    space: {},
    colors: {
        ...defaultColors,
        background: "$white",
        foreground: "$black",
        text: "$black",
        link: "$blue600",
    },
}

export const defaultMedia = {
    xs: `(min-width: 650px)`,
    sm: `(min-width: 960px)`,
    md: `(min-width: 1280px)`,
    lg: `(min-width: 1400px)`,
    xl: `(min-width: 1920px)`,
    xsMin: `(min-width: 650px)`,
    smMin: `(min-width: 960px)`,
    mdMin: `(min-width: 1280px)`,
    lgMin: `(min-width: 1400px)`,
    xlMin: `(min-width: 1920px)`,
    xsMax: `(max-width: 650px)`,
    smMax: `(max-width: 960px)`,
    mdMax: `(max-width: 1280px)`,
    lgMax: `(max-width: 1400px)`,
    xlMax: `(max-width: 1920px)`,
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