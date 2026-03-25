import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../lib/serverStore';

export async function GET(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const store = getStore();
    const productIds = store.wishlists[user.id] || [];
    const items = store.products.filter((product) => productIds.includes(product.id));

    return NextResponse.json({ items });
}
