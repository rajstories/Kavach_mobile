import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';

const TABS = ['Open', 'Investigating', 'Resolved'];

const LOG_ENTRIES = [
  { time: '14:20:01', text: 'Failed password for root from 203.0.113.50', highlight: false },
  { time: '14:20:03', text: 'Failed password for root from 203.0.113.50', highlight: false },
  { time: '14:20:05', text: 'Failed password for root from 203.0.113.50', highlight: false },
  { time: '14:20:08', text: 'MAX_RETRIES_EXCEEDED from 203.0.113.50', highlight: true },
];

const TIMELINE = [
  { title: 'IP 203.0.113.50 Blocked', desc: 'Automated firewall rule applied via KAVACH-AI', time: '14:21:05 IST', done: true },
  { title: 'Root Account Locked', desc: 'Temporary lockout policy enforced (30m)', time: '14:21:10 IST', done: true },
  { title: 'Admin Notification Sent', desc: 'Pending delivery', time: '', done: false },
];

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={styles.root}>
      {/* Sticky Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Text style={styles.headerBtnIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>#{id || 'INC-9921'}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerBtn}>
              <Text style={styles.headerBtnIcon}>↗️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Text style={styles.headerBtnIcon}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient colors={['#b71c1c', '#c62828']} style={styles.hero}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroTopRow}>
              <View style={styles.critBadge}>
                <Text style={{ fontSize: 11 }}>⚠️</Text>
                <Text style={styles.critText}>CRITICAL</Text>
              </View>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>3 min ago</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>Brute Force Attack</Text>
            <View style={styles.heroTarget}>
              <Text style={{ fontSize: 14 }}>🖥️</Text>
              <View style={styles.heroTargetTag}>
                <Text style={styles.heroTargetText}>voter-auth-api</Text>
              </View>
            </View>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatVal}>45</Text>
                <Text style={styles.heroStatLabel}>EVENTS</Text>
              </View>
              <View style={[styles.heroStat, styles.heroStatBorder]}>
                <Text style={styles.heroStatVal}>5<Text style={styles.heroStatUnit}>m</Text></Text>
                <Text style={styles.heroStatLabel}>DURATION</Text>
              </View>
              <View style={[styles.heroStat, styles.heroStatBorder]}>
                <Text style={styles.heroStatVal}>97<Text style={styles.heroStatUnit}>%</Text></Text>
                <Text style={styles.heroStatLabel}>CONFIDENCE</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Status Tabs */}
          <View style={styles.tabsCard}>
            <View style={styles.tabsInner}>
              {TABS.map((tab, i) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(i)}
                  style={[styles.tab, activeTab === i && styles.tabActive]}
                >
                  <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Threat Actor */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionBar, { backgroundColor: '#d32f2f' }]} />
            <View style={styles.sectionContent}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderLeft}>
                  <Text style={{ fontSize: 16 }}>⚠️</Text>
                  <Text style={styles.sectionHeaderTitle}>THREAT ACTOR</Text>
                </View>
                <Text style={{ color: '#cbd5e1', fontSize: 16 }}>ℹ️</Text>
              </View>
              <View style={styles.ipBox}>
                <View>
                  <Text style={styles.ipLabel}>Source IP Address</Text>
                  <Text style={styles.ipValue}>203.0.113.50</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ fontSize: 16, color: '#94a3b8' }}>📋</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <View style={styles.infoValueRow}>
                    <View style={styles.greyDot} />
                    <Text style={styles.infoValue}>Unknown Proxy</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>ISP</Text>
                  <Text style={styles.infoValue}>Digital Ocean LLC</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Civic Impact */}
          <View style={styles.sectionCard}>
            <View style={[styles.sectionBar, { backgroundColor: COLORS.navy }]} />
            <View style={styles.sectionContent}>
              <View style={styles.sectionHeaderLeft}>
                <Text style={{ fontSize: 16 }}>🌐</Text>
                <Text style={styles.sectionHeaderTitle}>CIVIC IMPACT ASSESSMENT</Text>
              </View>
              <View style={styles.civicBox}>
                <Text style={{ fontSize: 24 }}>🇮🇳</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.civicTitle}>Electoral Data Integrity</Text>
                  <Text style={styles.civicDesc}>
                    Potential unauthorized access to voter registration API. High risk of data exfiltration affecting regional demographics.
                  </Text>
                </View>
              </View>
              <View style={styles.tagRow}>
                <View style={styles.tag}><Text style={styles.tagText}>TIER-1 INFRA</Text></View>
                <View style={styles.tag}><Text style={styles.tagText}>PUBLIC TRUST</Text></View>
              </View>
            </View>
          </View>

          {/* Evidence Logs */}
          <View style={styles.logsCard}>
            <View style={styles.logsHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Text style={{ fontSize: 14, color: '#4ade80' }}>💻</Text>
                <Text style={[styles.sectionHeaderTitle, { color: '#fff' }]}>EVIDENCE LOGS</Text>
              </View>
              <Text style={styles.logsPath}>/var/log/auth.log</Text>
            </View>
            <View style={styles.logsBody}>
              {LOG_ENTRIES.map((entry, i) => (
                <View key={i} style={styles.logLine}>
                  <Text style={styles.logTime}>{entry.time}</Text>
                  <Text style={[styles.logText, entry.highlight && { color: '#f87171' }]}> {entry.text}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Remediation Timeline */}
          <View style={styles.timelineCard}>
            <View style={styles.sectionHeaderLeft}>
              <Text style={{ fontSize: 16 }}>📈</Text>
              <Text style={styles.sectionHeaderTitle}>REMEDIATION TIMELINE</Text>
            </View>
            <View style={styles.timeline}>
              {TIMELINE.map((item, i) => (
                <View key={i} style={[styles.timelineItem, !item.done && { opacity: 0.5 }]}>
                  {i < TIMELINE.length - 1 && <View style={styles.timelineLine} />}
                  <View style={[styles.timelineDot, item.done ? styles.timelineDotDone : styles.timelineDotPending]} >
                    {item.done && <View style={styles.timelineDotInner} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text style={styles.timelineDesc}>{item.desc}</Text>
                    {item.time ? <Text style={styles.timelineTime}>{item.time}</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 160 }} />
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity style={styles.escalateBtn}>
          <Text style={{ fontSize: 14 }}>🛡️</Text>
          <Text style={styles.escalateText}>Escalate to CERT-In</Text>
        </TouchableOpacity>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={{ fontSize: 14 }}>✅</Text>
            <Text style={styles.secondaryText}>Mark Resolved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={{ fontSize: 14 }}>📄</Text>
            <Text style={styles.secondaryText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mono = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f4f6' },

  headerSafe: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  headerBtn: { padding: 4 },
  headerBtnIcon: { fontSize: 18, color: '#475569', fontWeight: '600' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  headerActions: { flexDirection: 'row', gap: 8 },

  scroll: { flex: 1 },

  // Hero
  hero: { borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingTop: 24, paddingBottom: 32, paddingHorizontal: 20, overflow: 'hidden' },
  heroOverlay: { position: 'absolute', top: 0, right: 0, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)' },
  heroContent: { position: 'relative', zIndex: 10 },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  critBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  critText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  timeBadge: { backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 50 },
  timeText: { fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  heroTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 8, letterSpacing: -0.3 },
  heroTarget: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 },
  heroTargetTag: { backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  heroTargetText: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.9)', fontFamily: mono },
  heroStats: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 16 },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatBorder: { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.2)' },
  heroStatVal: { fontSize: 24, fontWeight: '700', color: '#fff' },
  heroStatUnit: { fontSize: 14, fontWeight: '400' },
  heroStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginTop: 4 },

  body: { paddingHorizontal: 16, marginTop: -16 },

  // Tabs
  tabsCard: { backgroundColor: '#fff', borderRadius: 12, padding: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, marginBottom: 16 },
  tabsInner: { flexDirection: 'row', backgroundColor: 'rgba(241,245,249,0.5)', borderRadius: 8, padding: 2 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  tabActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  tabText: { fontSize: 14, fontWeight: '500', color: '#64748b' },
  tabTextActive: { color: COLORS.navy, fontWeight: '600' },

  // Section Cards
  sectionCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', flexDirection: 'row', marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  sectionBar: { width: 6 },
  sectionContent: { flex: 1, padding: 16 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionHeaderTitle: { fontSize: 12, fontWeight: '700', color: '#1e293b', letterSpacing: 0.8 },

  // IP Box
  ipBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fef2f2', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#fecaca', marginBottom: 12 },
  ipLabel: { fontSize: 12, color: '#64748b', marginBottom: 4 },
  ipValue: { fontSize: 18, fontWeight: '600', color: '#1e293b', fontFamily: mono },
  infoGrid: { flexDirection: 'row', gap: 12 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#64748b' },
  infoValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  greyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#cbd5e1' },
  infoValue: { fontSize: 12, fontWeight: '500', color: '#1e293b', marginTop: 2 },

  // Civic Impact
  civicBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(239,246,255,0.5)', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#dbeafe', marginBottom: 8 },
  civicTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  civicDesc: { fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 18 },
  tagRow: { flexDirection: 'row', gap: 8 },
  tag: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  tagText: { fontSize: 9, fontWeight: '700', color: '#475569', letterSpacing: 0.5 },

  // Evidence Logs
  logsCard: { backgroundColor: '#1e1e2e', borderRadius: 12, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  logsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 12 },
  logsPath: { fontSize: 10, color: '#64748b', fontFamily: mono },
  logsBody: { backgroundColor: 'rgba(0,0,0,0.3)', marginHorizontal: 12, marginBottom: 12, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  logLine: { flexDirection: 'row', marginBottom: 2 },
  logTime: { fontSize: 11, color: '#64748b', fontFamily: mono },
  logText: { fontSize: 11, color: '#4ade80', fontFamily: mono, flex: 1 },

  // Timeline
  timelineCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  timeline: { marginTop: 8, paddingLeft: 8 },
  timelineItem: { flexDirection: 'row', marginBottom: 24, position: 'relative' },
  timelineLine: { position: 'absolute', left: 7, top: 16, bottom: -24, width: 2, backgroundColor: '#e5e7eb' },
  timelineDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2, zIndex: 10 },
  timelineDotDone: { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
  timelineDotPending: { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' },
  timelineDotInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#16a34a' },
  timelineContent: { flex: 1 },
  timelineTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  timelineDesc: { fontSize: 12, color: '#64748b', marginTop: 2 },
  timelineTime: { fontSize: 10, color: '#94a3b8', fontFamily: mono, marginTop: 4 },

  // Bottom bar
  bottomBar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 10 },
  escalateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.navy, borderRadius: 12, paddingVertical: 14, marginBottom: 12, shadowColor: '#1a237e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  escalateText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  actionRow: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, paddingVertical: 10 },
  secondaryText: { fontSize: 13, fontWeight: '600', color: '#334155' },
});
