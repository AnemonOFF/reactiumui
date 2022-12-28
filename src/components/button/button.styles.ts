import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ButtonStyles = css({
    $$buttonBorderRadius: '$radii$xs',
    $$buttonSolidColor: '$colors$primary',
    $$buttonBorderColor: '$colors$border',
    $$buttonTextColor: '$colors$text',
    $$buttonAccentColor: '$colors$accent',
    $$buttonBorderWidth: '1px',
    $$buttonXSpace: '$space$xs',
    $$buttonYSpace: '$space$xxs',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    m: 0,
    p: '$$buttonYSpace $$buttonXSpace',
    cursor: 'pointer',
    borderRadius: '$$buttonBorderRadius',
    color: '$$buttonTextColor',
    variants: {
        type: {
            border: {
                border: '$$buttonBorderWidth solid $$buttonBorderColor',
                background: 'transparent',
                '&:hover': {
                    borderColor: '$$buttonSolidColor',
                },
            },
            solid: {
                '&::before': {
                    content: '',
                    position: 'absolute',
                    left: 'calc(0px - $$buttonBorderWidth)',
                    top: 'calc(0px - $$buttonBorderWidth)',
                    right: 'calc(0px - $$buttonBorderWidth)',
                    bottom: 'calc(0px - $$buttonBorderWidth)',
                    borderRadius: '$$buttonBorderRadius',
                    background: '$$buttonSolidColor',
                    zIndex: '$min',
                },
                background: 'transparent',
                border: '$$buttonBorderWidth solid transparent',
                '$$buttonTextColor': '$colors$white !important',
                '&:hover::before': {
                    opacity: 0.8,
                },
            },
            light: {
                background: 'transparent',
                border: '$$buttonBorderWidth solid transparent',
                '&:hover': {
                    opacity: 0.8,
                }
            },
            text: {
                '&::before': {
                    content: '',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '$$buttonBorderRadius',
                    background: '$$buttonAccentColor',
                    border: '$$buttonBorderWidth solid $$buttonAccentColor',
                    opacity: 0,
                    zIndex: '$min',
                },
                background: 'transparent',
                border: '$$buttonBorderWidth solid transparent',
                '&:hover::before': {
                    opacity: 0.2,
                },
            },
            flat: {
                '&::before': {
                    content: '',
                    position: 'absolute',
                    left: 'calc(0px - $$buttonBorderWidth)',
                    top: 'calc(0px - $$buttonBorderWidth)',
                    right: 'calc(0px - $$buttonBorderWidth)',
                    bottom: 'calc(0px - $$buttonBorderWidth)',
                    borderRadius: '$$buttonBorderRadius',
                    background: '$$buttonAccentColor',
                    opacity: 0.2,
                    zIndex: '$min',
                },
                background: 'transparent',
                border: '$$buttonBorderWidth solid transparent',
                '&:hover::before': {
                    opacity: 0.3,
                },
            },
            ghost: {
                border: '$$buttonBorderWidth solid $$buttonBorderColor',
                background: 'transparent',
                '&:hover': {
                    borderColor: '$$buttonSolidColor',
                    background: '$$buttonSolidColor',
                    color: '$white',
                },
            },
        },
        roundness: {
            default: {
            },
            square: {
                $$buttonBorderRadius: 0,
            },
            round: {
                $$buttonBorderRadius: '$radii$pill',
            }
        },
        compact: {
            true: {
                $$buttonYSpace: '4px',
                $$buttonXSpace: '11px',
            }
        }
    },
    defaultVariants: {
        type: 'solid',
        roundness: 'default',
        compact: false,
    }
}, hideShowOnMedia)

export const ButtonContentStyles = css({

})

export const ButtonIconStyled = css({
    $$buttonIconSize: '18px',
    $$buttonRightIconSize: '18px',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
        mr: '$$buttonXSpace',
    },
    '&:first-child > svg': {
        size: '$$buttonIconSize',
    },
    '&:last-child': {
        ml: '$$buttonXSpace',
    },
    '&:last-child > svg': {
        size: '$$buttonRightIconSize',
    },
    variants: {
        disableMargin: {
            true: {
                '&:first-child:not(:last-child), &:last-child:not(:first-child)': {
                    m: 0,
                }
            }
        }
    }
})

export const StyledButton = styled('button', ButtonStyles);
export const StyledButtonContent = styled('div', ButtonContentStyles);
export const StyledButtonIcon = styled('div', ButtonIconStyled);

export type ButtonVariantsProps = VariantProps<typeof StyledButton>;
export type ButtonContentVariantsProps = VariantProps<typeof StyledButtonContent>;
export type ButtonIconVariantsProps = VariantProps<typeof StyledButtonIcon>;