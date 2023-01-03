import { hideShowOnMedia } from "../../theme";
import { css, styled, VariantProps } from "../../theme/stitches.config";

export const InputStyles = css({
    border: 'none',
    fontSize: '$$inputFontSize',
    fontWeight: '$$inputFontWeight',
    variants: {
        variants: {
            default: {
                color: '$$inputTextColor',
                background: '$background',
                m: 0,
                padding: '$$inputYSpace $$inputXSpace',
            },
        },
        compact: {
            true: {
                padding: '4px 11px',
            }
        },
    },
    defaultVariants: {
        compact: false,
        variants: 'default',
    }
}, hideShowOnMedia)

export const StyledInput = styled('input', InputStyles);

export const InputAddonStyles = css({
    $$inputIconSize: '18px',
    display: 'flex',
    alignItems: 'center',
    px: '$$inputXSpace',
    background: '$background',
    fontSize: '$$inputFontSize',
    fontWeight: '$$inputFontWeight',
    '&:last-child': {
        paddingLeft: 0,
    },
    '&:first-child': {
        paddingRight: 0,
    },
    '& > svg': {
        size: '$$inputIconSize',
    },
})

export const StyledInputAddon = styled('div', InputAddonStyles);

export const InputGroupStyles = css({
    display: 'flex',
    m: 0,
    p: 0,
    border: '$$inputBorderWidth solid $border',
    width: 'max-content',
    '& > :first-child': {
        borderTopLeftRadius: '$xs',
        borderBottomLeftRadius: '$xs',
    },
    '& > :last-child': {
        borderTopRightRadius: '$xs',
        borderBottomRightRadius: '$xs',
    },
    variants: {
        roundness: {
            default: {
                borderRadius: '$xs',
            },
            square: {
                borderRadius: 0,
            },
            round: {
                borderRadius: '$radii$pill',
            }
        }
    },
    defaultVariants: {
        roundness: 'default',
    }
})

export const StyledInputGroup = styled('div', InputGroupStyles);

export const InputLabelStyles = css({
    $$inputColor: '$colors$primary',
    $$inputTextColor: '$colors$text',
    $$inputXSpace: '$space$xs',
    $$inputYSpace: '$space$xxs',
    $$inputBorderWidth: '1px',
    $$inputFontSize: '$fontSizes$sm',
    $$inputFontWeight: '$fontWeights$normal',
    width: 'max-content',
    fontSize: '$$inputFontSize',
    fontWeight: '$$inputFontWeight',
    color: '$colors$text',
    '&:hover > *': {
        borderColor: '$$inputColor',
    },
    '& > :first-child:not(:last-child)': {
        marginBottom: '$xs',
    },
    variants: {
        focused: {
            true: {
                color: '$$inputTextColor',
                '& > *': {
                    borderColor: '$$inputColor',
                },
            }
        }
    }
});

export const StyledInputLabel = styled('label', InputLabelStyles);

export type InputVariantsProps = VariantProps<typeof StyledInput>;
export type InputAddotVariantsProps = VariantProps<typeof StyledInputAddon>;
export type InputGroupVariantsProps = VariantProps<typeof StyledInputGroup>;
export type InputLabelVariantsProps = VariantProps<typeof StyledInputLabel>;