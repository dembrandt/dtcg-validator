import { useState, useEffect } from 'react'
import { validateTokens, analyzeErrors } from './lib/dtcgValidator'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [tokenInput, setTokenInput] = useState('')
  const [validationResult, setValidationResult] = useState(null)
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(true)

  // Real-time validation
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

  const loadSample = () => {
    setTokenInput(sampleTokens)
  }

  const loadInvalidSample = () => {
    setTokenInput(invalidSample)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'
    }`}>
      {/* Header */}
      <header className={`backdrop-blur-xl border-b transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-900/50 border-slate-800'
          : 'bg-white/50 border-slate-200'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h1 className={`text-5xl font-black tracking-tight mb-3 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
                  : 'text-slate-900'
              }`}>
                DTCG Validator
              </h1>
              <p className={`text-lg mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Real-time validator for W3C Design Tokens Community Group specifications
              </p>
              <p className={`text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Validate design token files with support for all 13 token types, 14 color spaces, 
                and advanced features like token references and circular detection.
              </p>
            </div>

            {/* GitHub & Dark Mode Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/dembrandt/dtcg-validator"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700'
                    : 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200'
                }`}
                aria-label="View on GitHub"
                title="View on GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex-shrink-0 group relative p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                    : 'bg-white hover:bg-slate-100 border border-slate-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            <button
              onClick={loadSample}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg'
              }`}
            >
              Valid Sample
            </button>
            <button
              onClick={loadInvalidSample}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-red-900/50'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white shadow-lg'
              }`}
            >
              Error Sample
            </button>
            <button
              onClick={() => setTokenInput('')}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              Clear
            </button>
          </div>

          {/* Live Status */}
          {validationResult && (
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                validationResult.valid ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Live Validation
              </span>
            </div>
          )}
        </div>

        {/* Main Editor Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Code Editor */}
          <div className={`rounded-xl overflow-hidden transition-all duration-300 ${
            darkMode
              ? 'bg-slate-900/50 border border-slate-800 shadow-2xl shadow-black/50'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center justify-between ${
              darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className={`text-sm font-mono font-semibold ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  tokens.json
                </span>
              </div>
              <div className={`text-xs font-mono ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {tokenInput.split('\n').length} lines
              </div>
            </div>
            <textarea
              id="token-input"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder={`{\n  "color": {\n    "primary": {\n      "$type": "color",\n      "$value": "#0066cc"\n    }\n  }\n}`}
              spellCheck="false"
              className={`w-full h-[calc(100vh-300px)] min-h-[600px] p-6 font-mono text-sm leading-relaxed resize-none focus:outline-none transition-colors duration-300 ${
                darkMode
                  ? 'bg-slate-900/50 text-slate-100 placeholder-slate-600'
                  : 'bg-white text-slate-900 placeholder-slate-400'
              }`}
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Validation Results */}
          <div className={`rounded-xl overflow-hidden transition-all duration-300 ${
            darkMode
              ? 'bg-slate-900/50 border border-slate-800 shadow-2xl shadow-black/50'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}>
            <div className={`px-6 py-4 border-b ${
              darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50'
            }`}>
              <h3 className={`text-lg font-bold ${
                darkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Validation Results
              </h3>
            </div>

            <div className="p-6 h-[calc(100vh-300px)] min-h-[600px] overflow-y-auto">
              {validationResult ? (
                <div className="space-y-4">
                  {/* Status Card */}
                  <div className={`p-6 rounded-xl transition-all duration-300 ${
                    validationResult.valid
                      ? darkMode
                        ? 'bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50'
                        : 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'
                      : darkMode
                        ? 'bg-gradient-to-br from-red-900/50 to-rose-900/50 border border-red-700/50'
                        : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl ${
                        validationResult.valid
                          ? darkMode ? 'text-emerald-400' : 'text-emerald-600'
                          : darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {validationResult.valid ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-2xl font-bold mb-1 ${
                          validationResult.valid
                            ? darkMode ? 'text-emerald-300' : 'text-emerald-900'
                            : darkMode ? 'text-red-300' : 'text-red-900'
                        }`}>
                          {validationResult.valid ? 'Valid Tokens' : 'Validation Failed'}
                        </h4>
                        <p className={`text-sm ${
                          validationResult.valid
                            ? darkMode ? 'text-emerald-400' : 'text-emerald-700'
                            : darkMode ? 'text-red-400' : 'text-red-700'
                        }`}>
                          {validationResult.tokenCount} token{validationResult.tokenCount !== 1 ? 's' : ''} found
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Errors - Detailed Analysis */}
                  {validationResult.errors && validationResult.errors.length > 0 && validationResult.analysis && (
                    <div className="space-y-4">
                      {/* Analysis Summary */}
                      <div className={`rounded-xl p-5 border transition-all duration-300 ${
                        darkMode
                          ? 'bg-red-950/50 border-red-800/50'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <h4 className={`font-bold flex items-center gap-2 ${
                            darkMode ? 'text-red-300' : 'text-red-900'
                          }`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {validationResult.analysis.summary}
                          </h4>
                          <button
                            onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              darkMode
                                ? 'bg-red-900/30 hover:bg-red-900/50 text-red-300'
                                : 'bg-red-100 hover:bg-red-200 text-red-700'
                            }`}
                          >
                            {showDetailedAnalysis ? 'Hide Details' : 'Show Details'}
                          </button>
                        </div>

                        {showDetailedAnalysis && (
                          <div className="space-y-4 mt-4">
                            {/* Errors by Category */}
                            {Object.entries(validationResult.analysis.categories).map(([category, categoryErrors]) => {
                              if (categoryErrors.length === 0) return null;

                              const categoryColors = {
                                structure: darkMode ? 'text-purple-400' : 'text-purple-600',
                                type: darkMode ? 'text-blue-400' : 'text-blue-600',
                                value: darkMode ? 'text-orange-400' : 'text-orange-600',
                                naming: darkMode ? 'text-pink-400' : 'text-pink-600',
                                reference: darkMode ? 'text-green-400' : 'text-green-600'
                              };

                              const categoryIcons = {
                                structure: '🏗️',
                                type: '🏷️',
                                value: '💎',
                                naming: '✏️',
                                reference: '🔗'
                              };

                              return (
                                <div key={category} className="space-y-2">
                                  <h5 className={`text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${categoryColors[category]}`}>
                                    <span>{categoryIcons[category]}</span>
                                    {category} Errors ({categoryErrors.length})
                                  </h5>
                                  {categoryErrors.map((error) => (
                                    <div key={error.number} className={`p-4 rounded-lg border transition-all ${
                                      darkMode ? 'bg-red-900/20 border-red-800/30' : 'bg-white border-red-200'
                                    }`}>
                                      {/* Error Header */}
                                      <div className="flex items-start gap-3 mb-2">
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                          darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                                        }`}>
                                          {error.number}
                                        </span>
                                        <div className="flex-1">
                                          <p className={`font-mono text-xs leading-relaxed ${
                                            darkMode ? 'text-red-200' : 'text-red-800'
                                          }`}>
                                            {error.message}
                                          </p>
                                          {error.path !== 'root' && (
                                            <p className={`text-xs mt-1 font-mono ${
                                              darkMode ? 'text-red-400/60' : 'text-red-600/60'
                                            }`}>
                                              📍 {error.path}
                                            </p>
                                          )}
                                        </div>
                                      </div>

                                      {/* Error Details */}
                                      {error.details && (
                                        <div className={`mt-3 p-3 rounded text-xs leading-relaxed ${
                                          darkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-600'
                                        }`}>
                                          <span className="font-semibold">ℹ️ Context: </span>
                                          {error.details}
                                        </div>
                                      )}

                                      {/* Suggestion */}
                                      {error.suggestion && (
                                        <div className={`mt-3 p-3 rounded text-xs leading-relaxed border-l-2 ${
                                          darkMode
                                            ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                                            : 'bg-emerald-50 border-emerald-400 text-emerald-800'
                                        }`}>
                                          <span className="font-semibold">💡 Suggestion: </span>
                                          {error.suggestion}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {validationResult.warnings && validationResult.warnings.length > 0 && (
                    <div className={`rounded-xl p-5 border transition-all duration-300 ${
                      darkMode
                        ? 'bg-yellow-950/50 border-yellow-800/50'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <h4 className={`font-bold mb-3 flex items-center gap-2 ${
                        darkMode ? 'text-yellow-300' : 'text-yellow-900'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {validationResult.warnings.length} Warning{validationResult.warnings.length !== 1 ? 's' : ''}
                      </h4>
                      <div className="space-y-2">
                        {validationResult.warnings.map((warning, i) => (
                          <div key={i} className={`p-3 rounded-lg font-mono text-xs leading-relaxed ${
                            darkMode ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <span className={`font-bold ${
                              darkMode ? 'text-yellow-400' : 'text-yellow-600'
                            }`}>
                              #{i + 1}
                            </span>{' '}
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Success */}
                  {validationResult.valid && (!validationResult.warnings || validationResult.warnings.length === 0) && (
                    <div className={`rounded-xl p-5 border transition-all duration-300 ${
                      darkMode
                        ? 'bg-emerald-950/50 border-emerald-800/50'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}>
                      <p className={`flex items-start gap-3 ${
                        darkMode ? 'text-emerald-300' : 'text-emerald-800'
                      }`}>
                        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          Your design tokens validate successfully against the implemented portions of the DTCG draft specification (Format Module + Color Module)!
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-6xl mb-4 ${
                      darkMode ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {'{ }'}
                    </div>
                    <p className={`text-lg font-medium ${
                      darkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Start typing to see live validation
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className={`rounded-xl p-8 transition-all duration-300 ${
          darkMode
            ? 'bg-slate-900/50 border border-slate-800'
            : 'bg-white border border-slate-200'
        }`}>
          <div className="mb-8">
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              About This Validator
            </h2>
            <div className={`p-4 rounded-lg mb-6 border ${
              darkMode
                ? 'bg-amber-950/30 border-amber-800/50'
                : 'bg-amber-50 border-amber-200'
            }`}>
              <p className={`text-sm font-medium flex items-start gap-2 ${
                darkMode ? 'text-amber-300' : 'text-amber-900'
              }`}>
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  <strong>Experimental Implementation:</strong> This is an independent attempt to implement the Design Tokens Community Group draft specification (2025.10).
                  The spec itself states "Do not attempt to implement this version" as it's a preview draft, but this project exists to explore and test the specification.
                </span>
              </p>
            </div>

            <p className={`text-base leading-relaxed mb-4 ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <strong className={darkMode ? 'text-slate-100' : 'text-slate-900'}>Design tokens</strong> are indivisible pieces of a design system such as colors, spacing, and typography scale.
              They were created by the Salesforce design system team (Jon Levine & Jina Anne), enabling design systems to scale consistently across platforms.
            </p>

            <p className={`text-base leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              This validator implements the three modules from the Draft Community Group Report:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-cyan-500/20' : 'bg-cyan-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    darkMode ? 'text-cyan-400' : 'text-cyan-600'
                  }`}>1</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  darkMode ? 'text-cyan-400' : 'text-cyan-600'
                }`}>
                  Format Module
                </h3>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Core token structure, naming rules, and 13 token types: color, dimension, fontFamily, fontWeight, duration, cubicBezier, number, strokeStyle, border, transition, shadow, gradient, and typography.
              </p>
              <a
                href="https://www.designtokens.org/TR/2025.10/format/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  darkMode
                    ? 'text-cyan-400 hover:text-cyan-300'
                    : 'text-cyan-600 hover:text-cyan-700'
                }`}
              >
                Format spec
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className={`p-6 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>2</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Color Module
                </h3>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Comprehensive color support with 14 color spaces (sRGB, Display P3, Oklch, Lab, HSL, etc.), "none" keyword, component range validation, and proper alpha channel handling.
              </p>
              <a
                href="https://www.w3.org/community/reports/design-tokens/CG-FINAL-color-20251028/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  darkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Color spec
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className={`p-6 rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>3</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  Resolver Module
                </h3>
              </div>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Token references and aliasing ($ref syntax). <span className={darkMode ? 'text-slate-500' : 'text-slate-500'}>Not yet implemented in this validator.</span>
              </p>
              <a
                href="https://www.w3.org/community/reports/design-tokens/CG-FINAL-resolver-20251028/"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  darkMode
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                Resolver spec
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className={`p-6 rounded-xl border ${
            darkMode
              ? 'bg-slate-800/30 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Implementation Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  ✓ Implemented
                </h4>
                <ul className={`text-sm space-y-1 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <li>• All 13 token types from Format Module</li>
                  <li>• 14 color spaces from Color Module</li>
                  <li>• Component range validation</li>
                  <li>• "none" keyword support</li>
                  <li>• Token naming validation</li>
                  <li>• Token references (curly brace syntax)</li>
                  <li>• Alias resolution with circular detection</li>
                  <li>• Chained reference resolution</li>
                  <li>• Type inheritance through references</li>
                  <li>• Real-time error reporting</li>
                  <li>• 106+ unit tests passing</li>
                </ul>
              </div>
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${
                  darkMode ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  ⚠ Not Yet Implemented
                </h4>
                <ul className={`text-sm space-y-1 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <li>• $extends for group inheritance</li>
                  <li>• JSON Pointer ($ref) syntax</li>
                  <li>• Property-level references</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 border-t transition-colors duration-300 ${
        darkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-6">
          <p className={`text-center text-sm ${
            darkMode ? 'text-slate-500' : 'text-slate-600'
          }`}>
            Experimental validator implementing DTCG Draft 2025.10 • Built with React + Vite + Tailwind CSS • 92 unit tests passing
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
