import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../../lib/serverStore';

export async function POST(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity = 1 } = await request.json();
    const parsedProductId = Number(productId);
    const parsedQuantity = Math.max(1, Number(quantity) || 1);

    const store = getStore();
    const product = store.products.find((item) => Number(item.id) === parsedProductId);
    if (!product) {
        return NextResponse.json({ error: 'Produto nao encontrado' }, { status: 404 });
    }

    const userItems = store.carts[user.id] || [];
    const existing = userItems.find((item) => Number(item.productId) === parsedProductId);

    if (existing) {
        existing.quantity += parsedQuantity;
    } else {
        userItems.push({ productId: parsedProductId, quantity: parsedQuantity });
    }

    store.carts[user.id] = userItems;
    return NextResponse.json({ ok: true }, { status: 201 });
}
