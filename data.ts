import { AIResponse } from "@/types/common";

export const FALLBACK_RESPONSE: AIResponse = {
  id: "fallback",
  queryText: "",
  queryMatch: [],
  state: "low_confidence",
  summary:
    "No matching data was found for this query in the current dataset. The response below is a best-effort inference based on partially related signals. Treat all figures as indicative only.",
  detail: [
    "The query did not match any pre-indexed analysis in the knowledge base. This response has been generated from loosely related data signals and should not be used for decision-making without further investigation.",
    "If you were expecting a specific report or metric, check that the query terms match the available data categories: supplier performance, inventory, customer behaviour, marketing, fulfilment, fraud, and pricing.",
    "You can refine your query using more specific terminology — for example, referencing a category name, time period, or metric type — to improve match quality.",
    "If this query represents a recurring need, contact your data team to have a dedicated analysis added to the knowledge base.",
  ],
  metrics: [
    {
      label: "Data match quality",
      value: "0%",
      delta: "no indexed match found",
      deltaDirection: "neutral",
      confident: false,
    },
    {
      label: "Inference confidence",
      value: "Very low",
      delta: "loosely related signals only",
      deltaDirection: "neutral",
      confident: false,
    },
    {
      label: "Recommended action",
      value: "Refine query",
      delta: "or contact data team",
      deltaDirection: "neutral",
      confident: false,
    },
    {
      label: "Sources checked",
      value: "10 templates",
      delta: "no match returned",
      deltaDirection: "neutral",
      confident: false,
    },
  ],
  confidence: {
    overall: 0.12,
    signals: [
      {
        label: "Data completeness",
        score: 0.1,
        description:
          "No direct data records were found for this query. Response is not grounded in indexed analysis.",
      },
      {
        label: "Signal recency",
        score: 0.2,
        description:
          "Recency cannot be assessed — no matched dataset to evaluate.",
      },
      {
        label: "Model agreement",
        score: 0.1,
        description:
          "No model consensus available. The query returned no confident classification from the routing layer.",
      },
      {
        label: "External corroboration",
        score: 0.15,
        description:
          "No external data sources were consulted. Corroboration is not possible without a matched query context.",
      },
    ],
  },
  sources: [
    { name: "Query Router", type: "api", coverage: 1.0, freshness: "live" },
  ],
  reasoning: [
    {
      id: "rs1",
      label: "Attempted query matching",
      detail:
        "Searched all 10 indexed response templates using keyword and semantic similarity. No match exceeded the confidence threshold.",
      duration_ms: 140,
    },
    {
      id: "rs2",
      label: "Checked partial matches",
      detail:
        "Evaluated partial keyword overlap across templates. Closest match scored below the 0.40 similarity floor required to return a grounded response.",
      duration_ms: 210,
    },
    {
      id: "rs3",
      label: "Returned fallback",
      detail:
        "No actionable insight could be generated. Fallback response returned with low-confidence flag to prevent misleading the user.",
      duration_ms: 30,
    },
  ],
  actions: [
    {
      id: "a1",
      label: "Try a related query",
      description: "Browse available analysis topics",
      type: "primary",
      query: "What questions can I ask about my e-commerce data?",
    },
    {
      id: "a2",
      label: "Request a new analysis",
      description: "Ask the data team to index this topic",
      type: "secondary",
      query:
        "How do I request a new data analysis to be added to the knowledge base?",
    },
  ],
  caveats: [
    "This is a fallback response. No real data underlies this result.",
    "Do not use this response for reporting, planning, or operational decisions.",
  ],
};

export const RESPONSE_TEMPLATES: AIResponse[] = [
  {
    id: "r1",
    queryText:
      "Which product categories have the highest cart abandonment rate this month?",
    queryMatch: ["product", "highest", "cart", "this month"],
    state: "complete",
    summary:
      "Four product categories show cart abandonment rates significantly above the site average of 68.4%. Electronics and luxury accessories are the worst performers, driven by price sensitivity, insufficient trust signals, and checkout friction. Combined, these categories represent $1.2M in monthly recovered revenue opportunity.",
    detail: [
      "Electronics (abandonment rate: 84.2%) is the highest-risk category. Analysis shows 61% of abandoners drop off at the shipping cost reveal step. Average cart value in this category is $312, and users show strong price-comparison behaviour — median session includes 3.4 external site visits before returning.",
      "Luxury Accessories (abandonment rate: 79.1%) shows high drop-off at the payment step. Heatmap data indicates hesitation around the returns policy section. Items above $200 have a 23% higher abandonment rate than those below $200 within this category.",
      'Home Furniture (abandonment rate: 74.8%) is affected primarily by delivery time uncertainty. 43% of abandoners in exit surveys cited "unclear delivery date" as the primary reason. Lead times of 4–6 weeks for custom items are not surfaced early enough in the funnel.',
      "Footwear (abandonment rate: 71.3%) shows size-related hesitation as the dominant friction point. Sessions with cart abandonment in this category have a 2.1x higher rate of size guide page visits compared to converting sessions.",
    ],
    metrics: [
      {
        label: "Site avg abandonment",
        value: "68.4%",
        delta: "+3.1% vs last month",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Recoverable revenue",
        value: "$1.2M",
        delta: "monthly opportunity",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Top drop-off step",
        value: "Shipping reveal",
        delta: "61% of electronics exits",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Recovery email CTR",
        value: "14.2%",
        delta: "+2.1% vs benchmark",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.85,
      signals: [
        {
          label: "Data completeness",
          score: 0.93,
          description:
            "Funnel event tracking is complete across all categories. 2 minor checkout steps lack granular event data.",
        },
        {
          label: "Signal recency",
          score: 0.91,
          description:
            "Session data is 24 hours old. Abandonment rates calculated on trailing 30-day window.",
        },
        {
          label: "Model agreement",
          score: 0.82,
          description:
            "Behavioural clustering and rule-based funnel analysis agree on top 3 categories. Footwear ranking differs slightly between models.",
        },
        {
          label: "External corroboration",
          score: 0.74,
          description:
            "Industry benchmarks confirm electronics abandonment trends. Luxury category data is internally sourced only.",
        },
      ],
    },
    sources: [
      {
        name: "Session Analytics DB",
        type: "database",
        coverage: 0.52,
        freshness: "daily",
        recordCount: 284910,
      },
      {
        name: "Checkout Event Stream",
        type: "api",
        coverage: 0.28,
        freshness: "live",
        recordCount: 94320,
      },
      {
        name: "Exit Survey Responses",
        type: "document",
        coverage: 0.12,
        freshness: "weekly",
        recordCount: 1842,
      },
      {
        name: "Heatmap Analytics API",
        type: "api",
        coverage: 0.08,
        freshness: "daily",
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Segmented sessions by category",
        detail:
          "Grouped all cart sessions by primary product category. Sessions with multi-category carts were assigned to the highest-value category.",
        duration_ms: 290,
      },
      {
        id: "rs2",
        label: "Calculated per-step abandonment",
        detail:
          "Mapped drop-off events to each checkout step: product page, cart, shipping, payment, confirmation.",
        duration_ms: 510,
      },
      {
        id: "rs3",
        label: "Benchmarked against site average",
        detail:
          "Compared category abandonment rates against the trailing 30-day site-wide average of 68.4%.",
        duration_ms: 140,
      },
      {
        id: "rs4",
        label: "Cross-referenced exit intent data",
        detail:
          "Joined abandonment sessions with exit survey responses and heatmap scroll depth to infer primary friction causes.",
        duration_ms: 730,
      },
      {
        id: "rs5",
        label: "Estimated recovery opportunity",
        detail:
          "Applied average order value per category and a 12% recovery rate assumption from email re-engagement campaigns.",
        duration_ms: 210,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Audit electronics checkout flow",
        description: "Identify and fix shipping cost friction",
        type: "primary",
        query:
          "Show me the step-by-step funnel drop-off for the electronics category checkout",
      },
      {
        id: "a2",
        label: "Set up A/B test",
        description: "Test early shipping cost disclosure in electronics",
        type: "secondary",
        query:
          "What checkout A/B tests would most reduce electronics cart abandonment?",
      },
      {
        id: "a3",
        label: "Review recovery email sequence",
        description: "Optimise abandoned cart emails for top categories",
        type: "secondary",
        query: "Show performance of abandoned cart email sequences by category",
      },
    ],
    caveats: [
      "Recovery revenue estimate assumes a 12% email recovery rate, which may vary by category and campaign quality.",
      "Exit survey sample is self-selected and may not represent all abandoners accurately.",
    ],
  },

  {
    id: "r2",
    queryText: "Which SKUs are at risk of stockout in the next 30 days?",
    queryMatch: ["SKUs", "stockout", "next 30 days"],
    state: "complete",
    summary:
      "17 SKUs across apparel and electronics are projected to hit zero inventory within 30 days at current sell-through rates. 5 are critically urgent with less than 7 days of stock remaining. Total at-risk GMV is approximately $840K.",
    detail: [
      "5 SKUs are in critical status with under 7 days of cover: three bestselling sneaker colourways (SKU SN-2201, SN-2205, SN-2209) and two wireless earbuds variants (EB-0041, EB-0042). These items have combined daily sales velocity of 312 units and zero inbound stock confirmed.",
      "12 SKUs are in warning status, projected to breach safety stock between day 8 and day 30. The majority are seasonal apparel items where reorder lead times of 18–22 days create a tight buffer.",
      "Demand is elevated due to an ongoing 20%-off sitewide promotion that started 4 days ago. Sell-through rates on affected SKUs are running 2.3x above the pre-promotion baseline, compressing projected cover days significantly.",
      "The remaining 634 active SKUs have adequate inventory with an average cover of 54 days, well above the 30-day safety stock policy.",
    ],
    metrics: [
      {
        label: "Critical SKUs",
        value: "5",
        delta: "stockout <7 days",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Warning SKUs",
        value: "12",
        delta: "breach in 8–30 days",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "At-risk GMV",
        value: "$840K",
        delta: "next 30-day window",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Promo velocity lift",
        value: "2.3x",
        delta: "vs pre-promo baseline",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.82,
      signals: [
        {
          label: "Data completeness",
          score: 0.97,
          description:
            "Inventory positions are fully reconciled across all 3 warehouses as of 6 hours ago.",
        },
        {
          label: "Signal recency",
          score: 0.89,
          description:
            "Sales velocity calculated on trailing 7-day window. Promotion effect may not yet be fully stabilised.",
        },
        {
          label: "Forecast reliability",
          score: 0.71,
          description:
            "Promotion-adjusted demand forecast carries higher uncertainty. Sell-through could accelerate further if the promotion is extended.",
        },
        {
          label: "Lead time accuracy",
          score: 0.84,
          description:
            "Supplier lead times confirmed within the last 2 weeks for 14 of 17 at-risk SKUs.",
        },
      ],
    },
    sources: [
      {
        name: "Warehouse Management System",
        type: "database",
        coverage: 0.55,
        freshness: "live",
        recordCount: 651,
      },
      {
        name: "Order Management System",
        type: "database",
        coverage: 0.3,
        freshness: "hourly",
        recordCount: 18420,
      },
      {
        name: "Promotions Engine",
        type: "api",
        coverage: 0.1,
        freshness: "live",
      },
      {
        name: "Supplier Lead Time Registry",
        type: "document",
        coverage: 0.05,
        freshness: "weekly",
        recordCount: 88,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Loaded inventory positions",
        detail:
          "Retrieved on-hand and in-transit stock for all 651 active SKUs across 3 fulfilment centres.",
        duration_ms: 200,
      },
      {
        id: "rs2",
        label: "Calculated promotion-adjusted velocity",
        detail:
          "Applied a 2.3x promotion multiplier to baseline daily sales rates for SKUs included in the active discount campaign.",
        duration_ms: 480,
      },
      {
        id: "rs3",
        label: "Projected cover days",
        detail:
          "Divided current inventory by adjusted daily velocity to estimate days of cover per SKU.",
        duration_ms: 160,
      },
      {
        id: "rs4",
        label: "Flagged against safety stock thresholds",
        detail:
          "Critical: cover < 7 days or lead time exceeds projected cover. Warning: cover between 7 and 30 days.",
        duration_ms: 110,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Generate emergency POs",
        description: "Draft purchase orders for 5 critical SKUs",
        type: "primary",
        query:
          "Generate draft purchase orders for SKUs SN-2201, SN-2205, SN-2209, EB-0041, and EB-0042",
      },
      {
        id: "a2",
        label: "Suppress from promotion",
        description: "Remove critical SKUs from the active discount",
        type: "secondary",
        query:
          "What is the process to exclude specific SKUs from the current sitewide promotion?",
      },
      {
        id: "a3",
        label: "View full shortfall report",
        description: "All 17 at-risk SKUs with cover projections",
        type: "secondary",
        query: "Show the full 30-day stockout risk report for all at-risk SKUs",
      },
    ],
    caveats: [
      "Projections assume the current promotion continues at its present discount level. Extension or deepening of the promotion would accelerate stockout timelines.",
      "In-transit stock estimates depend on supplier shipping confirmations, which have not been received for 3 of the 17 at-risk SKUs.",
    ],
  },

  {
    id: "r3",
    queryText:
      "What is causing the drop in conversion rate on mobile this week?",
    queryMatch: ["drop in conversion rate on mobile"],
    state: "low_confidence",
    summary:
      "Mobile conversion rate has declined 18% week-over-week, from 2.4% to 1.97%. Early signals point to a combination of a recent app update, increased page load times on 4G connections, and a possible checkout bug on iOS 17.4. However, root cause attribution is uncertain — the contributing factors overlap and the bug report is unconfirmed.",
    detail: [
      "A new app version (v4.2.1) was released 5 days ago, coinciding with the start of the conversion drop. The update included a redesigned product detail page (PDP) and a new one-page checkout flow. Session recordings show increased scroll hesitation on the new PDP layout.",
      "Page load time on 4G connections increased by an average of 1.4 seconds following the update, likely due to uncompressed image assets in the new PDP template. This affects an estimated 38% of mobile sessions.",
      "An unconfirmed bug report from 3 users describes a checkout freeze on iOS 17.4 at the payment step. Engineering has not yet reproduced the issue in staging. If confirmed, this could affect up to 22% of mobile users running iOS 17.4.",
      "Android conversion rate has declined only 4% over the same period, compared to 18% on iOS. This asymmetry supports the iOS-specific bug hypothesis but does not conclusively rule out design-related causes affecting both platforms.",
    ],
    metrics: [
      {
        label: "Mobile CVR this week",
        value: "1.97%",
        delta: "-18% vs last week",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "iOS vs Android delta",
        value: "18% vs 4%",
        delta: "CVR decline this week",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "4G load time increase",
        value: "+1.4s",
        delta: "since v4.2.1 release",
        deltaDirection: "up",
        confident: false,
      },
      {
        label: "Potential iOS bug reach",
        value: "22%",
        delta: "of mobile users",
        deltaDirection: "neutral",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.48,
      signals: [
        {
          label: "Data completeness",
          score: 0.82,
          description:
            "Session and conversion data is complete. Device and OS segmentation is available for 94% of sessions.",
        },
        {
          label: "Signal recency",
          score: 0.88,
          description:
            "Data is current to yesterday. The issue is ongoing and new data may shift the analysis.",
        },
        {
          label: "Model agreement",
          score: 0.39,
          description:
            "Attribution models disagree on whether the primary cause is the UX change or the performance regression. Bug hypothesis is based on limited reports only.",
        },
        {
          label: "External corroboration",
          score: 0.51,
          description:
            "No external benchmarks available for this specific app version. iOS 17.4 known issues have not been publicly documented.",
        },
      ],
    },
    sources: [
      {
        name: "Mobile Analytics SDK",
        type: "api",
        coverage: 0.5,
        freshness: "daily",
        recordCount: 142300,
      },
      {
        name: "App Performance Monitor",
        type: "api",
        coverage: 0.25,
        freshness: "hourly",
      },
      {
        name: "Session Recording Tool",
        type: "api",
        coverage: 0.15,
        freshness: "daily",
        recordCount: 4200,
      },
      {
        name: "Customer Support Tickets",
        type: "database",
        coverage: 0.1,
        freshness: "daily",
        recordCount: 38,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Isolated mobile conversion trend",
        detail:
          "Segmented CVR by device type and OS. Confirmed decline is concentrated on iOS mobile sessions.",
        duration_ms: 310,
      },
      {
        id: "rs2",
        label: "Correlated with release timeline",
        detail:
          "Overlaid CVR trend against app release history. Drop onset aligns with v4.2.1 release date within a 6-hour window.",
        duration_ms: 420,
      },
      {
        id: "rs3",
        label: "Analysed performance metrics",
        detail:
          "Pulled 4G load time and time-to-interactive from the performance monitor for pre- and post-release periods.",
        duration_ms: 560,
      },
      {
        id: "rs4",
        label: "Reviewed support tickets",
        detail:
          "Searched for checkout-related tickets filed since the release. Found 3 reports describing a freeze at the iOS payment step.",
        duration_ms: 280,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Escalate iOS bug to engineering",
        description: "Prioritise reproduction of the iOS 17.4 checkout freeze",
        type: "primary",
        query:
          "Summarise the iOS checkout freeze bug reports for the engineering team",
      },
      {
        id: "a2",
        label: "Audit PDP image assets",
        description: "Identify uncompressed images in the new template",
        type: "secondary",
        query:
          "Which image assets in the v4.2.1 PDP template are unoptimised for mobile?",
      },
    ],
    caveats: [
      "Bug attribution is based on 3 user reports only. Treat as a hypothesis until engineering reproduces the issue.",
      "Design-related CVR impact cannot be cleanly isolated while the potential bug remains unresolved.",
    ],
  },

  {
    id: "r4",
    queryText:
      "Which marketing channels are delivering the highest customer lifetime value?",
    queryMatch: ["highest customer lifetime"],
    state: "complete",
    summary:
      "Organic search and email retention campaigns are delivering the highest LTV customers, outperforming paid social by 2.1x on a 24-month LTV basis. Paid search sits in the middle tier. TikTok and influencer-driven traffic shows high initial AOV but significantly lower repeat purchase rates.",
    detail: [
      "Organic search (24-month LTV: $284) acquires customers with the strongest long-term retention. These customers have the highest repeat purchase rate (41%) and the lowest return rate (12.4%). The primary category mix skews toward homewares and apparel — considered purchase categories with strong loyalty potential.",
      "Email retention campaigns (24-month LTV: $261) are the second-highest LTV channel. These are existing customers re-engaged via lifecycle flows, so acquisition cost is near zero, making ROI significantly higher than other channels despite lower initial AOV.",
      "Paid search (24-month LTV: $198) performs in line with the site average. Higher CAC ($34 average) compresses margin, but customer quality is solid. Brand keyword campaigns outperform non-brand by 38% on 12-month LTV.",
      "Paid social and influencer traffic (24-month LTV: $134) shows the lowest long-term value. First-order AOV is competitive ($89 vs site average of $84), but 90-day repeat rate is only 14%, versus 31% for organic. This cohort shows high sensitivity to discounting and low brand affinity.",
    ],
    metrics: [
      {
        label: "Organic search LTV",
        value: "$284",
        delta: "24-month cohort",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Email LTV",
        value: "$261",
        delta: "retention campaigns",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Paid social LTV",
        value: "$134",
        delta: "2.1x below organic",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Influencer repeat rate",
        value: "14%",
        delta: "vs 31% organic",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.79,
      signals: [
        {
          label: "Data completeness",
          score: 0.88,
          description:
            "Channel attribution data is available for 86% of orders. 14% are unattributed direct sessions.",
        },
        {
          label: "Signal recency",
          score: 0.84,
          description:
            "LTV calculations based on 24-month cohorts. Most recent cohort is only 8 months old and LTV is partially projected.",
        },
        {
          label: "Model agreement",
          score: 0.76,
          description:
            "Last-click and data-driven attribution models agree on channel ranking. Absolute LTV values differ by up to 18%.",
        },
        {
          label: "Cohort maturity",
          score: 0.71,
          description:
            "Influencer channel cohorts are newer (avg 11 months) — projected LTV carries higher uncertainty than established channels.",
        },
      ],
    },
    sources: [
      {
        name: "Customer Data Platform",
        type: "database",
        coverage: 0.55,
        freshness: "daily",
        recordCount: 412800,
      },
      {
        name: "Attribution Analytics Tool",
        type: "api",
        coverage: 0.25,
        freshness: "daily",
      },
      {
        name: "Email Platform API",
        type: "api",
        coverage: 0.12,
        freshness: "daily",
        recordCount: 98200,
      },
      {
        name: "Ad Platform Connectors",
        type: "api",
        coverage: 0.08,
        freshness: "daily",
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Segmented customers by acquisition channel",
        detail:
          "Assigned each customer to their first-touch acquisition channel using the CDP attribution model.",
        duration_ms: 380,
      },
      {
        id: "rs2",
        label: "Calculated 24-month LTV per cohort",
        detail:
          "Summed revenue per customer over 24 months, net of returns. Projected remaining LTV for cohorts under 24 months using retention curves.",
        duration_ms: 720,
      },
      {
        id: "rs3",
        label: "Adjusted for acquisition cost",
        detail:
          "Sourced CAC by channel from ad platform data to calculate contribution margin per acquired customer.",
        duration_ms: 290,
      },
      {
        id: "rs4",
        label: "Analysed repeat purchase behaviour",
        detail:
          "Calculated 90-day and 12-month repeat rates by channel cohort to distinguish high-LTV from one-time buyer profiles.",
        duration_ms: 440,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Reallocate budget toward organic",
        description:
          "Model impact of shifting 15% of paid social budget to SEO",
        type: "primary",
        query:
          "Model the LTV impact of reallocating 15% of paid social budget to organic search investment",
      },
      {
        id: "a2",
        label: "Audit influencer ROI",
        description: "Evaluate influencer partnerships by LTV cohort",
        type: "secondary",
        query:
          "Which influencer partnerships have produced the highest 12-month LTV cohorts?",
      },
    ],
    caveats: [
      "LTV projections for cohorts under 24 months rely on retention curve assumptions that may not hold for newer acquisition channels.",
      "Unattributed direct sessions (14%) may skew organic search figures upward if some represent prior paid touchpoints.",
    ],
  },

  {
    id: "r5",
    queryText:
      "What is the return rate trend across product categories and what is driving it?",
    queryMatch: ["trend across product categories"],
    state: "complete",
    summary:
      "Overall return rate has increased from 18.2% to 22.7% over the past 90 days. Apparel is the primary driver, with a return rate of 34.1% — up 9 points year-over-year. The root causes are split between sizing issues, product-description mismatches, and a recent shift toward higher-ticket items with stronger buyer scrutiny.",
    detail: [
      "Apparel (return rate: 34.1%, +9pp YoY) is the dominant driver. Size-related returns account for 58% of apparel returns, based on reason code data. Returns on items without size guide links on the PDP are 2.4x higher than those with guides — a significant and actionable gap.",
      'Electronics (return rate: 14.3%, +2.1pp YoY) shows a modest increase driven primarily by "not as described" reason codes (41% of returns). Product specification accuracy on 12 recently added third-party seller SKUs has not been audited.',
      "Home & Garden (return rate: 9.8%, flat YoY) remains the lowest-return category and is performing in line with historical norms. No intervention required.",
      "A mix shift toward higher-AOV items accounts for an estimated 1.5–2pp of the overall rate increase, independent of product quality or description issues. Customers purchasing items above $150 return at a rate 1.8x higher than those below $75.",
    ],
    metrics: [
      {
        label: "Overall return rate",
        value: "22.7%",
        delta: "+4.5pp vs 90 days ago",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Apparel return rate",
        value: "34.1%",
        delta: "+9pp YoY",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Size-related returns",
        value: "58%",
        delta: "of apparel returns",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "AOV mix shift impact",
        value: "~1.5–2pp",
        delta: "of overall rate increase",
        deltaDirection: "neutral",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.83,
      signals: [
        {
          label: "Data completeness",
          score: 0.91,
          description:
            'Return reason codes are captured for 89% of returns. 11% are coded as "other" with no sub-reason.',
        },
        {
          label: "Signal recency",
          score: 0.95,
          description:
            "Return data is updated daily. Trend is consistent over the full 90-day window.",
        },
        {
          label: "Model agreement",
          score: 0.78,
          description:
            "Driver attribution is consistent across regression and correlation analyses. AOV mix shift estimate has wider confidence bounds.",
        },
        {
          label: "External corroboration",
          score: 0.72,
          description:
            "Industry data confirms apparel return rates of 28–35% are common in online-only retail. Our rate is at the high end of the range.",
        },
      ],
    },
    sources: [
      {
        name: "Returns Management System",
        type: "database",
        coverage: 0.6,
        freshness: "daily",
        recordCount: 52140,
      },
      {
        name: "Order Management System",
        type: "database",
        coverage: 0.28,
        freshness: "hourly",
        recordCount: 229800,
      },
      {
        name: "Product Catalogue DB",
        type: "database",
        coverage: 0.08,
        freshness: "weekly",
        recordCount: 12400,
      },
      {
        name: "Customer Survey Tool",
        type: "api",
        coverage: 0.04,
        freshness: "weekly",
        recordCount: 2100,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Calculated return rates by category",
        detail:
          "Divided return quantity by shipped quantity for each category over rolling 90-day and 365-day windows.",
        duration_ms: 240,
      },
      {
        id: "rs2",
        label: "Analysed return reason codes",
        detail:
          "Grouped return reasons into size, description mismatch, defect, and buyer remorse buckets per category.",
        duration_ms: 390,
      },
      {
        id: "rs3",
        label: "Tested size guide hypothesis",
        detail:
          "Compared return rates for apparel PDPs with and without size guide links. Controlled for category and price band.",
        duration_ms: 560,
      },
      {
        id: "rs4",
        label: "Modelled AOV mix shift",
        detail:
          "Measured change in AOV distribution over the 90-day period and estimated its mechanical impact on return rate.",
        duration_ms: 310,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Audit PDPs missing size guides",
        description: "Identify and fix apparel pages without size guide links",
        type: "primary",
        query:
          "List all apparel SKUs with active inventory that are missing a size guide link on their PDP",
      },
      {
        id: "a2",
        label: "Audit third-party electronics specs",
        description: "Review 12 recently added seller SKUs for spec accuracy",
        type: "secondary",
        query:
          "Show me the 12 third-party electronics SKUs added in the last 60 days with the highest return rates",
      },
    ],
    caveats: [
      "AOV mix shift impact is an estimate based on cohort comparison — individual-level causal attribution is not available.",
      '11% of returns coded as "other" may contain additional signal that is currently invisible.',
    ],
  },

  {
    id: "r6",
    queryText: "Which customer segments have churned in the last 60 days?",
    queryMatch: ["churned"],
    state: "complete",
    summary:
      "An estimated 12,400 previously active customers have lapsed in the past 60 days, representing $2.1M in annualised revenue risk. The sharpest churn is concentrated in the 1–2 year customer tenure segment and among customers acquired via paid social. High-value loyalists show stable retention.",
    detail: [
      "Segment most at risk: customers with 1–2 year tenure (18,200 customers, churn rate 31%). This cohort has the highest absolute churn volume. Analysis suggests they are post-honeymoon customers who have not yet developed strong brand loyalty and are responsive to competitor promotions.",
      "Paid social acquired customers (churn rate: 38%) show the highest churn rate of any acquisition channel segment. This aligns with the lower LTV and repeat purchase rates observed in that cohort. Their last purchase average was 74 days ago.",
      "High-value loyalists (top 15% by LTV, tenure > 3 years) show a churn rate of only 4.2%, which is within the normal baseline range. No immediate intervention required for this segment.",
      "Geography: The London and South East region shows a disproportionate churn spike (+7pp above national average). No clear product or service driver has been identified — a competitor promotional campaign in the region is a candidate cause but is unconfirmed.",
    ],
    metrics: [
      {
        label: "Lapsed customers",
        value: "12,400",
        delta: "past 60 days",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Revenue at risk",
        value: "$2.1M",
        delta: "annualised",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Paid social churn rate",
        value: "38%",
        delta: "highest channel churn",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "London churn spike",
        value: "+7pp",
        delta: "vs national average",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.8,
      signals: [
        {
          label: "Data completeness",
          score: 0.92,
          description:
            "Purchase history is complete for all segmented customers. Lapse definition (60+ days no purchase) applied consistently.",
        },
        {
          label: "Signal recency",
          score: 0.9,
          description:
            "Data is current to yesterday. Lapse window is a lagging indicator by definition.",
        },
        {
          label: "Model agreement",
          score: 0.77,
          description:
            "RFM segmentation and ML churn model agree on top two at-risk segments. Geographic spike is flagged by one model only.",
        },
        {
          label: "External corroboration",
          score: 0.58,
          description:
            "Competitor promotional activity in London is based on one internal report from the commercial team. Not independently verified.",
        },
      ],
    },
    sources: [
      {
        name: "Customer Data Platform",
        type: "database",
        coverage: 0.62,
        freshness: "daily",
        recordCount: 384200,
      },
      {
        name: "Order Management System",
        type: "database",
        coverage: 0.28,
        freshness: "hourly",
        recordCount: 229800,
      },
      {
        name: "Marketing Attribution DB",
        type: "database",
        coverage: 0.08,
        freshness: "daily",
        recordCount: 384200,
      },
      {
        name: "Commercial Team Report",
        type: "document",
        coverage: 0.02,
        freshness: "weekly",
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Defined lapse threshold",
        detail:
          "Flagged customers as lapsed if their last order date exceeded 60 days and they had at least 2 prior orders.",
        duration_ms: 180,
      },
      {
        id: "rs2",
        label: "Segmented by tenure and channel",
        detail:
          "Grouped lapsed customers by acquisition channel, tenure band, and LTV quintile.",
        duration_ms: 420,
      },
      {
        id: "rs3",
        label: "Compared to prior 60-day baseline",
        detail:
          "Measured churn rate per segment against the equivalent period 6 months ago to identify anomalies.",
        duration_ms: 310,
      },
      {
        id: "rs4",
        label: "Mapped geographic distribution",
        detail:
          "Aggregated lapsed customers by billing postcode region and compared regional churn rates to the national average.",
        duration_ms: 390,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Launch win-back campaign",
        description: "Target 1–2 year tenure lapsed segment",
        type: "primary",
        query:
          "Build a win-back email audience for customers with 1–2 year tenure who lapsed in the last 60 days",
      },
      {
        id: "a2",
        label: "Investigate London spike",
        description: "Assess competitive activity in the region",
        type: "secondary",
        query:
          "Is there any evidence of increased competitor activity in the London market in the past 30 days?",
      },
    ],
    caveats: [
      "Churn is defined as 60+ days without a purchase. Seasonal customers may be misclassified as churned.",
      "Revenue at risk is annualised from the last 12-month average order frequency per segment — actual impact depends on reactivation rate.",
    ],
  },

  {
    id: "r7",
    queryText:
      "How is our pricing strategy performing against competitors this quarter?",
    queryMatch: ["pricing strategy performing against competitors"],
    state: "low_confidence",
    summary:
      "Available data suggests we are price-competitive in electronics but meaningfully more expensive in footwear and homewares relative to key competitors. However, the analysis is limited — competitor price data is incomplete and the comparison methodology has not been validated against a full SKU overlap.",
    detail: [
      "Electronics (price index: 0.97 vs market): We are approximately 3% below the market average on a like-for-like SKU basis across the 210 electronics items where competitor pricing is available. This is consistent with our stated positioning of slight undercut on electronics to drive traffic.",
      "Footwear (price index: 1.14 vs market): We appear to be 14% above the market average on comparable footwear items. This is based on a sample of 84 SKUs where direct competitor matches were found. It is unclear whether this premium reflects brand mix differences or a true pricing gap.",
      "Homewares (price index: 1.09 vs market): We are approximately 9% above market on a matched sample of 61 SKUs. Given that this category has a 34% return rate below the apparel benchmark, pricing pressure may not be the primary issue — but it warrants monitoring.",
      "Competitor data gaps: Pricing data is available for only 2 of our 5 named competitors. The two largest players by market share have not been successfully scraped due to bot protection. This materially limits confidence in the overall index.",
    ],
    metrics: [
      {
        label: "Electronics price index",
        value: "0.97",
        delta: "3% below market",
        deltaDirection: "neutral",
        confident: false,
      },
      {
        label: "Footwear price index",
        value: "1.14",
        delta: "14% above market",
        deltaDirection: "up",
        confident: false,
      },
      {
        label: "Homewares price index",
        value: "1.09",
        delta: "9% above market",
        deltaDirection: "up",
        confident: false,
      },
      {
        label: "Competitor coverage",
        value: "2 of 5",
        delta: "pricing data available",
        deltaDirection: "neutral",
        confident: true,
      },
    ],
    confidence: {
      overall: 0.42,
      signals: [
        {
          label: "Data completeness",
          score: 0.38,
          description:
            "Only 2 of 5 competitors have retrievable pricing data. SKU match rate is 31% of our active catalogue.",
        },
        {
          label: "Signal recency",
          score: 0.74,
          description:
            "Competitor prices scraped within the last 48 hours for available sources. Prices may have changed since scraping.",
        },
        {
          label: "Model agreement",
          score: 0.55,
          description:
            "Price index calculation methodology has not been independently validated. SKU matching is based on title similarity, not confirmed product equivalence.",
        },
        {
          label: "External corroboration",
          score: 0.48,
          description:
            "No third-party market pricing reports are available for our specific categories and geography.",
        },
      ],
    },
    sources: [
      {
        name: "Competitor Price Scraper",
        type: "api",
        coverage: 0.55,
        freshness: "daily",
      },
      {
        name: "Internal Pricing DB",
        type: "database",
        coverage: 0.35,
        freshness: "live",
        recordCount: 12400,
      },
      {
        name: "Product Catalogue DB",
        type: "database",
        coverage: 0.1,
        freshness: "weekly",
        recordCount: 12400,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Matched SKUs to competitor listings",
        detail:
          "Used title embedding similarity to match our SKUs to competitor product pages. Accepted matches above 0.82 cosine similarity.",
        duration_ms: 1240,
      },
      {
        id: "rs2",
        label: "Calculated category price indices",
        detail:
          "Computed median price ratio (our price / competitor price) for matched SKU pairs, grouped by category.",
        duration_ms: 380,
      },
      {
        id: "rs3",
        label: "Flagged material deviations",
        detail:
          "Identified categories where our index exceeded 1.10 (above market) or fell below 0.90 (below market).",
        duration_ms: 140,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Commission competitor price audit",
        description:
          "Engage a third-party pricing intelligence tool for full coverage",
        type: "primary",
        query:
          "What third-party pricing intelligence tools are recommended for e-commerce competitor monitoring?",
      },
      {
        id: "a2",
        label: "Review footwear pricing strategy",
        description: "Assess whether the 14% premium is intentional",
        type: "secondary",
        query:
          "Show me the gross margin and sell-through rate for our footwear category vs pricing index",
      },
    ],
    caveats: [
      "This analysis should be treated as directional only. Competitor coverage gaps mean the price indices may be materially inaccurate.",
      "SKU matching by title similarity may introduce errors — confirm high-impact matches manually before acting on pricing recommendations.",
    ],
  },

  {
    id: "r8",
    queryText:
      "Which fulfilment centres have the highest late dispatch rate this week?",
    queryMatch: ["highest", "late dispatch "],
    state: "complete",
    summary:
      "Two of five fulfilment centres are breaching the 95% on-time dispatch SLA this week. The Manchester FC is the most critical, at 78.4% on-time dispatch, driven by a warehouse management system outage and understaffing on the night shift. The Birmingham FC is at 91.2%, below SLA but recovering.",
    detail: [
      "Manchester FC (on-time dispatch: 78.4%) is in critical breach. A WMS outage lasting 6.5 hours on Tuesday caused a backlog of approximately 3,200 orders. The backlog is 62% cleared as of this morning, but late dispatch rates remain elevated. Night shift headcount is 18% below target due to agency staff cancellations.",
      "Birmingham FC (on-time dispatch: 91.2%) is in moderate breach. Performance has been recovering since Monday, when a conveyor fault was resolved. The FC is expected to return to SLA compliance by end of week at current throughput rates.",
      "London, Leeds, and Glasgow FCs are all operating above the 95% SLA threshold, with on-time rates of 97.1%, 96.4%, and 95.8% respectively. No intervention required.",
      "Customer impact: An estimated 4,800 orders are affected by late dispatch this week. Of these, 1,940 have already missed their promised delivery date. 312 proactive delay notifications have been sent so far — coverage is insufficient.",
    ],
    metrics: [
      {
        label: "Manchester on-time rate",
        value: "78.4%",
        delta: "16.6pp below SLA",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Birmingham on-time rate",
        value: "91.2%",
        delta: "3.8pp below SLA",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Orders affected",
        value: "4,800",
        delta: "this week",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Delay notifications sent",
        value: "312",
        delta: "of 1,940 missed SLAs",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.91,
      signals: [
        {
          label: "Data completeness",
          score: 0.97,
          description:
            "Dispatch event data is complete for all 5 FCs. WMS outage window is confirmed from system logs.",
        },
        {
          label: "Signal recency",
          score: 0.94,
          description:
            "Dispatch data updated every 30 minutes. Manchester backlog figure is from this morning's manual count.",
        },
        {
          label: "Model agreement",
          score: 0.88,
          description:
            "Rule-based SLA tracker and predictive throughput model agree on both flagged FCs and recovery timeline for Birmingham.",
        },
        {
          label: "Root cause confidence",
          score: 0.86,
          description:
            "WMS outage and conveyor fault are confirmed from operational logs. Agency staffing gap is confirmed from HR system.",
        },
      ],
    },
    sources: [
      {
        name: "WMS Dispatch Events",
        type: "database",
        coverage: 0.55,
        freshness: "live",
        recordCount: 48200,
      },
      {
        name: "FC Operations Dashboard",
        type: "api",
        coverage: 0.25,
        freshness: "live",
      },
      {
        name: "HR Shift System",
        type: "database",
        coverage: 0.12,
        freshness: "daily",
        recordCount: 840,
      },
      {
        name: "Customer Comms Platform",
        type: "api",
        coverage: 0.08,
        freshness: "hourly",
        recordCount: 4800,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Calculated FC-level dispatch SLA",
        detail:
          "Compared promised dispatch window to actual dispatch timestamp for all orders picked this week, per FC.",
        duration_ms: 220,
      },
      {
        id: "rs2",
        label: "Identified operational root causes",
        detail:
          "Correlated SLA breach timeline with system incident logs and HR shift data.",
        duration_ms: 490,
      },
      {
        id: "rs3",
        label: "Estimated customer impact",
        detail:
          "Matched late dispatch orders to their promised delivery dates to identify confirmed missed SLAs.",
        duration_ms: 340,
      },
      {
        id: "rs4",
        label: "Assessed notification coverage",
        detail:
          "Compared volume of delay notifications sent from the comms platform against the full affected order population.",
        duration_ms: 180,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Send delay notifications",
        description:
          "Trigger proactive communications for remaining 1,628 affected orders",
        type: "primary",
        query:
          "Generate a delay notification plan for the 1,628 affected orders that have not yet been contacted",
      },
      {
        id: "a2",
        label: "Escalate Manchester staffing",
        description: "Resolve night shift agency shortfall",
        type: "secondary",
        query:
          "What are the options for covering the Manchester FC night shift shortfall this week?",
      },
    ],
    caveats: [
      "Manchester backlog clearance rate is based on a manual count from this morning and may not reflect real-time throughput.",
    ],
  },

  {
    id: "r9",
    queryText:
      "What is the fraud rate trend and which order types are highest risk?",
    queryMatch: ["fraud", "highest risk"],
    state: "complete",
    summary:
      "Fraud rate has increased from 0.31% to 0.58% of GMV over the past 90 days — an 87% increase. Guest checkout orders and high-value electronics orders placed on new accounts are the two highest-risk segments. Estimated fraud loss in the current quarter is $187K, up from $98K in Q2.",
    detail: [
      "Guest checkout fraud rate (1.42%) is 4.6x the rate for logged-in returning customers (0.31%). Guest checkout accounts for 28% of orders but 71% of confirmed fraud cases. The pattern is consistent with card testing and resale fraud vectors.",
      "New account, high-value electronics orders (fraud rate: 3.1%) represent the single highest-risk order type. Orders over $300 placed by accounts under 7 days old in the electronics category have a fraud rate more than 10x the site average. This segment accounts for 38% of fraud losses despite representing only 2.1% of electronics orders.",
      "Chargeback rate has increased from 0.18% to 0.34% over the same period. Payment processor threshold for elevated scrutiny is 0.50%. At the current trend, we will breach this threshold within 6–8 weeks.",
      "Geographic concentration: 34% of confirmed fraud orders in the past 30 days shipped to 12 postcodes. These postcodes are not currently on the elevated-risk flagging list in the fraud rules engine.",
    ],
    metrics: [
      {
        label: "Fraud rate (GMV)",
        value: "0.58%",
        delta: "+87% vs 90 days ago",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Q3 fraud loss estimate",
        value: "$187K",
        delta: "+91% vs Q2",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Guest checkout fraud rate",
        value: "1.42%",
        delta: "4.6x logged-in rate",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Chargeback threshold",
        value: "6–8 weeks",
        delta: "to breach 0.50% limit",
        deltaDirection: "up",
        confident: false,
      },
    ],
    confidence: {
      overall: 0.87,
      signals: [
        {
          label: "Data completeness",
          score: 0.93,
          description:
            "Confirmed fraud cases are based on chargebacks and manual review outcomes. Undetected fraud is not captured.",
        },
        {
          label: "Signal recency",
          score: 0.91,
          description:
            "Data is current to yesterday. Chargeback data lags by up to 45 days for some card networks.",
        },
        {
          label: "Model agreement",
          score: 0.84,
          description:
            "Rules engine and ML fraud model agree on the two highest-risk segments. Postcode flagging gap was identified by the ML model only.",
        },
        {
          label: "External corroboration",
          score: 0.79,
          description:
            "Payment processor quarterly report confirms elevated fraud trends in electronics categories across the industry.",
        },
      ],
    },
    sources: [
      {
        name: "Fraud Management System",
        type: "database",
        coverage: 0.5,
        freshness: "daily",
        recordCount: 28400,
      },
      {
        name: "Payment Processor Reports",
        type: "api",
        coverage: 0.25,
        freshness: "daily",
      },
      {
        name: "Order Risk Scoring Engine",
        type: "api",
        coverage: 0.18,
        freshness: "live",
        recordCount: 28400,
      },
      {
        name: "Chargeback Records",
        type: "database",
        coverage: 0.07,
        freshness: "daily",
        recordCount: 4120,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Calculated fraud rate trend",
        detail:
          "Divided confirmed fraud GMV by total GMV for each 30-day rolling window over the past 90 days.",
        duration_ms: 210,
      },
      {
        id: "rs2",
        label: "Segmented by order type",
        detail:
          "Grouped fraud cases by checkout type, account age, category, and order value to identify high-risk patterns.",
        duration_ms: 580,
      },
      {
        id: "rs3",
        label: "Analysed geographic concentration",
        detail:
          "Aggregated confirmed fraud shipping addresses by postcode and compared against the current flagging list.",
        duration_ms: 360,
      },
      {
        id: "rs4",
        label: "Projected chargeback trajectory",
        detail:
          "Extrapolated current chargeback rate growth to estimate the date of breach of the 0.50% processor threshold.",
        duration_ms: 290,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Add friction to guest checkout",
        description:
          "Implement velocity checks and CAPTCHA for high-risk guest orders",
        type: "primary",
        query:
          "What fraud controls can be added to guest checkout without significantly impacting conversion?",
      },
      {
        id: "a2",
        label: "Update postcode risk list",
        description: "Add the 12 high-fraud postcodes to the rules engine",
        type: "secondary",
        query:
          "Show me the 12 high-fraud postcodes and the process for adding them to the fraud rules engine",
      },
    ],
    caveats: [
      "Fraud loss estimates are based on confirmed cases only. Actual losses including undetected fraud may be higher.",
      "Chargeback timeline projection assumes a linear trend, which may not hold if countermeasures are implemented.",
    ],
  },

  {
    id: "r10",
    queryText:
      "Which promotional campaigns delivered the best ROI last quarter?",
    queryMatch: ["promotional campaigns ", "best ROI"],
    state: "complete",
    summary:
      "Five campaigns ran in Q2. The loyalty double-points event and the new customer welcome series delivered the strongest ROI at 8.4x and 6.2x respectively. The sitewide 20%-off flash sale had the highest GMV contribution but the lowest ROI at 1.8x, with significant margin compression and evidence of demand pull-forward rather than incremental sales.",
    detail: [
      "Loyalty double-points event (ROI: 8.4x, incremental GMV: $312K): The highest-efficiency campaign. Targeted existing high-LTV customers, drove a 34% repeat purchase rate uplift in the 30 days post-event, and had minimal promotional cost as points redemption is deferred. This is the strongest signal for loyalty programme expansion.",
      "New customer welcome series (ROI: 6.2x, incremental GMV: $228K): Email and paid social acquisition sequence for first-time buyers. CAC of $18 compares favourably to the $284 24-month LTV for organic channel customers if the cohort retention rate holds at observed levels. Cohort is 5 months old — LTV projection carries uncertainty.",
      "Category flash sales — electronics (ROI: 3.1x, incremental GMV: $184K): Drove strong short-term volume. However, 22% of sales were from customers who had the item in their basket for 5+ days before the promotion, suggesting a meaningful pull-forward effect from full-price buyers.",
      "Sitewide 20%-off flash sale (ROI: 1.8x, incremental GMV: $891K): Largest GMV generator but worst ROI. Gross margin dropped from an average of 38% to 21% for the campaign period. Demand modelling suggests 31–44% of units sold would have been purchased within 14 days at full price, indicating significant cannibalisation of existing demand.",
    ],
    metrics: [
      {
        label: "Best ROI campaign",
        value: "8.4x",
        delta: "Loyalty double-points",
        deltaDirection: "neutral",
        confident: true,
      },
      {
        label: "Sitewide sale ROI",
        value: "1.8x",
        delta: "lowest of 5 campaigns",
        deltaDirection: "up",
        confident: true,
      },
      {
        label: "Demand pull-forward",
        value: "31–44%",
        delta: "of sitewide sale units",
        deltaDirection: "neutral",
        confident: false,
      },
      {
        label: "Margin during flash sale",
        value: "21%",
        delta: "vs 38% baseline",
        deltaDirection: "up",
        confident: true,
      },
    ],
    confidence: {
      overall: 0.76,
      signals: [
        {
          label: "Data completeness",
          score: 0.88,
          description:
            "Revenue and cost data is complete for all 5 campaigns. Incrementality estimates rely on counterfactual modelling.",
        },
        {
          label: "Signal recency",
          score: 0.82,
          description:
            "Q2 data is fully reconciled. Post-campaign retention data for the welcome series cohort is only 5 months old.",
        },
        {
          label: "Model agreement",
          score: 0.71,
          description:
            "ROI calculations are consistent. Pull-forward estimate has a wide range (31–44%) due to model uncertainty in counterfactual demand.",
        },
        {
          label: "External corroboration",
          score: 0.68,
          description:
            "Industry data confirms sitewide discount events typically show high pull-forward effects. Our range is within reported benchmarks.",
        },
      ],
    },
    sources: [
      {
        name: "Campaign Analytics DB",
        type: "database",
        coverage: 0.45,
        freshness: "daily",
        recordCount: 84200,
      },
      {
        name: "Order Management System",
        type: "database",
        coverage: 0.3,
        freshness: "hourly",
        recordCount: 229800,
      },
      {
        name: "Finance Cost Reporting",
        type: "database",
        coverage: 0.15,
        freshness: "weekly",
        recordCount: 3200,
      },
      {
        name: "Loyalty Platform API",
        type: "api",
        coverage: 0.1,
        freshness: "daily",
        recordCount: 41800,
      },
    ],
    reasoning: [
      {
        id: "rs1",
        label: "Attributed revenue to campaigns",
        detail:
          "Used last-touch attribution within a 7-day attribution window for each campaign. Excluded existing basket conversions for flash sale analysis.",
        duration_ms: 490,
      },
      {
        id: "rs2",
        label: "Calculated incremental GMV",
        detail:
          "Applied a holdout group comparison for the loyalty and welcome series campaigns. Used time-series counterfactual for flash sale events.",
        duration_ms: 820,
      },
      {
        id: "rs3",
        label: "Calculated blended ROI",
        detail:
          "Divided incremental GMV by total campaign cost including discount cost, media spend, and fulfilment uplift.",
        duration_ms: 310,
      },
      {
        id: "rs4",
        label: "Estimated pull-forward effect",
        detail:
          "Modelled baseline demand using pre-promotion purchase intent signals (items in cart 5+ days) to estimate cannibalised full-price sales.",
        duration_ms: 640,
      },
    ],
    actions: [
      {
        id: "a1",
        label: "Scale loyalty programme",
        description: "Model impact of increasing double-points event frequency",
        type: "primary",
        query:
          "What would be the incremental revenue impact of running the loyalty double-points event quarterly instead of annually?",
      },
      {
        id: "a2",
        label: "Review sitewide discount policy",
        description: "Assess whether the flash sale format should be retired",
        type: "secondary",
        query:
          "What promotional formats could replace the sitewide flash sale with better ROI and lower margin impact?",
      },
    ],
    caveats: [
      "Incrementality estimates for the sitewide sale use a modelled counterfactual, not a true holdout group. The pull-forward range reflects model uncertainty, not a confirmed figure.",
      "Welcome series cohort LTV projection is based on 5 months of data — treat ROI as provisional until the cohort matures.",
    ],
  },
];

// suggested queries
export const SUGGESTED_QUERIES = [
  {
    id: "sq1",
    text: "Which SKUs are at risk of stockout in the next 30 days?",
    category: "Inventory",
  },
  {
    id: "sq2",
    text: "Forecast inventory shortfall for SKUs in the electronics category",
    category: "Inventory",
  },
  {
    id: "sq3",
    text: "Which customer segments have churned in the last 60 days?",
    category: "Customers",
  },
  {
    id: "sq4",
    text: "Which marketing channels are delivering the highest customer lifetime value?",
    category: "Customers",
  },
  {
    id: "sq5",
    text: "Which product categories have the highest cart abandonment rate this month?",
    category: "Conversion",
  },
  {
    id: "sq6",
    text: "What is causing the drop in conversion rate on mobile this week?",
    category: "Conversion",
  },
  {
    id: "sq7",
    text: "Which fulfilment centres have the highest late dispatch rate this week?",
    category: "Operations",
  },
  {
    id: "sq8",
    text: "What is the return rate trend across product categories and what is driving it?",
    category: "Operations",
  },
  {
    id: "sq9",
    text: "Which promotional campaigns delivered the best ROI last quarter?",
    category: "Finance",
  },
  {
    id: "sq10",
    text: "How is our pricing strategy performing against competitors this quarter?",
    category: "Finance",
  },
  {
    id: "sq11",
    text: "What is the fraud rate trend and which order types are highest risk?",
    category: "Risk",
  },
];
