import { hideScrollVariant, hideShowOnMedia, blurBackgroundVariant } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableStyles = css({
    position: 'relative',
    borderSpacing: 0,
    borderRadius: '$$tableHeaderRadius',
    zIndex: '$2',
    variants: {
        hoverable: {
            true: {
                $$tableHoverEvenColor: '$colors$backgroundAccent !important',
                $$tableHoverOddColor: '$colors$backgroundAccent',
            },
        },
        fullWidth: {
            true: {
                width: '100%',
            }
        },
        clickable: {
            true: {
                $$tableHoverCursor: 'pointer',
            }
        },
        zebra: {
            true: {
                $$tableZebraColor: '$colors$backgroundAccentAlpha',
                $$tableHoverEvenColor: '$colors$backgroundAccentAlpha',
            }
        }
    },
}, hideShowOnMedia, hideScrollVariant)

export const TableWrapperStyles = css({
    $$tableRadius: 0,
    $$tableHeaderRadius: 0,
    $$tableZebraColor: 'inherit',
    $$tableHoverEvenColor: 'inherit',
    $$tableHoverOddColor: 'inherit',
    $$tableHoverCursor: 'unset',
    position:'relative',
    borderRadius: '$$tableHeaderRadius',
    overflow: 'auto',
    '&::before': {
        borderRadius: '$$tableHeaderRadius',
    },
    variants: {
        type: {
            default: {
                $$tableRadius: 0,
                $$tableHeaderRadius: '$radii$md',
            },
            square: {
                $$tableRadius: 0,
                $$tableHeaderRadius: 0,
            },
            circle: {
                $$tableRadius: '$radii$xl',
                $$tableHeaderRadius: '$radii$xl',
            }
        },
        fullWidth: {
            false: {
                maxWidth: 'max-content',
            }
        },
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
    },
    defaultVariants: {
        type: 'default',
    }
}, blurBackgroundVariant)

export const StyledTable = styled('table', TableStyles);
export const StyledTableWrapper = styled('div', TableWrapperStyles);

export type TableVariantsProps = VariantProps<typeof StyledTable>;
export type TableWrapperVariantsProps = VariantProps<typeof StyledTableWrapper>;