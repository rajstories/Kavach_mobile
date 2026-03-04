import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import { getSeverityColor, getIncidentTitle, timeAgo } from '../../utils/severity';
import { SeverityBadge } from './SeverityBadge';
import { StatusPill } from './StatusPill';
import type { Incident } from '../../types';

interface IncidentCardProps {
  incident: Incident;
  onPress: () => void;
}

export function IncidentCard({ incident, onPress }: IncidentCardProps) {
  const severityColor = getSeverityColor(incident.severity);
  const title = getIncidentTitle(incident.classification);
  const timeAgoStr = timeAgo(incident.detectedAt);

  const handlePress = useCallback(() => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.container}
    >
      {/* Left severity bar */}
      <View style={[styles.severityBar, { backgroundColor: severityColor }]} />

      <View style={styles.content}>
        {/* Top row: incident ID + severity badge */}
        <View style={styles.topRow}>
          <Text style={styles.incidentId}>{incident.incidentId}</Text>
          <SeverityBadge
            severity={incident.severity}
            size="sm"
            showDot={incident.severity === 'CRITICAL'}
          />
        </View>

        {/* Classification title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Affected service + time */}
        <Text style={styles.meta} numberOfLines={1}>
          {incident.affectedService} · {timeAgoStr}
        </Text>

        {/* Bottom row: offender + status */}
        <View style={styles.bottomRow}>
          <Text style={styles.offender} numberOfLines={1}>
            {incident.offender.type === 'ip' ? '🌐 ' : '👤 '}
            {incident.offender.value}
          </Text>
          <StatusPill status={incident.status} size="sm" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  severityBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  incidentId: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  title: {
    fontSize: FONT_SIZE.base,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  meta: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offender: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    flex: 1,
    marginRight: 8,
  },
});
