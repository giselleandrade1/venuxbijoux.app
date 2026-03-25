import { NextResponse } from 'next/server';
import { getStore } from '../../../lib/serverStore';

export async function GET(request) {
    const store = getStore();
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');

    let items = [...store.products];

    if (category) {
        const normalizedCategory = category.toLowerCase();
        items = items.filter((item) => item.category.toLowerCase() === normalizedCategory);
    }

    if (featured === 'true') {
        items = items.filter((item) => item.featured);
    }

    if (query) {
        const normalizedQuery = query.toLowerCase();
        items = items.filter((item) => `${item.name} ${item.category} ${item.tag}`.toLowerCase().includes(normalizedQuery));
    }

    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ items, total: items.length });
}
