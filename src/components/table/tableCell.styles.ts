import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableCellStyles = css({
    p: '$md',
    '&:first-child': {
        borderTopLeftRadius: '$$tableRadius',
        borderBottomLeftRadius: '$$tableRadius',
    },
    '&:last-child': {
        borderTopRightRadius: '$$tableRadius',
        borderBottomRightRadius: '$$tableRadius',
    },
}, hideShowOnMedia)

export const StyledTableCell = styled('td', TableCellStyles);

export type TableCellVariantsProps = VariantProps<typeof StyledTableCell>;