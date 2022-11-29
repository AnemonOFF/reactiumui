import { hideScrollVariant, hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TablePaginationStyles = css({

}, hideShowOnMedia, hideScrollVariant)

export const StyledTablePagination = styled('div', TablePaginationStyles);

export type TablePaginationVariantsProps = VariantProps<typeof StyledTablePagination>;