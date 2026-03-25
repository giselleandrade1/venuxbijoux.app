import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../../../lib/serverStore';

export async function DELETE(request, { params }) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await params;
    const parsedProductId = Number(productId);

    const store = getStore();
    const wishlist = store.wishlists[user.id] || [];
    store.wishlists[user.id] = wishlist.filter((id) => Number(id) !== parsedProductId);

    return NextResponse.json({ ok: true });
}
