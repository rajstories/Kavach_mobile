// ─── User & Auth ────────────────────────────────────────────

export type UserRole = 'SUPER_ADMIN' | 'CISO' | 'ANALYST' | 'READ_ONLY';

export interface User {
  id: string;
  name: string;
  designation: string;
  ministry: string;
  employeeId: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginPayload {
  email: string;
  employeeId: string;
  password: string;
}

// ─── Incidents ──────────────────────────────────────────────

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'CONTAINED' | 'RESOLVED';
export type IncidentDomain = 'IDENTITY' | 'NETWORK' | 'INFRASTRUCTURE';

export interface Incident {
  id: string;
  incidentId: string; // "#INC-9921"
  domain: IncidentDomain;
  classification: string; // "brute_force"
  severity: SeverityLevel;
  status: IncidentStatus;
  offender: { type: 'ip' | 'user' | 'service'; value: string };
  affectedService: string;
  confidence: number; // 0-1
  eventCount: number;
  durationSec: number;
  uniqueTargets: number;
  evidence: string[];
  recommendedActions: string[];
  civicContext: string;
  detectedAt: string; // ISO string
  resolvedAt?: string;
  remediations: Remediation[];
  alerts: AlertLog[];
}

export interface Remediation {
  id: string;
  agentType: 'AUTH' | 'NETWORK' | 'INFRA';
  actionTaken: string;
  success: boolean;
  executedAt: string;
}

export interface AlertLog {
  id: string;
  channel: 'TELEGRAM' | 'EMAIL';
  sentAt: string;
  success: boolean;
}

export interface IncidentStats {
  total: number;
  bySeverity: { CRITICAL: number; HIGH: number; MEDIUM: number; LOW: number };
  byStatus: {
    OPEN: number;
    IN_PROGRESS: number;
    CONTAINED: number;
    RESOLVED: number;
  };
  byDomain: { IDENTITY: number; NETWORK: number; INFRASTRUCTURE: number };
  containedToday: number;
  avgResponseTimeMin: number;
  activeThreats: number;
}

// ─── Simulator ──────────────────────────────────────────────

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  domain: IncidentDomain;
  severity: SeverityLevel;
  estimatedTimeMs: number;
}

export interface SimulationResult {
  executionId: string;
  scenario: string;
  logsGenerated: number;
  findingsCount: number;
  incidentsCreated: number;
  processingTimeMs: number;
  finding: Incident;
}

// ─── Co-Pilot Chat ──────────────────────────────────────────

export type ChatLanguage = 'hindi' | 'english';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: ChatLanguage;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  language: ChatLanguage;
  sessionId?: string;
}

// ─── Portal & Health ────────────────────────────────────────

export type PortalStatusLevel = 'secure' | 'alert' | 'incident';

export interface PortalStatus {
  name: string;
  displayName: string;
  status: PortalStatusLevel;
  lastChecked: string;
  incidentCount: number;
  icon: string;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  services: {
    name: string;
    status: 'up' | 'down';
    latencyMs: number;
  }[];
  lastChecked: string;
}

// ─── Reports ────────────────────────────────────────────────

export interface Report {
  id: string;
  title: string;
  type: 'DAILY' | 'WEEKLY' | 'INCIDENT' | 'CUSTOM';
  generatedAt: string;
  downloadUrl: string;
  size: string;
}

// ─── Navigation ─────────────────────────────────────────────

export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  'incident/[id]': { id: string };
  health: undefined;
  profile: undefined;
};
