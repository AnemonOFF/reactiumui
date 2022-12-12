import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const CheckboxStyles = css({
    height: 21,
    width: 21,
    outline: 'none',
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative',
    m: 0,
    cursor: 'pointer',
    border: '1px solid $colors$border',
    borderRadius: '$xs',
    background: '$background',
    appearance: 'none',
    '&:after': {
        content: '',
        width: 5,
        height: 9,
        border: '2px solid $colors$white',
        borderTop: 0,
        borderLeft: 0,
        display: 'block',
        position: 'absolute',
        left: 7,
        top: 4,
        opacity: 0,
        transform: 'rotate(20deg)',
    },
    '&:checked': {
        background: '$primary',
        borderColor: '$primary',
        '&:after': {
            opacity: 1,
            transform: 'rotate(43deg)',
        }
    },
    '&:disabled': {
        background: '$backgroundAccent',
        borderColor: '$border',
        cursor: 'not-allowed',
    },
    '&:hover:not(:checked):not(:disabled)': {
        borderColor: '$primary',
    },
    '&:focus': {
        boxShadow: '0 0 0 2px $colors$primaryAccent',
    }
}, hideShowOnMedia)

export const LabelStyles = css({
    fontSize: '$md',
    display: 'inline-block',
    verticalAlign: 'top',
    cursor: 'pointer',
    ml: 4,
    variants: {
        disabled: {
            true: {
                cursor: 'not-allowed',
            }
        },
    },
    defaultVariants: {
        disabled: 'false',
    }
})

export const StyledCheckbox = styled('input', CheckboxStyles);
export const StyledLabel = styled('label', LabelStyles);

export type CheckboxVariantsProps = VariantProps<typeof StyledCheckbox>;
export type LabelVariantsProps = VariantProps<typeof StyledLabel>;