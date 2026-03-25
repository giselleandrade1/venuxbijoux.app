import { apiRequest } from './api';

export const fetchCart = (token) => apiRequest('/cart', { token });

export const addCartItem = (token, productId, quantity = 1) =>
    apiRequest('/cart/items', {
        method: 'POST',
        token,
        body: JSON.stringify({ productId, quantity }),
    });

export const updateCartItem = (token, productId, quantity) =>
    apiRequest(`/cart/items/${productId}`, {
        method: 'PUT',
        token,
        body: JSON.stringify({ quantity }),
    });

export const deleteCartItem = (token, productId) =>
    apiRequest(`/cart/items/${productId}`, { method: 'DELETE', token });
