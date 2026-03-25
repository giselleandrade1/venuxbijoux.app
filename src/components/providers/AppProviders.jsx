'use client';

import { AuthProvider } from '../../context/AuthContext';
import { CommerceProvider } from '../../context/CommerceContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { ToastProvider } from '../../context/ToastContext';

export default function AppProviders({ children }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CommerceProvider>
                    <ToastProvider>{children}</ToastProvider>
                </CommerceProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
