import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../../lib/serverStore';

export async function POST(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();
    const parsedProductId = Number(productId);
    if (!parsedProductId) {
        return NextResponse.json({ error: 'productId obrigatorio' }, { status: 400 });
    }

    const store = getStore();
    const product = store.products.find((item) => Number(item.id) === parsedProductId);
    if (!product) {
        return NextResponse.json({ error: 'Produto nao encontrado' }, { status: 404 });
    }

    const wishlist = store.wishlists[user.id] || [];
    if (!wishlist.includes(parsedProductId)) {
        wishlist.push(parsedProductId);
    }
    store.wishlists[user.id] = wishlist;

    return NextResponse.json({ ok: true }, { status: 201 });
}
