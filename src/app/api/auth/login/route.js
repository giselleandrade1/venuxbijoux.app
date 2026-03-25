import { NextResponse } from 'next/server';
import { createTokenForUser, getStore, sanitizeUser } from '../../../../lib/serverStore';

export async function POST(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email e senha sao obrigatorios' }, { status: 400 });
    }

    const store = getStore();
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = store.users.find((item) => item.email.toLowerCase() === normalizedEmail);

    if (!user || user.password !== String(password)) {
        return NextResponse.json({ error: 'Credenciais invalidas' }, { status: 401 });
    }

    const token = createTokenForUser(user.id);
    return NextResponse.json({ token, user: sanitizeUser(user) });
}
