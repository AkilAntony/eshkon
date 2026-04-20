"use client";

import { Metric } from "@/types/common";

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "10px",
      }}
      role="list"
      aria-label="Key metrics"
    >
      {metrics.map((m, i) => (
        <div
          key={i}
          className={`animate-fade-in stagger-${i + 1}`}
          role="listitem"
          style={{
            background: "var(--paper-secondary)",
            border: `1px solid ${m.confident ? "var(--border-light)" : "var(--border-light)"}`,
            borderRadius: "var(--radius-md)",
            padding: "14px 16px",
            borderStyle: m.confident ? "solid" : "dashed",
            position: "relative",
          }}
        >
          {!m.confident && (
            <span
              title="This value is an estimate"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "11px",
                color: "var(--ink-tertiary)",
              }}
              aria-label="Estimated value"
            >
              ~
            </span>
          )}
          <p
            style={{
              fontSize: "11.5px",
              color: "var(--ink-tertiary)",
              marginBottom: "6px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {m.label}
          </p>
          <p
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: "6px",
              fontFamily: m.value.match(/^\d/)
                ? "var(--font-mono)"
                : "var(--font-body)",
            }}
          >
            {m.value}
          </p>
          {m.delta && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {m.deltaDirection === "up" && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 8V2M2 5l3-3 3 3"
                    stroke="var(--danger)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {m.deltaDirection === "down" && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 2v6M2 5l3 3 3-3"
                    stroke="var(--success)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span
                style={{
                  fontSize: "11.5px",
                  color:
                    m.deltaDirection === "up"
                      ? "var(--danger)"
                      : m.deltaDirection === "down"
                        ? "var(--success)"
                        : "var(--ink-tertiary)",
                }}
              >
                {m.delta}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
