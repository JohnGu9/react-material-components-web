import React from "react";

export const PrefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

export function usePrefersColorSchemeDark(enable: boolean) {
    const [, setMediaDarkMode] = React.useState(PrefersColorSchemeDark.matches);
    React.useEffect(() => {
        if (enable === undefined) {
            const listener = () => {
                setMediaDarkMode(PrefersColorSchemeDark.matches);
            };
            PrefersColorSchemeDark.addEventListener('change', listener);
            return () => {
                PrefersColorSchemeDark.removeEventListener('change', listener);
            };
        }
    }, [enable]);
    return PrefersColorSchemeDark.matches;
}
