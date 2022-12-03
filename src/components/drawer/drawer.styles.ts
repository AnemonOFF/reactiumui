import { blurBackground } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const DrawerStyles = css({
    $$drawerBorderRadius: '$radii$xl',
    $$drawerBorder: 'none',
    $$drawerShadow: '$shadows$md',
    $$drawerOffset: 0,
    $$drawerSize: '378px',
    position: 'fixed',
    background: '$background',
    shadow: '$$drawerShadow',
    zIndex: '$max',
    variants: {
        type: {
            default: {
                $$drawerOffset: 0,
            },
            cloud: {
                $$drawerOffset: '$space$md',
                border: '$$drawerBorder',
                borderRadius: '$$drawerBorderRadius',
            }
        },
        placement: {
            top: {
                top: '$$drawerOffset',
                left: '$$drawerOffset',
                right: '$$drawerOffset',
                height: '$$drawerSize',
            },
            bottom: {
                bottom: '$$drawerOffset',
                left: '$$drawerOffset',
                right: '$$drawerOffset',
                height: '$$drawerSize',
            },
            right: {
                top: '$$drawerOffset',
                bottom: '$$drawerOffset',
                right: '$$drawerOffset',
                width: '$$drawerSize',
            },
            left: {
                top: '$$drawerOffset',
                bottom: '$$drawerOffset',
                left: '$$drawerOffset',
                width: '$$drawerSize',
            },
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
    compoundVariants: [
        {
            placement: 'top',
            type: 'default',
            css: {
                borderBottom: '$$drawerBorder',
                borderBottomLeftRadius: '$$drawerBorderRadius',
                borderBottomRightRadius: '$$drawerBorderRadius',
            }
        },
        {
            placement: 'bottom',
            type: 'default',
            css: {
                borderTop: '$$drawerBorder',
                borderTopLeftRadius: '$$drawerBorderRadius',
                borderTopRightRadius: '$$drawerBorderRadius',
            }
        },
        {
            placement: 'left',
            type: 'default',
            css: {
                borderRight: '$$drawerBorder',
                borderTopRightRadius: '$$drawerBorderRadius',
                borderBottomRightRadius: '$$drawerBorderRadius',
            }
        },
        {
            placement: 'right',
            type: 'default',
            css: {
                borderLeft: '$$drawerBorder',
                borderBottomLeftRadius: '$$drawerBorderRadius',
                borderTopLeftRadius: '$$drawerBorderRadius',
            }
        },
    ],
    defaultVariants: {
        type: 'default',
        placement: 'right',
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