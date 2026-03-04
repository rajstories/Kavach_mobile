import apiClient from './client';
import { ENDPOINTS } from '../constants/endpoints';
import type { PortalStatus, SystemHealth } from '../types';

export async function getSystemHealth() {
  const { data } = await apiClient.get<SystemHealth>(ENDPOINTS.HEALTH);
  return data;
}

export async function getPortalStatuses() {
  const { data } = await apiClient.get<PortalStatus[]>(ENDPOINTS.PORTAL_STATUS);
  return data;
}
