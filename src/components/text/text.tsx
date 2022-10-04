import React, { ReactNode, useMemo, useRef } from "react";
import { CSS, CSSFontSize } from "../../theme/stitches.config";
import { themedColors, ThemedColors } from "../../utils/types";
import { TextVariantsProps, StyledText } from "./text.styles";
import useImperativeRef from "../../utils/hooks/useImperativeRef";

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
    em?: boolean,
    blockquote?: boolean,
    css?: CSS,
    fontSize?: CSSFontSize,
    color?: ThemedColors | "default" | string
}

export type TextProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<TextVariantsProps, keyof Props | "tag">;

type TextElement = keyof JSX.IntrinsicElements;
type TextElementMap = {[key in keyof JSX.IntrinsicElements]?: boolean}

type ElementMap = {[key in keyof JSX.IntrinsicElements]?: boolean};
type TextRenderableElements = Array<keyof JSX.IntrinsicElements>;

const getTagChild = (tagChildren: TextElement[], propChildren: ReactNode, fontSize?: CSSFontSize) => {
    if(tagChildren.length === 0)
        return propChildren;
    
    return (
        <StyledText as={tagChildren[0]}>
            {getTagChild(tagChildren.slice(1), propChildren, fontSize)}
        </StyledText>
    );
};

const Text = React.forwardRef<HTMLElement, TextProps>(({
    fontSize,
    children: propChildren,
    css,
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
    h5 = false,
    h6 = false,
    b = false,
    i = false,
    span = false,
    em = false,
    blockquote = false,
    color: propColor = "default",
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref as React.ForwardedRef<HTMLParagraphElement>);

    const color = useMemo(() => {
        if(propColor == "default")
            return "$text";
        if(themedColors.find((el) => el == propColor) !== undefined) {
            return `$${propColor}`;
        }
        return propColor;
    }, [propColor]);

    const tags: TextElementMap = {h1, h2, h3, h4, h5, h6, b, i, span, em, blockquote};
    const validTags = Object.keys(tags).filter((tag) => tags[tag as TextElement]);
    //as (keyof JSX.IntrinsicElements)[]

    const tag = (validTags[0] ? validTags[0] : "p") as TextElement;
    const childrenTags = validTags.slice(1) as TextElement[];
    const children = useMemo(() => {
        if(childrenTags.length === 0)
            return propChildren;
        return getTagChild(childrenTags, propChildren, fontSize);
    }, [propChildren, fontSize, childrenTags]);

    return (
        <StyledText
            ref={imperativeRef}
            as={tag}
            css={{
                color,
                fontSize,
                ...css
            }}
            {...props}
        >
            {children}
        </StyledText>
    );
});

export default Text;