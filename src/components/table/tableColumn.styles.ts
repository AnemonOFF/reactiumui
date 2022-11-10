import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableColumnStyles = css({
    background: '$backgroundAccent',
    color: '$accent',
    p: '$md',
    "&:first-child": {
        borderTopLeftRadius: '$$tableHeaderRadius',
        borderBottomLeftRadius: '$$tableRadius',
    },
    "&:last-child": {
        borderTopRightRadius: '$$tableHeaderRadius',
        borderBottomRightRadius: '$$tableRadius',
    }
}, hideShowOnMedia)

export const StyledTableColumn = styled('th', TableColumnStyles);

export type TableColumnVariantsProps = VariantProps<typeof StyledTableColumn>;