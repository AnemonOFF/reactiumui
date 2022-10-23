import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ListItemStyles = css({
    variants: {
    }
}, hideShowOnMedia)

export const StyledListItem = styled('li', ListItemStyles);

export type ListItemVariantsProps = VariantProps<typeof StyledListItem>;