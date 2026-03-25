'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '../lib/data';
import { useCommerce } from '../context/CommerceContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
    const { addToCart, toggleWishlist, wishlistItems } = useCommerce();
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const isFavorite = wishlistItems.some((item) => Number(item.id) === Number(product.id));

    async function handleAddToCart() {
        try {
            await addToCart(product.id, 1);
            showToast('Produto adicionado ao carrinho.', 'success');
        } catch (error) {
            showToast(error.message, 'error');
            router.push('/login');
        }
    }

    async function handleToggleFavorite() {
        try {
            await toggleWishlist(product.id);
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
        <article className="product-card">
            <span className="badge">{product.tag}</span>
            <Image src={product.image} alt={product.name} width={420} height={320} loading="lazy" />
            <h3>{product.name}</h3>
            <p className="muted">{product.category} • Nota {product.rating.toFixed(1)}</p>
            <p className="price">{formatCurrency(product.price)}</p>
            <div className="card-actions">
                <Link href={`/products/${product.id}`} className="btn btn-outline">Ver detalhes</Link>
                <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
                    Adicionar ao carrinho
                </button>
            </div>
            <button type="button" className="btn btn-outline" onClick={handleToggleFavorite}>
                {isFavorite && isAuthenticated ? 'Remover favorito' : 'Favoritar'}
            </button>
        </article>
    );
}
