# DTCG Validator Library

A standalone JavaScript library for validating Design Tokens against the [W3C Design Tokens Community Group (DTCG) specification](https://www.designtokens.org/TR/2025.10/format/).

## Features

- ✅ Validates all major token types: color, dimension, fontFamily, fontWeight, shadow, typography, number, and more
- ✅ Supports both string-based values (`"#ff0000"`, `"16px"`) and object-based values (W3C format)
- ✅ Provides detailed error messages with exact paths to invalid tokens
- ✅ Warns about unknown token types and other issues
- ✅ Counts total number of tokens in a design system
- ✅ Zero dependencies
- ✅ Fully tested with 43+ unit tests

## Installation

The library is located at `src/lib/dtcgValidator.js`. You can import it directly:

```javascript
import { validateTokens, validateTokensObject } from './lib/dtcgValidator';
```

## Usage

### Validating JSON strings

```javascript
import { validateTokens } from './lib/dtcgValidator';

const tokensJSON = `{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}`;

const result = validateTokens(tokensJSON);

if (result.valid) {
  console.log(`✅ Valid! Found ${result.tokenCount} tokens`);
} else {
  console.error('❌ Validation failed:');
  result.errors.forEach(error => console.error(`  - ${error}`));
}

if (result.warnings.length > 0) {
  console.warn('⚠️ Warnings:');
  result.warnings.forEach(warning => console.warn(`  - ${warning}`));
}
```

### Validating JavaScript objects

```javascript
import { validateTokensObject } from './lib/dtcgValidator';

const tokens = {
  spacing: {
    small: {
      $type: 'dimension',
      $value: {
        value: 8,
        unit: 'px'
      }
    }
  }
};

const result = validateTokensObject(tokens);
console.log(result);
// { valid: true, errors: [], warnings: [], tokenCount: 1 }
```

## API

### `validateTokens(jsonString)`

Validates a JSON string containing design tokens.

**Parameters:**
- `jsonString` (string): The JSON string to validate

**Returns:** Object with:
- `valid` (boolean): Whether the tokens are valid
- `errors` (array): List of validation errors
- `warnings` (array): List of warnings
- `tokenCount` (number): Total number of tokens found

### `validateTokensObject(tokens)`

Validates a JavaScript object containing design tokens.

**Parameters:**
- `tokens` (object): The tokens object to validate

**Returns:** Same as `validateTokens()`

## Supported Token Types

The validator supports all W3C DTCG token types:

- **color**: Hex colors (`#rrggbb`) or W3C color objects with colorSpace and components
- **dimension**: Values with units (`8px`, `1rem`) or dimension objects
- **fontFamily**: Font family names (string or array)
- **fontWeight**: Numeric weight values (1-1000)
- **number**: Numeric values
- **shadow**: Shadow objects with offsetX, offsetY, blur, and color
- **typography**: Composite tokens with fontFamily, fontSize, fontWeight, etc.
- **duration**, **cubicBezier**, **strokeStyle**, **border**, **transition**, **gradient**

## Validation Rules

### Token Names
- Cannot start with `$`
- Cannot contain: `{`, `}`, `.`, `"`

### Color Tokens
- String values must be hex format: `#rrggbb` or `#rrggbbaa`
- Object format must have `colorSpace` and `components` array with 3 values
- References to other tokens are allowed: `{color.primary}`

### Dimension Tokens
- String values: number with optional unit (`16px`, `-8rem`, `50%`)
- Object format: `{ value: number, unit: string }`
- Numeric values are allowed

### Font Weight
- Must be a number between 1 and 1000

### Shadow Tokens
- Must be an object with required fields: `offsetX`, `offsetY`, `blur`, `color`

### Typography Tokens
- Must be an object
- Allowed fields: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`

## Testing

Run the test suite:

```bash
npm test              # Watch mode
npm run test:run      # Run once
npm run test:ui       # Open UI
```

## Examples

### Valid Token Examples

```javascript
// Color token
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    }
  }
}

// Dimension token
{
  "spacing": {
    "small": {
      "$type": "dimension",
      "$value": "8px"
    }
  }
}

// Typography composite token
{
  "text": {
    "heading": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Arial",
        "fontSize": "24px",
        "fontWeight": 700
      }
    }
  }
}
```

### Invalid Token Examples

```javascript
// ❌ Missing $value
{
  "color": {
    "primary": {
      "$type": "color"
    }
  }
}

// ❌ Invalid token name (contains dot)
{
  "color.primary": {
    "$type": "color",
    "$value": "#ff0000"
  }
}

// ❌ Invalid color format
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "red"  // Should be hex
    }
  }
}
```

## License

MIT
