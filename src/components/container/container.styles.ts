import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ContainerStyles = css({})

export const StyledContainer = styled('div', ContainerStyles);

export type ContainerVariantsProps = VariantProps<typeof StyledContainer>;