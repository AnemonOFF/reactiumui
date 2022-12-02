import { blurBackground, blurBackgroundVariant } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const DrawerStyles = css({
    $$drawerBorderRadius: '$radii$xl',
    $$drawerBorder: 'none',
    $$drawerShadow: '$shadows$md',
    position: 'absolute',
    background: '$background',
    shadow: '$$drawerShadow',
    width: 736,
    zIndex: '$max',
    variants: {
        type: {
            default: {
                top: 0,
                right: 0,
                bottom: 0,
                borderLeft: '$$drawerBorder',
                borderTopLeftRadius: '$$drawerBorderRadius',
                borderBottomLeftRadius: '$$drawerBorderRadius',
            },
            cloud: {
                top: '$md',
                right: '$md',
                bottom: '$md',
                border: '$$drawerBorder',
                borderRadius: '$$drawerBorderRadius',
            }
        },
        disableShadow: {
            true: {
                $$drawerShadow: 'none',
            }
        },
        square: {
            true: {
                $$drawerBorderRadius: 0,
            }
        },
        border: {
            true: {
                $$drawerBorder: '1px solid $colors$border',
            }
        }
    },
    defaultVariants: {
        type: 'default',
        disableShadow: false,
        border: false,
        square: false,
    }
})

export const DrawerWrapperStyled = css({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '$max',
    variants: {
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
    }
})

export const StyledDrawer = styled('div', DrawerStyles);
export const StyledDrawerWrapper = styled('div', DrawerWrapperStyled);

export type DrawerVariantsProps = VariantProps<typeof StyledDrawer>;
export type DrawerWrapperVariantsProps = VariantProps<typeof StyledDrawerWrapper>;