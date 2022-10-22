import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const TextStyles = css({
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
    }
  },
}, hideShowOnMedia)

export const StyledText = styled("p", TextStyles);

export type TextVariantsProps = VariantProps<typeof StyledText>;