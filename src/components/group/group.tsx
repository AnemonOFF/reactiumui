import React from "react";
import { CSS } from "../../theme";
import { useImperativeRef } from "../../utils";
import { GroupVariantsProps, StyledGroup } from "./group.styles";

interface Props {
    children?: React.ReactNode,
    borderWidth?: number | string,
    css?: CSS,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<GroupVariantsProps, keyof Props>;
export type GroupProps = Props & VariantsProps & { html?: HTMLProps};

const Group = React.forwardRef<HTMLDivElement, GroupProps>(({
    children,
    css,
    html,
    borderWidth,
    ...props
}, ref) => {
    const imperativeRef = useImperativeRef(ref);

    css = css ? css : {};
    if(borderWidth)
        css['$$groupBorderWidth'] = borderWidth;

    return (
        <StyledGroup
            ref={imperativeRef}
            css={css}
            {...html}
            {...props}
        >
            {children}
        </StyledGroup>
    )
})

export default React.memo(Group);