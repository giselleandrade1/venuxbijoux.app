import { NextResponse } from 'next/server';
import { getStore } from '../../../../lib/serverStore';

export async function GET(_request, { params }) {
    const { id } = await params;
    const store = getStore();
    const product = store.products.find((item) => Number(item.id) === Number(id));

    if (!product) {
        return NextResponse.json({ error: 'Produto nao encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
}
