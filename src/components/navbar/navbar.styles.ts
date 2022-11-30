import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";
import { StyledNavbarCollapseWrapper } from "./navbarCollapseWrapper.styles";
import { StyledNavbarWrapper } from "./navbarWrapper.styles";

export const NavbarBeforeStyles = {
    "&::before": {
        content: "",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '$$navbarBackground',
        backdropFilter: '$$navbarBackdropFilter',
        borderRadius: "$$navbarBorderRadius",
        zIndex: '$5'
    }
}

export const NavbarStyles = css({
    $$navbarDefaultPaddingMargin: "$space$xxl",
    $$navbarHeightDefault: "76px",
    $$navbarHeightCompact: "calc($$navbarHeightDefault * 0.7)",
    $$navbarHeight: "$$navbarHeightDefault",
    $$navbarBorder: "none",
    $$navbarBorderRadiusVar: "$radii$xl",
    $$navbarBorderRadiusCloudVar: "0px",
    $$navbarBorderRadius: "0 0 $$navbarBorderRadiusVar $$navbarBorderRadiusVar",
    $$navbarShadow: "$shadows$md",
    $$navbarBackground: "$colors$backgroundAlpha",
    $$navbarForeground: "$colors$foreground",
    $$navbarBackdropFilter: "saturate(180%) blur(9px)",
    $$navbarCloudPadding: "0px",
    height: "auto",
    width: "100%",
    zIndex: "501",
    shadow: '$$navbarShadow',
    borderBottom: "$$navbarBorder",
    borderRadius: "$$navbarBorderRadius",
    variants: {
        type: {
            static: {
                position: 'relative',
                ...NavbarBeforeStyles,
                [`& ${StyledNavbarWrapper}`]: {
                    zIndex: "501",
                }
            },
            sticky: {
                position: 'sticky',
                top: 0,
                right: 0,
                left: 0,
                ...NavbarBeforeStyles,
            },
            cloud: {
                position: 'sticky',
                top: 0,
                right: 0,
                left: 0,
                px: '$$navbarDefaultPaddingMargin',
                pt: '$$navbarDefaultPaddingMargin',
                $$navbarBorderRadius: "$$navbarBorderRadiusVar",
                $$navbarCloudPadding: "$$navbarDefaultPaddingMargin",
                $$navbarBorderRadiusCloudVar: "$$navbarBorderRadiusVar",
                shadow: 'none',
                border: 'none',
                [`& ${StyledNavbarWrapper}`]: {
                    border: "$$navbarBorder",
                    borderRadius: "$$navbarBorderRadius",
                    shadow: '$$navbarShadow',
                    ...NavbarBeforeStyles,
                },
                [`& ${StyledNavbarCollapseWrapper}`]: {
                    $$navbarCollapseMaxHeight: "calc(100vh - 2 * $$navbarDefaultPaddingMargin)",
                },
            }
        },
        compact: {
            true: {
                $$navbarHeight: "$$navbarHeightCompact",
            }
        },
        square: {
            true: {
                $$navbarBorderRadius: "0 !important",
            }
        },
        disableBlur: {
            true: {
                $$navbarBackground: "$colors$background",
                $$navbarBackdropFilter: "none",
            }
        },
        disableShadow: {
            true: {
                $$navbarShadow: "none",
            }
        },
        border: {
            true: {
                $$navbarBorder: "1px solid $colors$border",
            }
        }
    },
    defaultVariants: {
        type: 'sticky',
        compact: false,
        square: false,
        disableBlur: false,
        disableShadow: false,
        border: false
    },
}, hideShowOnMedia);

export const StyledNavbar = styled("nav", NavbarStyles);

export type NavbarVariantsProps = VariantProps<typeof StyledNavbar>;