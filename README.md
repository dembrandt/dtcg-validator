# DTCG Validator

A web-based validator for W3C Design Tokens Community Group (DTCG) format tokens. This tool helps designers and developers validate their design token files against the official DTCG specification.

🔗 **[Live Demo](https://dembrandt.github.io/dtcg-validator/)**

## Features

- ✅ Real-time validation against W3C DTCG specification
- 🎨 Support for all DTCG token types (color, dimension, typography, shadow, etc.)
- � Token references and alias resolution (`{token.path}` syntax)
- ♻️ Chained reference resolution with circular detection
- 📊 Detailed error analysis with suggestions
- 🌙 Dark/Light mode support
- 📱 Responsive design with Tailwind CSS
- 🧪 Comprehensive test suite - 109 tests passing

## Validation Capabilities

### Token Types (13 types - all from W3C DTCG Format Module)
- **Color** - 14 color spaces (srgb, oklch, lab, lch, display-p3, etc.)
- **Dimension** - px, rem units with validation
- **Font Family** - string or array
- **Font Weight** - numeric (1-1000) or aliases (bold, normal, etc.)
- **Duration** - ms, s units
- **Cubic Bezier** - easing functions
- **Number** - unitless values
- **Stroke Style** - line styles for borders
- **Typography** - composite token (font family, size, weight, etc.)
- **Shadow** - composite token with full validation
- **Gradient** - stop positions and colors
- **Border** - composite token (color, width, style)
- **Transition** - composite token (duration, delay, timing)

### Advanced Features
- ✅ Token references (`{color.primary}`)
- ✅ Chained references (`{alias1}` → `{alias2}` → value)
- ✅ Circular reference detection
- ✅ Type inheritance through references
- ✅ Component range validation (e.g., hue 0-360, saturation 0-100)
- ✅ "none" keyword support in color components
- ✅ Group-level type inheritance

## Usage

Visit the [live demo](https://dembrandt.github.io/dtcg-validator/) and paste your design tokens JSON to validate them. The validator will:

1. Check token structure and naming conventions
2. Validate token types against DTCG spec
3. Verify value formats for each type
4. Provide detailed error messages with suggestions
5. Show validation statistics

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Vitest** - Testing framework
- **ESLint** - Code linting

## DTCG Specification

This validator follows the [W3C Design Tokens Community Group specification](https://www.designtokens.org/TR/2025.10/format/).

## License

MIT
