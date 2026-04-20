"use client";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="animate-fade-in"
      style={{
        padding: "28px 32px",
        background: "var(--paper)",
        border: "1px solid var(--danger-border)",
        borderRadius: "var(--radius-lg)",
      }}
      role="alert"
    >
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 5v4M8 10.5v.5"
              stroke="var(--danger)"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="var(--danger)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--danger)",
              marginBottom: "6px",
            }}
          >
            Analysis failed
          </p>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--ink-secondary)",
              lineHeight: 1.55,
              marginBottom: "16px",
            }}
          >
            {message}
          </p>
          <button
            onClick={onRetry}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "var(--paper)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--ink)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--paper-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--paper)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 6.5a4.5 4.5 0 0 1 7.5-3.4M11 6.5a4.5 4.5 0 0 1-7.5 3.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.5 2.5l.5 1.5 1.5-.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
