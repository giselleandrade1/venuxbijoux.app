"use client";

import ProductCard from '../../components/ProductCard';
import { useCommerce } from '../../context/CommerceContext';
import RequireAuth from '../../components/RequireAuth';

export default function WishlistPage() {
    const { wishlistItems } = useCommerce();

    return (
        <RequireAuth>
            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <p className="eyebrow">Favoritos</p>
                        <h1>Sua wishlist Venux</h1>
                        <p>Guarde suas pecas favoritas para finalizar depois.</p>
                    </div>
                    <div className="product-grid">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </RequireAuth>
    );
}
