export interface ServiceEvent {
  id: number;
  service: string;
  description: string;
  region: string;
  startTime: string;
  lastUpdateTime: string;
  rawLog?: string;
  severity: 'Degraded' | 'Operational';
  affectedServices?: {
    impacted: string[];
    resolved: string[];
  };
}

export interface GeminiAnalysis {
  logExplanation: string;
  permanentSolution: string;
  testScenarios: string[];
}