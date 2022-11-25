import { hideScrollVariant, hideShowOnMedia, blurBackgroundVariant } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableStyles = css({
    $$tableRadius: 0,
    $$tableHeaderRadius: 0,
    $$tableZebraColor: 'inherit',
    $$tableHoverEvenColor: '$$tableZebraColor',
    $$tableHoverOddColor: 'inherit',
    $$tableHoverCursor: 'unset',
    borderSpacing: 0,
    borderRadius: '$xl',
    variants: {
        type: {
            default: {
                $$tableRadius: 0,
                $$tableHeaderRadius: '$radii$xl',
            },
            square: {
                $$tableRadius: 0,
                $$tableHeaderRadius: 0,
                borderRadius: 0,
            },
            circle: {
                $$tableRadius: '$radii$xl',
                $$tableHeaderRadius: '$radii$xl',
            }
        },
        cloud: {
            true: {
                shadow: '$md',
                p: '$xs',
            }
        },
        bordered: {
            true: {
                p: '$xs',
                border: '1px solid $colors$border',
            }
        },
        hoverable: {
            true: {
                $$tableHoverEvenColor: '$colors$backgroundAccent',
                $$tableHoverOddColor: '$colors$backgroundAccent',
            },
        },
        clickable: {
            true: {
                $$tableHoverCursor: 'pointer',
            }
        },
        zebra: {
            true: {
                $$tableZebraColor: '$colors$backgroundAccentAlpha',
            }
        }
    },
    defaultVariants: {
        type: 'default',
        cloud: false,
    }
}, hideShowOnMedia, hideScrollVariant, blurBackgroundVariant)

export const StyledTable = styled('table', TableStyles);

export type TableVariantsProps = VariantProps<typeof StyledTable>;