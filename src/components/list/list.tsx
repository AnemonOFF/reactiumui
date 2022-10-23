import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { ListStyleType, useImperativeRef } from "../../utils";
import { ListVariantsProps, StyledList } from "./list.styles";
import ListItem from "./listItem";

interface Props {
    children?: React.ReactNode,
    css?: CSS,
    listType?: 'ordered' | 'unordered',
    listStyleType?: ListStyleType,
    customMarkerContent?: string,
}

export type ListProps = Props & Omit<React.HTMLAttributes<unknown>, keyof Props> & Omit<ListVariantsProps, keyof Props>;

export const List = React.forwardRef<HTMLUListElement, ListProps>(({
    children,
    css,
    listStyleType,
    listType,
    customMarkerContent,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        };
        if(listStyleType !== undefined)
            result.listStyleType = listStyleType;
        return result;
    }, [css, listStyleType])

    const propedChildren = useMemo(() => React.Children.map(children, child => {
        if(React.isValidElement(child) && child.type === ListItem) {
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
            {...props}
        >
            {propedChildren}
        </StyledList>
    );
})

export default React.memo(List);