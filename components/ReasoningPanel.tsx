'use client';

import { AIResponse } from '@/types/common';
import { useState } from 'react';
 

interface ReasoningPanelProps {
  reasoning: AIResponse['reasoning'];
  sources: AIResponse['sources'];
}

const SOURCE_ICONS: Record<string, string> = {
  database: 'D',
  api: 'A',
  document: 'F',
  model: 'M',
};

const FRESHNESS_COLORS: Record<string, string> = {
  live: 'var(--success)',
  hourly: 'var(--success)',
  daily: 'var(--amber)',
  weekly: 'var(--ink-tertiary)',
  stale: 'var(--danger)',
};

export default function ReasoningPanel({ reasoning, sources }: ReasoningPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const totalMs = reasoning.reduce((s, r) => s + (r.duration_ms || 0), 0);

  return (
    <section
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
      aria-label="How this result was derived"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="reasoning-content"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="var(--ink-tertiary)" strokeWidth="1.5" />
            <path d="M8 5v4M8 10.5v.5" stroke="var(--ink-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink-secondary)' }}>
            How this was derived
          </span>
          <span
            style={{
              fontSize: '11.5px',
              color: 'var(--ink-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {reasoning.length} steps · {sources.length} sources
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        >
          <path d="M3 5l4 4 4-4" stroke="var(--ink-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div
          id="reasoning-content"
          className="animate-fade-in"
          style={{ borderTop: '1px solid var(--border-light)', padding: '20px' }}
        >
          {/* Data sources */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-tertiary)',
                marginBottom: '12px',
              }}
            >
              Data sources
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {sources.map((s, i) => (
                <div
                  key={i}
                  className={`animate-fade-in stagger-${i + 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      background: 'var(--paper-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--ink-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    {SOURCE_ICONS[s.type] || 'S'}
                  </div>

                  {/* Name + freshness */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                        {s.name}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: FRESHNESS_COLORS[s.freshness],
                          fontWeight: 500,
                        }}
                      >
                        {s.freshness === 'live' ? '● live' : s.freshness}
                      </span>
                      {s.recordCount && (
                        <span style={{ fontSize: '11px', color: 'var(--ink-tertiary)', fontFamily: 'var(--font-mono)' }}>
                          {s.recordCount.toLocaleString()} records
                        </span>
                      )}
                    </div>

                    {/* Coverage bar */}
                    <div
                      style={{
                        height: '3px',
                        background: 'var(--paper-tertiary)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        width: '100%',
                      }}
                      title={`${Math.round(s.coverage * 100)}% contribution to this answer`}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.round(s.coverage * 100)}%`,
                          background: 'var(--info)',
                          borderRadius: '2px',
                          transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--ink-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      flexShrink: 0,
                    }}
                  >
                    {Math.round(s.coverage * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reasoning steps */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-tertiary)',
                marginBottom: '16px',
              }}
            >
              Analysis steps
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, marginLeft: '8px' }}>
                {totalMs}ms total
              </span>
            </p>

            <ol style={{ listStyle: 'none' }}>
              {reasoning.map((step, i) => (
                <li
                  key={step.id}
                  className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                  style={{
                    position: 'relative',
                    paddingLeft: '28px',
                    paddingBottom: i < reasoning.length - 1 ? '18px' : 0,
                  }}
                >
                  {/* Connector line */}
                  {i < reasoning.length - 1 && (
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        left: '8px',
                        top: '20px',
                        bottom: 0,
                        width: '1px',
                        background: 'var(--border-light)',
                      }}
                    />
                  )}

                  {/* Dot */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: '3px',
                      top: '5px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: '2px solid var(--border)',
                      background: 'var(--paper)',
                    }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                        {step.label}
                      </span>
                      {step.duration_ms && (
                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--ink-tertiary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {step.duration_ms}ms
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-tertiary)', lineHeight: 1.5 }}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
