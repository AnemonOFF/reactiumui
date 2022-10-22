import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarItemListStyles = css({
    m: 0,
    p: 0,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    height: "100%",
    listStyle: "none",
    listStyleType: "none",
    gap: "$space$xxl"
}, hideShowOnMedia)

export const NavbarItemStyles = css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
}, hideShowOnMedia)

export const StyledNavbarItemList = styled("ul", NavbarItemListStyles);
export const StyledNavbarItem = styled("li", NavbarItemStyles);

export type NavbarItemListVariantsProps = VariantProps<typeof StyledNavbarItemList>;
export type NavbarItemVariantsProps = VariantProps<typeof StyledNavbarItem>;