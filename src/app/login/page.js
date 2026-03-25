'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(form.email, form.password);
            const nextPath = typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('next')
                : null;
            const destination = nextPath && nextPath.startsWith('/') ? nextPath : '/products';
            router.push(destination);
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="section">
            <div className="container page-card narrow">
                <h1>Entrar na sua conta</h1>
                <p>Acesse seus pedidos, favoritos e checkout rapido.</p>
                <form className="stack-form" onSubmit={handleSubmit}>
                    <label htmlFor="login-email">E-mail</label>
                    <input
                        id="login-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    />
                    <label htmlFor="login-password">Senha</label>
                    <input
                        id="login-password"
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    />
                    {error ? <p className="muted" role="alert">{error}</p> : null}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processando...' : 'Entrar'}
                    </button>
                    <Link href="/register" className="btn btn-outline">Criar conta</Link>
                    <Link href="/forgot-password" className="btn btn-outline">Esqueci minha senha</Link>
                </form>
            </div>
        </section>
    );
}
