export default function ContactPage() {
    return (
        <section className="section">
            <div className="container page-card narrow">
                <h1>Fale com a Venux</h1>
                <p>Envie sua mensagem e retornaremos em ate 24 horas uteis.</p>
                <form className="stack-form">
                    <input type="text" placeholder="Nome" required />
                    <input type="email" placeholder="E-mail" required />
                    <textarea rows="5" placeholder="Sua mensagem" required />
                    <button type="submit" className="btn btn-primary">Enviar mensagem</button>
                </form>
            </div>
        </section>
    );
}
