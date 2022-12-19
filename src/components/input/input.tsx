import React from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { InputVariantsProps, StyledInput } from "./input.styles";

interface Props {
    children?: React.ReactNode,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLInputElement>, keyof Props>;
type VariantsProps = Omit<InputVariantsProps, keyof Props>;
export type InputProps = Props & VariantsProps & { html?: HTMLProps};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    children,
    css,
    html,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);

    return (
        <StyledInput
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledInput>
    )
})

export default React.memo(Input);