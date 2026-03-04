import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import { getStatusColor, getStatusLabel } from '../../utils/severity';
import type { IncidentStatus } from '../../types';

interface StatusPillProps {
  status: IncidentStatus;
  size?: 'sm' | 'md';
}

export function StatusPill({ status, size = 'sm' }: StatusPillProps) {
  const color = getStatusColor(status);
  const label = getStatusLabel(status);
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.pill,
        {
          backgroundColor: color + '18',
          paddingHorizontal: isSmall ? 8 : 12,
          paddingVertical: isSmall ? 2 : 4,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text
        style={[
          styles.label,
          {
            color,
            fontSize: isSmall ? FONT_SIZE.xs : FONT_SIZE.sm,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  label: {
    fontWeight: FONT_WEIGHT.medium,
  },
});
