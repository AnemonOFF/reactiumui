import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarLinkStyles = css({
    $$navbarLinkColor: "$colors$primary",
    $$navbarLinkBackground: "$colors$primary",
    $$navbarLinkUnderlineWidth: "100%",
    $$navbarLinkBackgroundPadding: "$space$xs",
    $$navbarLinkBackgroundRadius: "$radii$md",
    $$navbarLinkBackgroundColor: "$colors$white",
    outline: "none",
    color: "$text",
    textDecoration: "none",
    background: "transparent",
    width: "100%",
    maxWidth: "max-content",
    cursor: "pointer",
    padding: "$$navbarLinkBackgroundPadding",
    borderRadius: "$$navbarLinkBackgroundRadius",
    "&:hover, &:active, &:focus": {
        opacity: 0.7,
    },
    "&::before": {
        content: "",
        position: "absolute",
        zIndex: "-1",
        background: "$$navbarLinkBackground",
        scale: "0"
    },
    variants: {
        type: {
            color: {
            },
            background: {
            },
            underline: {
            }
        },
        active: {
            true: {
                fontWeight: '$bold',
                "&:hover, &:active, &:focus": {
                    opacity: 1,
                },
            }
        },
    },
    compoundVariants: [
        {
            type: "color",
            active: true,
            css: {
                color: "$$navbarLinkColor",
            }
        },
        {
            type: 'background',
            active: true,
            css: {
                color: "$$navbarLinkBackgroundColor",
                background: "$$navbarLinkBackground"
            }
        },
        {
            type: 'underline',
            active: true,
            css: {
                color: "$$navbarLinkColor",
                "&::before": {
                    transform: "none",
                    bottom: 0,
                    height: 2,
                    width: "$$navbarLinkUnderlineWidth",
                    left: "calc((100% - $$navbarLinkUnderlineWidth)/2)"
                }
            }
        }
    ],
    defaultVariants: {
        type: 'color',
        active: false
    }
})

export const StyledNavbarLink = styled("a", NavbarLinkStyles);

export type NavbarLinkVariantsProps = VariantProps<typeof StyledNavbarLink>;
