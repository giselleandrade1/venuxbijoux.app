'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'info') => {
        const id = `toast_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        const toast = { id, message, type };
        setToasts((prev) => [...prev, toast]);
        window.setTimeout(() => removeToast(id), 3200);
    }, [removeToast]);

    const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-stack" aria-live="polite" aria-atomic="true">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast-item toast-${toast.type}`}>
                        <p>{toast.message}</p>
                        <button type="button" aria-label="Fechar notificacao" onClick={() => removeToast(toast.id)}>
                            x
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast precisa ser usado dentro de ToastProvider');
    }
    return context;
}
