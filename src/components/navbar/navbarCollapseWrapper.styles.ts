import { css, styled, VariantProps } from "../../theme/stitches.config";
import { StyledNavbarCollapse } from "./navbarCollapse.styles";

export const NavbarCollapseWrapperStyles = css({
    $$navbarCollapsePaddingTop: "$$navbarHeight",
    $$navbarCollapseMaxHeight: "100vh",
    $$navbarCollapseListMaxHeight: "calc(100vh - $$navbarCollapsePaddingTop - 2 * $$navbarCloudPadding)",
    display: 'none',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    m: 0,
    p: 0,
    pt: '$$navbarCollapsePaddingTop',
    height: "auto",
    maxHeight: "$$navbarCollapseMaxHeight",
    shadow: '$$navbarShadow',
    zIndex: '$min',
    borderBottom: "$$navbarBorder",
    borderRadius: "$$navbarBorderRadius",
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
        zIndex: '-1',
    },
    variants: {
        fullScreen: {
            true: {
                position: "fixed",
                bottom: 0,
                // $$navbarCollapsePaddingTop: "calc($$navbarHeight + $$navbarDefaultPaddingMargin)",
                maxHeight: "100vh",
                $$navbarCollapsePaddingTop: "calc($$navbarHeight + $$navbarCloudPadding)",
                $$navbarCollapseListMaxHeight: "calc(100vh - $$navbarCollapsePaddingTop)",
                "&::before": {
                    borderRadius: 0,
                },
                [`& ${StyledNavbarCollapse}`]: {
                    px: 'calc($$navbarDefaultPaddingMargin + $$navbarBorderRadiusCloudVar)',
                }
            },
        },
        open: {
            true: {
                display: 'initial'
            }
        }
    },
    defaultVariants: {
        fullScreen: false,
        open: false,
    }
})

export const StyledNavbarCollapseWrapper = styled("div", NavbarCollapseWrapperStyles);

export type NavbarCollapseWrapperVariantsProps = VariantProps<typeof StyledNavbarCollapseWrapper>;