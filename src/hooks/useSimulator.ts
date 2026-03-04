import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getScenarios, runSimulation } from '../api/simulator';

export function useScenarios() {
  return useQuery({
    queryKey: ['scenarios'],
    queryFn: getScenarios,
  });
}

export function useRunSimulation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scenarioId: string) => runSimulation(scenarioId),
    onSuccess: () => {
      // Refetch incidents after a simulation creates new ones
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      queryClient.invalidateQueries({ queryKey: ['incident-stats'] });
    },
  });
}
