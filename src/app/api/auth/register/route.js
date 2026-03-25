import { NextResponse } from 'next/server';
import { createTokenForUser, getStore, sanitizeUser } from '../../../../lib/serverStore';

export async function POST(request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password || String(password).length < 6) {
        return NextResponse.json({ error: 'Nome, email e senha (minimo 6 caracteres) sao obrigatorios' }, { status: 400 });
    }

    const store = getStore();
    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = store.users.find((user) => user.email.toLowerCase() === normalizedEmail);
    if (exists) {
        return NextResponse.json({ error: 'Email ja cadastrado' }, { status: 409 });
    }

    const user = {
        id: `u_${Date.now()}`,
        name: String(name).trim(),
        email: normalizedEmail,
        password: String(password),
        role: 'user',
        createdAt: new Date().toISOString(),
    };

    store.users.push(user);
    store.carts[user.id] = [];
    store.wishlists[user.id] = [];

    const token = createTokenForUser(user.id);
    return NextResponse.json({ token, user: sanitizeUser(user) }, { status: 201 });
}
