import { apiRequest } from './api';

export const getProducts = () => apiRequest('/products', { cache: 'no-store' });
export const getProductById = (id) => apiRequest(`/products/${id}`, { cache: 'no-store' });
