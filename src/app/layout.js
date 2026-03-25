import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppProviders from '../components/providers/AppProviders';

export const metadata = {
    metadataBase: new URL('http://localhost:3000'),
    title: {
        default: 'Venux Bijoux',
        template: '%s | Venux Bijoux',
    },
    description: 'E-commerce premium da Venux Bijoux com colecoes autorais, carrinho, favoritos e checkout integrado.',
    openGraph: {
        title: 'Venux Bijoux',
        description: 'E-commerce premium da Venux Bijoux com colecoes autorais.',
        type: 'website',
        locale: 'pt_BR',
        siteName: 'Venux Bijoux',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Venux Bijoux',
        description: 'E-commerce premium da Venux Bijoux com colecoes autorais.',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light dark',
};

export default function RootLayout({ children }) {
    const themeBootScript = `
        (function() {
            try {
                var key = 'venux-theme';
                var preference = localStorage.getItem(key) || 'system';
                var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var resolved = preference === 'system' ? (isDark ? 'dark' : 'light') : preference;
                document.documentElement.setAttribute('data-theme', resolved);
                document.documentElement.setAttribute('data-theme-preference', preference);
            } catch (error) {
                document.documentElement.setAttribute('data-theme', 'light');
                document.documentElement.setAttribute('data-theme-preference', 'system');
            }
        })();`;

    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <a href="#main-content" className="skip-link">Pular para o conteudo principal</a>
                <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
                <AppProviders>
                    <Header />
                    <main id="main-content">{children}</main>
                    <Footer />
                </AppProviders>
            </body>
        </html>
    );
}
