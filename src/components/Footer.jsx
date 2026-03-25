import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-grid">
                <section>
                    <h4>Links Rapidos</h4>
                    <ul>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/products">Produtos</Link></li>
                        <li><Link href="/about">Sobre</Link></li>
                        <li><Link href="/contact">Contato</Link></li>
                    </ul>
                </section>

                <section>
                    <h4>Loja</h4>
                    <ul>
                        <li><Link href="/products">Brincos</Link></li>
                        <li><Link href="/products">Colares</Link></li>
                        <li><Link href="/products">Pulseiras</Link></li>
                        <li><Link href="/products">Aneis</Link></li>
                        <li><Link href="/products">Kits Presenteaveis</Link></li>
                    </ul>
                </section>

                <section>
                    <h4>Suporte</h4>
                    <ul>
                        <li><Link href="/contact">Perguntas Frequentes</Link></li>
                        <li><Link href="/contact">Envios</Link></li>
                        <li><Link href="/contact">Trocas e Devolucoes</Link></li>
                        <li><Link href="/contact">Politicas</Link></li>
                    </ul>
                </section>

                <section>
                    <h4>Redes Sociais</h4>
                    <ul>
                        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a></li>
                        <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
                    </ul>
                </section>

                <section>
                    <h4>Fale Conosco</h4>
                    <ul>
                        <li>contato@venuxbijoux.com</li>
                        <li>(11) 99999-9999</li>
                        <li>Sao Paulo, Brasil</li>
                    </ul>
                </section>
            </div>

            <div className="container footer-bottom">
                <p>VENUX BIJOUX</p>
                <small>Copyright 2026 VENUX BIJOUX. Design e desenvolvimento por Giselle Andrade.</small>
            </div>
        </footer>
    );
}
