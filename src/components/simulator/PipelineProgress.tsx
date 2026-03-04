import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';

interface PipelineStep {
  label: string;
  status: 'pending' | 'running' | 'done' | 'error';
}

interface PipelineProgressProps {
  steps: PipelineStep[];
  currentStep: number;
}

const STATUS_EMOJI: Record<string, string> = {
  pending: '⏳',
  running: '🔄',
  done: '✅',
  error: '❌',
};

export function PipelineProgress({ steps, currentStep }: PipelineProgressProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <Text style={styles.emoji}>{STATUS_EMOJI[step.status]}</Text>
          <View
            style={[
              styles.connector,
              index < steps.length - 1
                ? { backgroundColor: index < currentStep ? COLORS.success : COLORS.border }
                : { backgroundColor: 'transparent' },
            ]}
          />
          <View style={styles.stepContent}>
            <Text
              style={[
                styles.label,
                step.status === 'running' && { color: COLORS.navy, fontWeight: FONT_WEIGHT.semibold },
                step.status === 'done' && { color: COLORS.success },
                step.status === 'error' && { color: COLORS.critical },
              ]}
            >
              {step.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  connector: {
    width: 2,
    height: 20,
    position: 'absolute',
    left: 13,
    top: 26,
  },
  stepContent: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
});
