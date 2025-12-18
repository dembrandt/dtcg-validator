# DTCG Validator

A web-based validator for W3C Design Tokens Community Group (DTCG) format tokens. This tool helps designers and developers validate their design token files against the official DTCG specification.

🔗 **[Live Demo](https://dembrandt.github.io/dtcg-validator/)**

## Features

- ✅ Real-time validation against W3C DTCG specification
- 🎨 Support for all DTCG token types (color, dimension, typography, shadow, etc.)
- 📊 Detailed error analysis with suggestions
- 🌙 Dark/Light mode support
- 📱 Responsive design with Tailwind CSS
- 🧪 Comprehensive test suite with Vitest

## Supported Token Types

- Color (hex, rgb, hsl, oklch, etc.)
- Dimension (px, rem, em, etc.)
- Font Family
- Font Weight
- Font Size
- Duration
- Cubic Bezier
- Number
- Typography (composite)
- Shadow (composite)
- Gradient (composite)
- Border (composite)
- Transition (composite)

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
