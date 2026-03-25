export const categories = [
    {
        id: 'brincos',
        name: 'Brincos',
        image: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'colares',
        name: 'Colares',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'pulseiras',
        name: 'Pulseiras',
        image: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'aneis',
        name: 'Aneis',
        image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
    },
];

export const products = [
    {
        id: 101,
        name: 'Brinco Flor Coral',
        category: 'Brincos',
        price: 119.9,
        rating: 4.9,
        tag: 'Mais vendido',
        featured: true,
        image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
        description: 'Brinco artesanal com acabamento polido e banho premium.',
    },
    {
        id: 102,
        name: 'Colar Delicado Nude',
        category: 'Colares',
        price: 149.9,
        rating: 4.8,
        tag: 'Premium',
        featured: true,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
        description: 'Colar leve com design minimalista e toque sofisticado.',
    },
    {
        id: 103,
        name: 'Pulseira Artesanal Aurora',
        category: 'Pulseiras',
        price: 89.9,
        rating: 4.7,
        tag: 'Novo',
        featured: true,
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80',
        description: 'Pulseira de composicao autoral com detalhes em banho dourado.',
    },
    {
        id: 104,
        name: 'Anel Dourado Vintage',
        category: 'Aneis',
        price: 139.9,
        rating: 4.9,
        tag: 'Edicao especial',
        featured: true,
        image: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1200&q=80',
        description: 'Anel com desenho classico e textura inspirada em joias vintage.',
    },
    {
        id: 105,
        name: 'Kit Elegance',
        category: 'Kits',
        price: 229.9,
        rating: 4.8,
        tag: 'Favorito',
        featured: true,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
        description: 'Combinacao exclusiva para presentear com identidade premium.',
    },
    {
        id: 106,
        name: 'Colecao Petals',
        category: 'Especiais',
        price: 199.9,
        rating: 4.9,
        tag: 'Premium',
        featured: false,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
        description: 'Selecao limitada com inspiracao floral e acabamento delicado.',
    },
    {
        id: 107,
        name: 'Argola Lunar',
        category: 'Brincos',
        price: 99.9,
        rating: 4.6,
        tag: 'Novo',
        featured: false,
        image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=80',
        description: 'Argolas com brilho suave para compor looks elegantes.',
    },
    {
        id: 108,
        name: 'Colar Folhas de Seda',
        category: 'Colares',
        price: 169.9,
        rating: 4.7,
        tag: 'Favorito',
        featured: false,
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80',
        description: 'Design autoral com formas organicas e acabamento premium.',
    },
];

export const galleryImages = [
    'https://images.unsplash.com/photo-1635767798638-3665c8ac1b41?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=80',
];

export const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);

export function getProductById(id) {
    return products.find((item) => Number(item.id) === Number(id));
}
