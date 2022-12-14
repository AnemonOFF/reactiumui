import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const RadioStyles = css({
    $$radioColor: '$colors$primary',
    $$radioSecondaryColor: '$$radioColor',
    $$radioSize: '21px',
    size: '$$radioSize',
    outline: 'none',
    position: 'relative',
    m: 0,
    cursor: 'pointer',
    border: '1px solid $colors$border',
    borderRadius: '$rounded',
    background: '$background',
    appearance: 'none',
    '&::after': {
        content: '',
        width: 'calc(19 / 21 * $$radioSize)',
        height: 'calc(19 / 21 * $$radioSize)',
        borderRadius: '$rounded',
        background: '$white',
        display: 'block',
        position: 'absolute',
        left: '50%',
        top: '50%',
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(.7)',
    },
    '&:checked': {
        background: '$$radioColor',
        borderColor: '$$radioSecondaryColor',
        '&::after': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(.5)',
        }
    },
    '&:disabled': {
        background: '$backgroundAccent',
        borderColor: '$border',
        cursor: 'not-allowed',
    },
    '&:hover:not(:checked):not(:disabled)': {
        borderColor: '$$radioSecondaryColor',
    },
    '&:focus': {
        boxShadow: '0 0 2px 1px $$radioSecondaryColor',
    },
    variants: {
        square: {
            true: {
                borderRadius: '$squared',
            }
        },
        round: {
            true: {
                borderRadius: '$rounded',
            }
        },
        indeterminate: {
            true: {
                background: '$$radioColor',
                borderColor: '$$radioSecondaryColor',
                '&::after': {
                    width: '50%',
                    height: 'calc(2 / 21 * $$radioSize)',
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

export const RadioIconStyles = css({
    position: 'absolute',
    top: 0,
    left: 0,
    '& > svg': {
        size: '21px',
    },
})

export const StyledRadio = styled('input', RadioStyles);
export const StyledLabel = styled('label', LabelStyles);
export const StyledRadioIcon = styled('div', RadioIconStyles);

export type RadioVariantsProps = VariantProps<typeof StyledRadio>;
export type LabelVariantsProps = VariantProps<typeof StyledLabel>;
export type RadioIconVariantsProps = VariantProps<typeof StyledRadioIcon>;