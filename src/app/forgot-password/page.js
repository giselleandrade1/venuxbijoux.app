'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '../../lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await apiRequest('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
            setMessage(response.message || 'Se o email existir, enviaremos instrucoes para redefinir a senha.');
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="section">
            <div className="container page-card narrow">
                <h1>Esqueci minha senha</h1>
                <p>Informe seu e-mail para receber as instrucoes de redefinicao.</p>
                <form className="stack-form" onSubmit={handleSubmit}>
                    <label htmlFor="forgot-email">E-mail</label>
                    <input
                        id="forgot-email"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {message ? <p className="muted" role="status">{message}</p> : null}
                    {error ? <p className="muted" role="alert">{error}</p> : null}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar instrucoes'}
                    </button>
                    <Link href="/login" className="btn btn-outline">Voltar ao login</Link>
                </form>
            </div>
        </section>
    );
}
