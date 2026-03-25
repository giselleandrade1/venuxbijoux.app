'use client';

import Link from 'next/link';
import RequireAuth from '../../components/RequireAuth';
import { useAuth } from '../../context/AuthContext';
import { useCommerce } from '../../context/CommerceContext';

export default function AccountPage() {
    const { user, logout } = useAuth();
    const { cartCount, wishlistCount } = useCommerce();

    return (
        <RequireAuth>
            <section className="section">
                <div className="container page-card">
                    <h1>Minha conta</h1>
                    <p>Bem-vinda, {user?.name || user?.email}.</p>
                    <div className="account-grid">
                        <article className="order-card">
                            <h3>Dados da conta</h3>
                            <p className="muted">Nome: {user?.name || 'Nao informado'}</p>
                            <p className="muted">E-mail: {user?.email}</p>
                        </article>
                        <article className="order-card">
                            <h3>Atalhos rapidos</h3>
                            <p className="muted">Carrinho: {cartCount} itens</p>
                            <p className="muted">Favoritos: {wishlistCount} itens</p>
                            <div className="details-actions">
                                <Link href="/orders" className="btn btn-outline">Meus pedidos</Link>
                                <Link href="/cart" className="btn btn-outline">Ir ao carrinho</Link>
                                <Link href="/wishlist" className="btn btn-outline">Ir aos favoritos</Link>
                            </div>
                        </article>
                    </div>
                    <div className="details-actions">
                        <button type="button" className="btn btn-primary" onClick={logout}>Sair da conta</button>
                    </div>
                </div>
            </section>
        </RequireAuth>
    );
}
