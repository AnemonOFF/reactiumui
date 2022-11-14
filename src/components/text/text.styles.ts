import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TextStyles = css({
  width: 'fit-content',
  variants: {
    weight: {
      hairline: {
        fontWeight: "$hairline",
      },
      thin: {
        fontWeight: "$thin",
      },
      light: {
        fontWeight: "$light",
      },
      normal: {
        fontWeight: "$normal",
      },
      medium: {
        fontWeight: "$medium",
      },
      semibold: {
        fontWeight: "$semibold",
      },
      bold: {
        fontWeight: "$bold",
      },
      extrabold: {
        fontWeight: "$extrabold",
      },
      black: {
        fontWeight: "$black",
      },
    },
    quote: {
      true: {
        position: 'relative',
        background: '$backgroundAccent',
        m: 0,
        p: '$xl calc($xl + 10px)',
        width: 'fit-content',
        borderRadius: '$xl',
        '&::before': {
          content: '“',
          position: 'absolute',
          color: '$accent',
          fontSize: '$3xl',
          fontWeight: '$bold',
          top: 10,
          left: 10,
        },
        '&::after': {
          content: '„',
          position: 'absolute',
          color: '$accent',
          fontSize: '$3xl',
          fontWeight: '$bold',
          bottom: 10,
          right: 10,
        }
      }
    }
  },
}, hideShowOnMedia)

export const StyledText = styled("p", TextStyles);

export type TextVariantsProps = VariantProps<typeof StyledText>;