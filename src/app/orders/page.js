'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '../../lib/data';
import { apiRequest } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import RequireAuth from '../../components/RequireAuth';

export default function OrdersPage() {
    const { token, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        async function loadOrders() {
            if (!token) return;
            try {
                setLoading(true);
                const response = await apiRequest('/orders', { token });
                if (!active) return;
                setOrders(response.items || []);
            } catch (requestError) {
                if (!active) return;
                setError(requestError.message);
            } finally {
                if (active) setLoading(false);
            }
        }

        loadOrders();
        return () => {
            active = false;
        };
    }, [token]);

    return (
        <RequireAuth>
            <section className="section">
                <div className="container">
                    <article className="page-card">
                        <div className="orders-head">
                            <div>
                                <h1>Meus pedidos</h1>
                                <p>Acompanhe aqui os pedidos finalizados na sua conta.</p>
                            </div>
                            <button type="button" className="btn btn-outline" onClick={logout}>
                                Sair
                            </button>
                        </div>

                        {loading ? <p className="muted">Carregando pedidos...</p> : null}
                        {error ? <p className="muted">{error}</p> : null}

                        {!loading && !orders.length ? (
                            <p className="muted">Voce ainda nao possui pedidos.</p>
                        ) : (
                            <div className="orders-grid">
                                {orders.map((order) => (
                                    <article key={order.id} className="order-card">
                                        <h3>Pedido {order.id}</h3>
                                        <p className="muted">Status: {order.status}</p>
                                        <p className="muted">Data: {new Date(order.createdAt).toLocaleString('pt-BR')}</p>
                                        <ul className="line-list">
                                            {order.lines.map((line) => (
                                                <li key={`${order.id}-${line.productId}`}>
                                                    <span>{line.name} x {line.quantity}</span>
                                                    <strong>{formatCurrency(line.lineTotal)}</strong>
                                                </li>
                                            ))}
                                            <li>
                                                <span>Total</span>
                                                <strong>{formatCurrency(order.total)}</strong>
                                            </li>
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        )}
                    </article>
                </div>
            </section>
        </RequireAuth>
    );
}
