import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '../../src/constants/colors';

const STATS = [
  { label: 'Total Incidents', value: '1,248', change: '↓ 12%', changeColor: '#2e7d32', borderColor: '#1a237e' },
  { label: 'Critical Active', value: '42', change: '↑ 5 New', changeColor: '#d32f2f', borderColor: '#d32f2f' },
  { label: 'Contained', value: '89%', progress: 0.89, borderColor: '#2e7d32' },
  { label: 'Avg Response', value: '8m', sub: 'Target: <10m', borderColor: '#ed6c02' },
];

const QUICK_ACTIONS = [
  { icon: '🛡️', label: 'Scan', bg: '#eff6ff', border: '#dbeafe' },
  { icon: '⚠️', label: 'Report', bg: '#fff7ed', border: '#ffedd5' },
  { icon: '🔮', label: 'Network', bg: '#faf5ff', border: '#f3e8ff' },
  { icon: '📋', label: 'Logs', bg: '#f0fdfa', border: '#ccfbf1' },
];

const INCIDENTS = [
  {
    severity: 'HIGH', color: '#d32f2f', bg: '#fef2f2', border: '#fecaca',
    time: '2 mins ago', title: 'Brute Force Attack Detected',
    target: 'voter-auth-api', ip: '192.168.43.21', location: 'New Delhi, IN',
  },
  {
    severity: 'MEDIUM', color: '#ed6c02', bg: '#fff7ed', border: '#fed7aa',
    time: '14 mins ago', title: 'Suspicious SQL Injection Pattern',
    target: 'meity-cms-db', ip: '10.20.1.55', location: 'Proxy/VPN',
  },
];

const PORTALS = [
  { name: 'DigiLocker', status: 'Secure', color: '#2e7d32', icon: '✅' },
  { name: 'Umang', status: 'Secure', color: '#2e7d32', icon: '✅' },
  { name: 'MyGov', status: 'Warning', color: '#f57c00', icon: '⚠️' },
];

export default function DashboardScreen() {
  return (
    <View style={styles.root}>
      {/* Navy Header */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIcon}>
                <Text style={{ fontSize: 18 }}>🔒</Text>
              </View>
              <View>
                <Text style={styles.headerTitle}>KAVACH</Text>
                <Text style={styles.headerSub}>SOC DASHBOARD</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <View style={styles.notifWrap}>
                <Text style={{ fontSize: 22 }}>🔔</Text>
                <View style={styles.notifBadge}>
                  <Text style={styles.notifText}>3</Text>
                </View>
              </View>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>JS</Text>
              </View>
            </View>
          </View>

          <View style={styles.welcomeWrap}>
            <Text style={styles.welcomeLabel}>Welcome back,</Text>
            <Text style={styles.welcomeName}>Joint Secretary, MeitY</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Critical Threats Banner */}
        <View style={styles.threatBanner}>
          <View style={styles.threatLeft}>
            <View style={styles.threatDotWrap}>
              <View style={styles.threatDot} />
            </View>
            <Text style={styles.threatText}>2 Critical Threats Active</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </View>

        {/* Overview Stats */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>Last 24h</Text></TouchableOpacity>
        </View>
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, { borderLeftColor: s.borderColor }]}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              {s.change && <Text style={[styles.statChange, { color: s.changeColor }]}>{s.change}</Text>}
              {s.progress !== undefined && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${s.progress * 100}%`, backgroundColor: s.borderColor }]} />
                </View>
              )}
              {s.sub && <Text style={styles.statSub}>{s.sub}</Text>}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.quickTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRow}>
          {QUICK_ACTIONS.map((a, i) => (
            <TouchableOpacity key={i} style={styles.quickItem}>
              <View style={[styles.quickIcon, { backgroundColor: a.bg, borderColor: a.border }]}>
                <Text style={{ fontSize: 22 }}>{a.icon}</Text>
              </View>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Live Incident Feed */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitleLg}>Live Incident Feed</Text>
          <View style={styles.liveDot} />
        </View>
        {INCIDENTS.map((inc, i) => (
          <TouchableOpacity
            key={i}
            style={styles.incidentCard}
            onPress={() => router.push('/incident/INC-9921')}
            activeOpacity={0.7}
          >
            <View style={[styles.incidentBar, { backgroundColor: inc.color }]} />
            <View style={styles.incidentContent}>
              <View style={styles.incidentTop}>
                <View style={[styles.severityBadge, { backgroundColor: inc.bg, borderColor: inc.border }]}>
                  <Text style={[styles.severityText, { color: inc.color }]}>{inc.severity}</Text>
                </View>
                <Text style={styles.incidentTime}>{inc.time}</Text>
              </View>
              <Text style={styles.incidentTitle}>{inc.title}</Text>
              <Text style={styles.incidentTarget}>
                Target: <Text style={styles.monoTag}>{inc.target}</Text>
              </Text>
              <View style={styles.incidentMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🖥️</Text>
                  <Text style={styles.metaText}>{inc.ip}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🌐</Text>
                  <Text style={styles.metaText}>{inc.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Protected Portals */}
        <Text style={[styles.quickTitle, { marginTop: 20 }]}>Protected Portals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.portalRow}>
          {PORTALS.map((p, i) => (
            <View key={i} style={styles.portalCard}>
              <Text style={{ fontSize: 20, marginBottom: 8 }}>{p.icon}</Text>
              <Text style={styles.portalName}>{p.name}</Text>
              <Text style={[styles.portalStatus, { color: p.color }]}>{p.status}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f4f6' },

  // Header
  header: { backgroundColor: COLORS.navy, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingBottom: 48 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: -0.3 },
  headerSub: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '500', letterSpacing: 1.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  notifWrap: { position: 'relative' },
  notifBadge: {
    position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#d32f2f', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.navy,
  },
  notifText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  avatarCircle: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#3949ab',
  },
  avatarText: { fontWeight: '700', fontSize: 14, color: '#fff' },
  welcomeWrap: { paddingHorizontal: 24 },
  welcomeLabel: { fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  welcomeName: { fontSize: 24, fontWeight: '600', color: '#fff' },

  // Body
  body: { flex: 1, marginTop: -24, paddingHorizontal: 20 },

  // Threat Banner
  threatBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', borderRadius: 50, padding: 6, paddingRight: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 20,
    elevation: 8, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16,
  },
  threatLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  threatDotWrap: { backgroundColor: '#fef2f2', borderRadius: 20, padding: 8 },
  threatDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#d32f2f' },
  threatText: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  chevron: { fontSize: 20, color: '#94a3b8' },

  // Section
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  sectionTitleLg: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  sectionAction: { fontSize: 12, fontWeight: '600', color: COLORS.navy },

  // Stats Grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%', backgroundColor: '#fff', padding: 16, borderRadius: 16,
    borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  statLabel: { fontSize: 12, color: '#64748b', fontWeight: '500', marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: '700', color: '#1e293b' },
  statChange: { fontSize: 10, fontWeight: '700', marginTop: 4 },
  statSub: { fontSize: 10, color: '#94a3b8', marginTop: 4 },
  progressBar: { width: '100%', height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, marginTop: 8 },
  progressFill: { height: 6, borderRadius: 3 },

  // Quick Actions
  quickTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginTop: 20, marginBottom: 12, paddingHorizontal: 4 },
  quickRow: { paddingHorizontal: 4, gap: 16 },
  quickItem: { alignItems: 'center', gap: 8, minWidth: 72 },
  quickIcon: {
    width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  quickLabel: { fontSize: 10, fontWeight: '500', color: '#475569' },

  // Incident Cards
  incidentCard: {
    backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8,
    elevation: 2, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row',
  },
  incidentBar: { width: 6 },
  incidentContent: { flex: 1, padding: 16 },
  incidentTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, borderWidth: 1 },
  severityText: { fontSize: 10, fontWeight: '700' },
  incidentTime: { fontSize: 12, color: '#94a3b8' },
  incidentTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  incidentTarget: { fontSize: 12, color: '#64748b' },
  monoTag: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', backgroundColor: '#f1f5f9', color: '#334155', fontSize: 12 },
  incidentMeta: { flexDirection: 'row', gap: 16, marginTop: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaIcon: { fontSize: 12 },
  metaText: { fontSize: 11, color: '#475569', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  // Live dot
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },

  // Portals
  portalRow: { paddingHorizontal: 4, gap: 12, paddingBottom: 8 },
  portalCard: {
    minWidth: 140, backgroundColor: '#fff', padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  portalName: { fontSize: 12, fontWeight: '700', color: '#1e293b' },
  portalStatus: { fontSize: 10, fontWeight: '500', marginTop: 4 },
});
