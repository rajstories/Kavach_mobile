import apiClient from './client';
import { ENDPOINTS } from '../constants/endpoints';
import type { SimulationResult, SimulationScenario } from '../types';

export async function getScenarios() {
  const { data } = await apiClient.get<SimulationScenario[]>(ENDPOINTS.SCENARIOS);
  return data;
}

export async function runSimulation(scenarioId: string) {
  const { data } = await apiClient.post<SimulationResult>(ENDPOINTS.SIMULATE, {
    scenarioId,
  });
  return data;
}

export async function getSimulationStatus(executionId: string) {
  const { data } = await apiClient.get(
    ENDPOINTS.SIMULATION_STATUS(executionId),
  );
  return data;
}
