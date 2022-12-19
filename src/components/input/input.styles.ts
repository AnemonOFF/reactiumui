import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const InputStyles = css({
    $$inputColor: '$colors$primary',
    border: '1px solid $border',
    borderRadius: '$xs',
    color: '$text',
    background: '$background',
    m: 0,
    padding: '$xxs $xs',
    '&:hover, &:focus': {
        borderColor: '$$inputColor',
    },
    variants: {
        compact: {
            true: {
                padding: '4px 11px',
            }
        },
    },
    defaultVariants: {
        compact: false,
    }
}, hideShowOnMedia)

export const StyledInput = styled('input', InputStyles);

export type InputVariantsProps = VariantProps<typeof StyledInput>;