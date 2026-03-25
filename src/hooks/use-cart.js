'use client';

import { useCommerce } from '../context/CommerceContext';

export default function useCart() {
    const { cartItems, cartCount, cartSubtotal, addToCart, updateCartQuantity, removeFromCart } = useCommerce();
    return { cartItems, cartCount, cartSubtotal, addToCart, updateCartQuantity, removeFromCart };
}
