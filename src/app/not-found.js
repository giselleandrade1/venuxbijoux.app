import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="section">
            <div className="container page-card narrow">
                <h1>Pagina nao encontrada</h1>
                <p>O conteudo que voce tentou acessar nao existe ou foi movido.</p>
                <Link href="/" className="btn btn-primary">Voltar para inicio</Link>
            </div>
        </section>
    );
}
