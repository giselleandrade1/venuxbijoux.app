export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function toSlug(text) {
    return String(text || '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
}
