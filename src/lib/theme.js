export const themeModes = ['light', 'dark', 'system'];

export function resolveThemeMode(preference, isSystemDark) {
    if (preference === 'system') {
        return isSystemDark ? 'dark' : 'light';
    }
    return preference === 'dark' ? 'dark' : 'light';
}
