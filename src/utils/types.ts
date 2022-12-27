import { defaultTokens } from "../theme/default";

export const themedColors = Object.keys(defaultTokens.colors);
export const breakpoints = Object.keys(defaultTokens.breakpoints);
export const radii = Object.keys(defaultTokens.radii);
export const space = Object.keys(defaultTokens.space);
export const borderWidth = Object.keys(defaultTokens.borderWidths);
export const fontSize = Object.keys(defaultTokens.fontSizes);
export const fontWeight = Object.keys(defaultTokens.fontWeights);

export type HTMLTarget = '_blank' | '_self' | '_parent' | '_top';

export type GlobalValues = 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer';
export type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch' | GlobalValues;
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | GlobalValues;
export type AlignContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch' | GlobalValues;
export type FlexDirection = 'column' | 'row' | 'row-reverse' | 'column-reverse' | GlobalValues;
export type Display = 'block' | 'flex' | 'grid' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'ruby' | 'contents' | 'none' | 'list-item' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid' | GlobalValues;
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues
export type Position = 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static' | GlobalValues;
export type ListStyleType = 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'georgian' | 'trad-chinese-informal' | 'kannada' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-latin' | 'upper-latin' | 'arabic-indic' | 'ethiopic-numeric' | 'none' | GlobalValues;

export type ThemedColors = keyof typeof defaultTokens.colors;
export type Breakpoint = keyof typeof defaultTokens.breakpoints;
export type Radii = keyof typeof defaultTokens.radii;
export type Space = keyof typeof defaultTokens.space;
export type BorderWidth = keyof typeof defaultTokens.borderWidths;
export type FontSize = keyof typeof defaultTokens.fontSizes;
export type FontWeight = keyof typeof defaultTokens.fontWeights;

export type NavbarWidth = Breakpoint | 'full';
