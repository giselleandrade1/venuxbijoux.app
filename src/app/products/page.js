import ProductCatalog from '../../components/ProductCatalog';
import { fetchProducts } from '../../lib/productsApi';

export const metadata = {
    title: 'Venux Bijoux | Produtos',
};

export default async function ProductsPage() {
    const products = await fetchProducts();

    return (
        <section className="section">
            <div className="container">
                <article className="products-hero">
                    <h1>Nossos produtos premium</h1>
                    <p>
                        Filtros inteligentes para encontrar brincos, colares, pulseiras, aneis e colecoes
                        especiais.
                    </p>
                </article>

                <ProductCatalog products={products} />
            </div>
        </section>
    );
}
