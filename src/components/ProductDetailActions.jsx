'use client';

import { useRouter } from 'next/navigation';
import { useCommerce } from '../context/CommerceContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetailActions({ productId }) {
    const router = useRouter();
    const { addToCart, toggleWishlist, wishlistItems } = useCommerce();
    const { showToast } = useToast();
    const isFavorite = wishlistItems.some((item) => Number(item.id) === Number(productId));

    async function handleAddToCart() {
        try {
            await addToCart(productId, 1);
            showToast('Produto adicionado ao carrinho.', 'success');
        } catch (error) {
            showToast(error.message, 'error');
            router.push('/login');
        }
    }

    async function handleToggleFavorite() {
        try {
            await toggleWishlist(productId);
            showToast(
                isFavorite ? 'Produto removido dos favoritos.' : 'Produto adicionado aos favoritos.',
                'success',
            );
        } catch (error) {
            showToast(error.message, 'error');
            router.push('/login');
        }
    }

    return (
        <div className="details-actions">
            <button className="btn btn-primary" type="button" onClick={handleAddToCart}>
                Adicionar ao carrinho
            </button>
            <button className="btn btn-outline" type="button" onClick={handleToggleFavorite}>
                {isFavorite ? 'Remover favorito' : 'Favoritar'}
            </button>
        </div>
    );
}
