import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const CheckboxStyles = css({
    $$checkboxColor: '$colors$primary',
    $$checkboxSecondaryColor: '$$checkboxColor',
    $$checkboxSize: '20px',
    size: '$$checkboxSize',
    outline: 'none',
    position: 'relative',
    m: 0,
    cursor: 'pointer',
    border: '1px solid $colors$border',
    borderRadius: '$xs',
    background: '$background',
    appearance: 'none',
    '&::after': {
        content: '',
        width: 'calc(5 / 20 * $$checkboxSize)',
        height: 'calc(9 / 20 * $$checkboxSize)',
        border: 'calc(2 / 20 * $$checkboxSize) solid $colors$white',
        borderTop: 0,
        borderLeft: 0,
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '50%',
        opacity: 0,
        transform: 'translate(-50%, -50%) rotate(20deg)',
    },
    '&:checked': {
        background: '$$checkboxColor',
        borderColor: '$$checkboxSecondaryColor',
        '&::after': {
            opacity: 1,
            transform: 'translate(-50%, -50%) rotate(43deg)',
        }
    },
    '&:disabled': {
        background: '$backgroundAccent',
        borderColor: '$border',
        cursor: 'not-allowed',
    },
    '&:hover:not(:checked):not(:disabled)': {
        borderColor: '$$checkboxSecondaryColor',
    },
    '&:focus': {
        boxShadow: '0 0 2px 1px $$checkboxSecondaryColor',
    },
    variants: {
        square: {
            true: {
                borderRadius: '$square',
            }
        },
        round: {
            true: {
                borderRadius: '$rounded',
            }
        },
        indeterminate: {
            true: {
                background: '$$checkboxColor',
                borderColor: '$$checkboxSecondaryColor',
                '&::after': {
                    width: '50%',
                    height: 'calc(2 / 21 * $$checkboxSize)',
                    border: 'none',
                    background: '$white',
                    transform: 'translate(-50%, -50%)',
                    opacity: 1,
                },
                '&:checked::after': {
                    transform: 'translate(-50%, -50%)',
                }
            }
        },
        icon: {
            true: {
                background: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important',
                '&::after': {
                    opacity: '0 !important',
                },
            }
        }
    },
    defaultVariants: {
        indeterminate: false,
        icon: false,
        round: false,
        square: false
    }
}, hideShowOnMedia)

export const LabelStyles = css({
    fontSize: '$md',
    display: 'flex',
    alignItems: 'center',
    gap: '$xxs',
    cursor: 'pointer',
    position: 'relative',
    variants: {
        disabled: {
            true: {
                cursor: 'not-allowed',
            }
        },
    },
    defaultVariants: {
        disabled: false,
    }
})

export const CheckboxIconStyles = css({
    position: 'absolute',
    top: 0,
    left: 0,
    '& > svg': {
        size: '21px',
    },
})

export const StyledCheckbox = styled('input', CheckboxStyles);
export const StyledLabel = styled('label', LabelStyles);
export const StyledCheckboxIcon = styled('div', CheckboxIconStyles);

export type CheckboxVariantsProps = VariantProps<typeof StyledCheckbox>;
export type LabelVariantsProps = VariantProps<typeof StyledLabel>;
export type CheckboxIconVariantsProps = VariantProps<typeof StyledCheckboxIcon>;