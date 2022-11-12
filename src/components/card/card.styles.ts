import { hideScrollVariant, hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const CardStyles = css({
    $$cardBackground: "$colors$backgroundAlpha",
    background: "$$cardBackground",
    borderRadius: "$radii$xl",
    variants: {
        type: {
            cloud: {
                shadow: '$md'
            },
            flat: {
                $$cardBackground: "$colors$backgroundAccent"
            }
        },
        border: {
            true: {
                border: "1px solid $colors$border",
            }
        },
        square: {
            true: {
                borderRadius: 0,
            }
        },
        transparent: {
            true: {
                background: "transparent",
            }
        },
        solid: {
            true: {
                $$cardBackground: "$colors$background",
            }
        },
        isPressable: {
            true: {
                cursor: "pointer",
            }
        }
    },
    compoundVariants: [
        {
            type: 'flat',
            solid: 'true',
            css: {
                $$cardBackground: "$colors$backgroundAccent",
            }
        }
    ],
    defaultVariants: {
        type: 'cloud',
        border: 'false',
        square: 'false',
        transparent: 'false',
        solid: 'false',
        isPressable: 'false',
    }
}, hideShowOnMedia, hideScrollVariant)

export const StyledCard = styled('div', CardStyles);

export type CardVariantsProps = VariantProps<typeof StyledCard>;