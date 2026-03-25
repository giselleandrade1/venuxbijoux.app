'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api';
import { useAuth } from './AuthContext';

const CommerceContext = createContext(null);

export function CommerceProvider({ children }) {
    const { token, isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshCart = useCallback(async () => {
        if (!token) {
            setCartItems([]);
            return;
        }

        const response = await apiRequest('/cart', { token });
        setCartItems(response.items || []);
    }, [token]);

    const refreshWishlist = useCallback(async () => {
        if (!token) {
            setWishlistItems([]);
            return;
        }

        const response = await apiRequest('/wishlist', { token });
        setWishlistItems(response.items || []);
    }, [token]);

    useEffect(() => {
        let active = true;
        async function bootstrap() {
            if (!token) {
                setCartItems([]);
                setWishlistItems([]);
                return;
            }
            setLoading(true);
            try {
                const [cartResponse, wishlistResponse] = await Promise.all([
                    apiRequest('/cart', { token }),
                    apiRequest('/wishlist', { token }),
                ]);
                if (!active) return;
                setCartItems(cartResponse.items || []);
                setWishlistItems(wishlistResponse.items || []);
            } catch (error) {
                if (!active) return;
                setCartItems([]);
                setWishlistItems([]);
            } finally {
                if (active) setLoading(false);
            }
        }

        bootstrap();
        return () => {
            active = false;
        };
    }, [token]);

    const addToCart = useCallback(async (productId, quantity = 1) => {
        if (!token) throw new Error('Entre na sua conta para adicionar ao carrinho');
        await apiRequest('/cart/items', {
            method: 'POST',
            token,
            body: JSON.stringify({ productId, quantity }),
        });
        await refreshCart();
    }, [refreshCart, token]);

    const updateCartQuantity = useCallback(async (productId, quantity) => {
        if (!token) throw new Error('Sessao invalida');
        await apiRequest(`/cart/items/${productId}`, {
            method: 'PUT',
            token,
            body: JSON.stringify({ quantity }),
        });
        await refreshCart();
    }, [refreshCart, token]);

    const removeFromCart = useCallback(async (productId) => {
        if (!token) throw new Error('Sessao invalida');
        await apiRequest(`/cart/items/${productId}`, {
            method: 'DELETE',
            token,
        });
        await refreshCart();
    }, [refreshCart, token]);

    const toggleWishlist = useCallback(async (productId) => {
        if (!token) throw new Error('Entre na sua conta para favoritar');
        const isFavorite = wishlistItems.some((item) => Number(item.id) === Number(productId));

        if (isFavorite) {
            await apiRequest(`/wishlist/items/${productId}`, { method: 'DELETE', token });
        } else {
            await apiRequest('/wishlist/items', {
                method: 'POST',
                token,
                body: JSON.stringify({ productId }),
            });
        }

        await refreshWishlist();
    }, [refreshWishlist, token, wishlistItems]);

    const checkout = useCallback(async (payload) => {
        if (!token) throw new Error('Entre na sua conta para finalizar o pedido');
        const response = await apiRequest('/orders', {
            method: 'POST',
            token,
            body: JSON.stringify(payload),
        });
        await refreshCart();
        return response.order;
    }, [refreshCart, token]);

    const cartSubtotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
        [cartItems],
    );

    const value = useMemo(() => ({
        loading,
        isAuthenticated,
        cartItems,
        wishlistItems,
        cartCount: cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
        wishlistCount: wishlistItems.length,
        cartSubtotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        checkout,
        refreshCart,
        refreshWishlist,
    }), [
        loading,
        isAuthenticated,
        cartItems,
        wishlistItems,
        cartSubtotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        checkout,
        refreshCart,
        refreshWishlist,
    ]);

    return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce() {
    const context = useContext(CommerceContext);
    if (!context) {
        throw new Error('useCommerce precisa ser usado dentro de CommerceProvider');
    }
    return context;
}
