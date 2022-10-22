import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const GridStyles = css({
    display: 'flex',
    width: '100%',
}, hideShowOnMedia)

export const StyledGrid = styled("div", GridStyles);

export type GridVariantsProps = VariantProps<typeof StyledGrid>;