import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableRowStyles = css({
    "&:nth-child(even)": {
        background: '$$tableZebraColor',
        "&:hover": {
            background: '$$tableHoverEvenColor',
        }
    },
    "&:nth-child(odd):hover": {
        background: '$$tableHoverOddColor',
    }
}, hideShowOnMedia)

export const StyledTableRow = styled('tr', TableRowStyles);

export type TableRowVariantsProps = VariantProps<typeof StyledTableRow>;