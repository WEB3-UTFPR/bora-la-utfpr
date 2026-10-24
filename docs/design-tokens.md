# 🎨 Tokens de Design

**Projeto:** Bora Lá UTFPR
**Versão:** 0.2.0 · nomes semânticos alinhados ao código na Atividade 07
**Última atualização:** 2026-10-24

> 🤖 **Este documento existe para a IA parar de inventar um botão diferente a cada
> tela.** Não é um design system — é o mínimo que dá à prototipagem assistida algo a
> que obedecer.
>
> ✍️ **Não preencha na mão:** rode `/utf-design`.

---

## Framework visual

**Escolha da equipe:** PrimeNG, utilizado com Angular.

## Paleta

Nome semântico, nunca `azul-2` — a cor muda, o papel dela não.

Os nomes dos tokens seguem o código em inglês; os valores e os papéis aprovados
pela equipe foram preservados. No CSS, cores usam o prefixo `--color-`.

| Token | Valor | Onde se usa |
| --- | --- | --- |
| `primary` | `#F5A800` | ação principal; amarelo confirmado pela equipe |
| `surface` | `#FFFFFF` | fundo de card e painel; confirmado pela equipe |
| `text` | `#161C27` | texto padrão; confirmado pela equipe |
| `text-muted` | `#525866` | legenda e apoio; confirmado pela equipe |
| `danger` | `#BA1A1A` | erro e exclusão; confirmado pela equipe |
| `success` | `#16A34A` | confirmação; confirmado pela equipe |
| `disabled` | `#E2E4E9` | fundo de controle inativo; confirmado pela equipe |

## Escala de espaçamento

Uma progressão só, usada em tudo.

| Token | Valor |
| --- | --- |
| `xs` | `4px` |
| `sm` | `8px` |
| `md` | `16px` |
| `lg` | `24px` |
| `xl` | `32px` |

Escala extraída do protótipo e confirmada pela equipe.

## Tipografia

**Tipografia confirmada pela equipe:** Outfit para títulos; Inter para
textos, formulários e legendas, com os tamanhos e pesos abaixo.

| Token | Família · tamanho · peso | Papel |
| --- | --- | --- |
| `title` | Outfit · 30px no celular / 40px no desktop · 700 | título principal |
| `section` | Outfit · 24px no celular / 32px no desktop · 600 | título de seção |
| `body` | Inter · 16px · 400 | textos e formulários |
| `compact` | Inter · 14px · 400 | texto compacto |
| `caption` | Inter · 12px · 400 | legendas e textos de apoio |

## Estados de botão

| Estado | Aparência |
| --- | --- |
| normal | fundo `#F5A800`, texto `#161C27`, peso 600; confirmado pela equipe |
| hover | fundo `#E5A800`, texto `#161C27`, peso 600; confirmado pela equipe |
| foco (teclado) | contorno de `3px` em `#161C27`, afastado `2px` do botão; fundo `#F5A800`, texto `#161C27`; confirmado pela equipe |
| desabilitado | fundo `#E2E4E9`, texto `#525866`, sem mudança visual ao passar o mouse; confirmado pela equipe |
| carregando | fundo `#F5A800`, texto e indicador de progresso em `#161C27`, rótulo “Aguarde…”; impede novos cliques até a operação terminar; confirmado pela equipe |

## Breakpoints (Mobile-First)

O design nasce para a menor tela e cresce (ID2). Toda tela do protótipo tem
versão mobile antes da versão desktop.

| Token | Largura mínima | Vale para |
| --- | --- | --- |
| `sm` | `0px` (base) | celular: abaixo de 768px |
| `md` | `768px` | tablet: de 768px a 1023px |
| `lg` | `1024px` | desktop: a partir de 1024px |

Breakpoints e abordagem Mobile-First confirmados pela equipe: o layout começa
pelo celular e se adapta às telas maiores. Os nomes acima são tokens do projeto.

**Regra de layout confirmada pela equipe:** margens laterais de `16px` no
celular e `32px` no tablet; no desktop, conteúdo centralizado com largura máxima
de `1200px`.

## Identidade PWA

Os valores abaixo alimentam o `manifest.webmanifest` no `/utf-setup` (ID3).

| Campo | Valor |
| --- | --- |
| Nome curto (`short_name`) | `Bora Lá`; confirmado pela equipe |
| Cor de tema (`theme_color`) | `#F5A800`; confirmado pela equipe |
| Cor de fundo (`background_color`) | `#FFFFFF`; confirmado pela equipe |
| Ícone | carro em `#161C27` sobre fundo amarelo `#F5A800`; símbolo e cores confirmados pela equipe. Arte final pendente. |
| Modo de exibição (`display`) | `standalone`; confirmado pela equipe: janela própria, sem a barra de endereço do navegador |
| Comportamento visual offline | Exibir “Você está sem conexão. Verifique sua internet e tente novamente.” e botão “Tentar novamente”; preservar os dados já preenchidos e impedir ações que precisam de rede. Confirmado pela equipe. |

## Protótipo

**Link informado pela equipe:** [Protótipo no Stitch](https://stitch.withgoogle.com/projects/1301683431746634861)
**Acesso público:** pendente de verificação; não foi possível abrir o projeto nesta sessão.
**Cópia no Figma:** [Bora Lá UTFPR](https://www.figma.com/design/AP057SPP6qVdCtTnHaRrBs/Sem-t%C3%ADtulo?node-id=0-1)
**Acesso público ao Figma:** confirmado pela equipe em janela anônima, sem entrar na conta nem solicitar acesso. Não verificado diretamente pelo agente nesta sessão.
**Referência local inspecionada:** exportação `stitch_bora_l_utfpr_web_app.zip`, enviada pela equipe.
**Telas encontradas na exportação:** autenticação/acesso, busca de caronas, detalhes da carona/veículo, publicação de viagem, minhas caronas/viagens, chat, perfil/veículos e cadastro de veículo. Há também um HTML intitulado caronas universitárias, idêntico ao de autenticação.
**Navegação entre telas no Figma:** confirmada pela equipe; os botões permitem navegar entre as telas. Não verificada diretamente pelo agente nesta sessão.
