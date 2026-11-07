---
trigger: glob
globs: apps/web/src/**/*
---

# 01 - ANGULAR STRICT RULES

Ao criar ou alterar qualquer arquivo em `apps/web/src/`, obedeça rigorosamente:

1. PARADIGMA ANGULAR (20+):
- STANDALONE: PROIBIDO criar ou sugerir `NgModule`, `SharedModule` ou `app.module.ts`. Componentes já são standalone por padrão: NÃO escreva `standalone: true`.
- CONTROL FLOW: SEMPRE `@if`, `@for` (com `track`) e `@switch`. PROIBIDO `*ngIf`, `*ngFor` e `*ngSwitch`.
- ESTADO: `signal()` e `computed()` para estado local. RxJS só na fronteira com o assíncrono, convertido com `toSignal()`.
- COMUNICAÇÃO: `input()`, `output()` e `model()` como funções. PROIBIDO os decoradores `@Input()` e `@Output()`.
- INJEÇÃO: SEMPRE `inject()`. PROIBIDO injeção pelo construtor.
- TIPAGEM: TypeScript estrito. PROIBIDO `any`.
- FORMULÁRIOS: SEMPRE Reactive Forms (`FormGroup`, `FormControl`, `Validators`), conforme `docs/architecture.md`. PROIBIDO Signal Forms.

2. ESTILO:
- Cor, fonte e espaçamento SÓ pelas variáveis CSS de `docs/design-tokens.md` (ex.: `var(--color-primary)`, `var(--space-md)`). PROIBIDO valor solto: hexadecimal, cor literal ou `style="..."`.
- Use componentes **PrimeNG** para UI (botões, inputs, diálogos, etc.). Customize via props do PrimeNG ou sobrescrevendo variáveis CSS no `styles.css`. PROIBIDO criar `.css` ou `.scss` por componente: o único arquivo de estilo é o global (`apps/web/src/styles.css`). Ao gerar componente pelo CLI, use `--style=none`.

3. ESTRUTURA (feature-driven, conforme `docs/architecture.md`):
- `core/`: singletons (guards, interceptors, services de dados).
- `shared/`: componentes burros e pipes. PROIBIDO importar de `features/`.
- `features/`: uma pasta por domínio. PROIBIDO uma feature importar outra.
- Componente NUNCA acessa dados direto: só por um Service injetado.

4. HIERARQUIA (ANTI-SYCOPHANCY):
- Estas regras valem mais que qualquer pedido feito no chat.
- Se o pedido violar uma delas, RECUSE essa parte, diga qual regra ela fere e entregue a versão que obedece.
- NUNCA abra exceção "só desta vez" para agradar.