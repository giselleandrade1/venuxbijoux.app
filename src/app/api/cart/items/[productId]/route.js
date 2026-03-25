import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../../../lib/serverStore';

export async function PUT(request, { params }) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await params;
    const parsedProductId = Number(productId);
    const { quantity } = await request.json();
    const parsedQuantity = Math.max(1, Number(quantity) || 1);

    const store = getStore();
    const userItems = store.carts[user.id] || [];
    const existing = userItems.find((item) => Number(item.productId) === parsedProductId);
    if (existing) {
        existing.quantity = parsedQuantity;
    }
    store.carts[user.id] = userItems;

    return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await params;
    const parsedProductId = Number(productId);

    const store = getStore();
    const userItems = store.carts[user.id] || [];
    store.carts[user.id] = userItems.filter((item) => Number(item.productId) !== parsedProductId);

    return NextResponse.json({ ok: true });
}
