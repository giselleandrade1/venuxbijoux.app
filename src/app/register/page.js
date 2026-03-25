'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        acceptTerms: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('As senhas nao coincidem.');
            return;
        }

        if (!form.acceptTerms) {
            setError('Voce precisa aceitar os termos para continuar.');
            return;
        }

        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            router.push('/account');
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="section">
            <div className="container page-card narrow">
                <h1>Criar conta</h1>
                <p>Cadastre-se para salvar favoritos, acompanhar pedidos e finalizar compras com mais rapidez.</p>
                <form className="stack-form" onSubmit={handleSubmit}>
                    <label htmlFor="register-name">Nome</label>
                    <input
                        id="register-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    />

                    <label htmlFor="register-email">E-mail</label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    />

                    <label htmlFor="register-phone">Telefone (opcional)</label>
                    <input
                        id="register-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    />

                    <label htmlFor="register-password">Senha</label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    />

                    <label htmlFor="register-confirm-password">Confirmar senha</label>
                    <input
                        id="register-confirm-password"
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={6}
                        value={form.confirmPassword}
                        onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    />

                    <label className="checkline" htmlFor="register-terms">
                        <input
                            id="register-terms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={form.acceptTerms}
                            onChange={(event) => setForm((prev) => ({ ...prev, acceptTerms: event.target.checked }))}
                        />
                        <span>Aceito os termos de uso e politica de privacidade.</span>
                    </label>

                    {error ? <p className="muted" role="alert">{error}</p> : null}

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar conta'}
                    </button>

                    <Link href="/login" className="btn btn-outline">Ja tenho conta</Link>
                </form>
            </div>
        </section>
    );
}
