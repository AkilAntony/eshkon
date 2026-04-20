"use client";

import { SuggestedQuery } from "@/types/common";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  suggestedQueries: SuggestedQuery[];
}

export default function QueryInput({
  onSubmit,
  isLoading,
  suggestedQueries,
}: QueryInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (q: SuggestedQuery) => {
    if (isLoading) return;
    onSubmit(q.text);
  };

  return (
    <div>
      {/* Input area */}
      <div style={{ position: "relative" }}>
        <textarea
          className="hide-scrollbar"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your supply chain…"
          rows={1}
          disabled={isLoading}
          aria-label="Query input"
          style={{
            width: "100%",
            background: "var(--paper)",
            border: "1.5px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "14px",
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--ink)",
            resize: "none",
            lineHeight: 1.5,
            minHeight: "52px",
            maxHeight: "160px",
            overflowY: "auto",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "oklch(39.8% 0.195 277.366)";
            e.target.style.boxShadow = "0 0 0 3px oklch(89.1% 0.27 292.581)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "oklch(39.8% 0.195 277.366)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          aria-label="Submit query"
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            width: "34px",
            height: "34px",
            background:
              !value.trim() || isLoading ? "var(--border)" : "var(--ink)",
            border: "none",
            borderRadius: "8px",
            color: "var(--paper)",
            cursor: !value.trim() || isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s ease, transform 0.1s ease",
          }}
          onMouseDown={(e) => {
            if (!isLoading) e.currentTarget.style.transform = "scale(0.94)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isLoading ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="18 20"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Suggested queries */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
        role="list"
        aria-label="Suggested queries"
      >
        {suggestedQueries.slice(0, 4).map((q, i) => (
          <button
            key={q.id}
            onClick={() => handleSuggestion(q)}
            disabled={isLoading}
            role="listitem"
            className={`animate-fade-in stagger-${i + 1}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "var(--paper-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "100px",
              fontSize: "12.5px",
              color: "var(--ink-secondary)",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.15s, background 0.15s, color 0.15s",
              opacity: isLoading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--paper-tertiary)";
                e.currentTarget.style.color = "var(--ink)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-light)";
              e.currentTarget.style.background = "var(--paper-secondary)";
              e.currentTarget.style.color = "var(--ink-secondary)";
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "var(--ink-tertiary)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {q.category}
            </span>
            <span
              style={{
                maxWidth: "220px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {q.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
