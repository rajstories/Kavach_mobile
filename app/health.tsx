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
import { useRouter } from 'expo-router';
import { COLORS } from '../src/constants/colors';

const PIPELINE_STEPS = [
  { label: 'Log Ingest', time: '1.2s', pct: 100, color: '#22c55e' },
  { label: 'ML Filter', time: '0.8s', pct: 100, color: '#22c55e' },
  { label: 'AI Analysis', time: '2.4s', pct: 85, color: '#3b82f6' },
  { label: 'Remediation', time: '0.3s', pct: 100, color: '#22c55e' },
];

const SERVICES = [
  { name: 'Commander Agent', version: 'v2.1.0', status: 'Running', health: 98, color: '#22c55e' },
  { name: 'ML Threat Service', version: 'v1.4.2', status: 'Running', health: 95, color: '#22c55e' },
  { name: 'PostgreSQL Database', version: '15.2', status: 'Running', health: 100, color: '#22c55e' },
  { name: 'Telegram Bot', version: 'v1.0.3', status: 'Running', health: 92, color: '#22c55e' },
  { name: 'Redis Cache', version: '7.0', status: 'Degraded', health: 68, color: '#f59e0b' },
];

export default function HealthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>System Health</Text>
        <View style={styles.headerRight}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn}>
            <Text style={{ fontSize: 14 }}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* All Systems Operational */}
        <View style={styles.statusBanner}>
          <Text style={{ fontSize: 16 }}>✅</Text>
          <Text style={styles.statusText}>All Systems Operational</Text>
        </View>

        {/* Detection Pipeline */}
        <Text style={styles.sectionTitle}>Detection Pipeline</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pipelineScroll} contentContainerStyle={{ gap: 12 }}>
          {PIPELINE_STEPS.map((step, i) => (
            <View key={i} style={styles.pipelineCard}>
              <View style={[styles.pipelineIconWrap, { backgroundColor: step.color + '15' }]}>
                <Text style={{ fontSize: 16 }}>
                  {i === 0 ? '📥' : i === 1 ? '🧠' : i === 2 ? '🤖' : '🔧'}
                </Text>
              </View>
              <Text style={styles.pipelineLabel}>{step.label}</Text>
              <Text style={styles.pipelineTime}>{step.time}</Text>
              <View style={styles.pipelineBar}>
                <View
                  style={[styles.pipelineFill, { width: `${step.pct}%`, backgroundColor: step.color }]}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Services */}
        <Text style={styles.sectionTitle}>Services</Text>
        {SERVICES.map((svc, i) => (
          <View key={i} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceLeft}>
                <View style={[styles.serviceDot, { backgroundColor: svc.color }]} />
                <View>
                  <Text style={styles.serviceName}>{svc.name}</Text>
                  <Text style={styles.serviceVersion}>{svc.version}</Text>
                </View>
              </View>
              <View style={styles.serviceRight}>
                <Text style={[styles.serviceStatus, { color: svc.color }]}>{svc.status}</Text>
                <Text style={styles.serviceHealth}>{svc.health}%</Text>
              </View>
            </View>
            <View style={styles.serviceBarBg}>
              <View style={[styles.serviceBarFg, { width: `${svc.health}%`, backgroundColor: svc.color }]} />
            </View>
          </View>
        ))}

        {/* Performance Metrics */}
        <Text style={styles.sectionTitle}>Performance</Text>
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { backgroundColor: '#eff6ff' }]}>
            <Text style={{ fontSize: 20 }}>📊</Text>
            <Text style={styles.metricValue}>847,392</Text>
            <Text style={styles.metricLabel}>Logs Analyzed</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: '#f0fdf4' }]}>
            <Text style={{ fontSize: 20 }}>🛡️</Text>
            <Text style={styles.metricValue}>23</Text>
            <Text style={styles.metricLabel}>Threats Blocked</Text>
          </View>
        </View>

        {/* Cost Saved */}
        <View style={styles.costCard}>
          <View style={styles.costHeader}>
            <View>
              <Text style={styles.costTitle}>Cost Saved Today</Text>
              <Text style={styles.costSub}>vs. manual SOC operations</Text>
            </View>
            <Text style={styles.costValue}>₹47,200</Text>
          </View>
          <View style={styles.costBarBg}>
            <View style={[styles.costBarFg, { width: '24%' }]} />
          </View>
          <View style={styles.costFooter}>
            <Text style={styles.costProgress}>Progress to ₹2Cr annual target</Text>
            <Text style={styles.costPct}>23.6%</Text>
          </View>
        </View>

        {/* Response Time */}
        <View style={styles.responseCard}>
          <Text style={styles.responseTitle}>Average Response Times</Text>
          {[
            { label: 'Detection', value: '1.8s', pct: 90, color: '#22c55e' },
            { label: 'Analysis', value: '3.2s', pct: 80, color: '#3b82f6' },
            { label: 'Containment', value: '8.1s', pct: 60, color: '#f59e0b' },
            { label: 'Resolution', value: '24m', pct: 40, color: '#ef4444' },
          ].map((r, i) => (
            <View key={i} style={styles.responseRow}>
              <View style={styles.responseLabels}>
                <Text style={styles.responseLabel}>{r.label}</Text>
                <Text style={styles.responseVal}>{r.value}</Text>
              </View>
              <View style={styles.responseBarBg}>
                <View style={[styles.responseBarFg, { width: `${r.pct}%`, backgroundColor: r.color }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 56, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 50 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  liveText: { fontSize: 11, fontWeight: '600', color: '#16a34a' },
  refreshBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },

  scrollContent: { padding: 16, gap: 16 },

  statusBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0', borderRadius: 12, paddingVertical: 14 },
  statusText: { fontSize: 14, fontWeight: '700', color: '#166534' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginTop: 8 },

  // Pipeline
  pipelineScroll: { marginBottom: 8 },
  pipelineCard: { width: 130, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#f1f5f9', padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  pipelineIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  pipelineLabel: { fontSize: 12, fontWeight: '600', color: '#1e293b', marginBottom: 2 },
  pipelineTime: { fontSize: 18, fontWeight: '800', color: '#1e293b', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 8 },
  pipelineBar: { width: '100%', height: 4, backgroundColor: '#f1f5f9', borderRadius: 2, overflow: 'hidden' },
  pipelineFill: { height: 4, borderRadius: 2 },

  // Services
  serviceCard: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
  serviceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  serviceLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  serviceDot: { width: 8, height: 8, borderRadius: 4 },
  serviceName: { fontSize: 14, fontWeight: '600', color: '#1e293b' },
  serviceVersion: { fontSize: 11, color: '#94a3b8' },
  serviceRight: { alignItems: 'flex-end' },
  serviceStatus: { fontSize: 12, fontWeight: '600' },
  serviceHealth: { fontSize: 11, color: '#64748b' },
  serviceBarBg: { height: 4, backgroundColor: '#f1f5f9', borderRadius: 2, overflow: 'hidden' },
  serviceBarFg: { height: 4, borderRadius: 2 },

  // Metrics
  metricsRow: { flexDirection: 'row', gap: 12 },
  metricCard: { flex: 1, borderRadius: 16, padding: 20, alignItems: 'center' },
  metricValue: { fontSize: 24, fontWeight: '800', color: '#1e293b', marginTop: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  metricLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },

  // Cost
  costCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  costHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  costTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  costSub: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  costValue: { fontSize: 24, fontWeight: '800', color: '#22c55e', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  costBarBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  costBarFg: { height: 6, backgroundColor: '#22c55e', borderRadius: 3 },
  costFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  costProgress: { fontSize: 11, color: '#64748b' },
  costPct: { fontSize: 11, fontWeight: '700', color: '#22c55e' },

  // Response
  responseCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f1f5f9', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  responseTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 16 },
  responseRow: { marginBottom: 14 },
  responseLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  responseLabel: { fontSize: 12, color: '#64748b' },
  responseVal: { fontSize: 12, fontWeight: '700', color: '#1e293b', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  responseBarBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  responseBarFg: { height: 6, borderRadius: 3 },
});
