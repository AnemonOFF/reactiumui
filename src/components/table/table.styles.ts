import { hideScrollVariant, hideShowOnMedia, blurBackgroundVariant } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableStyles = css({
    $$tableRadius: 0,
    $$tableHeaderRadius: 0,
    $$tableZebraColor: 'inherit',
    $$tableHoverEvenColor: '$$tableZebraColor',
    $$tableHoverOddColor: 'inherit',
    $$tableHoverCursor: 'unset',
    width: '100%',
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
    }
}, hideShowOnMedia, hideScrollVariant, blurBackgroundVariant)

export const TableWrapperStyles = css({
    display: 'inline-block',
    borderRadius: '$xl',
    overflow: 'auto',
    variants: {
        bordered: {
            true: {
                p: '$xs',
                border: '1px solid $colors$border',
            }
        },
        cloud: {
            true: {
                shadow: '$md',
                p: '$xs',
            }
        },
    }
})

export const StyledTable = styled('table', TableStyles);
export const StyledTableWrapper = styled('div', TableWrapperStyles);

export type TableVariantsProps = VariantProps<typeof StyledTable>;
export type TableWrapperVariantsProps = VariantProps<typeof StyledTableWrapper>;