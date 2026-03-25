'use client';

import { useState } from 'react';
import { formatCurrency } from '../../lib/data';
import { useCommerce } from '../../context/CommerceContext';
import RequireAuth from '../../components/RequireAuth';

export default function CheckoutPage() {
    const { cartItems, cartSubtotal, checkout } = useCommerce();
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        shipping: 'standard',
    });
    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');

        try {
            const order = await checkout(form);
            setMessage(`Pedido ${order.id} confirmado com sucesso.`);
        } catch (error) {
            setMessage(error.message);
        }
    }

    const shippingPrice = form.shipping === 'express' ? 24.9 : 0;
    const total = cartSubtotal + shippingPrice;

    return (
        <RequireAuth>
            <section className="section">
                <div className="container checkout-grid">
                    <article className="page-card">
                        <h1>Checkout</h1>
                        <p>Finalize sua compra com seguranca.</p>
                        <form className="stack-form" onSubmit={handleSubmit}>
                            <label htmlFor="checkout-name">Nome completo</label>
                            <input
                                id="checkout-name"
                                type="text"
                                required
                                value={form.name}
                                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                            />
                            <label htmlFor="checkout-email">E-mail</label>
                            <input
                                id="checkout-email"
                                type="email"
                                required
                                value={form.email}
                                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                            />
                            <label htmlFor="checkout-address">Endereco</label>
                            <input
                                id="checkout-address"
                                type="text"
                                required
                                value={form.address}
                                onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                            />
                            <div className="mini-grid">
                                <div className="stack-form">
                                    <label htmlFor="checkout-city">Cidade</label>
                                    <input
                                        id="checkout-city"
                                        type="text"
                                        required
                                        value={form.city}
                                        onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                                    />
                                </div>
                                <div className="stack-form">
                                    <label htmlFor="checkout-zip">CEP</label>
                                    <input
                                        id="checkout-zip"
                                        type="text"
                                        required
                                        value={form.zip}
                                        onChange={(event) => setForm((prev) => ({ ...prev, zip: event.target.value }))}
                                    />
                                </div>
                            </div>
                            <label htmlFor="checkout-shipping">Tipo de entrega</label>
                            <select
                                id="checkout-shipping"
                                value={form.shipping}
                                onChange={(event) => setForm((prev) => ({ ...prev, shipping: event.target.value }))}
                            >
                                <option value="standard">Entrega padrao (gratis)</option>
                                <option value="express">Entrega expressa (R$ 24,90)</option>
                            </select>
                            {message ? <p className="muted" role="status">{message}</p> : null}
                            <button type="submit" className="btn btn-primary" disabled={!cartItems.length}>
                                Confirmar pedido
                            </button>
                        </form>
                    </article>

                    <aside className="page-card">
                        <h2>Resumo do pedido</h2>
                        <ul className="line-list">
                            <li><span>Itens</span><strong>{cartItems.length}</strong></li>
                            <li><span>Entrega</span><strong>{form.shipping === 'express' ? 'Expressa' : 'Padrao'}</strong></li>
                            <li><span>Total</span><strong>{formatCurrency(total)}</strong></li>
                        </ul>
                    </aside>
                </div>
            </section>
        </RequireAuth>
    );
}
