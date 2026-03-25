import { redirect } from 'next/navigation';

export default async function ProdutoSlugPage({ params }) {
    const { slug } = await params;
    redirect(`/products/${slug}`);
}
