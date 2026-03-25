import crypto from 'node:crypto';
import { products as seededProducts } from './data';

function getGlobalStore() {
    if (!globalThis.__venuxStore) {
        globalThis.__venuxStore = {
            users: [],
            products: [...seededProducts],
            carts: {},
            wishlists: {},
            orders: [],
            sessions: {},
            resetTokens: {},
        };
    }
    return globalThis.__venuxStore;
}

export function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
    };
}

export function createTokenForUser(userId) {
    const token = crypto.randomUUID();
    const store = getGlobalStore();
    store.sessions[token] = userId;
    return token;
}

export function getUserFromAuthHeader(request) {
    const authHeader = request.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.slice(7);
    const store = getGlobalStore();
    const userId = store.sessions[token];
    if (!userId) {
        return null;
    }

    return store.users.find((item) => item.id === userId) || null;
}

export function getStore() {
    return getGlobalStore();
}

export function resetStore() {
    globalThis.__venuxStore = {
        users: [],
        products: [...seededProducts],
        carts: {},
        wishlists: {},
        orders: [],
        sessions: {},
        resetTokens: {},
    };
    return globalThis.__venuxStore;
}
