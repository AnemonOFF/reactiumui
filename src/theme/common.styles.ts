import { css } from "./stitches.config";

export const hideOnMedia = css({
    variants: {
        hideOnmedia: {
            xs: {
                "@xsMax": {
                    display: "none !important"
                }
            },
            sm: {
                "@smMax": {
                    display: "none !important"
                }
            },
            md: {
                "@mdMax": {
                    display: "none !important"
                }
            },
            lg: {
                "@lgMax": {
                    display: "none !important"
                }
            },
            xl: {
                "@xlMax": {
                    display: "none !important"
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
                    display: "none !important"
                }
            },
            sm: {
                "@sm": {
                    display: "none !important"
                }
            },
            md: {
                "@md": {
                    display: "none !important"
                }
            },
            lg: {
                "@lg": {
                    display: "none !important"
                }
            },
            xl: {
                "@xl": {
                    display: "none !important"
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