# Design System — DTCG Validator

Dembrandt sub-project. All visual decisions derive from the dembrandt.com token set.

---

## Color

Dark-first. Black surface, orange primary, sky-blue CTA.

```css
/* Backgrounds */
--bg-base:        #000000;
--bg-surface:     #0d0d0d;
--bg-elevated:    #242424;
--bg-hover:       #2b2b2b;

/* Text */
--text-primary:   #ffffff;
--text-secondary: #8a8f98;
--text-muted:     #5e6772;

/* Accent */
--accent-orange:  #ea580c;   /* primary brand / CTAs requiring brand prominence */
--accent-orange-hover: #c74b0a;
--accent-sky:     #38bdf8;   /* primary interactive CTA / links */
--accent-sky-hover: #75d0fc;

/* Borders */
--border:         #242424;
--border-focus:   #38bdf8;

/* Status (semantic — not from dembrandt.com, matched to palette tone) */
--status-error:   #f87171;   /* red-400 */
--status-warning: #fbbf24;   /* amber-400 */
--status-success: #4ade80;   /* green-400 */
--status-info:    #38bdf8;   /* sky-400 = accent-sky */
```

Tailwind extension:

```js
colors: {
  brand: {
    orange:       '#ea580c',
    'orange-hover':'#c74b0a',
    sky:          '#38bdf8',
    'sky-hover':  '#75d0fc',
  },
  surface: {
    base:     '#000000',
    DEFAULT:  '#0d0d0d',
    elevated: '#242424',
    hover:    '#2b2b2b',
  },
  border: {
    DEFAULT: '#242424',
    focus:   '#38bdf8',
  },
  content: {
    primary:   '#ffffff',
    secondary: '#8a8f98',
    muted:     '#5e6772',
  },
}
```

---

## Typography

```css
/* UI text */
font-family: ui-sans-serif, system-ui, sans-serif;

/* Code / tokens / JSON */
font-family: 'JetBrains Mono', ui-monospace, monospace;
```

Scale:

| Role        | Size       | Weight | Line-height |
|-------------|------------|--------|-------------|
| display     | 2.5rem     | 700    | 1.5         |
| heading-2   | 1.875rem   | 700    | 1.5         |
| heading-3   | 1.5rem     | 600    | 1.5         |
| body        | 1.0625rem  | 400    | 1.5         |
| body-sm     | 0.9375rem  | 400    | 1.63        |
| ui / label  | 0.875rem   | 500    | 1.5         |
| mono-body   | 1.0625rem  | 400    | 1.5         |
| mono-sm     | 0.875rem   | 400    | 1.5         |
| mono-label  | 0.875rem   | 400    | 1.5  | 0.7px spacing, uppercase |
| caption     | 0.75rem    | 400    | 1.5         |

---

## Spacing

8px base grid.

```
2 · 4 · 6 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128
```

---

## Border Radius

| Context        | Value |
|----------------|-------|
| badge / tag    | 2px   |
| input / small  | 4px   |
| button / card  | 8px   |
| modal / panel  | 12px  |
| pill           | 9999px|

---

## Borders

Default: `1px solid #242424`

All interactive elements use `border: 1px solid var(--border)`. Focus ring: `outline: 2px solid #38bdf8; outline-offset: 2px`.

---

## Buttons

### Primary (CTA)
```css
background: #38bdf8;
color: #000000;
padding: 8px 16px;
border-radius: 8px;
border: none;
font-size: 0.9375rem;
font-weight: 500;
transition: background 0.15s ease-in-out;
/* hover */ background: #75d0fc;
```

### Secondary (ghost)
```css
background: transparent;
color: #ffffff;
padding: 8px 16px;
border-radius: 8px;
border: 1px solid #242424;
font-size: 0.9375rem;
font-weight: 500;
/* hover */ background: #2b2b2b;
```

### Brand (orange — use sparingly, dembrandt attribution only)
```css
background: #ea580c;
color: #000000;
padding: 8px 16px;
border-radius: 8px;
border: none;
font-weight: 500;
/* hover */ background: #c74b0a;
```

---

## Inputs / Textarea

```css
background: #0d0d0d;
color: #ffffff;
border: 1px solid #242424;
border-radius: 4px;
padding: 8px 12px;
font-family: 'JetBrains Mono', monospace;
font-size: 0.875rem;
transition: border-color 0.15s ease-in-out;

/* focus */
border-color: #38bdf8;
outline: none;
```

---

## Cards / Panels

```css
background: #0d0d0d;
border: 1px solid #242424;
border-radius: 12px;
padding: 24px;
transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* hover (interactive cards only) */
border-color: #5e6772;
```

---

## Motion

| Token             | Value                              |
|-------------------|------------------------------------|
| duration-fast     | 150ms                              |
| duration-base     | 200ms                              |
| duration-slow     | 300ms                              |
| easing-default    | cubic-bezier(0.4, 0, 0.2, 1)      |
| easing-ui         | ease-in-out                        |

---

## Status Colors (validation results)

Validator-specific semantic mapping. These override generic Tailwind status colors.

| State   | Color     | Usage                              |
|---------|-----------|------------------------------------|
| valid   | `#4ade80` | token passes validation            |
| error   | `#f87171` | schema / value violation           |
| warning | `#fbbf24` | deprecated field, loose match      |
| info    | `#38bdf8` | reference resolved, type inferred  |
| neutral | `#5e6772` | unchecked / unknown                |

Error and warning messages: `font-family: JetBrains Mono`, `font-size: 0.75rem`, displayed inline below the offending token path.

---

## Attribution

Footer: "Built with [dembrandt](https://dembrandt.com)" — plain text link, `color: #8a8f98`, no badge, no button.
