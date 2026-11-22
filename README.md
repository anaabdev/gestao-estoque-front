# Gestão de Estoque — Front-end

Aplicação web para consultar e administrar um estoque. O front-end foi desenvolvido com React e consome a API REST do projeto de back-end para autenticação, produtos, categorias e movimentações.

## Funcionalidades

- Login com sessão mantida por cookie.
- Listagem, busca e filtros de produtos por categoria e estoque baixo.
- Cadastro, edição e exclusão de produtos, individualmente ou em lote.
- Cadastro, edição e exclusão de categorias.
- Ajuste da quantidade disponível, registrando entrada ou saída pela API.
- Preferências de idioma (português ou inglês) e aparência (tema claro ou escuro).
- Perfil com nome e data de nascimento salvos no navegador atual.

> As preferências e os dados pessoais do perfil são armazenados no `localStorage` deste navegador. A tela de alteração de senha ainda não está conectada à API.

## Tecnologias

- React 19
- Vite 8
- React Router 7
- styled-components
- Inter Variable, fornecida por `@fontsource-variable/inter`

## Pré-requisitos

- Node.js e npm
- API do projeto de back-end em execução e acessível pelo navegador
- Banco de dados e conta de usuário já configurados no back-end

O back-end não oferece cadastro de usuário pela interface. É necessário usar uma conta existente. Consulte o [README do back-end](../gestao-estoque-backend/README.md) para configurar a API e o banco.

## Instalação e execução

No terminal, entre na pasta `gestao-estoque-front` e instale as dependências:

```bash
npm ci
```

Configure a URL da API. O arquivo `.env.example` já define o endereço padrão para desenvolvimento (`http://localhost:3000`). Copie-o para `.env` se precisar personalizar:

```bash
cp .env.example .env
```

No PowerShell, o comando equivalente é:

```powershell
Copy-Item .env.example .env
```

Edite `VITE_API_URL` em `.env` para apontar à origem da API, sem barra no final. Por exemplo:

```env
VITE_API_URL="http://localhost:3000"
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço exibido pelo Vite — por padrão, <http://localhost:5173>.

Se a URL da API mudar, reinicie o servidor do Vite para carregar a nova variável de ambiente. Como a sessão usa cookies, configure também `FRONTEND_URL` no back-end com a origem do front-end, por padrão `http://localhost:5173`.

## Rotas da aplicação

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/login` | Pública | Entrada com e-mail e senha |
| `/` e `/home` | Autenticado | Estoque, produtos e categorias |
| `/perfil` | Autenticado | Dados pessoais locais e tela de senha |
| `/configuracoes` | Autenticado | Idioma, tema e restauração das preferências padrão |

As rotas protegidas validam a sessão em `GET /auth/me`. Sem uma sessão válida, a aplicação redireciona para `/login`.

## Integração com a API

As requisições ficam centralizadas em `src/services/api.js`. O front-end envia e recebe JSON e inclui cookies de sessão (`credentials: 'include'`). A API precisa permitir a origem do front-end e o envio de credenciais.

O front-end usa estas rotas da API:

- `POST /login`, `GET /auth/me` e `POST /logout` para sessão.
- `GET`, `POST`, `PUT` e `DELETE /produtos` para produtos.
- `POST /produtos/:id/entrada` e `POST /produtos/:id/saida` para movimentar quantidades.
- `GET`, `POST`, `PUT` e `DELETE /categorias` para categorias.

## Estrutura do projeto

```text
src/
├── assets/            # Logos, ícones e ilustrações
├── components/        # Componentes compartilhados e proteção de rotas
├── context/           # Idioma, tema e preferências da aplicação
├── pages/
│   ├── Configuracoes/  # Preferências de idioma e aparência
│   ├── Home/          # Estoque, produtos e categorias
│   ├── Login/         # Autenticação
│   └── Perfil/        # Dados pessoais e interface de senha
├── services/          # Comunicação com a API
└── styles/            # Estilos globais
```

## Comandos disponíveis

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada em `dist/` |
| `npm run lint` | Analisa o código com Oxlint |

Para gerar e visualizar uma build local:

```bash
npm run build
npm run preview
```
