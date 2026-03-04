import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import type { PortalStatus as PortalStatusType } from '../../types';

interface PortalStatusProps {
  portals: PortalStatusType[];
}

const STATUS_COLORS: Record<string, string> = {
  secure: COLORS.success,
  alert: COLORS.warning,
  incident: COLORS.critical,
};

export function PortalStatus({ portals }: PortalStatusProps) {
  return (
    <View style={styles.container}>
      {portals.map((portal) => (
        <View key={portal.name} style={styles.portalRow}>
          <Text style={styles.icon}>{portal.icon}</Text>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {portal.displayName}
            </Text>
          </View>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: STATUS_COLORS[portal.status] ?? COLORS.textMuted },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: STATUS_COLORS[portal.status] ?? COLORS.textMuted },
            ]}
          >
            {portal.status.charAt(0).toUpperCase() + portal.status.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  portalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textPrimary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    width: 60,
  },
});
