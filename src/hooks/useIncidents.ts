import { useQuery } from '@tanstack/react-query';
import {
  getIncidents,
  getIncidentById,
  getIncidentStats,
  type GetIncidentsParams,
} from '../api/incidents';

export function useIncidents(params?: GetIncidentsParams) {
  return useQuery({
    queryKey: ['incidents', params],
    queryFn: () => getIncidents(params),
    refetchInterval: 30_000, // 30s auto-refresh
  });
}

export function useIncident(id: string) {
  return useQuery({
    queryKey: ['incident', id],
    queryFn: () => getIncidentById(id),
    enabled: !!id,
  });
}

export function useIncidentStats() {
  return useQuery({
    queryKey: ['incident-stats'],
    queryFn: getIncidentStats,
    refetchInterval: 15_000, // 15s for dashboard
  });
}
