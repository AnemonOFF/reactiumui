import type * as StitchesTypes from "@stitches/react";
import { createStitches } from '@stitches/react';
import defaultTheme from "./default";

export type DefaultThemes = 'light' | 'dark';

export type ReactiumTheme = {
    name: string,
    theme: ReturnType<typeof createTheme>
}

export const createReactiumTheme = (name: string, theme: Parameters<typeof createTheme>[0]) => {
    const reactiumTheme: ReactiumTheme = {
        name: name,
        theme: createTheme(theme)
    }
    return reactiumTheme;
}

export const {
    styled,
    css,
    getCssText,
    createTheme,
    globalCss,
    keyframes,
    reset,
    config,
    theme,
    prefix } = createStitches({
    ...defaultTheme,
    theme: {
        ...defaultTheme.theme,
    },
});

export type StitchesConfigType = typeof config;
export type VariantProps<T> = StitchesTypes.VariantProps<T>;
export type CSSProperties = StitchesTypes.CSSProperties;
export type CSS = StitchesTypes.CSS<StitchesConfigType>;
export type StitchesThemeType = typeof theme;

export type FontWeightsType = StitchesConfigType["theme"]["fontWeights"];
export type ColorsType = StitchesConfigType["theme"]["colors"];
export type BorderStylesType = StitchesConfigType["theme"]["borderStyles"];
export type FontSizesType = StitchesConfigType["theme"]["fontSizes"];
export type FontsType = StitchesConfigType["theme"]["fonts"];
export type LetterSpacingsType = StitchesConfigType["theme"]["letterSpacings"];
export type LineHeightsType = StitchesConfigType["theme"]["lineHeights"];
export type RadiiType = StitchesConfigType["theme"]["radii"];
export type SizesType = StitchesConfigType["theme"]["sizes"];
export type SpacesType = StitchesConfigType["theme"]["space"];
export type TransitionsType = StitchesConfigType["theme"]["transitions"];
export type ZIndicesType = StitchesConfigType["theme"]["zIndices"];
export type BreakpointsType = StitchesConfigType["theme"]["breakpoints"];

export type CSSFontSize = CSS["fontSize"];