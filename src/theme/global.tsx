import React from "react";
import { getCssText, globalCss } from "./stitches.config";

export const globalStyles = globalCss({
    '*, *:before, *:after': {
        boxSizing: 'border-box',
    },
    html: {
        lineHeight: '1.15',
        '-webkit-text-size-adjust': '100%'
    },
    body: {
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        color: '$foreground',
        backgroundColor: '$background'
    },
    main: {
        display: 'block'
    },
    h1: {
        margin: 0
    },
    hr: {
        boxSizing: 'border-box'
    },
    a: {
        textDecoration: 'none',
        backgroundColor: 'transparent'
    },
    'abbr[title]': {
        borderBottom: 'none',
        textDecoration: 'underline dotted',
    },
    'b, strong': {
        fontWeight: 'bold'
    },
    'sub, sup': {
        lineHeight: 0,
        position: 'relative',
        verticalAlign: 'baseline'
    },
    sub: {
        bottom: '-0.25em'
    },
    sup: {
        top: '-0.5em'
    },
    img: {
        borderStyle: 'none'
    },
    'button, input, optgroup, select, textarea': {
        margin: 0
    },
    'button, input': {
        overflow: "visible",
        outline: 0
    },
    'button, select': {
        textTransform: 'none'
    },
    'button, [type="button"], [type="reset"], [type="submit"]': {
        '-webkit-appearance': 'button'
    },
    'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner': {
        borderStyle: 'none',
        padding: 0
    },
    'button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring': {
        outline: '1px dotted ButtonText'
    },
    legend: {
        boxSizing: 'border-box',
        color: 'inherit',
        display: 'table',
        maxWidth: '100%',
        padding: 0,
        whiteSpace: 'normal'
    },
    textarea: {
        overflow: 'auto'
    },
    '[type="checkbox"], [type="radio"]': {
        boxSizing: 'border-box',
        padding: 0
    },
    '[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button': {
        height: 'auto'
    },
    '[type="search"]': {
        '-webkit-appearance': 'textfield',
        outlineOffset: '-2px'
    },
    '[type="search"]::-webkit-search-decoration': {
        '-webkit-appearance': 'none'
    },
    '::-webkit-file-upload-button': {
        '-webkit-appearance': 'button',
        font: 'inherit'
    },
    details: {
        display: 'block'
    },
    summary: {
        display: 'list-item'
    },
    template: {
        display: 'none'
    },
    '[hidden]': {
        display: 'none'
    }
});

export const Globals: React.FunctionComponent = () => {
    globalStyles();
    return <></>;
}

export const cssTextStyle = () => {
    return <style id="stitches" dangerouslySetInnerHTML={{__html: getCssText()}} />
}