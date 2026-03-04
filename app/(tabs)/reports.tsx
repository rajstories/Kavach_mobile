import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/constants/colors';

const QUICK_TAGS = ['CERT-In Report', 'Daily Brief', 'Incident Summary'];

const RECENT_REPORTS = [
  { id: 1, title: 'CERT-In Incident Report', subtitle: 'INC-9921 • Brute Force Attack', badge: 'Filed', badgeColor: '#dcfce7', badgeTextColor: '#166534', time: '2 hours ago' },
  { id: 2, title: 'Daily Security Brief', subtitle: 'SOC Summary • 15 Jan 2025', badge: 'Filed', badgeColor: '#dcfce7', badgeTextColor: '#166534', time: '8 hours ago' },
  { id: 3, title: 'Compliance Audit Report', subtitle: 'MeitY-CAR-2025-Q1', badge: 'Draft', badgeColor: '#fef9c3', badgeTextColor: '#854d0e', time: '1 day ago' },
];

export default function ReportsScreen() {
  const [selectedTag, setSelectedTag] = useState(0);
  const [reportLang, setReportLang] = useState<'EN' | 'HI'>('EN');

  // Countdown to CERT-In deadline
  const [countdown, setCountdown] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => {
    const iv = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports & Compliance</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}><Text style={{ fontSize: 16 }}>🕒</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={{ fontSize: 16 }}>📤</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overdue Alert */}
        <View style={styles.overdueAlert}>
          <View style={styles.overdueRow}>
            <View style={styles.overdueIconWrap}>
              <Text style={{ fontSize: 14 }}>⚠️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.overdueTitle}>Overdue Compliance Filing</Text>
              <Text style={styles.overdueDesc}>CERT-In Incident Report for #INC-9842 is overdue by 2 hours</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.fileNowBtn}>
            <Text style={styles.fileNowText}>File Now</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Generate */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Quick Generate</Text>
            <View style={styles.langToggle}>
              <TouchableOpacity
                onPress={() => setReportLang('EN')}
                style={[styles.langBtn, reportLang === 'EN' && styles.langBtnActive]}
              >
                <Text style={[styles.langBtnText, reportLang === 'EN' && styles.langBtnTextActive]}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setReportLang('HI')}
                style={[styles.langBtn, reportLang === 'HI' && styles.langBtnActive]}
              >
                <Text style={[styles.langBtnText, reportLang === 'HI' && styles.langBtnTextActive]}>Hindi</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tagRow}>
            {QUICK_TAGS.map((tag, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.tagPill, selectedTag === i && styles.tagPillActive]}
                onPress={() => setSelectedTag(i)}
              >
                <Text style={[styles.tagText, selectedTag === i && styles.tagTextActive]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.generateBtn}>
            <Text style={styles.generateBtnText}>🔄  Generate Report</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Reports */}
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        {RECENT_REPORTS.map((r) => (
          <TouchableOpacity key={r.id} style={styles.reportCard}>
            <View style={styles.reportLeft}>
              <View style={styles.reportIcon}>
                <Text style={{ fontSize: 14 }}>📄</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.reportTitle}>{r.title}</Text>
                <Text style={styles.reportSub}>{r.subtitle}</Text>
              </View>
            </View>
            <View style={styles.reportRight}>
              <View style={[styles.reportBadge, { backgroundColor: r.badgeColor }]}>
                <Text style={[styles.reportBadgeText, { color: r.badgeTextColor }]}>{r.badge}</Text>
              </View>
              <Text style={styles.reportTime}>{r.time}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Daily Security Brief */}
        <View style={styles.briefCard}>
          <View style={styles.briefHeader}>
            <View>
              <Text style={styles.briefTitle}>Daily Security Brief</Text>
              <Text style={styles.briefSub}>Auto-generated • 15 Jan 2025</Text>
            </View>
            <View style={styles.briefLangRow}>
              <View style={styles.briefLangActive}><Text style={styles.briefLangActiveText}>ENG</Text></View>
              <TouchableOpacity style={styles.briefLang}><Text style={styles.briefLangText}>HIN</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.briefStatsRow}>
            <View style={styles.briefStat}>
              <Text style={styles.briefStatValue}>12</Text>
              <Text style={styles.briefStatLabel}>Alerts Blocked</Text>
            </View>
            <View style={styles.briefStatDivider} />
            <View style={styles.briefStat}>
              <Text style={[styles.briefStatValue, { color: '#22c55e' }]}>0</Text>
              <Text style={styles.briefStatLabel}>Critical</Text>
            </View>
            <View style={styles.briefStatDivider} />
            <View style={styles.briefStat}>
              <Text style={styles.briefStatValue}>99.8%</Text>
              <Text style={styles.briefStatLabel}>Uptime</Text>
            </View>
          </View>
        </View>

        {/* CERT-In Filing Deadline */}
        <View style={styles.deadlineCard}>
          <View style={styles.deadlineHeader}>
            <View style={styles.deadlineDotWrap}>
              <View style={styles.deadlineDot} />
            </View>
            <Text style={styles.deadlineTitle}>CERT-In Filing Deadline</Text>
          </View>
          <Text style={styles.deadlineSub}>6-hour mandatory reporting window</Text>
          <View style={styles.countdownRow}>
            <View style={styles.countdownBox}>
              <Text style={styles.countdownVal}>{pad(countdown.h)}</Text>
              <Text style={styles.countdownLabel}>HRS</Text>
            </View>
            <Text style={styles.countdownColon}>:</Text>
            <View style={styles.countdownBox}>
              <Text style={styles.countdownVal}>{pad(countdown.m)}</Text>
              <Text style={styles.countdownLabel}>MIN</Text>
            </View>
            <Text style={styles.countdownColon}>:</Text>
            <View style={styles.countdownBox}>
              <Text style={styles.countdownVal}>{pad(countdown.s)}</Text>
              <Text style={styles.countdownLabel}>SEC</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFg, { width: '45%' }]} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 56, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },

  scrollContent: { padding: 16, gap: 16 },

  // Overdue Alert
  overdueAlert: { backgroundColor: '#fef2f2', borderRadius: 16, borderWidth: 1, borderColor: '#fecaca', padding: 16 },
  overdueRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  overdueIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fee2e2', alignItems: 'center', justifyContent: 'center' },
  overdueTitle: { fontSize: 14, fontWeight: '700', color: '#991b1b', marginBottom: 2 },
  overdueDesc: { fontSize: 12, color: '#b91c1c' },
  fileNowBtn: { backgroundColor: '#dc2626', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  fileNowText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Quick Generate card
  card: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  langToggle: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 8, padding: 2 },
  langBtn: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  langBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  langBtnText: { fontSize: 11, fontWeight: '600', color: '#64748b' },
  langBtnTextActive: { color: COLORS.navy },
  tagRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 16 },
  tagPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff' },
  tagPillActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  tagText: { fontSize: 13, fontWeight: '500', color: '#64748b' },
  tagTextActive: { color: '#fff' },
  generateBtn: { backgroundColor: COLORS.navy, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  generateBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Section title
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 4, marginTop: 8 },

  // Report Card
  reportCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  reportLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  reportIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  reportTitle: { fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 2 },
  reportSub: { fontSize: 11, color: '#64748b', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  reportRight: { alignItems: 'flex-end', gap: 4 },
  reportBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  reportBadgeText: { fontSize: 10, fontWeight: '700' },
  reportTime: { fontSize: 10, color: '#94a3b8' },

  // Brief
  briefCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  briefHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  briefTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 2 },
  briefSub: { fontSize: 11, color: '#94a3b8' },
  briefLangRow: { flexDirection: 'row', gap: 4 },
  briefLangActive: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: COLORS.navy },
  briefLangActiveText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  briefLang: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#f1f5f9' },
  briefLangText: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  briefStatsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#f8fafc', borderRadius: 12, paddingVertical: 16 },
  briefStat: { alignItems: 'center' },
  briefStatValue: { fontSize: 22, fontWeight: '800', color: '#1e293b' },
  briefStatLabel: { fontSize: 10, color: '#64748b', marginTop: 2 },
  briefStatDivider: { width: 1, height: 32, backgroundColor: '#e2e8f0' },

  // Deadline
  deadlineCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20 },
  deadlineHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  deadlineDotWrap: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(248,113,113,0.3)', alignItems: 'center', justifyContent: 'center' },
  deadlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#f87171' },
  deadlineTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  deadlineSub: { fontSize: 12, color: '#94a3b8', marginBottom: 16 },
  countdownRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 },
  countdownBox: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16 },
  countdownVal: { fontSize: 28, fontWeight: '800', color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  countdownLabel: { fontSize: 9, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  countdownColon: { fontSize: 28, fontWeight: '800', color: '#64748b' },
  progressBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  progressBarFg: { height: 4, backgroundColor: '#f87171', borderRadius: 2 },
});
