import apiClient from './client';
import { ENDPOINTS } from '../constants/endpoints';
import type { Report } from '../types';

export async function getReports() {
  const { data } = await apiClient.get<Report[]>(ENDPOINTS.REPORTS);
  return data;
}

export async function generateReport(type: Report['type']) {
  const { data } = await apiClient.post<Report>(ENDPOINTS.REPORT_GENERATE, {
    type,
  });
  return data;
}
