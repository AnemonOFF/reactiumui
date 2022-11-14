import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { AlignContent, AlignItems, FlexDirection, JustifyContent, ListStyleType, useImperativeRef } from "../../utils";
import { ListVariantsProps, StyledList } from "./list.styles";
import ListItem from "./listItem";

interface Props {
    children?: React.ReactNode,
    css?: CSS,
    listType?: 'ordered' | 'unordered',
    listStyleType?: ListStyleType,
    customMarkerContent?: string,
    gap?: number | string,
    direction?: FlexDirection,
    alignItems?: AlignItems,
    alignContent?: AlignContent,
    justifyContent?: JustifyContent,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLUListElement>, keyof Props>;
type VariantsProps = Omit<ListVariantsProps, keyof Props>;
export type ListProps = Props & VariantsProps & { html?: HTMLProps};

export const List = React.forwardRef<HTMLUListElement, ListProps>(({
    children,
    css,
    listStyleType,
    customMarkerContent,
    direction,
    gap,
    alignContent,
    alignItems,
    justifyContent,
    html,
    listType = 'ordered',
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        };
        if (listStyleType !== undefined)
            result.listStyleType = listStyleType;
        else
            result.listStyleType = listType == 'ordered' ? 'disc' : 'decimal';
        if (gap !== undefined)
            result.gap = gap;
        if (direction !== undefined)
            result.flexDirection = direction;
        if (alignContent !== undefined)
            result.alignContent = alignContent;
        if (alignItems !== undefined)
            result.alignItems = alignItems;
        if (justifyContent !== undefined)
            result.justifyContent = justifyContent;
        return result;
    }, [css, listStyleType, gap, direction, alignItems, alignContent, justifyContent])

    const propedChildren = useMemo(() => React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === ListItem) {
            const listItemProps = {
                customMarkerContent: child.props.customMarkerContent ?? customMarkerContent
            };
            return React.cloneElement(child, listItemProps);
        }
        return child;
    }), [children, customMarkerContent])

    return (
        <StyledList
            as={listType == 'ordered' ? 'ol' : 'ul'}
            ref={imperativeRef}
            css={customCss}
            {...html}
            {...props}
        >
            {propedChildren}
        </StyledList>
    );
})

export default React.memo(List);