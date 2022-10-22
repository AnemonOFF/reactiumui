import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const ContainerStyles = css({}, hideShowOnMedia)

export const StyledContainer = styled('div', ContainerStyles);

export type ContainerVariantsProps = VariantProps<typeof StyledContainer>;