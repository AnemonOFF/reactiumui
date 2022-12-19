import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const GroupStyles = css({
    $$groupBorderWidth: '1px',
    display: 'flex',
    '& > :not(:last-child)': {
        borderRightColor: 'transparent',
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        marginInlineEnd: 'calc(0px - $$groupBorderWidth)',
        '&:hover, &:focus': {
            zIndex: '2',
        },
    },
    '& > :not(:first-child)': {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
        marginInlineStart: 0,
    },
}, hideShowOnMedia)

export const StyledGroup = styled('div', GroupStyles);

export type GroupVariantsProps = VariantProps<typeof StyledGroup>;