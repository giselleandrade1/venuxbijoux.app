import { NextResponse } from 'next/server';
import { getStore, getUserFromAuthHeader } from '../../../lib/serverStore';

export async function GET(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const store = getStore();
    const items = store.orders.filter((order) => order.userId === user.id);
    return NextResponse.json({ items });
}

export async function POST(request) {
    const user = getUserFromAuthHeader(request);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, address, city, zip, shipping = 'standard' } = await request.json();

    if (!name || !email || !address || !city || !zip) {
        return NextResponse.json({ error: 'Dados de entrega incompletos' }, { status: 400 });
    }

    const store = getStore();
    const cartItems = store.carts[user.id] || [];
    if (!cartItems.length) {
        return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    const lines = cartItems
        .map((item) => {
            const product = store.products.find((prod) => Number(prod.id) === Number(item.productId));
            if (!product) return null;
            const quantity = Number(item.quantity) || 1;
            return {
                productId: product.id,
                name: product.name,
                quantity,
                unitPrice: product.price,
                lineTotal: Number((product.price * quantity).toFixed(2)),
            };
        })
        .filter(Boolean);

    const subtotal = Number(lines.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
    const shippingPrice = shipping === 'express' ? 24.9 : 0;
    const total = Number((subtotal + shippingPrice).toFixed(2));

    const order = {
        id: `ord_${Date.now()}`,
        userId: user.id,
        customer: { name, email, address, city, zip },
        shipping,
        shippingPrice,
        lines,
        subtotal,
        total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
    };

    store.orders.push(order);
    store.carts[user.id] = [];

    return NextResponse.json({ order }, { status: 201 });
}
