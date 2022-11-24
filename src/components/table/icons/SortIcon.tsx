import React from "react";
import { styled } from "../../../theme";

export type SortIconProps = {
    direction: 'top' | 'bottom' | 'none',
}

const StyledPath = styled('path', {
    fill: '$accent',
    variants: {
        active: {
            true: {
                fill: '$primary',
            }
        }
    }
})

const SortIcon: React.FunctionComponent<SortIconProps> = ({ direction }) => {
    return (
        <svg viewBox="0 0 24 24" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
            <StyledPath active={direction == 'top'} d="M11.2317787,2.3598156 C11.6049208,1.91204508 12.2716772,1.88219371 12.6839679,2.2702615 L12.7682213,2.3598156 L17.7682213,8.3598156 C18.2863222,8.98153675 17.8878644,9.91080124 17.1131715,9.99399528 L17,10 L7,10 C6.19070043,10 5.73190618,9.09899556 6.16394105,8.45060047 L6.23177872,8.3598156 L11.2317787,2.3598156 Z"/>
            <StyledPath active={direction == 'bottom'} d="M17,14 C17.8092996,14 18.2680938,14.9010044 17.836059,15.5493995 L17.7682213,15.6401844 L12.7682213,21.6401844 C12.3950792,22.0879549 11.7283228,22.1178063 11.3160321,21.7297385 L11.2317787,21.6401844 L6.23177872,15.6401844 C5.71367776,15.0184632 6.11213562,14.0891988 6.88682851,14.0060047 L7,14 L17,14 Z" />
        </svg>
    )
}

export default React.memo(SortIcon);