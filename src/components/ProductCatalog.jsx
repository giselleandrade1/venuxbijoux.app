'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

const categories = ['Todos', 'Brincos', 'Colares', 'Pulseiras', 'Aneis', 'Kits', 'Especiais'];

export default function ProductCatalog({ products }) {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    const filtered = useMemo(() => {
        let result = [...products];

        if (activeCategory !== 'Todos') {
            result = result.filter((item) => item.category === activeCategory);
        }

        if (query.trim()) {
            const normalizedQuery = query.toLowerCase();
            result = result.filter((item) => {
                const text = `${item.name} ${item.category} ${item.tag}`.toLowerCase();
                return text.includes(normalizedQuery);
            });
        }

        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
        if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
        if (sortBy === 'featured') result.sort((a, b) => Number(b.featured) - Number(a.featured));

        return result;
    }, [activeCategory, products, query, sortBy]);

    return (
        <>
            <section className="products-toolbar">
                <div className="pills">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`pill ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="controls">
                    <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Buscar por nome ou tag"
                    />

                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                        <option value="featured">Ordenar: Destaque</option>
                        <option value="price-asc">Preco: menor para maior</option>
                        <option value="price-desc">Preco: maior para menor</option>
                        <option value="rating">Melhor avaliacao</option>
                        <option value="name">Nome A-Z</option>
                    </select>

                    <span className="count">{filtered.length} itens</span>
                </div>
            </section>

            <section className="product-grid">
                {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </>
    );
}
