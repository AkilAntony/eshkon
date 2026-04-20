import { FALLBACK_RESPONSE } from "@/data";
import { AIResponse, SimulationPhase } from "@/types/common";
import { findMatchingTemplate } from "@/utils/findMatchingTemplate";

export function getSimulationPlan(query: string): {
  phases: SimulationPhase[];
  finalResponse: AIResponse;
} {
  const template = findMatchingTemplate(query);
  const finalResponse: AIResponse = template
    ? { ...template, queryText: query }
    : { ...FALLBACK_RESPONSE, queryText: query };

  const isLowConf = finalResponse.confidence.overall < 0.6;
  const isError =
    query.toLowerCase().includes("error") ||
    query.toLowerCase().includes("fail");

  if (isError) {
    return {
      phases: [
        { state: "processing", progress: 0, delay: 0 },
        { state: "processing", progress: 40, delay: 800 },
        { state: "error", delay: 1400 },
      ],
      finalResponse: {
        ...finalResponse,
        state: "error",
        errorMessage:
          "The query could not be completed. One or more required data sources are unavailable. Please try again or contact your data administrator.",
      },
    };
  }

  return {
    phases: [
      { state: "processing", progress: 0, delay: 0 },
      { state: "processing", progress: 25, delay: 600 },
      { state: "processing", progress: 55, delay: 1400 },
      { state: "partial", progress: 80, delay: 2200 },
      {
        state: isLowConf ? "low_confidence" : "complete",
        progress: 100,
        delay: 3400,
      },
    ],
    finalResponse: {
      ...finalResponse,
      state: isLowConf ? "low_confidence" : "complete",
    },
  };
}
