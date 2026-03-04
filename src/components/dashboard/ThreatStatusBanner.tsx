import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';

interface ThreatStatusBannerProps {
  activeThreats: number;
  containedToday: number;
}

export function ThreatStatusBanner({
  activeThreats,
  containedToday,
}: ThreatStatusBannerProps) {
  const isUnderAttack = activeThreats > 0;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: isUnderAttack ? COLORS.criticalBg : COLORS.successBg,
          borderColor: isUnderAttack ? COLORS.critical : COLORS.success,
        },
      ]}
    >
      <Text style={styles.emoji}>{isUnderAttack ? '🔴' : '🟢'}</Text>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: isUnderAttack ? COLORS.critical : COLORS.success },
          ]}
        >
          {isUnderAttack
            ? `${activeThreats} Active Threat${activeThreats > 1 ? 's' : ''}`
            : 'All Systems Secure'}
        </Text>
        <Text style={styles.subtitle}>
          {containedToday} incident{containedToday !== 1 ? 's' : ''} contained
          today
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
