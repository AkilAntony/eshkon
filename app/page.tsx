"use client";

import { useState, useCallback, useRef } from "react";

import QueryInput from "@/components/QueryInput";
import ProcessingState from "@/components/ProcessingState";
import InsightCard from "@/components/InsightCard";
import ErrorState from "@/components/ErrorState";
import { SUGGESTED_QUERIES } from "@/data";
import { ActionItem, UIState } from "@/types/common";
import { getSimulationPlan } from "@/utils/getSimulationPlan";

export default function Home() {
  const [uiState, setUiState] = useState<UIState>({ type: "idle" });
  const simulationRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  const clearSimulation = () => {
    simulationRef.current.forEach(clearTimeout);
    simulationRef.current = [];
  };

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuery = useCallback((queryText: string) => {
    clearSimulation();
    scrollToTop();

    const { phases, finalResponse } = getSimulationPlan(queryText);

    phases.forEach((phase) => {
      const t = setTimeout(() => {
        if (phase.state === "error") {
          setUiState({
            type: "error",
            message:
              finalResponse.errorMessage || "An unexpected error occurred.",
            queryText,
          });
        } else if (phase.state === "processing" || phase.state === "partial") {
          setUiState({
            type: "processing",
            progress: phase.progress ?? 0,
            isPartial: phase.state === "partial",
            queryText,
          });
        } else {
          setUiState({ type: "result", response: finalResponse });
        }
      }, phase.delay);
      simulationRef.current.push(t);
    });
  }, []);

  const handleAction = useCallback(
    (action: ActionItem) => {
      if (action.query) {
        handleQuery(action.query);
      }
    },
    [handleQuery],
  );

  const handleRetry = () => {
    if (uiState.type === "error") handleQuery(uiState.queryText);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main */}
      <div
        ref={mainRef}
        className="flex flex-col flex-1 w-full items-center overflow-y-auto  "
      >
        <main
          className=" w-full max-w-[820px] mx-auto py-8 px-5 "
          style={{
            padding: "20px",
            marginTop: "10px",
          }}
        >
          {uiState.type === "idle" && (
            <div className="animate-fade-in-up" style={{}}>
              <h1
                className=" "
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5vw, 42px)",
                  fontWeight: 400,
                  color: "var(--ink)",
                  lineHeight: 1.15,
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                What would you like
                <br />
                <em>to understand today?</em>
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--ink-tertiary)",
                  marginBottom: "36px",
                  maxWidth: "480px",
                  lineHeight: 1.6,
                }}
              >
                Ask a question about your supply chain. Insight analyses your
                data, surfaces confidence signals, and guides your next steps.
              </p>
              <QueryInput
                onSubmit={handleQuery}
                isLoading={false}
                suggestedQueries={SUGGESTED_QUERIES}
              />
            </div>
          )}

          {uiState.type === "processing" && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <QueryInput
                  onSubmit={handleQuery}
                  isLoading={true}
                  suggestedQueries={[]}
                />
              </div>
              <ProcessingState
                progress={uiState.progress}
                isPartial={uiState.isPartial}
                queryText={uiState.queryText}
              />
            </div>
          )}

          {uiState.type === "result" && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <QueryInput
                  onSubmit={handleQuery}
                  isLoading={false}
                  suggestedQueries={SUGGESTED_QUERIES.slice(0, 3)}
                />
              </div>
              <InsightCard
                response={uiState.response}
                onAction={handleAction}
              />
            </div>
          )}

          {uiState.type === "error" && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <QueryInput
                  onSubmit={handleQuery}
                  isLoading={false}
                  suggestedQueries={SUGGESTED_QUERIES.slice(0, 2)}
                />
              </div>
              <ErrorState message={uiState.message} onRetry={handleRetry} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
