import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Values are defined once in styles.css, from docs/design-tokens.md.
export const appPreset = definePreset(Aura, {
  semantic: {
    disabledOpacity: '1',
    focusRing: {
      width: '3px',
      style: 'solid',
      color: 'var(--color-text)',
      offset: '2px',
    },
    colorScheme: {
      light: {
        primary: {
          color: 'var(--color-primary)',
          contrastColor: 'var(--color-text)',
          hoverColor: 'var(--color-primary-hover)',
          activeColor: 'var(--color-primary-hover)',
        },
        text: {
          color: 'var(--color-text)',
          mutedColor: 'var(--color-text-muted)',
        },
        content: {
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
        },
        formField: {
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          disabledBackground: 'var(--color-disabled)',
          disabledColor: 'var(--color-text-muted)',
          invalidBorderColor: 'var(--color-danger)',
        },
      },
    },
  },
  components: {
    button: {
      root: { label: { fontWeight: '600' } },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              hoverBackground: 'var(--color-primary-hover)',
              hoverBorderColor: 'var(--color-primary-hover)',
              hoverColor: 'var(--color-text)',
              activeBackground: 'var(--color-primary-hover)',
              activeBorderColor: 'var(--color-primary-hover)',
              activeColor: 'var(--color-text)',
              focusRing: { color: 'var(--color-text)' },
            },
            danger: {
              background: 'var(--color-danger)',
              borderColor: 'var(--color-danger)',
              color: 'var(--color-surface)',
              hoverBackground: 'var(--color-danger)',
              hoverBorderColor: 'var(--color-danger)',
              hoverColor: 'var(--color-surface)',
              activeBackground: 'var(--color-danger)',
              activeBorderColor: 'var(--color-danger)',
              activeColor: 'var(--color-surface)',
              focusRing: { color: 'var(--color-text)' },
            },
          },
          outlined: {
            primary: {
              borderColor: 'var(--color-primary)',
              color: 'var(--color-text)',
              hoverBackground: 'var(--color-surface)',
              activeBackground: 'var(--color-surface)',
            },
          },
        },
      },
    },
  },
});
