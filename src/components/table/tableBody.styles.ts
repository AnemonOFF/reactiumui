import { hideScrollVariant, hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableBodyStyles = css({

}, hideShowOnMedia, hideScrollVariant)

export const StyledTableBody = styled('tbody', TableBodyStyles);

export type TableBodyVariantsProps = VariantProps<typeof StyledTableBody>;