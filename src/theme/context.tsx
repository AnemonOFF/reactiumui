import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import darkTheme from "./darkTheme";
import { Globals } from "./global";
import lightTheme from "./lightTheme";
import { createTheme, DefaultThemes } from "./stitches.config";

const isServer = typeof window === 'undefined';
const storageKey = 'reactiumui_theme';

export type ReactiumTheme = {
    name: string,
    theme: ReturnType<typeof createTheme>
}

export type ReactiumThemeContextType = ReactiumTheme & {
    setTheme: (name: string) => void
}

export const ReactiumThemeContext = React.createContext<ReactiumThemeContextType | undefined>(undefined);

export type ThemeHook = (
    themes: ReactiumTheme[],
    defaultTheme: string,
    ignoreUserPreference: boolean
) => ReactiumThemeContextType;

export interface ReactiumThemeProviderProps {
    customThemes?: ReactiumTheme[],
    defaultTheme?: DefaultThemes | string,
    children?: React.ReactNode,
    ignoreUserPreference?: boolean,
    disableGlobalCss?: boolean,
    scrollbar?: boolean
}

const ReactiumThemeProvider: React.FunctionComponent<ReactiumThemeProviderProps> = ({ customThemes, children, defaultTheme, ignoreUserPreference, disableGlobalCss, scrollbar }) => {
    const context = useContext(ReactiumThemeContext);

    if(context)
        return <Fragment>{children}</Fragment>
    return <Theme children={children} customThemes={customThemes} defaultTheme={defaultTheme} ignoreUserPreference={ignoreUserPreference} disableGlobalCss={disableGlobalCss} scrollbar={scrollbar} />
}

const Theme: React.FunctionComponent<ReactiumThemeProviderProps> = ({ children, defaultTheme, customThemes = [], ignoreUserPreference = false, disableGlobalCss = false, scrollbar = false }) => {
    if(customThemes.length === 0)
        customThemes.push(lightTheme, darkTheme);
    defaultTheme = defaultTheme ?? customThemes[0].name;
    
    let defaultReactiumTheme = customThemes.find(t => t.name == defaultTheme);
    const [theme, setTheme] = useState<ReactiumTheme>(defaultReactiumTheme ?? customThemes[0]);

    const changeTheme = useCallback((themeName: string) => {
        const newTheme = customThemes.find(t => t.name == themeName);
        if (isServer || newTheme === undefined)
            return;
        document.documentElement.classList.remove(theme.theme.className);
        document.documentElement.classList.add(newTheme.theme.className);
        try{
            localStorage.setItem(storageKey, themeName);
        }
        catch (e){
        }
        setTheme(newTheme);
    }, [theme, customThemes, setTheme])

    const setScrollbarStyles = useCallback(() => {
        if (isServer)
            return;
        const style = document.createElement('style');
        style.innerHTML = `
        *::-webkit-scrollbar,
        *::-webkit-scrollbar-thumb {
          width: 9px;
          height: 9px;
          border-radius: 5px;
          background-clip: padding-box;
          border: 2px solid transparent;
        }
        
        *::-webkit-scrollbar-thumb {        
          box-shadow: inset 0 0 0 5px #697177;
        }`;
        document.getElementsByTagName('head')[0].appendChild(style);
        return () => {
            document.getElementsByTagName('head')[0].removeChild(style);
        }
    }, [])

    useEffect(() => {
        let initTheme = theme.name;
        const storageTheme = localStorage?.getItem(storageKey);
        initTheme = ignoreUserPreference ? initTheme : storageTheme ?? initTheme;
        if(!ignoreUserPreference &&
            customThemes.find(t => t.name == storageTheme) === undefined &&
            window?.matchMedia !== undefined &&
            customThemes.filter(t => t.name == 'light' || t.name == 'dark').length == 2 &&
            (!storageTheme || storageTheme == 'light' || storageTheme == 'dark'))
        {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
                initTheme = 'dark';
                if(localStorage)
                    localStorage.setItem(storageKey, 'dark');
            }
            if(window.matchMedia('(prefers-color-scheme: light)').matches) {
                initTheme = 'light';
                if(localStorage)
                    localStorage.setItem(storageKey, 'light');
            }
        }
        const resultInitTheme = customThemes.find(t => t.name == initTheme);
        if(resultInitTheme)
            setTheme(resultInitTheme);
        else
            initTheme = theme.name;
        changeTheme(initTheme);
        if(scrollbar)
            setScrollbarStyles();
    }, [])

    return (
        <ReactiumThemeContext.Provider value={{name: theme.name, theme: theme.theme, setTheme: changeTheme}}>
            {!disableGlobalCss && <Globals />}
            {children}
            <ThemeInitScript themes={customThemes} defaultTheme={defaultTheme} ignoreUserPreference={ignoreUserPreference} />
        </ReactiumThemeContext.Provider>
    );
}

interface ThemeInitScriptProps {
    themes: ReactiumTheme[],
    defaultTheme: string,
    ignoreUserPreference: boolean
}

type ThemesClassNames = {[name: string]: string};

const ThemeInitScript: React.FunctionComponent<ThemeInitScriptProps> = React.memo(({ themes, defaultTheme, ignoreUserPreference }) => {
    const defaultThemeClassName = (themes.find(t => t.name === defaultTheme) || themes[0]).theme.className;
    const themesClassNames: ThemesClassNames = themes.reduce((obj, t) => ({...obj, [t.name]: t.theme.className}), {});

    let script;
    if(ignoreUserPreference){
        script = `document.documentElement.classList.add('${defaultThemeClassName}');`;
    } else {
        script = `
            const reactium_defaultThemeClassName = '${defaultThemeClassName}';
            const reactium_themesClassNames = ${JSON.stringify(themesClassNames)};
            const reactium_storageThemeName = localStorage?.getItem('${storageKey}');
            let reactium_storageThemeClassName = reactium_themesClassNames[reactium_storageThemeName];
            if(reactium_storageThemeClassName === undefined && localStorage !== undefined){
                localStorage.setItem('${storageKey}', '${defaultTheme}');
            }
            ${themes.filter(t => t.name == 'light' || t.name == 'dark').length == 2 && `
            if(!reactium_storageThemeClassName && window?.matchMedia !== undefined && (!reactium_storageThemeName || reactium_storageThemeName == 'light' || reactium_storageThemeName == 'dark')) {
                if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                    reactium_storageThemeClassName = reactium_themesClassNames['dark'];
                    if(localStorage)
                        localStorage.setItem('${storageKey}', 'dark');
                }
                if(window.matchMedia('(prefers-color-scheme: light)').matches){
                    reactium_storageThemeClassName = reactium_themesClassNames['light'];
                    if(localStorage)
                        localStorage.setItem('${storageKey}', 'light');
                }
            }
            `}
            document.documentElement.classList.add(reactium_storageThemeClassName ?? reactium_defaultThemeClassName);
        `;
    }

    return (
        <script dangerouslySetInnerHTML={{__html: script}} />
    );
}, () => true)

export const useReactiumTheme = (): ReactiumThemeContextType => {
    const context = useContext(ReactiumThemeContext);
    if(context === undefined)
        throw Error('Context is undefined. Are you set ReactiumThemeProvider?');
    return {
        name: context.name,
        setTheme: context.setTheme,
        theme: context.theme,
    };
}

export default ReactiumThemeProvider;