"use client";

import { useState } from "react";

import MetricsGrid from "./MetricsGrid";
import ConfidencePanel from "./ConfidencePanel";
import ReasoningPanel from "./ReasoningPanel";
import ActionsPanel from "./ActionsPanel";
import { ActionItem, AIResponse } from "@/types/common";

interface InsightCardProps {
  response: AIResponse;
  onAction: (action: ActionItem) => void;
}

function StateBadge({ state }: { state: AIResponse["state"] }) {
  const config = {
    complete: {
      label: "Analysis complete",
      color: "var(--success)",
      bg: "var(--success-bg)",
      border: "var(--success-border)",
    },
    low_confidence: {
      label: "Low confidence",
      color: "var(--warning)",
      bg: "var(--warning-bg)",
      border: "var(--warning-border)",
    },
    partial: {
      label: "Partial result",
      color: "var(--info)",
      bg: "var(--info-bg)",
      border: "var(--info-border)",
    },
    processing: {
      label: "Processing",
      color: "var(--info)",
      bg: "var(--info-bg)",
      border: "var(--info-border)",
    },
    error: {
      label: "Failed",
      color: "var(--danger)",
      bg: "var(--danger-bg)",
      border: "var(--danger-border)",
    },
    idle: {
      label: "Idle",
      color: "var(--ink-tertiary)",
      bg: "var(--paper-secondary)",
      border: "var(--border-light)",
    },
  }[state];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: 500,
        padding: "3px 9px",
        borderRadius: "100px",
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: config.color,
          display: "inline-block",
        }}
      />
      {config.label}
    </span>
  );
}

export default function InsightCard({ response, onAction }: InsightCardProps) {
  const [detailExpanded, setDetailExpanded] = useState(false);

  return (
    <article
      className="animate-fade-in-up"
      aria-label={`Insight response for: ${response.queryText}`}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {/* Header */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "22px 24px",
        }}
      >
        {/* Query echo + state badge */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              fontSize: "12.5px",
              color: "var(--ink-tertiary)",
              fontStyle: "italic",
              flex: 1,
              minWidth: 0,
            }}
          >
            &ldquo;{response.queryText}&rdquo;
          </p>
          <StateBadge state={response.state} />
        </div>

        {/* Summary */}
        <p
          style={{
            fontSize: "15.5px",
            color: "var(--ink)",
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          {response.summary}
        </p>

        {/* Expand for detail */}
        {response.detail.length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <button
              onClick={() => setDetailExpanded(!detailExpanded)}
              aria-expanded={detailExpanded}
              aria-controls="detail-content"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--ink-secondary)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "var(--font-body)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                style={{
                  transform: detailExpanded ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <path
                  d="M4 2.5l4.5 4-4.5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {detailExpanded ? "Show less" : "Read full analysis"}
            </button>

            {detailExpanded && (
              <div
                id="detail-content"
                className="animate-fade-in"
                style={{
                  marginTop: "14px",
                  borderTop: "1px solid var(--border-light)",
                  paddingTop: "14px",
                }}
              >
                {response.detail.map((para, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "14px",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.7,
                      marginBottom: i < response.detail.length - 1 ? "12px" : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Caveats */}
        {response.caveats && response.caveats.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              background: "var(--paper-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
            }}
          >
            {response.caveats.map((c, i) => (
              <p
                key={i}
                style={{
                  fontSize: "12.5px",
                  color: "var(--ink-tertiary)",
                  lineHeight: 1.5,
                  marginBottom: i < response.caveats!.length - 1 ? "6px" : 0,
                  paddingLeft: "14px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "6px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--ink-tertiary)",
                  }}
                  aria-hidden
                />
                {c}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      {response.metrics.length > 0 && (
        <div className="animate-fade-in stagger-1">
          <MetricsGrid metrics={response.metrics} />
        </div>
      )}

      {/* Confidence */}
      <div className="animate-fade-in stagger-2">
        <ConfidencePanel
          confidence={response.confidence}
          state={response.state}
        />
      </div>

      {/* Reasoning */}
      <div className="animate-fade-in stagger-3">
        <ReasoningPanel
          reasoning={response.reasoning}
          sources={response.sources}
        />
      </div>

      {/* Actions */}
      {response.actions.length > 0 && (
        <div className="animate-fade-in stagger-4">
          <ActionsPanel actions={response.actions} onAction={onAction} />
        </div>
      )}
    </article>
  );
}
