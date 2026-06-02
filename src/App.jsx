import { useState, useEffect } from 'react'
import { validateTokens, analyzeErrors } from './lib/dtcgValidator'
import './App.css'

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

const CATEGORY_LABELS = {
  structure: 'Structure',
  type: 'Type',
  value: 'Value',
  naming: 'Naming',
  reference: 'Reference',
}

function App() {
  const [tokenInput, setTokenInput] = useState('')
  const [validationResult, setValidationResult] = useState(null)
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(true)

  useEffect(() => {
    if (tokenInput.trim()) {
      const result = validateTokens(tokenInput)
      const analyzed = analyzeErrors(result)
      setValidationResult(analyzed)
    } else {
      setValidationResult(null)
    }
  }, [tokenInput])

  const sampleTokens = `{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0066cc"
    },
    "accent": {
      "$type": "color",
      "$value": {
        "colorSpace": "oklch",
        "components": [0.7, 0.3, 330],
        "alpha": 1
      }
    }
  },
  "spacing": {
    "small": {
      "$type": "dimension",
      "$value": "8px"
    },
    "medium": {
      "$type": "dimension",
      "$value": {
        "value": 16,
        "unit": "px"
      }
    }
  },
  "typography": {
    "heading": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Inter",
        "fontSize": { "value": 24, "unit": "px" },
        "fontWeight": 700,
        "lineHeight": 1.2,
        "letterSpacing": { "value": -0.5, "unit": "px" }
      }
    }
  }
}`

  const invalidSample = `{
  "color.primary": {
    "$type": "color",
    "$value": "red"
  },
  "spacing": {
    "invalid": {
      "$type": "dimension",
      "$value": "8em"
    }
  },
  "weight": {
    "custom": {
      "$type": "fontWeight",
      "$value": 2000
    }
  },
  "shadow": {
    "missing": {
      "$type": "shadow",
      "$value": {
        "offsetX": { "value": 0, "unit": "px" },
        "color": "#000"
      }
    }
  }
}`

  const autoFixIndents = () => {
    try {
      const parsed = JSON.parse(tokenInput)
      setTokenInput(JSON.stringify(parsed, null, 2))
    } catch (e) {
      // JSON is invalid — can't format
    }
  }

  return (
    <div className="min-h-screen bg-surface-base text-content-primary">

      {/* Header */}
      <header className="border-b border-border bg-surface-base">
        <div className="max-w-screen-2xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <a
              href="https://dembrandt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-secondary hover:text-content-primary transition-colors text-sm font-medium"
            >
              dembrandt
            </a>
            <span className="text-border-focus/40 text-sm">/</span>
            <span className="text-sm font-semibold tracking-tight text-content-primary">
              DTCG Validator
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded font-mono bg-surface-card text-content-muted border border-border">
              2025.10
            </span>
          </div>

          <div className="flex items-center gap-2">
            {validationResult && (
              <span className="text-xs flex items-center gap-1.5 mr-2 text-content-secondary">
                <span className={`w-1.5 h-1.5 rounded-sm ${validationResult.valid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {validationResult.valid ? 'Valid' : `${validationResult.errors?.length ?? 0} error${validationResult.errors?.length !== 1 ? 's' : ''}`}
              </span>
            )}
            <a
              href="https://github.com/dembrandt/dtcg-validator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              title="View source on GitHub"
              className="p-2.5 rounded transition-colors text-content-secondary hover:text-content-primary hover:bg-surface-card"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6">

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setTokenInput(sampleTokens)}
            title="Load a fully valid token file"
            className="text-sm px-5 py-2.5 rounded font-medium transition-colors bg-brand-sky hover:bg-brand-sky-hover text-black"
          >
            Valid sample
          </button>
          <button
            onClick={() => setTokenInput(invalidSample)}
            title="Load a token file with intentional errors to see how validation works"
            className="text-sm px-5 py-2.5 rounded font-medium transition-colors bg-transparent text-content-secondary border border-border hover:bg-surface-card hover:text-content-primary"
          >
            Invalid sample
          </button>
          <button
            onClick={autoFixIndents}
            title="Reformat the JSON with consistent 2-space indentation"
            className="text-sm px-5 py-2.5 rounded font-medium transition-colors bg-transparent text-content-secondary border border-border hover:bg-surface-card hover:text-content-primary"
          >
            Format JSON
          </button>
          <button
            onClick={() => setTokenInput('')}
            title="Clear the editor"
            className="ml-3 text-sm px-5 py-2.5 rounded font-medium transition-colors bg-transparent text-content-secondary border border-border hover:bg-surface-card hover:text-content-primary"
          >
            <span className="flex items-center gap-1.5"><TrashIcon />Clear</span>
          </button>

          <div className="ml-auto flex items-center gap-1">
            <a
              href="https://www.designtokens.org/TR/2025.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 inline-flex items-center gap-1 transition-colors text-content-muted hover:text-content-secondary"
            >
              Spec
              <ExternalLinkIcon />
            </a>
            <a
              href="https://www.designtokens.org/tr/2025.10/format/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-4 py-2 inline-flex items-center gap-1 transition-colors text-content-muted hover:text-content-secondary"
            >
              Examples
              <ExternalLinkIcon />
            </a>
          </div>
        </div>

        {/* Editor + Results */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* Editor */}
          <div className="rounded overflow-hidden border border-border">
            <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between">
              <label htmlFor="token-input" className="text-xs font-mono font-medium text-content-secondary">
                tokens.json
              </label>
              <span className="text-xs font-mono text-content-muted">
                {tokenInput ? `${tokenInput.split('\n').length} lines` : 'empty'}
              </span>
            </div>
            <textarea
              id="token-input"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder={`{\n  "color": {\n    "primary": {\n      "$type": "color",\n      "$value": "#0066cc"\n    }\n  }\n}`}
              spellCheck="false"
              aria-label="Design Tokens JSON"
              className="w-full h-[calc(100vh-220px)] min-h-[560px] p-4 text-sm font-mono leading-[1.6] resize-none bg-surface text-content-primary placeholder-content-muted focus:outline-none transition-colors"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Results */}
          <div className="rounded overflow-hidden border border-border">
            <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between">
              <span className="text-xs font-medium text-content-secondary">
                Validation Results
              </span>
              {validationResult && (
                <span className="text-xs text-content-muted">
                  {validationResult.tokenCount} token{validationResult.tokenCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="p-4 h-[calc(100vh-220px)] min-h-[560px] overflow-y-auto bg-surface" aria-label="Validation results" aria-live="polite">
              {validationResult ? (
                <div className="space-y-3">

                  {/* Status Banner */}
                  <div className={`flex items-center gap-3 px-4 py-3 rounded border text-sm font-medium ${
                    validationResult.valid
                      ? 'bg-emerald-950/40 border-emerald-900 text-emerald-400'
                      : 'bg-red-950/40 border-red-900 text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-sm flex-shrink-0 ${validationResult.valid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {validationResult.valid ? 'Valid' : 'Validation failed'}
                    {!validationResult.valid && validationResult.errors?.length > 0 && (
                      <span className="ml-auto text-xs font-normal text-red-500">
                        {validationResult.errors.length} error{validationResult.errors.length !== 1 ? 's' : ''}
                        {validationResult.warnings?.length > 0 && `, ${validationResult.warnings.length} warning${validationResult.warnings.length !== 1 ? 's' : ''}`}
                      </span>
                    )}
                  </div>

                  {/* Errors */}
                  {validationResult.errors?.length > 0 && validationResult.analysis && (
                    <div className="rounded border border-border overflow-hidden">
                      <button
                        onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                        className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium transition-colors bg-surface-card/50 hover:bg-surface-card text-content-secondary"
                      >
                        <span>{validationResult.analysis.summary}</span>
                        <span className="text-content-muted">
                          {showDetailedAnalysis ? '↑' : '↓'}
                        </span>
                      </button>

                      {showDetailedAnalysis && (
                        <div className="divide-y divide-border/50">
                          {Object.entries(validationResult.analysis.categories).map(([category, categoryErrors]) => {
                            if (categoryErrors.length === 0) return null
                            return (
                              <div key={category} className="p-4 space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-widest text-content-muted">
                                  {CATEGORY_LABELS[category] ?? category} · {categoryErrors.length}
                                </p>
                                {categoryErrors.map((error) => (
                                  <div
                                    key={error.number}
                                    className="rounded border border-border bg-surface-base p-3 space-y-2 text-xs"
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center text-[10px] font-bold mt-0.5 bg-red-900/50 text-red-400">
                                        {error.number}
                                      </span>
                                      <p className="font-mono leading-[1.6] text-content-primary">
                                        {error.message}
                                      </p>
                                    </div>
                                    {error.path !== 'root' && (
                                      <p className="font-mono text-[11px] pl-6 text-content-muted">
                                        {error.path}
                                      </p>
                                    )}
                                    {error.details && (
                                      <div className="ml-6 p-2 rounded text-[11px] leading-[1.6] bg-surface-card text-content-secondary">
                                        {error.details}
                                      </div>
                                    )}
                                    {error.suggestion && (
                                      <div className="ml-6 p-2 rounded text-[11px] leading-[1.6] border-l-2 border-brand-sky bg-surface-card/50 text-content-secondary">
                                        Suggestion: {error.suggestion}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Warnings */}
                  {validationResult.warnings?.length > 0 && (
                    <div className="rounded border border-border overflow-hidden">
                      <div className="px-4 py-3 text-xs font-medium flex items-center gap-2 bg-surface-card/50 text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-sm bg-amber-500 flex-shrink-0" />
                        {validationResult.warnings.length} warning{validationResult.warnings.length !== 1 ? 's' : ''}
                      </div>
                      <div className="divide-y divide-border">
                        {validationResult.warnings.map((warning, i) => (
                          <div key={i} className="px-4 py-3 font-mono text-xs leading-[1.6] text-content-secondary">
                            <span className="text-content-muted">#{i + 1} </span>
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All good */}
                  {validationResult.valid && (!validationResult.warnings || validationResult.warnings.length === 0) && (
                    <p className="text-xs leading-[1.6] px-1 text-content-secondary">
                      Your design tokens validate successfully against the DTCG specification (Format + Color modules).
                    </p>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-xs">
                    <p className="font-mono text-lg text-content-muted">{'{ }'}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-content-secondary">
                        Paste a token file to validate it
                      </p>
                      <p className="text-xs text-content-muted">
                        Results update live as you type. Use <span className="font-medium text-content-secondary">Valid sample</span> or <span className="font-medium text-content-secondary">Tokens with errors</span> above to load examples.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6 rounded border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-content-primary">About</h2>
          </div>
          <div className="px-6 py-5 bg-surface/30">

            <div className="text-xs leading-relaxed mb-5 text-content-secondary">
              <p className="mb-2">
                <strong className="text-content-primary">Design tokens</strong> are indivisible pieces of a design system — colors, spacing, typography. This validator checks token files against the{' '}
                <a href="https://www.designtokens.org/TR/2025.10/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-brand-sky hover:text-brand-sky-hover transition-colors">
                  W3C DTCG specification 2025.10
                </a>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              {[
                {
                  num: '1',
                  title: 'Format Module',
                  desc: '13 token types: color, dimension, fontFamily, fontWeight, duration, cubicBezier, number, strokeStyle, border, transition, shadow, gradient, typography.',
                  href: 'https://www.designtokens.org/TR/2025.10/format/',
                  label: 'Format spec',
                },
                {
                  num: '2',
                  title: 'Color Module',
                  desc: '14 color spaces (sRGB, Display P3, Oklch, Lab, HSL, etc.), "none" keyword, component range validation, alpha channel handling.',
                  href: 'https://www.w3.org/community/reports/design-tokens/CG-FINAL-color-20251028/',
                  label: 'Color spec',
                },
                {
                  num: '3',
                  title: 'Resolver Module',
                  desc: 'Token references and aliasing ($ref syntax). Not yet implemented in this validator.',
                  href: 'https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/',
                  label: 'Resolver spec',
                },
              ].map(({ num, title, desc, href, label }) => (
                <div key={num} className="rounded p-4 border border-border bg-surface-card/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 bg-surface-card text-content-muted">{num}</span>
                    <h3 className="text-xs font-semibold text-content-primary">{title}</h3>
                  </div>
                  <p className="text-xs leading-relaxed mb-3 text-content-secondary">{desc}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1 transition-colors text-brand-sky hover:text-brand-sky-hover"
                  >
                    {label}
                    <ExternalLinkIcon />
                  </a>
                </div>
              ))}
            </div>

            <div className="rounded border border-border p-4">
              <h3 className="text-xs font-semibold mb-3 text-content-primary">Implementation Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 text-emerald-500">Implemented</p>
                  <ul className="text-xs space-y-1 text-content-secondary">
                    {[
                      'All 13 token types from Format Module',
                      '14 color spaces from Color Module',
                      'Component range validation',
                      '"none" keyword support',
                      'Token naming validation',
                      'Token references (curly brace syntax)',
                      'Alias resolution with circular detection',
                      'Chained reference resolution',
                      'Type inheritance through references',
                      'Real-time error reporting',
                      '106+ unit tests passing',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-0.5 flex-shrink-0 text-emerald-600">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 text-amber-500">Not yet implemented</p>
                  <ul className="text-xs space-y-1 text-content-secondary">
                    {[
                      '$extends for group inheritance',
                      'JSON Pointer ($ref) syntax',
                      'Property-level references',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-0.5 flex-shrink-0 text-content-muted">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-content-muted">
            DTCG Specification 2025.10 · React + Vite + Tailwind CSS
          </p>
          <p className="text-xs text-content-muted">
            Built with{' '}
            <a
              href="https://dembrandt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-secondary hover:text-content-primary transition-colors underline underline-offset-2"
            >
              dembrandt
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
