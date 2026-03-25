import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../components/ProductCard';
import { categories, galleryImages } from '../lib/data';
import { fetchProducts } from '../lib/productsApi';

export default async function HomePage() {
    const products = await fetchProducts();
    const featured = products.filter((item) => item.featured).slice(0, 6);

    return (
        <>
            <section className="section">
                <div className="container hero-card">
                    <div className="hero-copy">
                        <span className="hero-badge">Colecao 2026</span>
                        <h1>A delicadeza que transforma cada detalhe em estilo</h1>
                        <p>
                            Explore acessorios artesanais, bijuterias elegantes e colecoes encantadoras em uma
                            experiencia premium.
                        </p>
                        <div className="hero-actions">
                            <Link href="/products" className="btn btn-primary">Ver todos os produtos</Link>
                            <Link href="/login" className="btn btn-outline">Entrar na conta</Link>
                            <Link href="/products" className="btn btn-outline">Ate 25% OFF</Link>
                        </div>
                    </div>
                    <div className="hero-media">
                        <Image
                            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=80"
                            alt="Colecao premium Venux Bijoux"
                            width={960}
                            height={640}
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <p className="eyebrow">Categorias em destaque</p>
                        <h2>Escolha seu estilo favorito</h2>
                        <p>Quatro universos para compor seu visual com identidade artesanal.</p>
                    </div>
                    <div className="category-grid">
                        {categories.map((category) => (
                            <article className="category-card" key={category.id}>
                                <Image src={category.image} alt={category.name} width={420} height={280} loading="lazy" />
                                <h3>{category.name}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <p className="eyebrow">Mais pedidos</p>
                        <h2>Pecas queridinhas da colecao</h2>
                        <p>Selecao premium com acabamentos delicados e alta avaliacao.</p>
                    </div>
                    <div className="product-grid">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container cta-block">
                    <div>
                        <h2>Surpreenda com delicadeza em cada detalhe</h2>
                        <p>
                            Cadastre-se para acessar colecoes exclusivas, favoritos e compras em poucos cliques.
                        </p>
                    </div>
                    <Link href="/products" className="btn btn-primary">Explorar ofertas</Link>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-head">
                        <p className="eyebrow">Momentos que inspiram</p>
                        <h2>Uma galeria delicada para reforcar a essencia da Venux Bijoux</h2>
                    </div>
                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                            <Image key={image} src={image} alt={`Galeria ${index + 1}`} width={640} height={480} loading="lazy" />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container newsletter">
                    <div>
                        <h2>Ganhe um toque extra de charme</h2>
                        <p>
                            Cadastre seu e-mail para receber novidades, lancamentos e ofertas especiais da Venux
                            Bijoux.
                        </p>
                    </div>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Digite seu melhor e-mail" />
                        <button type="submit" className="btn btn-primary">Quero meu cupom</button>
                    </form>
                </div>
            </section>
        </>
    );
}
