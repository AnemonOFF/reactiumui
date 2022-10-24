import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ListItemStyles = css({
    variants: {
        defaultMarkerStyle: {
            false: {
                '&::marker': {
                    color: '$foregroundAlpha',
                }
            }
        }
    },
    defaultVariants: {
        defaultMarkerStyle: false,
    }
}, hideShowOnMedia)

export const StyledListItem = styled('li', ListItemStyles);

export type ListItemVariantsProps = VariantProps<typeof StyledListItem>;