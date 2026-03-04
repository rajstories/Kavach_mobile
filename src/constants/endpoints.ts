const API_VERSION = '/api/v1';

export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_VERSION}/auth/login`,
  LOGOUT: `${API_VERSION}/auth/logout`,
  REFRESH_TOKEN: `${API_VERSION}/auth/refresh`,
  ME: `${API_VERSION}/auth/me`,

  // Incidents
  INCIDENTS: `${API_VERSION}/incidents`,
  INCIDENT_BY_ID: (id: string) => `${API_VERSION}/incidents/${id}`,
  INCIDENT_STATS: `${API_VERSION}/incidents/stats`,
  INCIDENT_TIMELINE: (id: string) => `${API_VERSION}/incidents/${id}/timeline`,

  // Simulator
  SIMULATE: `${API_VERSION}/simulator/run`,
  SIMULATION_STATUS: (executionId: string) =>
    `${API_VERSION}/simulator/status/${executionId}`,
  SCENARIOS: `${API_VERSION}/simulator/scenarios`,

  // Co-Pilot
  COPILOT_CHAT: `${API_VERSION}/copilot/chat`,
  COPILOT_SUGGESTIONS: `${API_VERSION}/copilot/suggestions`,

  // Reports
  REPORTS: `${API_VERSION}/reports`,
  REPORT_GENERATE: `${API_VERSION}/reports/generate`,

  // Health
  HEALTH: `${API_VERSION}/health`,
  PORTAL_STATUS: `${API_VERSION}/health/portals`,

  // Notifications
  REGISTER_PUSH_TOKEN: `${API_VERSION}/notifications/register`,
} as const;
