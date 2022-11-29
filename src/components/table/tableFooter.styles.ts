import { hideScrollVariant, hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableFooterStyles = css({

}, hideShowOnMedia, hideScrollVariant)

export const StyledTableFooter = styled('tfoot', TableFooterStyles);

export type TableFooterVariantsProps = VariantProps<typeof StyledTableFooter>;