# Plano — Issue #3

## Decisões técnicas

- Base: spec aprovada pelo usuário no commit `2c1f8b7`, Angular 21.2.25 e arquitetura atual. Plano aprovado pelo usuário na conversa em 2026-11-08; nenhuma tarefa foi iniciada. A execução depende também de resolver a dúvida da spec sobre a Issue de migração para a E3, preenchendo a referência do substituto antes de escrever seus TODOs.
- `core/auth/auth.ts` conterá o `AuthService` previsto na arquitetura. O contrato exporá operações assíncronas de cadastro, confirmação e reenvio; resultados distinguirão conta criada com mensagem enviada, conta criada com envio falho e resultado desconhecido. Erros terão `code`, `message` e `fieldErrors`, conforme a arquitetura. Componentes não conhecerão coleções nem respostas do json-server.
- O estado da demonstração identificará a conta recém-cadastrada e sua confirmação, sem implementar login ou sessão persistente da US02. Signals manterão estado de apresentação e permissões derivadas; RxJS coordenará operações e cancelamento de inscrições. Senha e confirmação serão usadas na validação do cadastro simulado, sem persistência em perfil, coleções, armazenamento do navegador ou logs. A autenticação real continua sendo responsabilidade da E3.
- `features/auth/auth.routes.ts` organizará rotas filhas carregadas sob `/auth`: `sign-up` e `confirm-email`. `SignUp` e `ConfirmEmail` usarão arquivos `.ts`, `.html`, `.css` e testes próximos. O token será parâmetro de consulta recebido via `input()` com o input binding já configurado no Router. A confirmação só fará efeito após resposta bem-sucedida da camada de dados.
- O shell em `app.ts`/`app.html` passará a renderizar o RouterOutlet no lugar da demonstração descartável do tema. A navegação para as duas rotas será testada. Não serão implementadas páginas de viagens ou de entrada nesta Issue; a orientação de acesso a uma conta existente será textual enquanto a US02 não estiver disponível.
- O formulário usará Reactive Forms tipados, validação de igualdade no grupo e mensagens associadas aos campos. As mudanças de estado do formulário serão refletidas em Signals consumidos pelo template para notificar o Angular zoneless. PrimeNG e os tokens existentes atenderão aos estados visual, de foco, erro e carregamento; nenhum pacote será adicionado.
- `core/auth/mock-auth-data.ts` encapsulará HTTP ao json-server e a adaptação para o contrato do `AuthService`. A URL local da API ficará configurável na camada de dados. `db.json` terá as coleções abaixo, com IDs em string e instantes em ISO UTC. São recursos exclusivos do ambiente fictício, sem garantias de autorização de produção.

  | Coleção            | Campos previstos                                                                               | Uso                                                                                   |
  | ------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
  | `users`            | `id`, `firstName`, `lastName`, `authUserId`, `recoveryStreak`, `infractionCount`, `blockCount` | Perfil conforme a arquitetura; contadores iniciais em zero, sem implementar punições. |
  | `mockAuthAccounts` | `id`, `email`, `emailConfirmedAt`, `confirmationLinks`, `lastMessage`, `registrationId`        | Identidade simulada e estado de confirmação; nenhuma senha.                           |

  Cada item de `confirmationLinks` terá `token`, `issuedAt`, `expiresAt` e estado `active`, `superseded` ou `used`. O vínculo usado com sucesso será preservado para reconhecer a reabertura. `lastMessage` terá destinatário, link e instante de envio simulado. O reenvio concluído atualizará a mensagem e os estados dos links no mesmo PATCH da conta simulada. O estado confirmado ficará na identidade simulada, sem exigir um segundo PATCH no perfil.

- As operações usarão GET para localizar registros, POST para criação e PATCH para atualização. A verificação de duplicação e a recuperação de uma gravação parcial ficarão na camada de dados; a retomada consultará a conta e reconciliará o perfil vinculado antes de emitir novos efeitos. Um identificador de cadastro será reutilizado após resposta incerta, sem repetir cegamente POSTs. Testes cobrirão conta/perfil parcialmente persistidos. Isso não substitui unicidade e transações reais na E3.
- O e-mail será normalizado para comparação sem espaços externos e sem distinção entre maiúsculas e minúsculas. O relógio e a geração de tokens serão substituíveis em testes, permitindo verificar o limite exato de 24 horas sem esperar tempo real. A falha de envio simulado acontecerá antes da publicação da nova mensagem; se um reenvio falhar, o link anterior não será substituído por um envio que não foi concluído.
- A mensagem fictícia e a opção de provocar falha de envio estarão em um painel identificado como demonstração na própria feature, acessado por um serviço de demonstração. O painel não fará HTTP diretamente. Não haverá envio real nem solicitação de credenciais reais.
- Cada operação terá limite de espera de 15 segundos. Falha de rede ou timeout encerrará o carregamento e permitirá retomada. O fluxo não fará retry automático de gravações; uma resposta perdida será tratada como resultado desconhecido. O estado em andamento impedirá novo envio, sem descartar o formulário.
- A demonstração das permissões exibirá que consultar viagens é permitido e que solicitar/oferecer depende de confirmação, com os motivos correspondentes. Confirmar o e-mail não concede papel de motorista. Os pontos de integração pendentes terão os TODOs das Issues #9, #4, #6 e #8, conforme a spec; nenhum fluxo dessas histórias será implementado aqui.
- TDD em cada tarefa: escrever o cenário que falha, implementar o mínimo e refatorar. Usar Vitest/TestBed, `RouterTestingHarness` para navegação e `HttpTestingController` para respostas e falhas HTTP. Os cenários de integração manterão componentes, AuthService e adaptador reais no teste, substituindo somente a fronteira HTTP e o relógio. Após cada tarefa, seguir `/utf-task` com implementador, dois revisores distintos e triagem do usuário; não avançar automaticamente à seguinte.
- Validação da implementação: suíte pertinente à tarefa, `npm run test:ci`, `npm run lint` e `npm run build` antes da entrega, além da formatação dos arquivos alterados. Conferir manualmente o fluxo com json-server, navegação por teclado e layout móvel. Os testes atuais que verificam a demonstração descartável serão substituídos por testes do shell e das rotas.
- Documentação consultada via Context7: [Reactive Forms do Angular 21](https://v21.angular.dev/guide/forms/reactive-forms), [zoneless](https://v21.angular.dev/guide/zoneless), [testes de roteamento](https://v21.angular.dev/guide/routing/testing) e [rotas REST do json-server](https://github.com/typicode/json-server#routes). Como a documentação atual do json-server pode acompanhar mudanças posteriores ao beta instalado, a implementação conferirá os comportamentos utilizados na versão local `1.0.0-beta.15`.

## Tarefas

- [ ] **Tarefa 1 — Validar o formulário antes do envio**
  - Cobre: CA6 e CA8, no mesmo fluxo de preenchimento sem persistência.
  - Teste primeiro: navegar até `/auth/sign-up`, verificar campos obrigatórios, e-mail inválido, senha curta e confirmação divergente; corrigir os valores deve liberar o envio. Preencher e abandonar a rota sem enviar deve produzir zero gravações e zero mensagens. Os testes falham inicialmente porque a página e a rota não existem.
  - Arquivos previstos: `apps/web/src/app/app.{ts,html,css,spec.ts}`, `apps/web/src/app/app.routes.ts`, `apps/web/src/app/features/auth/auth.routes.ts`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,css,spec.ts}`.

- [ ] **Tarefa 2 — Criar a conta pendente**
  - Cobre: CA1.
  - Teste primeiro: enviar o formulário válido pela página e verificar as gravações do perfil e da identidade fictícia, papel inicial de passageiro e confirmação pendente. Um endereço não institucional deve ser aceito. Inspecionar requisições para garantir que senha e confirmação não sejam persistidas. O teste falha antes de existir a operação de cadastro.
  - Arquivos previstos: `db.json`, `apps/web/src/app/core/auth/auth.ts`, `apps/web/src/app/core/auth/auth.model.ts`, `apps/web/src/app/core/auth/mock-auth-data.ts`, respectivos `.spec.ts`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`.

- [ ] **Tarefa 3 — Disponibilizar a mensagem simulada**
  - Cobre: CA2.
  - Teste primeiro: após cadastro concluído, verificar o destinatário e o link na mensagem de demonstração e abrir seu destino pelo Router. Exigir o aviso de que nenhum e-mail real foi enviado. O teste falha enquanto o cadastro não gerar a mensagem nem apresentar seu link.
  - Arquivos previstos: `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/features/auth/auth.routes.ts`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,css,spec.ts}`, `apps/web/src/app/features/auth/components/demo-mailbox/demo-mailbox.{ts,html,css,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`.

- [ ] **Tarefa 4 — Demonstrar as permissões da conta pendente**
  - Cobre: CA3.
  - Teste primeiro: cadastrar uma conta pela página e verificar na demonstração que consultar é permitido, enquanto solicitar e oferecer estão impedidos com explicação. A chamada às permissões no serviço deve produzir o mesmo resultado. O teste falha enquanto não existir o estado derivado nem sua apresentação.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/features/auth/components/account-permissions/account-permissions.{ts,html,css,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`.

- [ ] **Tarefa 5 — Confirmar um link válido**
  - Cobre: CA4; mantém a regressão de CA3.
  - Teste primeiro: abrir o link emitido antes de 24 horas, confirmar o sucesso na página e verificar a identidade persistida e as permissões atualizadas. A pessoa continua passageira; oferecer viagens ainda depende dos requisitos das histórias correspondentes. O teste falha antes de existir a confirmação no serviço e na página.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/components/account-permissions/account-permissions.{ts,html,spec.ts}`.

- [ ] **Tarefa 6 — Renovar links sem aceitar os anteriores**
  - Cobre: CA5 e CA9, como fluxo de recuperação de um link inválido ou expirado.
  - Teste primeiro: recusar token desconhecido, link com exatamente 24 horas e link mais antigo; solicitar reenvio pela página; verificar resultado e nova validade; o link anterior deve falhar e o novo deve confirmar a conta. O teste falha antes de existir reenvio e validação temporal dos links.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/components/demo-mailbox/demo-mailbox.{ts,html,spec.ts}`.

- [ ] **Tarefa 7 — Reconhecer um link já utilizado**
  - Cobre: CA10.
  - Teste primeiro: confirmar uma conta e reabrir o mesmo link em outra navegação; exigir “E-mail já confirmado” e nenhuma nova gravação ou mensagem. Um token desconhecido deve continuar sem revelar o estado de qualquer conta. O teste falha enquanto todo link usado for tratado apenas como inválido.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,spec.ts}`.

- [ ] **Tarefa 8 — Orientar o cadastro de um e-mail existente**
  - Cobre: CA7.
  - Teste primeiro: repetir o cadastro de um endereço existente, inclusive variando caixa e espaços externos, e verificar ausência de duplicação e orientação de acesso. Para conta pendente, acionar reenvio pela interface e verificar a nova mensagem. O teste falha antes do tratamento de duplicação e da orientação contextual.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`.

- [ ] **Tarefa 9 — Recuperar uma falha no envio da mensagem**
  - Cobre: CA11.
  - Teste primeiro: provocar falha de envio pelo controle de demonstração, cadastrar e verificar que a conta continua pendente; reenviar com sucesso sem recriar a conta. Provocar falha também no reenvio e verificar aviso e possibilidade de nova tentativa. O teste falha enquanto o erro do envio apagar a conta ou impedir sua recuperação.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/components/demo-mailbox/demo-mailbox.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,spec.ts}`.

- [ ] **Tarefa 10 — Retomar o cadastro após falha de comunicação**
  - Cobre: CA12 e CA13, como fluxo de recuperação de uma tentativa interrompida.
  - Teste primeiro: simular falha de rede, timeout sem resposta e gravação concluída cuja resposta se perdeu. Verificar mensagem de resultado desconhecido quando cabível, fim do carregamento, preservação dos campos na página, bloqueio de cliques repetidos e retomada sem duplicar conta ou perfil. Navegar para fora após envio e retornar deve permitir recuperar conta pendente e reenviar a mensagem; incluir persistência parcial entre perfil e identidade. Os testes falham antes do tratamento de incerteza e reconciliação.
  - Arquivos previstos: `apps/web/src/app/core/auth/auth.{ts,spec.ts}`, `apps/web/src/app/core/auth/mock-auth-data.{ts,spec.ts}`, `apps/web/src/app/features/auth/sign-up/sign-up.{ts,html,spec.ts}`, `apps/web/src/app/features/auth/confirm-email/confirm-email.{ts,html,spec.ts}`.

## Critérios sem tarefa
