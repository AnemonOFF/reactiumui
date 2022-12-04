import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ButtonStyles = css({
    $$buttonBorderRadius: '$radii$xs',
    $$buttonSolidColor: '$colors$primary',
    $$buttonBorderColor: '$colors$border',
    $$buttonTextColor: '$colors$text',
    $$buttonAccentColor: '$colors$accent',
    $$buttonBorderWidth: '1px',
    position: 'relative',
    m: 0,
    p: '$xxs $xs',
    cursor: 'pointer',
    borderRadius: '$$buttonBorderRadius',
    variants: {
        type: {
            border: {
                border: '$$buttonBorderWidth solid $$buttonBorderColor',
                color: '$$buttonTextColor',
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
                color: '$white',
                '&:hover::before': {
                    opacity: 0.8,
                },
            },
            light: {
                background: 'transparent',
                border: '$$buttonBorderWidth solid transparent',
                color: '$$buttonTextColor',
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
                color: '$$buttonTextColor',
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
                color: '$$buttonTextColor',
                '&:hover::before': {
                    opacity: 0.3,
                },
            },
            ghost: {
                border: '$$buttonBorderWidth solid $$buttonBorderColor',
                color: '$$buttonTextColor',
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
        }
    },
    defaultVariants: {
        type: 'solid',
        roundness: 'default',
    }
}, hideShowOnMedia)

export const StyledButton = styled('button', ButtonStyles);

export type ButtonVariantsProps = VariantProps<typeof StyledButton>;