'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            const nextPath = pathname || '/';
            router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
        }
    }, [isAuthenticated, loading, pathname, router]);

    if (loading || !isAuthenticated) {
        return (
            <section className="section">
                <div className="container page-card narrow">
                    <h1>Redirecionando...</h1>
                    <p>Voce precisa entrar na sua conta para acessar esta area.</p>
                </div>
            </section>
        );
    }

    return children;
}
