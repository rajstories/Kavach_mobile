import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import { getSeverityColor, getSeverityBgColor, getSeverityLabel } from '../../utils/severity';
import { usePulse } from '../../utils/animations';
import type { SeverityLevel } from '../../types';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export function SeverityBadge({
  severity,
  size = 'sm',
  showDot = false,
}: SeverityBadgeProps) {
  const color = getSeverityColor(severity);
  const bgColor = getSeverityBgColor(severity);
  const label = getSeverityLabel(severity);
  const pulseStyle = usePulse();

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor,
          borderColor: color,
          paddingHorizontal: isSmall ? 8 : 12,
          paddingVertical: isSmall ? 2 : 4,
        },
      ]}
    >
      {showDot && severity === 'CRITICAL' ? (
        <Animated.View
          style={[
            styles.dot,
            { backgroundColor: color },
            pulseStyle,
          ]}
        />
      ) : showDot ? (
        <View style={[styles.dot, { backgroundColor: color }]} />
      ) : null}
      <Text
        style={[
          styles.text,
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  text: {
    fontWeight: FONT_WEIGHT.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
