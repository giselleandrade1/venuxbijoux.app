# Venux Bijoux

Projeto unificado em um unico app Next.js (App Router), com frontend e API interna no mesmo codigo.

## Estrutura

```text
venux-bijoux/
├─ src/
│  ├─ app/              # paginas + API routes
│  ├─ components/       # componentes reutilizaveis
│  ├─ context/          # providers globais
│  ├─ data/             # dados e colecoes
│  ├─ hooks/            # hooks de dominio
│  ├─ lib/              # utilitarios e base compartilhada
│  ├─ services/         # camada de chamadas HTTP
│  ├─ store/            # adaptadores de estado
│  └─ types/            # contratos de dados
├─ next.config.mjs
├─ package.json
├─ tsconfig.json
├─ .env.example
└─ .gitignore
```

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Scripts

- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de producao
- `npm run start`: iniciar app em producao
- `npm run lint`: validacao (build check)

## Funcionalidades integradas

- Tema `light`, `dark` e `system` com persistencia
- Autenticacao (`/api/auth/*`)
- Catalogo de produtos (`/api/products`)
- Carrinho (`/api/cart/*`)
- Favoritos (`/api/wishlist/*`)
- Pedidos (`/api/orders`)
- Contato (`/api/contact`)
- Rotas em portugues e ingles (aliases)
