import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ButtonStyles = css({
    $$buttonColor: '$colors$foreground',
    $$buttonTextColor: '$colors$foreground',
    m: 0,
    color: '$$buttonTextColor',
    border: '1px solid $$buttonColor',
    p: '$xs $xxs',
    variants: {
        type: {
            border: {
                background: 'transparent',
            },
            solid: {
                $$buttonTextColor: '$colors$background',
                borderColor: '$$buttonColor',
                background: '$$buttonColor',
            },
            text: {
                borderColor: 'transparent',
                background: 'transparent',
            }
        }
    },
    defaultVariants: {
        type: 'border',
    }
}, hideShowOnMedia)

export const StyledButton = styled('button', ButtonStyles);

export type ButtonVariantsProps = VariantProps<typeof StyledButton>;