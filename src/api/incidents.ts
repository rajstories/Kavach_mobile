import apiClient from './client';
import { ENDPOINTS } from '../constants/endpoints';
import type { Incident, IncidentStats } from '../types';

export interface GetIncidentsParams {
  page?: number;
  limit?: number;
  severity?: string;
  status?: string;
  domain?: string;
  search?: string;
}

export async function getIncidents(params?: GetIncidentsParams) {
  const { data } = await apiClient.get<{ incidents: Incident[]; total: number }>(
    ENDPOINTS.INCIDENTS,
    { params },
  );
  return data;
}

export async function getIncidentById(id: string) {
  const { data } = await apiClient.get<Incident>(ENDPOINTS.INCIDENT_BY_ID(id));
  return data;
}

export async function getIncidentStats() {
  const { data } = await apiClient.get<IncidentStats>(ENDPOINTS.INCIDENT_STATS);
  return data;
}

export async function getIncidentTimeline(id: string) {
  const { data } = await apiClient.get(ENDPOINTS.INCIDENT_TIMELINE(id));
  return data;
}
