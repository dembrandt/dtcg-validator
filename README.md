# DTCG Validator

> 🌐 **The validator now lives at [www.dembrandt.com/validator](https://www.dembrandt.com/validator).**
> The live app is built and deployed from a separate repository — this repo is the earlier implementation and is no longer the source of the running site. The notes below describe what the validator actually implements.

A web-based validator for W3C Design Tokens Community Group (DTCG) format tokens. Paste your token JSON and get instant feedback against the **Format**, **Color**, and **Resolver** modules of the [DTCG specification 2025.10](https://www.designtokens.org/TR/2025.10/format/).

🔗 **[Live Site](https://www.dembrandt.com/validator)** | 📦 **[GitHub Repository](https://github.com/dembrandt/dtcg-validator)**

## What it validates

The validator covers all three published DTCG modules:

### Format Module — 13 token types
`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `strokeStyle`, `border`, `transition`, `shadow`, `gradient`, `typography`.

### Color Module — 14 color spaces
sRGB, Display P3, Oklch, Oklab, Lab, LCH, HSL, HWB, and others — including the `"none"` keyword, per-component range validation, and alpha channel handling.

### Resolver Module
Structural validation of `.resolver.json` documents: `sets`, `modifiers`, and `resolutionOrder`. (Runtime input resolution is out of scope — only the document structure is validated.)

## Implementation status

Implemented:

- ✅ All 13 token types from the Format Module
- ✅ 14 color spaces from the Color Module
- ✅ Component range validation (e.g. hue 0–360, saturation 0–100)
- ✅ `"none"` keyword support in color components
- ✅ Strict spec value forms (object-only `color` / `dimension` / `duration`)
- ✅ Deep composite sub-value type validation
- ✅ References inside composite arrays and sub-values
- ✅ Token naming validation
- ✅ Token references (curly-brace `{token.path}` syntax)
- ✅ JSON Pointer `$ref` (RFC 6901)
- ✅ Property-level references (`$ref`)
- ✅ `$extends` group inheritance (with circular detection)
- ✅ `$root` reserved root tokens
- ✅ `$deprecated` handling
- ✅ Reserved-name checks (`$`-prefixed names)
- ✅ Resolver module structural validation (`.resolver.json`)
- ✅ Alias resolution with circular detection
- ✅ Chained reference resolution
- ✅ Type inheritance through references
- ✅ Real-time error reporting

## Notes & scope

- All three modules are covered: **Format**, **Color**, and **Resolver**.
- **Resolver:** validates document structure only — runtime input resolution is out of scope.
- **XYZ color ranges** are treated as unbounded. The spec's `[0, 1]` range would reject real D65/D50 white points, so this is an intentional deviation.

## DTCG Specification

This validator implements the [W3C Design Tokens Community Group specification version 2025.10](https://www.designtokens.org/TR/2025.10/format/), which is stable and recommended for implementation.

### Project status

This is an **independent, community-driven implementation** of the DTCG specification. It is not an official W3C or Design Tokens Community Group project.

## License

MIT
