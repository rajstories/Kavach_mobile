import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../constants/typography';
import type { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}
      >
        {!isUser && (
          <Text style={styles.roleLabel}>🛡️ KAVACH Co-Pilot</Text>
        )}
        <Text
          style={[
            styles.text,
            isUser ? styles.textUser : styles.textAssistant,
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            isUser ? styles.timestampUser : styles.timestampAssistant,
          ]}
        >
          {new Date(message.timestamp).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: COLORS.navy,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: COLORS.bgCard,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleLabel: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.navy,
    marginBottom: 4,
  },
  text: {
    fontSize: FONT_SIZE.base,
    lineHeight: 20,
  },
  textUser: {
    color: COLORS.textOnNavy,
  },
  textAssistant: {
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: FONT_SIZE.xs,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timestampUser: {
    color: COLORS.textOnNavyMuted,
  },
  timestampAssistant: {
    color: COLORS.textMuted,
  },
});
