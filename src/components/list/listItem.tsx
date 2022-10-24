import React, { useMemo } from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { ListItemVariantsProps, StyledListItem } from "./listItem.styles";

interface Props {
    children?: React.ReactNode,
    css?: CSS,
    customMarkerContent?: string,
    markerCss?: CSS,
}

export type ListItemProps = Props & Omit<React.HTMLAttributes<HTMLLIElement>, keyof Props> & Omit<ListItemVariantsProps, keyof Props>;

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({
    children,
    css,
    customMarkerContent,
    markerCss,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        }
        if (customMarkerContent !== undefined) {
            result["&::marker"] = {
                content: customMarkerContent
            };
        }
        if (markerCss !== undefined) {
            result["&::marker"] = {
                content: customMarkerContent,
                ...markerCss
            }
        }
        return result;
    }, [css, customMarkerContent, markerCss])

    return (
        <StyledListItem
            ref={imperativeRef}
            css={customCss}
            {...props}
        >
            {children}
        </StyledListItem>
    );
})

export default React.memo(ListItem);