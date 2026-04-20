export type ConfidenceLevel = "high" | "medium" | "low";
export type State = "error" | "processing" | "success";

export type UIState =
  | { type: "idle" }
  | {
      type: "processing";
      progress: number;
      isPartial: boolean;
      queryText: string;
    }
  | { type: "result"; response: any }
  | { type: "error"; message: string; queryText: string };

export type SimulationPhase = {
  state: QueryState;
  progress?: number;
  delay: number;
};

export interface AIResponse {
  id: string;
  queryText: string;
  queryMatch: string[];
  state: QueryState;
  summary: string;
  detail: string[];
  metrics: Metric[];
  confidence: {
    overall: number; // 0-1
    signals: ConfidenceSignal[];
  };
  sources: DataSource[];
  reasoning: ReasoningStep[];
  actions: ActionItem[];
  partialAt?: number; // ms when partial response arrived
  completedAt?: number;
  errorMessage?: string;
  caveats?: string[];
}

export type QueryState =
  | "idle"
  | "processing"
  | "partial"
  | "complete"
  | "low_confidence"
  | "error";

export interface ConfidenceSignal {
  label: string;
  score: number; // 0-1
  description: string;
}

export interface DataSource {
  name: string;
  type: "database" | "api" | "document" | "model";
  coverage: number; // 0-1, how much of the answer this source contributes
  freshness: "live" | "hourly" | "daily" | "weekly" | "stale";
  recordCount?: number;
}

export interface ReasoningStep {
  id: string;
  label: string;
  detail: string;
  duration_ms?: number;
}

export interface Metric {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "neutral";
  confident: boolean;
}

export interface ActionItem {
  id: string;
  label: string;
  description: string;
  type: "primary" | "secondary" | "destructive";
  query?: string; // if set, triggers a new query
}

export interface SuggestedQuery {
  id: string;
  text: string;
  category: string;
}
