import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { borderWidth, BorderWidth, fontSize, FontSize, fontWeight, FontWeight, space, Space, ThemedColors, useImperativeRef, useThemeColor } from "../../utils";
import { ButtonVariantsProps, StyledButton } from "./button.styles";

interface Props {
    children?: React.ReactNode,
    color?: ThemedColors | "default" | string,
    gradient?: string[],
    size?: Space | number | string,
    fontSize?: FontSize | number | string,
    fontWeight?: FontWeight | number,
    borderWidth?: BorderWidth | number | string,
    css?: CSS,
}

type HTMLProps = Omit<React.HTMLAttributes<HTMLButtonElement>, keyof Props>;
type VariantsProps = Omit<ButtonVariantsProps, keyof Props>;
export type ButtonProps = Props & VariantsProps & { html?: HTMLProps};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    html,
    css,
    type,
    color: propColor,
    gradient: propGradient,
    size: propSize,
    fontSize: propFontSize,
    fontWeight: propFontWeight,
    borderWidth: propBorderWidth,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);
    const color = useThemeColor(propColor);

    const customCss = useMemo(() => {
        const result = {...css};
        if(color) {
            result['$$buttonSolidColor'] = color;
            result['$$buttonBorderColor'] = color;
            result['$$buttonTextColor'] = color;
            result['$$buttonAccentColor'] = color;
        }
        if(propGradient && propGradient.length > 1) {
            const cssGradient = '45deg, ' + propGradient.map((c, i) => `${c} ${i == 0 ? 0 : i / (propGradient.length - 1) * 100}%`).join(', ');
            if(type === 'text' || type === 'light') {
                result.textGradient = cssGradient;
            }
            else {
                result['$$buttonSolidColor'] = `linear-gradient(${cssGradient})`;
                result['$$buttonBorderColor'] = `linear-gradient(${cssGradient})`;
                result['$$buttonAccentColor'] = `linear-gradient(${cssGradient})`;
            }
        }
        if(propSize) {
            if(space.find(el => el === propSize) !== undefined) {
                const spaceIndex = space.indexOf(propSize as string);
                result.p = `${spaceIndex > 0 ? `$${space[spaceIndex - 1]}` : '0px'} $${propSize}`
            }
            else {
                const cssPropSize = typeof propSize === 'number' ? `${propSize}px` : propSize;
                result.p = `calc(${cssPropSize} / 2) ${cssPropSize}`;
            }
        }
        if(propFontSize) {
            if(fontSize.find(el => el === propFontSize) !== undefined)
                result.fontSize = `$${propFontSize}`;
            else
                result.fonSize = typeof propFontSize === 'number' ? `${propFontSize}px` : propFontSize;
        }
        if(propFontWeight) {
            if(fontWeight.find(el => el === propFontWeight) !== undefined)
                result.fontWeight = `$${propFontWeight}`;
            else
                result.fontWeight = propFontWeight;
        }
        if(propBorderWidth) {
            if(borderWidth.find(el => el === propBorderWidth) !== undefined)
                result['$$buttonBorderWidth'] = `$borderWidths$${propBorderWidth}`;
            else
                result['$$buttonBorderWidth'] = typeof propBorderWidth === 'number' ? `${propBorderWidth}px` : propBorderWidth;
        }
        return result;
    }, [css, color, propSize, propFontSize, propBorderWidth, propFontWeight, propGradient])

    return (
        <StyledButton
            ref={imperativeRef}
            css={customCss}
            type={type}
            {...html}
            {...props}
        >
            {children}
        </StyledButton>
    )
})

export default React.memo(Button);