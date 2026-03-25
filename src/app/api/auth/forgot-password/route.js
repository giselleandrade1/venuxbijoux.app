import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getStore } from '../../../../lib/serverStore';

export async function POST(request) {
    const { email } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
        return NextResponse.json({ error: 'Email obrigatorio' }, { status: 400 });
    }

    const store = getStore();
    const user = store.users.find((item) => item.email.toLowerCase() === normalizedEmail);

    if (!user) {
        return NextResponse.json({
            ok: true,
            message: 'Se o email existir, enviaremos instrucoes para redefinir a senha.',
        });
    }

    const rawToken = crypto.randomBytes(12).toString('hex');
    store.resetTokens[rawToken] = {
        userId: user.id,
        expiresAt: Date.now() + 30 * 60 * 1000,
    };

    return NextResponse.json({
        ok: true,
        message: 'Se o email existir, enviaremos instrucoes para redefinir a senha.',
        resetToken: rawToken,
    });
}
