# Parecer de Conformidade — Tarefa setup, rodada 1

**Revisor:** agente `setup_conformidade`, distinto do implementador.
**Tipo:** manutenção `/utf-setup`, sem spec de negócio.
**Veredito:** APROVADO

## Critérios verificados

| Critério do fluxo de setup | Situação | Onde |
| --- | --- | --- |
| App Angular 21 standalone, sem backend próprio | atendido | `apps/web/package.json`, `apps/web/src/app/app.ts`, `apps/api/README.md` |
| Uma instalação por npm workspaces e comandos na raiz | atendido | `package.json`, `package-lock.json` |
| `core`, `shared` e `features` preparados, sem implementar histórias | atendido | `apps/web/src/app/` |
| PrimeNG configurado e tokens aprovados transcritos | atendido | `apps/web/src/app/app.config.ts`, `core/theme/app-preset.ts`, `src/styles.css` |
| Manifest com identidade PWA e ícones de carro nas cores aprovadas | atendido | `apps/web/public/manifest.webmanifest`, `public/icons/` |
| json-server declarado e dados vazios de negócio | atendido | `package.json`, `db.json` |
| Lint, Prettier e regras de editor configurados | atendido | `apps/web/eslint.config.js`, `.prettierrc`, `.editorconfig` |
| Dependências, build, caches e segredos ignorados pelo Git | atendido | `.gitignore`, `apps/web/.gitignore` |
| Índice de specs vazio | atendido | `specs/README.md` |
| Sem código de entidade, endpoint, migration ou tela de negócio | atendido | arquivos rastreados e não rastreados inspecionados |
| Não modificar PRD e arquitetura durante o scaffold | atendido | `git diff --name-only origin/develop` |
| Suíte executável e verde | atendido | revisor executou `npm run test:ci`: 1 arquivo, 2 testes aprovados |

## Apontamentos

Nenhum.

A aprovação refere-se ao scaffold local revisado. Ainda pertencem à entrega do
fluxo: tutor em modo setup, ratificação da adoção de npm 11.6.4, autorização dos
commits e PR com etiqueta `manutencao`. A proteção das branches permanece sem
verificação por resposta 403, exceção que o próprio fluxo manda relatar e seguir.
Não foram comprovados nesta revisão conexão do Supabase MCP ou instalação de
skill Angular; não apresentar o ID32 como concluído.
