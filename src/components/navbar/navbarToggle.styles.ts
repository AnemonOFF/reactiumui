import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const NavbarToggleWrapperStyles = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 25,
    width: 26,
    cursor: "pointer",
    background: "none",
    border: "none",
    m: 0,
    p: 0,
    "& > span.line": {
        height: 1,
        width: "100%",
        background: "$$navbarForeground",
        transition: "transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0), opacity 0.15s ease",
        "&:first-child": {
            transformOrigin: "0% 0%",
        },
        "&:last-child": {
            transformOrigin: "0% 100%",
        }
    },
    "&:active > span.line": {
        opacity: "0.7",
    },
    variants: {
        active: {
            true: {
                "& > span.line": {
                    "&:first-child": {
                        transform: "rotate(45deg) translate(-2px, -1px)",
                    },
                    "&:last-child": {
                        transform: "rotate(-45deg) translate(0, -1px)",
                    },
                    "&:nth-child(2n)": {
                        transform: "translate(-5px, -1px) scaleX(0)"
                    },
                },
            },
        },
    },
    defaultVariants: {
        active: false,
    },
}, hideShowOnMedia)

export const StyledNavbarToggleWrapper = styled("button", NavbarToggleWrapperStyles);

export type NavbarToggleWrapperVariantsProps = VariantProps<typeof StyledNavbarToggleWrapper>;
