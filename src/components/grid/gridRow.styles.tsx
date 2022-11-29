import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const GridRowStyles = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
}, hideShowOnMedia)

export const StyledGridRow = styled("div", GridRowStyles);

export type GridRowVariantsProps = VariantProps<typeof StyledGridRow>;