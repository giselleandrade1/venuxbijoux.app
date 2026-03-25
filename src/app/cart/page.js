'use client';

import Link from 'next/link';
import { formatCurrency } from '../../lib/data';
import { useCommerce } from '../../context/CommerceContext';
import RequireAuth from '../../components/RequireAuth';

export default function CartPage() {
    const { cartItems, cartSubtotal, updateCartQuantity, removeFromCart } = useCommerce();

    return (
        <RequireAuth>
            <section className="section">
                <div className="container checkout-grid">
                    <article className="page-card">
                        <h1>Seu carrinho</h1>
                        <p>Revise as pecas escolhidas antes de finalizar.</p>
                        <ul className="line-list">
                            {cartItems.map((item) => (
                                <li key={item.productId}>
                                    <span>
                                        {item.product.name} x {item.quantity}
                                    </span>
                                    <strong>{formatCurrency(item.lineTotal)}</strong>
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <aside className="page-card">
                        <h2>Resumo</h2>
                        <ul className="line-list">
                            <li><span>Subtotal</span><strong>{formatCurrency(cartSubtotal)}</strong></li>
                            <li><span>Frete</span><strong>Gratis</strong></li>
                            <li><span>Total</span><strong>{formatCurrency(cartSubtotal)}</strong></li>
                        </ul>
                        <Link href="/checkout" className="btn btn-primary">Ir para checkout</Link>
                    </aside>
                </div>
            </section>
        </RequireAuth>
    );
}
