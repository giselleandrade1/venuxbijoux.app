import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../lib/serverStore';

function enrichCartItems(rawItems = [], products = []) {
    return rawItems
        .map((item) => {
            const product = products.find((prod) => Number(prod.id) === Number(item.productId));
            if (!product) return null;
            const quantity = Number(item.quantity) || 1;
            return {
                productId: product.id,
                quantity,
                product,
                lineTotal: Number((product.price * quantity).toFixed(2)),
            };
        })
        .filter(Boolean);
}

export async function GET(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const store = getStore();
    const rawItems = store.carts[user.id] || [];
    const items = enrichCartItems(rawItems, store.products);
    const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

    return NextResponse.json({ items, subtotal });
}
