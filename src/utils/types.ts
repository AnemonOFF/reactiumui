import { defaultTokens } from "../theme/default";

export const themedColors = ["background", "foreground", "primary", "secondary", "success", "warning", "error", "text", "link"] as const;
export const breakpoints = Object.keys(defaultTokens.breakpoints);
export const radii = Object.keys(defaultTokens.radii);
export const space = Object.keys(defaultTokens.space);

export type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch';
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
export type AlignContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly' | 'stretch';;
export type FlexDirection = 'column' | 'row' | 'row-reverse' | 'column-reverse';
export type Display = 'initial' | 'inherit' | 'block' | 'flex' | 'grid' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'ruby' | 'contents' | 'none' | 'list-item' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid';
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit';

export type ThemedColors = typeof themedColors[number];
export type Breakpoint = keyof typeof defaultTokens.breakpoints;
export type Radii = keyof typeof defaultTokens.radii;
export type Space = keyof typeof defaultTokens.space

export type NavbarWidth = Breakpoint | 'full';
