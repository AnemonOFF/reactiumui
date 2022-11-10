import React, { ReactNode, useMemo, useState } from "react";
import { useImperativeRef, useThemeColor } from "../../utils/hooks";
import { CardVariantsProps, StyledCard } from "./card.styles";
import { CSS } from "../../theme";
import { ThemedColors } from "../../utils";

interface Props {
    children?: ReactNode,
    css?: CSS,
    color?: ThemedColors | string,
}
type HTMLProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
type VariantsProps = Omit<CardVariantsProps, keyof Props>;
export type CardProps = Props & VariantsProps & { html?: HTMLProps};

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    children,
    css,
    color,
    html,
    ...props
}, ref) => {

    const imperativeRef = useImperativeRef(ref);
    const bgColor = useThemeColor(color);

    const customCss = useMemo(() => {
        const result: CSS = {...css};
        if(bgColor !== undefined)
            result.background = bgColor;
        return result;
    }, [css, color]);

    return (
        <StyledCard
            ref={imperativeRef}
            css={customCss}
            {...html}
            {...props}
        >
            {children}
        </StyledCard>
    );
})

export default React.memo(Card);