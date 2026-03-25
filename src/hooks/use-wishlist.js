'use client';

import { useCommerce } from '../context/CommerceContext';

export default function useWishlist() {
    const { wishlistItems, wishlistCount, toggleWishlist, refreshWishlist } = useCommerce();
    return { wishlistItems, wishlistCount, toggleWishlist, refreshWishlist };
}
