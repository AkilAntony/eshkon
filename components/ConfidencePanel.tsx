'use client';

import { useState } from 'react';
import type { InsightResponse } from '@/types';

interface ConfidencePanelProps {
  confidence: InsightResponse['confidence'];
  state: InsightResponse['state'];
}

function getConfidenceLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 0.8) return { label: 'High', color: 'var(--success)', bg: 'var(--success-bg)' };
  if (score >= 0.6) return { label: 'Moderate', color: 'var(--amber)', bg: 'var(--amber-bg)' };
  return { label: 'Low', color: 'var(--danger)', bg: 'var(--danger-bg)' };
}

function getBarColor(score: number): string {
  if (score >= 0.8) return 'var(--success)';
  if (score >= 0.6) return 'var(--amber)';
  return 'var(--danger)';
}

export default function ConfidencePanel({ confidence, state }: ConfidencePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const overall = confidence.overall;
  const { label, color, bg } = getConfidenceLabel(overall);
  const pct = Math.round(overall * 100);

  return (
    <section
      aria-label="Confidence and reliability"
      style={{
        background: 'var(--paper)',
        border: `1px solid ${state === 'low_confidence' ? 'var(--warning-border)' : 'var(--border-light)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Header row */}
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-tertiary)',
              }}
            >
              Confidence
            </span>
            {state === 'low_confidence' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 500,
                  padding: '2px 8px',
                  borderRadius: '100px',
                  background: 'var(--warning-bg)',
                  color: 'var(--warning)',
                  border: '1px solid var(--warning-border)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1L9 8.5H1L5 1Z" fill="currentColor" />
                  <path d="M5 4v2M5 7.5v.1" stroke="white" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Review carefully
              </span>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '22px',
                fontWeight: 500,
                color,
              }}
            >
              {pct}%
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color,
                background: bg,
                padding: '2px 8px',
                borderRadius: '100px',
              }}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Overall bar */}
        <div
          style={{
            height: '6px',
            background: 'var(--paper-tertiary)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall confidence: ${pct}%`}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: color,
              borderRadius: '3px',
              transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        </div>

        {/* Low confidence warning */}
        {state === 'low_confidence' && (
          <p
            style={{
              marginTop: '12px',
              fontSize: '13px',
              color: 'var(--warning)',
              background: 'var(--warning-bg)',
              border: '1px solid var(--warning-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              lineHeight: 1.5,
            }}
          >
            This result has low confidence. Key data gaps affect the reliability of the analysis. Treat findings as directional, not definitive.
          </p>
        )}
      </div>

      {/* Signal breakdown toggle */}
      <div
        style={{
          borderTop: '1px solid var(--border-light)',
          padding: '14px 20px',
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="confidence-signals"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ink-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Signal breakdown ({confidence.signals.length} factors)
        </button>

        {expanded && (
          <div
            id="confidence-signals"
            style={{ marginTop: '14px' }}
            className="animate-fade-in"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {confidence.signals.map((signal, i) => (
                <div key={i} className={`animate-fade-in stagger-${i + 1}`}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '5px',
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                      {signal.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: getBarColor(signal.score),
                      }}
                    >
                      {Math.round(signal.score * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '3px',
                      background: 'var(--paper-tertiary)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      marginBottom: '6px',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.round(signal.score * 100)}%`,
                        background: getBarColor(signal.score),
                        borderRadius: '2px',
                        transition: `width ${0.7 + i * 0.1}s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`,
                      }}
                    />
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-tertiary)', lineHeight: 1.5 }}>
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
