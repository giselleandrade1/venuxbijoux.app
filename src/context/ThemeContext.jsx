'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'venux-theme';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getSystemTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }
    return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

function getInitialPreference() {
    if (typeof window === 'undefined') {
        return 'system';
    }
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
}

function applyThemeAttributes(preference) {
    const root = document.documentElement;
    const resolved = preference === 'system' ? getSystemTheme() : preference;
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-theme-preference', preference);
    return resolved;
}

export function ThemeProvider({ children }) {
    const [themePreference, setThemePreference] = useState(() => getInitialPreference());
    const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());
    const resolvedTheme = themePreference === 'system' ? systemTheme : themePreference;

    useEffect(() => {
        applyThemeAttributes(themePreference);
    }, [themePreference, systemTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MEDIA_QUERY);

        const handleSystemThemeChange = () => setSystemTheme(getSystemTheme());

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [themePreference]);

    const setTheme = useCallback((preference) => {
        if (!['light', 'dark', 'system'].includes(preference)) {
            return;
        }
        window.localStorage.setItem(STORAGE_KEY, preference);
        setThemePreference(preference);
    }, []);

    const value = useMemo(() => ({
        themePreference,
        resolvedTheme,
        setTheme,
    }), [themePreference, resolvedTheme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme precisa ser usado dentro de ThemeProvider');
    }
    return context;
}