import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import { getSeverityColor, getIncidentTitle, timeAgo } from '../../utils/severity';
import type { Incident } from '../../types';

interface LiveFeedProps {
  incidents: Incident[];
  maxItems?: number;
}

export function LiveFeed({ incidents, maxItems = 5 }: LiveFeedProps) {
  const items = incidents.slice(0, maxItems);

  return (
    <View style={styles.container}>
      {items.map((incident, index) => (
        <View key={incident.id} style={styles.feedItem}>
          <View
            style={[
              styles.dot,
              { backgroundColor: getSeverityColor(incident.severity) },
            ]}
          />
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={1}>
              {getIncidentTitle(incident.classification)}
            </Text>
            <Text style={styles.meta}>
              {incident.affectedService} · {timeAgo(incident.detectedAt)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
