import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Nome, email e mensagem sao obrigatorios' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'Mensagem enviada com sucesso' }, { status: 201 });
}
