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

export type CardProps = Props & Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props> & Omit<CardVariantsProps, keyof Props>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    children,
    css,
    color,
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
            {...props}
        >
            {children}
        </StyledCard>
    );
})

export default React.memo(Card);