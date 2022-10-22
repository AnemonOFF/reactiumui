import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarCollapseStyles = css({
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    listStyleType: 'none',
    p: '$$navbarDefaultPaddingMargin',
    m: 0,
    width: '100%',
    height: "auto",
    overflow: "auto",
    gap: "$space$xxl"
})

export const StyledNavbarCollapse = styled("ul", NavbarCollapseStyles);

export type NavbarCollapseVariantsProps = VariantProps<typeof StyledNavbarCollapse>;
