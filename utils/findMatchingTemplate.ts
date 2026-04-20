import { RESPONSE_TEMPLATES } from "@/data";
import { AIResponse } from "@/types/common";

export function findMatchingTemplate(query: string): AIResponse | null {
  const q = query.toLowerCase();

  for (const template of RESPONSE_TEMPLATES) {
    const match = template.queryMatch.some((keyword: string) =>
      q.includes(keyword),
    );

    if (match) return template;
  }

  return null;
}
