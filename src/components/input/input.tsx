import React, { useMemo, useRef, useState } from "react";
import { CSS } from "../../theme";
import { borderWidth, BorderWidth, fontSize, FontSize, fontWeight, FontWeight, space, Space, ThemedColors, useImperativeRef, useThemeColor } from "../../utils";
import { InputVariantsProps, StyledInput, StyledInputAddon, StyledInputGroup, StyledInputLabel } from "./input.styles";

interface Props {
    children?: React.ReactNode,
    prefix?: string | React.ReactNode,
    postfix?: string | React.ReactNode,
    label?: string,
    color?: ThemedColors | "default" | string,
    textColor?: ThemedColors | "default" | string,
    size?: Space | number | string,
    iconSize?: number | string,
    fontSize?: FontSize | number | string,
    fontWeight?: FontWeight | number,
    borderWidth?: BorderWidth | number | string,
    placeholder?: string,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLInputElement>, keyof Props>;
type VariantsProps = Omit<InputVariantsProps, keyof Props>;
export type InputProps = Props & VariantsProps & { html?: HTMLProps };

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    children,
    css,
    html,
    prefix,
    postfix,
    label,
    size: propSize,
    iconSize,
    fontSize: propFontSize,
    borderWidth: propBorderWidth,
    fontWeight: propFontWeight,
    color: propColor,
    textColor: propTextColor,
    placeholder,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const color = useThemeColor(propColor);
    const textColor = useThemeColor(propTextColor);
    const imperativeRef = useImperativeRef(ref);

    const labelCss = useMemo(() => {
        const result: CSS = {};
        if (color) {
            result['$$inputColor'] = color;
            result['$$inputTextColor'] = color;
        }
        if (textColor) {
            result['$$inputTextColor'] = textColor;
        }
        if (propSize) {
            if (space.find(el => el === propSize) !== undefined) {
                const spaceIndex = space.indexOf(propSize as string);
                result['$$inputXSpace'] = `$space$${propSize}`;
                result['$$inputYSpace'] = spaceIndex > 0 ? `$space$${space[spaceIndex - 1]}` : '0px';
            }
            else {
                const cssPropSize = typeof propSize === 'number' ? `${propSize}px` : propSize;
                result['$$inputXSpace'] = cssPropSize;
                result['$$inputYSpace'] = `calc(${cssPropSize} / 2)`;
            }
        }
        if (propFontSize) {
            if (fontSize.find(el => el === propFontSize) !== undefined)
                result['$$inputFontSize'] = `$fontSizes$${propFontSize}`;
            else
                result['$$inputFontSize'] = typeof propFontSize === 'number' ? `${propFontSize}px` : propFontSize;
        }
        if (propFontWeight) {
            if (fontWeight.find(el => el === propFontWeight) !== undefined)
                result['$$inputFontWeight'] = `$fontWeights$${propFontWeight}`;
            else
                result['$$inputFontWeight'] = propFontWeight;
        }
        if (propBorderWidth) {
            if (borderWidth.find(el => el === propBorderWidth) !== undefined)
                result['$$inputBorderWidth'] = `$borderWidths$${propBorderWidth}`;
            else
                result['$$inputBorderWidth'] = typeof propBorderWidth === 'number' ? `${propBorderWidth}px` : propBorderWidth;
        }
        return result;
    }, [css, color, textColor, propSize, propFontSize, propFontWeight, propBorderWidth])

    const customIconCss = iconSize ? {'$$inputIconSize': typeof iconSize == 'number' ? `${iconSize}px` : iconSize} : {};

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (html?.onFocus)
            html.onFocus(e);
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (html?.onBlur)
            html.onBlur(e);
    }

    return (
        <StyledInputLabel focused={isFocused} css={labelCss}>
            {!!label && <div>{label}</div>}
            <StyledInputGroup>
                {!!prefix && <StyledInputAddon css={customIconCss}>{prefix}</StyledInputAddon>}
                <StyledInput
                    ref={imperativeRef}
                    css={css}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    {...html}
                    {...props}
                >
                    {children}
                </StyledInput>
                {!!postfix && <StyledInputAddon css={customIconCss}>{postfix}</StyledInputAddon>}
            </StyledInputGroup>
        </StyledInputLabel>
    )
})

export default React.memo(Input);