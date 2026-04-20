# Insight — AI Supply Chain Intelligence Interface

A focused AI insights interface: question → insight → action. Built for the Product Design Engineer brief.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy to Vercel

```bash
npx vercel deploy
```
Or connect the GitHub repo — Vercel auto-detects Next.js.

---

## Project Structure

```
├── app/
│   ├── layout.tsx           Root layout + metadata
│   ├── page.tsx             State machine + query orchestration
│   └── globals.css          Design tokens, keyframes, base styles
├── components/
│   ├── QueryInput.tsx       Textarea + submit + suggested queries
│   ├── ProcessingState.tsx  Animated progress + skeleton
│   ├── InsightCard.tsx      Main result: summary, detail, metrics
│   ├── MetricsGrid.tsx      KPI cards with uncertainty markers
│   ├── ConfidencePanel.tsx  Score + expandable signal breakdown
│   ├── ReasoningPanel.tsx   Source coverage + reasoning timeline
│   ├── ActionsPanel.tsx     Next-action buttons
│   ├── ErrorState.tsx       Error display with retry
│   └── HistorySidebar.tsx   Query history + system status
├── lib/
│   └── mockData.ts          Simulation engine + realistic domain data
└── types/
    └── index.ts             Core TypeScript interfaces
```

## States

| State | UI |
|---|---|
| `idle` | Hero + query input + suggested queries |
| `processing` | Animated progress bar + step labels |
| `partial` | Progress bar + shimmer skeleton |
| `complete` | Full InsightCard |
| `low_confidence` | Warning banner + dashed uncertain metrics |
| `error` | Error card with retry |

## Try these queries

- **"Which suppliers have the highest on-time delivery risk this quarter?"** → high confidence
- **"What is driving the 14% cost increase in APAC components?"** → low confidence scenario  
- **"Forecast inventory shortfall for SKUs in the electronics category"** → action-rich result
- **"show me an error"** → error state
- Any other query → realistic generic fallback
