import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '../../../lib/data';
import { fetchProductById } from '../../../lib/productsApi';
import ProductDetailActions from '../../../components/ProductDetailActions';

export default async function ProductDetailsPage({ params }) {
    const { id } = await params;
    const product = await fetchProductById(id);

    if (!product) {
        return (
            <section className="section">
                <div className="container page-card">
                    <h1>Produto nao encontrado</h1>
                    <p>O item que voce buscou nao esta disponivel neste momento.</p>
                    <Link className="btn btn-primary" href="/products">Voltar para produtos</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container details-grid">
                <article className="details-media">
                    <Image src={product.image} alt={product.name} width={900} height={900} priority />
                </article>

                <article className="details-copy">
                    <span className="hero-badge">{product.tag}</span>
                    <h1>{product.name}</h1>
                    <p className="muted">Categoria: {product.category} • Nota {product.rating.toFixed(1)}</p>
                    <p>{product.description}</p>
                    <p className="price large">{formatCurrency(product.price)}</p>
                    <ProductDetailActions productId={product.id} />
                </article>
            </div>
        </section>
    );
}
