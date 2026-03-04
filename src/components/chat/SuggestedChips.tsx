import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';

interface SuggestedChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestedChips({ suggestions, onSelect }: SuggestedChipsProps) {
  if (!suggestions.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {suggestions.map((suggestion, i) => (
        <TouchableOpacity
          key={i}
          style={styles.chip}
          onPress={() => onSelect(suggestion)}
          activeOpacity={0.7}
        >
          <Text style={styles.chipText} numberOfLines={1}>
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: COLORS.navyPale,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.navy + '30',
  },
  chipText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.navy,
  },
});
