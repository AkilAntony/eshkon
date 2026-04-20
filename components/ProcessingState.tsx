"use client";

import { useEffect, useState } from "react";

interface ProcessingStateProps {
  progress: number;
  isPartial: boolean;
  queryText: string;
}

const PROCESSING_STEPS = [
  "Understanding your query…",
  "Fetching sales data…",
  "Comparing weekly performance…",
  "Identifying key drop factors…",
  "Generating insights…",
];

export default function ProcessingState({
  progress,
  isPartial,
  queryText,
}: ProcessingStateProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, PROCESSING_STEPS.length - 1));
    }, 700);
    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 400);
    return () => {
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div
      className="animate-fade-in"
      style={{
        padding: "32px",
        background: "var(--paper)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
      }}
      role="status"
      aria-live="polite"
      // aria-label={`Processing query: ${progress}% complete`}
    >
      {/* Query echo */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--ink-tertiary)",
          marginBottom: "20px",
          fontStyle: "italic",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        &ldquo;{queryText}&rdquo;
      </p>

      {/* Progress percentage + step */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Animated dots */}
          <div style={{ display: "flex", gap: "4px" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--info)",
                  display: "inline-block",
                  animation: `dotBounce 1.2s ease infinite ${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "var(--ink-secondary)" }}>
            {isPartial ? "Completing analysis…" : PROCESSING_STEPS[stepIndex]}
          </span>
        </div>
      </div>

      {/* Skeleton cards when partial */}
      {isPartial && (
        <div style={{ marginTop: "24px" }} aria-hidden="true">
          <div
            className="shimmer-skeleton"
            style={{
              height: "14px",
              borderRadius: "4px",
              marginBottom: "10px",
              width: "85%",
            }}
          />
          <div
            className="shimmer-skeleton"
            style={{
              height: "14px",
              borderRadius: "4px",
              marginBottom: "10px",
              width: "70%",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="shimmer-skeleton"
                style={{ height: "72px", borderRadius: "var(--radius-md)" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
