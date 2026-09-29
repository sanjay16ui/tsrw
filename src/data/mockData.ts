// Centralized Mock Data to ensure coherent storytelling across the product

export const MOCK_CASE = {
  id: "CLD-2026-0142",
  status: "Investigating",
  novelty: 94,
  confidence: 91,
  severity: "HIGH",
  detectedAt: "21:43:08",
  source: "HOST-042",
  target: "DB-07",
  
  fingerprint: {
    numerical: 91,
    temporal: 86,
    graph: 81
  },

  ancestryCandidates: [
    { name: "Scanning", probability: 87, color: "#00f0ff" },
    { name: "Exploitation", probability: 81, color: "#a300ff" },
    { name: "Credential Abuse", probability: 42, color: "#ff00aa" },
    { name: "Persistence", probability: 12, color: "#333333" }
  ],

  composition: [
    { combination: "Scanning", score: 62 },
    { combination: "Exploitation", score: 54 },
    { combination: "Scanning + Exploitation", score: 91 }
  ],

  timeline: [
    { stage: "Recon", status: "Verified" },
    { stage: "Authentication attempts", status: "Verified" },
    { stage: "Exploit", status: "Verified" },
    { stage: "Privilege escalation", status: "Investigating" },
    { stage: "Database access", status: "Pending" },
    { stage: "Data transfer", status: "Pending" }
  ],

  verification: {
    hypothesis: "Scanning + Exploitation",
    result: "SUPPORTED",
    evidenceCount: 14
  }
};

export const MOCK_LIVE_EVENTS = [
  { time: "21:43:08", type: "UNKNOWN BEHAVIOR", source: "HOST-042", target: "DB-07", novelty: 94, alert: true, caseId: "CLD-2026-0142" },
  { time: "21:42:11", type: "KNOWN BEHAVIOR", source: "HOST-013", target: "WEB-09", novelty: 12, alert: false },
  { time: "21:40:33", type: "CANDIDATE ANCESTRY", source: "SCANNING", target: "87%", novelty: null, alert: false },
  { time: "21:38:15", type: "KNOWN BEHAVIOR", source: "USER-99", target: "MAIL-01", novelty: 4, alert: false },
];

export const SYSTEM_STREAM_LOGS = [
  "[21:43:08] EVENT_INGEST OK",
  "[21:43:09] FEATURE_EXTRACTION OK",
  "[21:43:09] TEMPORAL_ANALYSIS STARTED",
  "[21:43:10] GRAPH_ANALYSIS STARTED",
  "[21:43:10] NOVELTY_ENGINE DETECTED ANOMALY (94%)",
  "[21:43:11] ANCESTRY_ENGINE QUERYING...",
  "[21:43:12] VERIFICATION_ENGINE STANDBY"
];
