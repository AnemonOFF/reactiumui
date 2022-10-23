import { css } from "./stitches.config";

export const hideOnMedia = css({
    variants: {
        hideOnmedia: {
            xs: {
                "@xsMax": {
                    display: "none"
                }
            },
            sm: {
                "@smMax": {
                    display: "none"
                }
            },
            md: {
                "@mdMax": {
                    display: "none"
                }
            },
            lg: {
                "@lgMax": {
                    display: "none"
                }
            },
            xl: {
                "@xlMax": {
                    display: "none"
                }
            }
        }
    }
})


export const showOnMedia = css({
    variants: {
        showOnmedia: {
            xs: {
                "@xs": {
                    display: "none"
                }
            },
            sm: {
                "@sm": {
                    display: "none"
                }
            },
            md: {
                "@md": {
                    display: "none"
                }
            },
            lg: {
                "@lg": {
                    display: "none"
                }
            },
            xl: {
                "@xl": {
                    display: "none"
                }
            }
        }
    }
})

export const hideShowOnMedia = css(hideOnMedia, showOnMedia);

export const hideScroll = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
};

export const hideScrollVariant = css({
    variants: {
        hideScroll: {
            true: hideScroll
        }
    }
})