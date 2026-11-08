---
issue: 3
status: aprovada
---

# US01 — Criar e confirmar uma conta

## O problema

Pessoas interessadas em caronas precisam se identificar e confirmar um endereço
de contato antes de participar das viagens. Sem esse fluxo, não conseguem criar
uma conta apta a solicitar ou oferecer caronas.

## A história

**Como** pessoa interessada em caronas, **eu quero** criar uma conta e confirmar
meu e-mail **para que** eu possa participar das viagens.

Fonte funcional: US01, RN02 e RN03 de `docs/prd.md`. Esta entrega é o MVP/E2:
cadastro, confirmação e envio de e-mail são simulados, conforme
`docs/architecture.md`. A demonstração usa exclusivamente dados fictícios.

## Critérios de aceite

- [ ] **CA1 — Dado** nome, sobrenome, e-mail válido ainda não cadastrado, senha com no mínimo 8 caracteres e confirmação idêntica, **quando** eu concluir o cadastro em `/auth/sign-up`, **então** minha conta será criada como passageiro e ficará com o e-mail pendente de confirmação, sem exigir vínculo institucional.
- [ ] **CA2 — Dado** que minha conta foi criada, **quando** o envio simulado ocorrer com sucesso, **então** poderei acessar uma mensagem de demonstração destinada ao e-mail informado, contendo o link para `/auth/confirm-email`; a interface indicará que nenhum e-mail real foi enviado.
- [ ] **CA3 — Dado** que meu e-mail está pendente, **quando** o sistema consultar minhas permissões, **então** a consulta de viagens será permitida e as ações de solicitar ou oferecer caronas serão impedidas com explicação do requisito de confirmação; os fluxos completos dessas viagens pertencem às suas próprias histórias.
- [ ] **CA4 — Dado** o link atual, ainda não utilizado e emitido há menos de 24 horas, **quando** eu o utilizar, **então** meu e-mail será confirmado e minhas permissões passarão a considerar essa confirmação, sem me tornar motorista automaticamente.
- [ ] **CA5 — Dado** que minha conta está pendente e a mensagem não chegou ou o link expirou, **quando** eu solicitar o reenvio e a operação for concluída, **então** o sistema disponibilizará um novo link simulado com validade de 24 horas a partir da emissão, invalidará o anterior e informará o resultado.
- [ ] **CA6 — Dado** que faltam informações obrigatórias, o e-mail tem formato inválido, a senha tem menos de 8 caracteres ou sua confirmação é diferente, **quando** eu preencher ou tentar enviar o formulário, **então** o sistema indicará os campos a corrigir e impedirá o cadastro; a senha poderá conter letras, números e símbolos, sem exigência adicional de composição.
- [ ] **CA7 — Dado** um e-mail já cadastrado, **quando** eu tentar criar outra conta com ele, **então** o sistema impedirá a duplicação e orientará o acesso à conta existente; se a confirmação estiver pendente, oferecerá o reenvio sem criar outra conta.
- [ ] **CA8 — Dado** que comecei a preencher o cadastro, **quando** eu abandonar o fluxo antes do envio, **então** nenhuma conta será criada e nenhuma mensagem será emitida.
- [ ] **CA9 — Dado** um link inválido, substituído por reenvio ou emitido há 24 horas ou mais para uma conta pendente, **quando** eu tentar confirmar o e-mail, **então** a conta continuará pendente e o sistema orientará a solicitação de outro link.
- [ ] **CA10 — Dado** o link que já confirmou meu e-mail com sucesso, **quando** eu o abrir novamente, **então** o sistema exibirá “E-mail já confirmado”, sem alterar a conta nem emitir outro link; um token desconhecido não permitirá consultar o estado de uma conta.
- [ ] **CA11 — Dado** que a conta foi criada, mas o envio simulado falhou, **quando** o sistema informar a falha, **então** a conta será mantida pendente e poderei solicitar reenvio sem repetir o cadastro; uma falha no reenvio será informada e permitirá nova tentativa.
- [ ] **CA12 — Dado** que enviei o cadastro, **quando** a conexão cair, eu sair da página ou a resposta não chegar, **então** o sistema não afirmará que o cadastro falhou ou foi concluído sem confirmação; ao retomar, poderei tentar novamente e, se a conta já existir, seguirei a orientação de acesso ou reenvio, sem duplicação.
- [ ] **CA13 — Dado** que estou preenchendo o cadastro e continuo na página, **quando** uma falha de rede impedir o envio, **então** os dados preenchidos serão preservados, o problema será informado e poderei tentar novamente; durante uma operação em andamento, novos cliques de envio serão impedidos.

## Fora de escopo

- Supabase Auth real, SMTP, entrega de e-mail real, autorização RLS e garantias de segurança ou concorrência de produção.
- Entrada, saída, persistência de sessão e recuperação de senha: US02 e US03.
- Busca completa de viagens, solicitação de caronas, cadastro de veículos e publicação de viagens: US07, US08, US04 e US05/US06.
- Exigir endereço institucional, verificar vínculo com a UTFPR ou validar CNH.
- Salvar o formulário de cadastro entre fechamentos de aba ou persistir senhas como atributos do perfil em `db.json`.

## Abandono no meio

Antes do envio, sair da página descarta o preenchimento sem produzir conta ou
mensagem (CA8). Não há salvamento automático do formulário.

Depois do envio, fechar a página ou perder a resposta não desfaz uma conta já
criada. Uma resposta ausente não prova falha: a retomada admite nova tentativa e
trata uma conta existente sem duplicação (CA7 e CA12). A interface deve sair do
estado de carregamento diante de falha ou ausência de resposta, permitindo a
retomada descrita nesses critérios.

Se apenas o envio da mensagem falhar, a conta permanece pendente e o reenvio é o
caminho de recuperação (CA11). Uma falha de rede com a página aberta preserva os
campos para nova tentativa (CA13). Se a pessoa abandonar a confirmação, a conta
continua pendente; depois de 24 horas, o link expira e um novo deve ser solicitado
(CA5 e CA9).

## Assume que

Os substitutos ficam encapsulados na camada de dados, mantendo o contrato
consumido pelas telas conforme `docs/architecture.md`. O ambiente de demonstração
deve permitir provocar falhas de envio e consultar a mensagem simulada para
verificar os critérios. Isso não comprova entrega real de e-mail.

| Premissa                                                                                                                                                                                                                                                                                                               | Issue que fecha                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Cadastro, estado de confirmação e mensagens são simulados no MVP; na E3, serão substituídos por Supabase Auth, perfil vinculado à identidade real e envio real. O código do substituto deverá receber `// TODO #22`.                                                                                                   | [#22 — Migração para Supabase Auth na E3](https://github.com/WEB3-UTFPR/bora-la-utfpr/issues/22). |
| A consulta e as ações de viagem ainda não existem; nesta história, CA3 e CA4 demonstram as permissões do cadastro. A demonstração completa das ações ocorre nas histórias correspondentes, com referência `// TODO #9`, `// TODO #4`, `// TODO #6` e `// TODO #8` nos pontos de integração que permanecerem pendentes. | #9 (consulta), #4 (solicitação), #6 e #8 (oferta).                                                |

## Dúvidas em aberto
