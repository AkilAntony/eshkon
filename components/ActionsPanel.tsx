'use client';

import { ActionItem } from "@/types/common";



interface ActionsPanelProps {
  actions: ActionItem[];
  onAction: (action: ActionItem) => void;
}

export default function ActionsPanel({ actions, onAction }: ActionsPanelProps) {
  return (
    <section aria-label="Recommended next actions">
      <p
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-tertiary)',
          marginBottom: '10px',
        }}
      >
        Next actions
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {actions.map((action, i) => (
          <button
            key={action.id}
            onClick={() => onAction(action)}
            className={`animate-fade-in stagger-${i + 1}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '13px 16px',
              background: action.type === 'primary' ? 'var(--amber-bg)' : 'var(--paper)',
              border: `1px solid ${action.type === 'primary' ? 'var(--amber-border)' : 'var(--border-light)'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'var(--font-body)',
              transition: 'border-color 0.15s, background 0.15s, transform 0.1s',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              if (action.type === 'primary') {
                e.currentTarget.style.borderColor = 'var(--amber)';
                e.currentTarget.style.background = '#fdefc9';
              } else {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--paper-secondary)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = action.type === 'primary' ? 'var(--amber-border)' : 'var(--border-light)';
              e.currentTarget.style.background = action.type === 'primary' ? 'var(--amber-bg)' : 'var(--paper)';
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.99)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {/* Icon */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: action.type === 'primary' ? 'rgba(193, 125, 17, 0.12)' : 'var(--paper-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden
            >
              {action.query ? (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2 7.5h11M9 3.5l4 4-4 4" stroke={action.type === 'primary' ? 'var(--amber)' : 'var(--ink-tertiary)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 3v9M3 7.5h9" stroke={action.type === 'primary' ? 'var(--amber)' : 'var(--ink-tertiary)'} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: action.type === 'primary' ? 'var(--amber)' : 'var(--ink)',
                  marginBottom: '1px',
                }}
              >
                {action.label}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }}>
                {action.description}
              </p>
            </div>

            {/* Arrow */}
            {action.query && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="var(--ink-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
