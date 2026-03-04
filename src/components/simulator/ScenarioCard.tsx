import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import type { SimulationScenario } from '../../types';

interface ScenarioCardProps {
  scenario: SimulationScenario;
  onRun: () => void;
  isRunning?: boolean;
}

export function ScenarioCard({ scenario, onRun, isRunning }: ScenarioCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{scenario.name}</Text>
        <View
          style={[
            styles.domainBadge,
            { backgroundColor: COLORS.navyPale },
          ]}
        >
          <Text style={styles.domainText}>{scenario.domain}</Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {scenario.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.estimate}>
          ~{Math.round(scenario.estimatedTimeMs / 1000)}s
        </Text>
        <TouchableOpacity
          style={[styles.runBtn, isRunning && styles.runBtnDisabled]}
          onPress={onRun}
          disabled={isRunning}
        >
          <Text style={styles.runBtnText}>
            {isRunning ? 'Running...' : '▶ Run'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  domainBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  domainText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.navy,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
  },
  runBtn: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  runBtnDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  runBtnText: {
    color: COLORS.textOnNavy,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
