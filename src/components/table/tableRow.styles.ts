import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableRowStyles = css({
    cursor: '$$tableHoverCursor',
    "&:nth-child(even)": {
        background: '$$tableZebraColor',
        "&:hover": {
            background: '$$tableHoverEvenColor',
        }
    },
    "&:nth-child(odd):hover": {
        background: '$$tableHoverOddColor',
    },
    variants: {
        checked: {
            true: {
                background: '$primaryAccent !important',
                '&:hover': {
                    background: '$primaryAccentAlpha !important',
                }
            }
        },
        disable: {
            true: {
                color: '$disableText',
                background: 'unset !important',
                cursor: 'auto',
            }
        }
    }
}, hideShowOnMedia)

export const StyledTableRow = styled('tr', TableRowStyles);

export type TableRowVariantsProps = VariantProps<typeof StyledTableRow>;