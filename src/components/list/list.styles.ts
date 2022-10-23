import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ListStyles = css({
    m: 0,
    variants: {
        listStylePosition: {
            inside: {
                listStylePosition: 'inside',
                p: 0,
            },
            outside: {
                listStylePosition: 'outside',
                py: 0,
                pr: 0,
            }
        },
    },
    defaultVariants: {
        listStylePosition: 'inside',
    }
}, hideShowOnMedia)

export const StyledList = styled('ul', ListStyles);

export type ListVariantsProps = VariantProps<typeof StyledList>;