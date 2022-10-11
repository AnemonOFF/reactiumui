import { css, styled, VariantProps } from "../../theme/stitches.config";

export const GridStyles = css({
    display: 'flex',
    width: '100%'
})

export const StyledGrid = styled("div", GridStyles);

export type GridVariantsProps = VariantProps<typeof StyledGrid>;