import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TableColumnContentStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})

export const StyledTableColumnContent = styled('div', TableColumnContentStyles);

export const SortIconWrapperStyles = css({
    size: 15,
})

export const StyledSortIconWrapper = styled('div', SortIconWrapperStyles);

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
    },
    variants: {
        clickable: {
            true: {
                cursor: 'pointer',
                "&:hover": {
                    color: '$accentAlpha',
                }
            },
        },
        active: {
            false: {
                [`& ${StyledSortIconWrapper}`]: {
                    opacity: 0,
                },
                [`&:hover ${StyledSortIconWrapper}`]: {
                    opacity: 0.8,
                }
            }
        }
    },
    defaultVariants: {
        clickable: false,
    }
}, hideShowOnMedia)

export const StyledTableColumn = styled('th', TableColumnStyles);

export type TableColumnVariantsProps = VariantProps<typeof StyledTableColumn>;
export type TableColumnContentVariantsProps = VariantProps<typeof StyledTableColumnContent>;
export type SortIconWrapperVariantsProps = VariantProps<typeof StyledSortIconWrapper>;