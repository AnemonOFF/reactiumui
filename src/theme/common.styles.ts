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

export const blurBackground = {
    "&::before": {
        content: "",
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '$backgroundAlpha',
        backdropFilter: 'saturate(180%) blur(9px)',
        zIndex: '-1',
    }
}

export const blurBackgroundVariant = css({
    variants: {
        blur: {
            true: {
                background: 'transparent',
                ...blurBackground
            }
        }
    }
})