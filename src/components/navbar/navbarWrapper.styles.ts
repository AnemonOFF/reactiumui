import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarWrapperStyles = css({
    px: "$$navbarDefaultPaddingMargin",
    mx: 'auto',
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    height: "$$navbarHeight",
    zIndex: '501',
})

export const StyledNavbarWrapper = styled("div", NavbarWrapperStyles);

export type NavbarWrapperVariantsProps = VariantProps<typeof StyledNavbarWrapper>;