import React, { ReactNode, useMemo } from "react";
import { CSS, CSSFontSize } from "../../theme/stitches.config";
import { themedColors, ThemedColors } from "../../utils/types";
import { TextVariantsProps, StyledText } from "./text.styles";
import useImperativeRef from "../../utils/hooks/useImperativeRef";
import useThemeColor from "../../utils/hooks/useThemeColor";

interface Props {
    children?: ReactNode,
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    h5?: boolean,
    h6?: boolean,
    b?: boolean,
    i?: boolean,
    span?: boolean,
    p?: boolean,
    em?: boolean,
    blockquote?: boolean,
    css?: CSS,
    fontSize?: CSSFontSize,
    color?: ThemedColors | "default" | string,
    gradient?: string[]
}
type HTMLProps = Omit<React.HTMLAttributes<unknown>, keyof Props>;
type VariantsProps = Omit<TextVariantsProps, keyof Props>;
export type TextProps = Props & VariantsProps & { html?: HTMLProps};

type TextElement = keyof JSX.IntrinsicElements;
type TextElementMap = {[key in keyof JSX.IntrinsicElements]?: boolean}

const getTagChild = (tagChildren: TextElement[], propChildren: ReactNode, fontSize?: CSSFontSize) => {
    if(tagChildren.length === 0)
        return propChildren;
    
    return (
        <StyledText as={tagChildren[0]}>
            {getTagChild(tagChildren.slice(1), propChildren, fontSize)}
        </StyledText>
    );
};

export const Text = React.forwardRef<HTMLElement, TextProps>(({
    fontSize,
    children: propChildren,
    css,
    gradient,
    html,
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
    h5 = false,
    h6 = false,
    b = false,
    i = false,
    span = false,
    p = false,
    em = false,
    blockquote = false,
    color: propColor = "default",
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref as React.ForwardedRef<HTMLParagraphElement>);
    const color = useThemeColor(propColor);

    const tags: TextElementMap = {h1, h2, h3, h4, h5, h6, b, i, span, p, em, blockquote};
    const validTags = Object.keys(tags).filter((tag) => tags[tag as TextElement]);
    //as (keyof JSX.IntrinsicElements)[]

    const tag = (validTags[0] ? validTags[0] : "p") as TextElement;
    const childrenTags = validTags.slice(1) as TextElement[];
    const children = useMemo(() => {
        if(childrenTags.length === 0)
            return propChildren;
        return getTagChild(childrenTags, propChildren, fontSize);
    }, [propChildren, fontSize, childrenTags]);

    const gradientCss: CSS | undefined = useMemo(() => {
        if(gradient == undefined || gradient.length < 2)
            return undefined;
        const colorsCount = gradient.length;
        return {
            textGradient: '45deg, ' + gradient.map((c, i) => `${c} ${i == 0 ? 0 : i / (colorsCount - 1) * 100}%`).join(', '),
        };
    }, [gradient])

    return (
        <StyledText
            ref={imperativeRef}
            as={tag}
            css={{
                color,
                fontSize,
                ...gradientCss,
                ...css
            }}
            quote={blockquote}
            {...html}
            {...props}
        >
            {children}
        </StyledText>
    );
});

export default React.memo(Text);