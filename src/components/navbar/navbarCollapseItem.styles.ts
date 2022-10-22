import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarCollapseItemStyles = css({
}, hideShowOnMedia)

export const StyledNavbarCollapseItem = styled("li", NavbarCollapseItemStyles);

export type NavbarCollapseItemVariantsProps = VariantProps<typeof StyledNavbarCollapseItem>;
