# DTCG Validator

The validator now lives at **https://www.dembrandt.com/validator** and is built from a
different repository. This repo is the earlier version, kept for history — the old
GitHub Pages URL just redirects to the new site.

A web validator for design tokens in the W3C DTCG format. Paste a token JSON file and
it checks it against the 2025.10 spec — the Format, Color, and Resolver modules.

## What it checks

**Format module** — the 13 token types: color, dimension, fontFamily, fontWeight,
duration, cubicBezier, number, strokeStyle, border, transition, shadow, gradient,
typography.

**Color module** — 14 color spaces (sRGB, Display P3, Oklch, Oklab, Lab, LCH, HSL, HWB,
and so on), the `"none"` keyword, per-component range checks, and alpha handling.

**Resolver module** — structural checks on `.resolver.json` files (`sets`, `modifiers`,
`resolutionOrder`). It validates the document shape, not runtime resolution.

Beyond the basics it also handles:

- References — both `{curly.brace}` aliases and JSON Pointer `$ref` (RFC 6901),
  including property-level `$ref`
- Chained references, circular-reference detection, and type inheritance through references
- `$extends` group inheritance, `$root`, `$deprecated`, and reserved `$`-prefixed names
- Deep validation of composite sub-values, including references nested inside arrays
- Strict spec value forms (color, dimension, and duration must be objects)
- Token naming rules

## Notes

- Resolver support is structural only — actually resolving inputs at runtime is out of scope.
- XYZ color components are treated as unbounded. The spec says `[0, 1]`, but that range
  rejects real D65/D50 white points, so this is a deliberate deviation.

## About

Targets DTCG spec [2025.10](https://www.designtokens.org/TR/2025.10/format/). Independent
community project, not affiliated with the W3C or the Design Tokens Community Group.

MIT licensed.
