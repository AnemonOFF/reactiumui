import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarCollapseWrapperStyles = css({
    display: 'none',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    m: 0,
    p: 0,
    pt: '$$navbarHeight',
    height: "auto",
    maxHeight: "100vh",
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
        open: {
            true: {
                display: 'initial'
            }
        }
    },
    defaultVariants: {
        open: false
    }
})

export const StyledNavbarCollapseWrapper = styled("div", NavbarCollapseWrapperStyles);

export type NavbarCollapseWrapperVariantsProps = VariantProps<typeof StyledNavbarCollapseWrapper>;