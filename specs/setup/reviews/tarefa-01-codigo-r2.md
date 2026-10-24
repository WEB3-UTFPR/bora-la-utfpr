# Parecer de Código — Setup, rodada 2

**Revisor:** agente `setup_codigo`, distinto do implementador e do revisor de conformidade.
**Veredito:** APROVADO

## Apontamentos (bloqueiam)

Nenhum.

## Correções verificadas

- **Foco do botão primário:** `apps/web/src/app/core/theme/app-preset.ts:56` define o token específico como `var(--color-text)`. O revisor verificou o CSS produzido pelo `@primeuix/styled` efetivamente resolvido pelo PrimeNG: a declaração final é `--p-button-primary-focus-ring-color:var(--color-text)`, substituindo a herança amarela. Largura e afastamento continuam resolvendo para `3px` e `2px`.
- **Perfil Karma:** o perfil que apontava para `localhost:9876/debug.html` foi removido de `apps/web/.vscode/launch.json`; permanece apenas a depuração de `ng serve`.
- **Registros imutáveis:** `.prettierignore:17` exclui `specs/**/reviews/`, preservando os pareceres e as decisões durante a formatação. A triagem da rodada 1 registra a aceitação dos dois itens pelo usuário.

## Sugestões (não bloqueiam)

Nenhuma nova sugestão.

## Observações fora do escopo deste diff

Permanece a observação anterior sobre `undici` transitivo de `@angular/build`, a
tratar em manutenção separada. O revisor não identificou regressões materiais
nas correções desta rodada.
