import React, { useState } from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { CheckboxVariantsProps, StyledCheckbox, StyledLabel } from "./checkbox.styles";

interface Props {
    children?: React.ReactNode,
    disabled?: boolean,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLInputElement>, keyof Props | 'type'>;
type VariantsProps = Omit<CheckboxVariantsProps, keyof Props>;
export type CheckboxProps = Props & VariantsProps & { html?: HTMLProps};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
    children,
    css,
    html,
    disabled = false,
    ...props
}, ref) => {
    const [checked, setChecked] = useState(false);
    const imperativeRef = useImperativeRef(ref);

    const onChange = () => {
        setChecked(prev => !prev);
    }

    return (
        <StyledLabel disabled={disabled}>
            <StyledCheckbox
                type={"checkbox"}
                ref={imperativeRef}
                css={css}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                {...html}
                {...props}
            />
            {children}
        </StyledLabel>
    )
})

export default React.memo(Checkbox);