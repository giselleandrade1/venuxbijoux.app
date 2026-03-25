export function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function minLength(value, min) {
    return String(value || '').length >= min;
}
