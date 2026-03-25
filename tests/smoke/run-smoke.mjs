import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const PORT = 4010;
const BASE_URL = `http://127.0.0.1:${PORT}`;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 45000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            const response = await fetch(url);
            if (response.ok || response.status === 404) return;
        } catch {
            // keep polling
        }
        await sleep(500);
    }
    throw new Error('Servidor nao iniciou dentro do tempo esperado');
}

async function requestJson(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json().catch(() => ({}));
    return { response, data };
}

async function run() {
    const server = spawn('npm', ['run', 'start', '--', '--port', String(PORT)], {
        stdio: 'ignore',
        env: { ...process.env, NODE_ENV: 'development' },
        detached: true,
    });

    const waitForExit = () => new Promise((resolve) => {
        server.once('exit', () => resolve());
    });

    try {
        await waitForServer(`${BASE_URL}/api/products`);

        const { response: registerResponse, data: registerData } = await requestJson('/api/auth/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: 'Smoke User',
                email: 'smoke@venux.com',
                password: '123456',
            }),
        });

        assert.equal(registerResponse.status, 201);
        assert.ok(registerData.token);

        const token = registerData.token;

        const { response: addCartResponse } = await requestJson('/api/cart/items', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: 101, quantity: 2 }),
        });
        assert.equal(addCartResponse.status, 201);

        const { response: cartResponse, data: cartData } = await requestJson('/api/cart', {
            headers: { authorization: `Bearer ${token}` },
        });
        assert.equal(cartResponse.status, 200);
        assert.ok(Array.isArray(cartData.items));
        assert.ok(cartData.items.length > 0);

        const { response: checkoutResponse, data: checkoutData } = await requestJson('/api/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: 'Smoke User',
                email: 'smoke@venux.com',
                address: 'Rua Teste, 123',
                city: 'Sao Paulo',
                zip: '01000-000',
                shipping: 'standard',
            }),
        });

        assert.equal(checkoutResponse.status, 201);
        assert.ok(checkoutData.order?.id);

        const { response: ordersResponse, data: ordersData } = await requestJson('/api/orders', {
            headers: { authorization: `Bearer ${token}` },
        });
        assert.equal(ordersResponse.status, 200);
        assert.ok(Array.isArray(ordersData.items));
        assert.ok(ordersData.items.length >= 1);

        console.log('Smoke tests passed: auth/cart/checkout');
    } finally {
        try {
            process.kill(-server.pid, 'SIGTERM');
        } catch {
            // Process may already be gone.
        }
        await Promise.race([waitForExit(), sleep(1500)]);
        if (!server.killed) {
            try {
                process.kill(-server.pid, 'SIGKILL');
            } catch {
                // Process may already be gone.
            }
            await Promise.race([waitForExit(), sleep(1000)]);
        }
    }
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
