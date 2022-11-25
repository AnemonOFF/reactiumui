import React from "react";

const FilterIcon: React.FunctionComponent = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	    viewBox="0 0 512 512" enableBackground="new 0 0 512 512" xmlSpace="preserve">
            <g>
            	<g>
            		<polygon points="0,0 0,128 201.143,329.143 201.143,512 310.857,475.429 310.857,329.143 512,128 512,0"/>
            	</g>
            </g>
        </svg>
    )
}

export default React.memo(FilterIcon);