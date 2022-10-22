import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarCollapseLinkStyles = css({
    $$navbarCollapseLinkColor: "$colors$primary",
    textDecoration: "none",
    cursor: "pointer",
    width: "100%",
    "&:hover, &:active, &:focus": {
        opacity: 0.7,
    },
    variants: {
        active: {
            true: {
                color: "$$navbarCollapseLinkColor",
                "&:hover, &:active, &:focus": {
                    opacity: 1,
                }
            }
        }
    },
    defaultVariants: {
        active: false,
    }
}, hideShowOnMedia)

export const StyledNavbarCollapseLink = styled("a", NavbarCollapseLinkStyles);

export type NavbarCollapseLinkVariantsProps = VariantProps<typeof StyledNavbarCollapseLink>;
