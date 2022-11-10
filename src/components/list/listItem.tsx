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
type HTMLProps = Omit<React.HTMLAttributes<HTMLLIElement>, keyof Props>;
type VariantsProps = Omit<ListItemVariantsProps, keyof Props>;
export type ListItemProps = Props & VariantsProps & { html?: HTMLProps};

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({
    children,
    css,
    customMarkerContent,
    markerCss,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);

    const customCss = useMemo(() => {
        const result: CSS = {
            ...css
        }
        if (customMarkerContent !== undefined && markerCss === undefined) {
            result["&::marker"] = {
                content: customMarkerContent
            };
        }
        else if (markerCss !== undefined && customMarkerContent === undefined) {
            result["&::marker"] = {
                ...markerCss
            }
        }
        else if (markerCss !== undefined && customMarkerContent !== undefined) {
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
            {...html}
            {...props}
        >
            {children}
        </StyledListItem>
    );
})

export default React.memo(ListItem);