# Parecer de Código — Setup, rodada 1

**Revisor:** agente `setup_codigo`, distinto do implementador e do revisor de conformidade.
**Tipo:** manutenção `/utf-setup`, sem spec de negócio.
**Veredito:** APONTAMENTOS

## Apontamentos (bloqueiam)

1. **O foco do botão PrimeNG não recebe a cor aprovada** — `apps/web/src/app/core/theme/app-preset.ts:46` e `apps/web/src/styles.css:65`.
   Regra violada: `docs/architecture.md:57` vincula o tema aos tokens; `docs/design-tokens.md:66` exige contorno de 3 px em `#161C27`, afastado 2 px.
   Evidência: o preset sobrescreve o foco semântico, mas o token específico `button.primary.focus.ring.color` continua herdando `{primary.color}` do Aura. Usando o próprio `@primeuix/styled` resolvido pelo PrimeNG, o CSS gerado contém `--p-button-primary-focus-ring-color:var(--p-primary-color)`. A regra da biblioteca `.p-button:focus-visible` usa esse token e tem maior especificidade que `button:focus-visible` do CSS global.
   Prejuízo concreto: botões primários exibem contorno amarelo em vez do contorno escuro escolhido pela equipe, reduzindo sua distinção visual e descumprindo o tema aprovado.

## Sugestões (não bloqueiam)

- O perfil gerado “ng test” em `apps/web/.vscode/launch.json:17` aponta para `http://localhost:9876/debug.html`, endereço de Karma. O runner escolhido é Vitest em Node; esse perfil de depuração não funciona como anunciado. Remover ou adaptar futuramente.

## Observações fora do escopo deste diff

- O aviso de `undici` transitivo de `@angular/build` merece Issue de manutenção; a correção automática proposta muda para Angular 22 e não deve ser aplicada neste setup.
- Manifestos e lockfile estão sincronizados; nenhum backend, modelo de negócio ou segredo foi encontrado. O scaffold preserva a estrutura e os scripts definidos na arquitetura.
