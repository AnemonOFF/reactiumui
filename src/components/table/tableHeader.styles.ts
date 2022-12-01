import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableHeaderStyles = css({
    
})

export const StyledTableHeader = styled('thead', TableHeaderStyles);

export type TableHeaderVariantsProps = VariantProps<typeof StyledTableHeader>;