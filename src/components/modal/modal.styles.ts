import { blurBackground } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ModalStyles = css({
    $$modalBorderRadius: '$radii$xl',
    $$modalBorder: 'none',
    $$modalShadow: '$shadows$md',
    $$modalOffset: '$space$md',
    background: '$background',
    border: '$$modalBorder',
    borderRadius: '$$modalBorderRadius',
    shadow: '$$modalShadow',
    zIndex: '$max',
    width: '378px',
    variants: {
        position: {
            fixed: {
                position: 'fixed',
            },
            absolute: {
                position: 'absolute',
            },
        },
        placement: {
            center: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
            top: {
                top: '$$modalOffset',
                left: '50%',
                transform: 'translateX(-50%)',
            },
            bottom: {
                bottom: '$$modalOffset',
                left: '50%',
                transform: 'translateX(-50%)',
            },
            right: {
                right: '$$modalOffset',
                top: '50%',
                transform: 'translateY(-50%)',
            },
            left: {
                left: '$$modalOffset',
                top: '50%',
                transform: 'translateY(-50%)',
            },
        },
        disableShadow: {
            true: {
                $$modalShadow: 'none',
            }
        },
        square: {
            true: {
                $$modalBorderRadius: 0,
            }
        },
        border: {
            true: {
                $$modalBorder: '1px solid $colors$border',
            }
        }
    },
    defaultVariants: {
        disableShadow: false,
        border: false,
        square: false,
        position: 'fixed',
    }
})

export const ModalWrapperStyled = css({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '$max',
    variants: {
        position: {
            fixed: {
                position: 'fixed',
            },
            absolute: {
                position: 'absolute',
            },
        },
        disableBlur: {
            false: {
                ...blurBackground,
            },
            true: {
                background: '$backgroundAccentAlpha',
            }
        },
    },
    defaultVariants: {
        disableBlur: false,
        position: 'fixed',
    }
})

export const StyledModal = styled('div', ModalStyles);
export const StyledModalWrapper = styled('div', ModalWrapperStyled);

export type ModalVariantsProps = VariantProps<typeof StyledModal>;
export type ModalWrapperVariantsProps = VariantProps<typeof StyledModalWrapper>;