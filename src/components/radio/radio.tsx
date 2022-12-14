import React, { useEffect, useMemo, useState } from "react";
import { CSS } from "../../theme";
import { space, Space, ThemedColors, useImperativeRef, useThemeColor } from "../../utils";
import { RadioVariantsProps, StyledRadio, StyledRadioIcon, StyledLabel } from "./radio.styles";

interface Props {
    children?: React.ReactNode,
    size?: Space | number | string,
    color?: ThemedColors | "default" | string,
    gradient?: string[],
    labelColor?: ThemedColors | "default" | string,
    labelGradient?: string[],
    icon?: React.ReactNode,
    checkedIcon?: React.ReactNode,
    disabled?: boolean,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    initialChecked?: boolean,
    labelCss?: CSS,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLInputElement>, keyof Props | 'type'>;
type VariantsProps = Omit<RadioVariantsProps, keyof Props | 'icon'>;
export type RadioProps = Props & VariantsProps & { html?: HTMLProps};

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
    children,
    css,
    labelCss,
    html,
    indeterminate,
    icon,
    checkedIcon,
    labelColor: propLabelColor,
    labelGradient: propLabelGradient,
    size: propSize,
    color: propColor,
    gradient: propGradient,
    checked: propChecked,
    onChange: propOnChange,
    disabled = false,
    initialChecked = false,
    ...props
}, ref) => {
    const [checked, setChecked] = useState(initialChecked);
    const imperativeRef = useImperativeRef(ref);
    const color = useThemeColor(propColor);
    const labelColor = useThemeColor(propLabelColor);

    useEffect(() => {
        if(propChecked !== undefined)
            setChecked(propChecked);
    }, [propChecked])

    const size = useMemo(() => {
        if(propSize !== undefined) {
            if(space.find(el => el === propSize) !== undefined)
                return `$space$${propSize}`;
            else 
                return typeof propSize === 'number' ? `${propSize}px` : propSize;
        }
        return undefined;
    }, [propSize])

    const cssColor = useMemo(() => {
        if(propGradient && propGradient.length > 1) {
            const cssGradient = '45deg, ' + propGradient.map((c, i) => `${c} ${i == 0 ? 0 : i / (propGradient.length - 1) * 100}%`).join(', ');
            return `linear-gradient(${cssGradient})`;
        }
        return color;
    }, [color, propGradient]);

    const customCss = useMemo(() => {
        const result = {...css};
        if(cssColor)
            result['$$radioColor'] = cssColor;
        if(propGradient && propGradient.length > 1)
            result['$$radioSecondaryColor'] = '$colors$accent';
        if(size !== undefined) {
            result['$$radioSize'] = size;
        }
        return result;
    }, [css, size, cssColor, propGradient])

    const labelCustomCss = useMemo(() => {
        const result = {...labelCss};
        if(labelColor)
            result.color = labelColor;
        if(propLabelGradient && propLabelGradient.length > 1) {
            const colorsCount = propLabelGradient.length;
            result.textGradient = '45deg, ' + propLabelGradient.map((c, i) => `${c} ${i == 0 ? 0 : i / (colorsCount - 1) * 100}%`).join(', ')
        }
        if(propSize !== undefined) {
            if(space.find(el => el === propSize) !== undefined)
                result.fontSize = `$space$${propSize}`;
            else 
                result.fontSize = typeof propSize === 'number' ? `${propSize}px` : propSize;
        }
        return result;
    }, [labelCss, propSize, labelColor, propLabelGradient])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(propChecked === undefined && indeterminate === undefined)
            setChecked(prev => !prev);
        if(propOnChange)
            propOnChange(e);
    }

    const renderIcon = checked ? checkedIcon ?? icon : icon;
    const iconCss = {
        '& > svg': {
            size: size,
            fill: checked ? cssColor ?? '$colors$primary' : undefined,
        }
    }

    return (
        <StyledLabel disabled={disabled} css={labelCustomCss}>
            <StyledRadio
                type={"radio"}
                ref={imperativeRef}
                css={customCss}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                indeterminate={!checked ? indeterminate : false}
                icon={renderIcon !== undefined}
                {...html}
                {...props}
            />
            {renderIcon !== undefined && <StyledRadioIcon css={iconCss}>{renderIcon}</StyledRadioIcon>}
            {children}
        </StyledLabel>
    )
})

export default React.memo(Radio);