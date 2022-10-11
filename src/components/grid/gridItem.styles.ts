import { css, styled, VariantProps } from "../../theme/stitches.config";

export const GridItemStyles = css({})

export const StyledGridItem = styled("div", GridItemStyles);

export type GridItemVariantsProps = VariantProps<typeof StyledGridItem>;