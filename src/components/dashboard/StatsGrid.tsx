import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 2 }: StatsGridProps) {
  return (
    <View style={[styles.grid, { gap: 10 }]}>
      {stats.map((stat, i) => (
        <View
          key={i}
          style={[
            styles.statCard,
            { width: `${(100 / columns) - 2}%` as any },
          ]}
        >
          {stat.icon ? <Text style={styles.icon}>{stat.icon}</Text> : null}
          <Text
            style={[styles.value, stat.color ? { color: stat.color } : null]}
          >
            {stat.value}
          </Text>
          <Text style={styles.label} numberOfLines={1}>
            {stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: FONT_WEIGHT.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
