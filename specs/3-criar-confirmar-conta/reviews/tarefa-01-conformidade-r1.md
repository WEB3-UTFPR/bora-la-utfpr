<Parecer de Conformidade — Tarefa 1>
**Veredito:** APROVADO

## Critérios verificados
| Critério (da spec) | Situação | Onde |
| --- | --- | --- |
| CA14 — Acesso direto por URL a `/auth/sign-up` e `/auth/confirm-email` com conteúdo na área principal entre cabeçalho e rodapé únicos, preservados na navegação | atendido | [app.spec.ts](file:///home/eder/faculdade/atividade/apps/web/src/app/app.spec.ts#L15-L101), [app-shell.html](file:///home/eder/faculdade/atividade/apps/web/src/app/shared/layout/app-shell/app-shell.html#L1-L7) |
| CA15 — Link “Criar conta” para `/auth/sign-up` na navegação da App Shell acionável sem recarregar a aplicação, com indicação de rota ativa e sem links para funcionalidades indisponíveis | atendido | [navigation.html](file:///home/eder/faculdade/atividade/apps/web/src/app/shared/layout/navigation/navigation.html#L1-L15), [navigation.spec.ts](file:///home/eder/faculdade/atividade/apps/web/src/app/shared/layout/navigation/navigation.spec.ts#L13-L35), [app.spec.ts](file:///home/eder/faculdade/atividade/apps/web/src/app/app.spec.ts#L63-L101) |
| Apresentação mínima para identificar o destino (`Criar conta` e `Confirmar e-mail`), sem operações de cadastro ou confirmação | atendido | [sign-up.html](file:///home/eder/faculdade/atividade/apps/web/src/app/features/auth/sign-up/sign-up.html#L1-L3), [confirm-email.html](file:///home/eder/faculdade/atividade/apps/web/src/app/features/auth/confirm-email/confirm-email.html#L1-L3) |

## Apontamentos
Nenhum.
