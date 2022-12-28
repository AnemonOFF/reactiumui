import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";
import { StyledButton } from "../button/button.styles";
import { StyledInputGroup, StyledInputLabel } from "../input/input.styles";

export const GroupStyles = css({
    $$groupBorderWidth: '1px',
    display: 'flex',
    [`& ${StyledButton}`]: {
        '&:not(:last-child), &:not(:last-child)::before': {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            marginInlineEnd: 'calc(0px - $$groupBorderWidth)',
            '&:hover, &:focus': {
                zIndex: '2',
            },
        },
        '&:not(:first-child), &:not(:first-child)::before': {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            marginInlineStart: 0,
        },
    },
    [`& ${StyledInputLabel}`]: {
        '&:not(:last-child) > div': {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            marginInlineEnd: 'calc(0px - $$groupBorderWidth)',
            '&:hover, &:focus': {
                zIndex: '2',
            },
        },
        '&:not(:first-child) > div': {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            marginInlineStart: 0,
        },
    },
}, hideShowOnMedia)

export const StyledGroup = styled('div', GroupStyles);

export type GroupVariantsProps = VariantProps<typeof StyledGroup>;