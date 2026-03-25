'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCommerce } from '../context/CommerceContext';
import { useTheme } from '../context/ThemeContext';

const menuLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/products', label: 'Produtos' },
    { href: '/about', label: 'Sobre' },
    { href: '/contact', label: 'Contato' },
];

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3.75v2.1M12 18.15v2.1M20.25 12h-2.1M5.85 12h-2.1M17.84 6.16l-1.49 1.49M7.65 16.35l-1.49 1.49M17.84 17.84l-1.49-1.49M7.65 7.65 6.16 6.16" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.2 3.8a8.9 8.9 0 1 0 5 12.4A8.2 8.2 0 0 1 15.2 3.8Z" />
        </svg>
    );
}

function SystemIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.3" y="4.3" width="17.4" height="12.4" rx="2" />
            <path d="M9 19.7h6M12 16.7v3" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7-4.35-7-9.62A4.38 4.38 0 0 1 12 6.9a4.38 4.38 0 0 1 7 3.48C19 15.65 12 20 12 20Z" />
        </svg>
    );
}

function CartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 5h2l1.2 7.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 .98-.8L19.2 7H7" />
            <circle cx="10" cy="18" r="1.35" />
            <circle cx="17" cy="18" r="1.35" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8.1" r="3.1" />
            <path d="M5.5 19c.6-2.9 3-4.8 6.5-4.8s5.9 1.9 6.5 4.8" />
        </svg>
    );
}

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { cartCount, wishlistCount } = useCommerce();
    const { themePreference, setTheme } = useTheme();

    const themeOptions = [
        { value: 'light', label: 'Tema claro', Icon: SunIcon },
        { value: 'dark', label: 'Tema escuro', Icon: MoonIcon },
        { value: 'system', label: 'Tema do sistema', Icon: SystemIcon },
    ];

    return (
        <header className="site-header">
            <div className="topbar">Colecao 2026 com ate 25% OFF em pecas selecionadas</div>

            <div className="container header-shell">
                <div className="brand-wrap">
                    <Link href="/" className="brand">
                        VENUX BIJOUX
                    </Link>
                    <small>Pecas delicadas feitas com charme e carinho</small>
                </div>

                <nav className="main-nav" aria-label="Navegacao principal">
                    {menuLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={isActive ? 'active' : ''}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="header-actions">
                    <div className="theme-switcher" role="group" aria-label="Alternar tema">
                        {themeOptions.map((option) => {
                            const isActive = themePreference === option.value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`theme-btn${isActive ? ' is-active' : ''}`}
                                    data-theme-value={option.value}
                                    aria-label={option.label}
                                    aria-pressed={isActive}
                                    onClick={() => setTheme(option.value)}
                                >
                                    <option.Icon />
                                </button>
                            );
                        })}
                    </div>
                    <Link href="/wishlist" className="header-icon-btn" aria-label="Favoritos">
                        <span className="action-glyph" aria-hidden="true">
                            <HeartIcon />
                        </span>
                        {wishlistCount > 0 ? <span className="icon-count">{wishlistCount}</span> : null}
                    </Link>
                    <button
                        type="button"
                        className="header-icon-btn"
                        aria-label="Carrinho"
                        onClick={() => router.push('/cart')}
                    >
                        <span className="action-glyph" aria-hidden="true">
                            <CartIcon />
                        </span>
                        {cartCount > 0 ? <span className="icon-count">{cartCount}</span> : null}
                    </button>
                    {isAuthenticated ? (
                        <Link href="/orders" className="btn btn-primary header-login-btn" aria-label="Minha conta">
                            <span className="action-glyph" aria-hidden="true">
                                <UserIcon />
                            </span>
                        </Link>
                    ) : (
                        <Link href="/login" className="btn btn-primary header-login-btn" aria-label="Entrar">
                            <span className="action-glyph" aria-hidden="true">
                                <UserIcon />
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
