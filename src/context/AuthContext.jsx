'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => {
        if (typeof window === 'undefined') {
            return null;
        }
        return window.localStorage.getItem('authToken');
    });

    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') {
            return null;
        }
        const savedUser = window.localStorage.getItem('authUser');
        if (!savedUser) {
            return null;
        }
        try {
            return JSON.parse(savedUser);
        } catch {
            return null;
        }
    });

    const loading = false;

    async function login(email, password) {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        setToken(response.token);
        setUser(response.user);
        window.localStorage.setItem('authToken', response.token);
        window.localStorage.setItem('authUser', JSON.stringify(response.user));
        return response.user;
    }

    async function register(name, email, password) {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        setToken(response.token);
        setUser(response.user);
        window.localStorage.setItem('authToken', response.token);
        window.localStorage.setItem('authUser', JSON.stringify(response.user));
        return response.user;
    }

    function logout() {
        setToken(null);
        setUser(null);
        window.localStorage.removeItem('authToken');
        window.localStorage.removeItem('authUser');
    }

    const value = useMemo(() => ({
        token,
        user,
        loading,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
    }), [token, user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth precisa ser usado dentro de AuthProvider');
    }
    return context;
}
