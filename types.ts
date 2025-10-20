export interface AffectedServices {
  impacted: string[];
  resolved: string[];
}

export interface ServiceEvent {
  id: string;
  service: string;
  region: string;
  description: string;
  startTime: string;
  lastUpdateTime: string;
  severity: string;
  rawLog?: string;
  affectedServices?: AffectedServices;
}

export interface GeminiAnalysis {
  logExplanation: string;
  permanentSolution: string;
  testScenarios: string[];
}

export interface ServiceStatus {
    name: string;
    status: 'ok' | 'disrupted' | 'info';
}
