import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../src/constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../../src/constants/typography';

const TAB_ICON: Record<string, string> = {
  index: '🏠',
  incidents: '⚠️',
  simulator: '⚡',
  copilot: '💬',
  reports: '📊',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <View style={styles.iconText}>
              <View>
                <TabIcon name={route.name} />
              </View>
            </View>
            {focused && <View style={styles.activeDot} />}
          </View>
        ),
        tabBarActiveTintColor: COLORS.navy,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.xs,
          fontWeight: FONT_WEIGHT.medium,
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="incidents"
        options={{ title: 'Incidents' }}
      />
      <Tabs.Screen
        name="simulator"
        options={{ title: 'Simulator' }}
      />
      <Tabs.Screen
        name="copilot"
        options={{ title: 'Co-Pilot' }}
      />
      <Tabs.Screen
        name="reports"
        options={{ title: 'Reports' }}
      />
    </Tabs>
  );
}

function TabIcon({ name }: { name: string }) {
  return (
    <View style={styles.emojiWrap}>
      <View>
        <EmojiText emoji={TAB_ICON[name] || '📄'} />
      </View>
    </View>
  );
}

function EmojiText({ emoji }: { emoji: string }) {
  const RN = require('react-native');
  return <RN.Text style={{ fontSize: 20 }}>{emoji}</RN.Text>;
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginBottom: 2,
  },
  emojiWrap: {
    alignItems: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.navy,
    marginTop: 2,
  },
});
