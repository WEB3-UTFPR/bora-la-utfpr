# Bora Lá UTFPR

Plataforma comunitária de caronas para estudantes e servidores da UTFPR —
campus Guarapuava. O projeto aproxima pessoas que já farão um trajeto de ida ou
volta do campus de quem precisa de transporte, facilitando a organização de
viagens gratuitas e reduzindo a dependência do transporte coletivo.

## Autores

- [Gabriel Afinovicz](https://github.com/Gabriel-Afinovicz)
- [Péricles Expedito Andrade](https://github.com/Pericles3322)
- [Eder Murilo de Morais](https://github.com/ederzin13)

## Documentação

- [Requisitos do produto](docs/prd.md)
- [Arquitetura e especificação técnica](docs/architecture.md)
- [Design System](docs/design-tokens.md)
- [Checklist da disciplina](docs/checklist.md)

[Protótipo no Stitch](https://stitch.withgoogle.com/projects/1301683431746634861),
informado pela equipe. Acesso público pendente de verificação.

[Cópia no Figma](https://www.figma.com/design/AP057SPP6qVdCtTnHaRrBs/Sem-t%C3%ADtulo?node-id=0-1).
Navegação por botões e acesso público em janela anônima confirmados pela equipe.

## Funcionalidades planejadas

- Cadastro e confirmação de contas por e-mail.
- Cadastro de veículos e publicação de viagens avulsas ou recorrentes.
- Busca de caronas próximas ao local informado.
- Solicitação de vaga e aprovação pelo motorista.
- Conversas entre motorista e passageiro.
- Confirmação de presença, cancelamento e conclusão das viagens.
- Avisos e bloqueios progressivos por cancelamentos tardios repetidos.

As regras completas e os critérios de aceite estão descritos no
[PRD](docs/prd.md). As histórias permanecem em `Draft` enquanto aguardam a
leitura e a aprovação de todos os integrantes.

## Modelagem de dados

Modelo definido na [arquitetura](docs/architecture.md):

```mermaid
erDiagram
    User ||--o{ Vehicle : owns
    User ||--o{ Trip : drives
    Vehicle ||--o{ Trip : used_in
    User ||--o{ RecurringSchedule : creates
    Vehicle ||--o{ RecurringSchedule : assigned_to
    RecurringSchedule o|--o{ Trip : generates
    User ||--o{ RideRequest : submits
    Trip ||--o{ RideRequest : receives
    RideRequest ||--o| Reservation : results_in
    RideRequest ||--o| Conversation : has
    Conversation ||--o{ Message : contains
    User ||--o{ Message : sends
    Conversation ||--|{ ConversationParticipant : has
    User ||--o{ ConversationParticipant : participates
    User o|--o{ Cancellation : initiates
    Trip o|--o{ Cancellation : targeted_by
    RideRequest o|--o{ Cancellation : targeted_by
    Cancellation ||--o{ Infraction : source_of
    User ||--o{ Infraction : receives
    User ||--o{ Block : receives
```

## Tecnologias

- **Frontend:** Angular 21 com componentes standalone e modo zoneless.
- **Estado da interface:** Signals.
- **Dados do MVP:** json-server.
- **Dados da aplicação final:** Supabase (PostgreSQL e Auth).
- **Interface:** PrimeNG 21, com os tokens visuais da equipe.
- **Mapas e rotas:** Leaflet, OpenStreetMap e OpenRouteService via Edge Function na E3.
- **Qualidade:** Vitest, ESLint/angular-eslint e Prettier.
- **Distribuição:** aplicação web responsiva e instalável como PWA; hospedagem planejada na Vercel.

## Aplicação em produção

O endereço público será incluído após a configuração do deploy em uma etapa
posterior do projeto.

## Execução local

Requisitos: Node.js 22.12 ou superior na linha 22 (ou Node 24+) e npm 11.6.4.
O Node 22.23.1 foi utilizado na validação do setup. O npm 10.9.8 apresentou erro
interno na primeira instalação; use a versão indicada no `packageManager`.

Na raiz do repositório, instale com `npm ci`. Para iniciar:

```bash
npm start
```

O Angular fica disponível em `http://localhost:4200`. Em outro terminal, inicie
a API fake do MVP:

```bash
npm run api
```

O json-server usa `db.json` na raiz e escuta em `http://localhost:3000`. O arquivo
começa vazio; dados e telas de negócio serão acrescentados pelas histórias.

| Comando na raiz        | Finalidade                                               |
| ---------------------- | -------------------------------------------------------- |
| `npm test`             | testes Vitest em modo contínuo                           |
| `npm run test:ci`      | executar a suíte uma vez                                 |
| `npm run lint`         | verificar TypeScript e templates                         |
| `npm run build`        | gerar o build de produção em `apps/web/dist/web/browser` |
| `npm run format:check` | conferir a formatação                                    |
| `npm run format`       | aplicar a formatação                                     |

A estrutura usa npm workspaces: a instalação fica em `node_modules` na raiz,
com um único `package-lock.json`. `apps/api` é uma reserva para o futuro e não
possui backend próprio. Em `apps/web/src/app`, as pastas `core`, `shared` e
`features` estão preparadas para as próximas histórias.

O setup inclui manifest, ícones e service worker PWA. O service worker é habilitado
no build de produção; `npm start` usa o modo de desenvolvimento. Os fluxos de
autenticação, as rotas de negócio, os estados offline e as integrações da E3 ainda
serão implementados nas respectivas histórias.

## Telas da aplicação

As imagens serão adicionadas depois da criação e aprovação do protótipo e da
implementação das primeiras interfaces.
