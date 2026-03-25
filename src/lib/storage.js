export function getStorageItem(key, fallback = null) {
    if (typeof window === 'undefined') return fallback;
    return window.localStorage.getItem(key) || fallback;
}

export function setStorageItem(key, value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
}

export function removeStorageItem(key) {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
}
