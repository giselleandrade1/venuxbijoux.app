import { apiRequest } from './api';
import { products as fallbackProducts } from './data';

export async function fetchProducts() {
    try {
        const response = await apiRequest('/products', { cache: 'no-store' });
        return response.items || [];
    } catch (error) {
        return fallbackProducts;
    }
}

export async function fetchProductById(id) {
    try {
        return await apiRequest(`/products/${id}`, { cache: 'no-store' });
    } catch (error) {
        return fallbackProducts.find((item) => Number(item.id) === Number(id)) || null;
    }
}
