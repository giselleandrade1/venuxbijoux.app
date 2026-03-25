import { NextResponse } from 'next/server';
import { getStore } from '../../../../lib/serverStore';

export async function POST(request) {
    const { token, password } = await request.json();

    if (!token || !password || String(password).length < 6) {
        return NextResponse.json({ error: 'Token e nova senha valida sao obrigatorios' }, { status: 400 });
    }

    const store = getStore();
    const resetInfo = store.resetTokens[token];
    if (!resetInfo || resetInfo.expiresAt < Date.now()) {
        return NextResponse.json({ error: 'Token invalido ou expirado' }, { status: 400 });
    }

    const user = store.users.find((item) => item.id === resetInfo.userId);
    if (!user) {
        return NextResponse.json({ error: 'Usuario nao encontrado para este token' }, { status: 404 });
    }

    user.password = String(password);
    delete store.resetTokens[token];

    return NextResponse.json({ ok: true, message: 'Senha atualizada com sucesso' });
}
