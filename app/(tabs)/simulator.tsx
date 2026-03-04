import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../src/constants/colors';

const SCENARIOS = [
  {
    id: 'brute-force', icon: '🔑', title: 'Voter Portal Brute Force',
    risk: 'HIGH RISK', riskColor: '#dc2626', riskBg: '#fef2f2', riskBorder: '#fecaca',
    vector: 'Auth Vector',
    desc: 'Simulates 10,000+ rapid login attempts using common credential dictionaries against the primary authentication API.',
  },
  {
    id: 'ddos', icon: '🔀', title: 'Municipal Portal DDoS',
    risk: 'MEDIUM RISK', riskColor: '#c2410c', riskBg: '#fff7ed', riskBorder: '#fed7aa',
    vector: 'Network Vector',
    desc: 'Generates simulated volumetric traffic spikes to test load balancer and auto-scaling defenses.',
  },
  {
    id: 'sql-injection', icon: '{ }', title: 'RTI SQL Injection',
    risk: 'CRITICAL RISK', riskColor: '#dc2626', riskBg: '#fef2f2', riskBorder: '#fecaca',
    vector: 'App Vector',
    desc: 'Attempts to bypass input validation on the Right to Information portal search forms.',
  },
  {
    id: 'token-reuse', icon: '🔑', title: 'Stale Token Reuse',
    risk: 'LOW RISK', riskColor: '#a16207', riskBg: '#fefce8', riskBorder: '#fde68a',
    vector: 'Access Vector',
    desc: 'Tests session management by attempting API calls with recently expired JWTs.',
  },
  {
    id: 'phishing', icon: '🎣', title: 'Internal Phishing Camp.',
    risk: 'MEDIUM RISK', riskColor: '#c2410c', riskBg: '#fff7ed', riskBorder: '#fed7aa',
    vector: 'Social Vector',
    desc: 'Dispatches benign credential harvesting emails to selected SOC personnel to test awareness.',
  },
];

const PIPELINE_STEPS = [
  { title: 'Log Generation', desc: 'Synthetic traffic injected', time: '00:02', detail: 'Generated 12,400 spoofed DNS requests targeting port 53.' },
  { title: 'ML Detection', desc: 'Anomaly detection models triggered', time: '00:04', tags: ['45 Anomalies Flagged', 'Volumetric Spike'] },
  { title: 'AI Analysis', desc: 'KAVACH-AI correlating events', time: 'Processing...', progress: true },
  { title: 'Remediation', desc: 'Automated defense actions', time: '--:--', pending: true },
  { title: 'Alerts & Reporting', desc: 'SOC notifications dispatched', time: '--:--', pending: true },
];

export default function SimulatorScreen() {
  const [selectedId, setSelectedId] = useState('brute-force');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev < PIPELINE_STEPS.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 3000);
      Animated.loop(
        Animated.sequence([
          Animated.timing(progressAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
          Animated.timing(progressAnim, { toValue: 0.3, duration: 1000, useNativeDriver: false }),
        ])
      ).start();
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  if (isRunning) {
    return <SimulationRunning activeStep={activeStep} progressAnim={progressAnim} onStop={() => { setIsRunning(false); setActiveStep(0); }} />;
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.selectHeader}>
        <View style={styles.selectHeaderRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.selectClose}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.selectTitle}>Attack Simulator</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoText}>DEMO MODE</Text>
          </View>
        </View>
        <View style={styles.sandboxBanner}>
          <Text style={{ fontSize: 12 }}>🔒</Text>
          <Text style={styles.sandboxText}>Running in isolated sandbox environment</Text>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.selectBody} showsVerticalScrollIndicator={false}>
        <Text style={styles.selectHeading}>Select Scenario</Text>
        <Text style={styles.selectDesc}>Choose a simulated attack vector to test defense protocols.</Text>

        {SCENARIOS.map((s) => {
          const isSelected = selectedId === s.id;
          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.scenarioCard, isSelected && styles.scenarioSelected, !isSelected && { opacity: 0.9 }]}
              onPress={() => setSelectedId(s.id)}
              activeOpacity={0.7}
            >
              {isSelected && (
                <View style={styles.checkCircle}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
              <View style={styles.scenarioRow}>
                <View style={[styles.scenarioIcon, isSelected ? { backgroundColor: '#fff', borderColor: '#e2e8f0' } : { backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }]}>
                  <Text style={{ fontSize: 22 }}>{s.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.scenarioMeta}>
                    <View style={[styles.riskBadge, { backgroundColor: s.riskBg, borderColor: s.riskBorder }]}>
                      <Text style={[styles.riskText, { color: s.riskColor }]}>{s.risk}</Text>
                    </View>
                    <Text style={styles.vectorText}>{s.vector}</Text>
                  </View>
                  <Text style={styles.scenarioTitle}>{s.title}</Text>
                  <Text style={styles.scenarioDesc}>{s.desc}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Launch Button */}
      <SafeAreaView edges={['bottom']} style={styles.launchBar}>
        <TouchableOpacity onPress={() => setIsRunning(true)} activeOpacity={0.85}>
          <LinearGradient colors={['#b71c1c', '#e53935']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.launchBtn}>
            <Text style={{ fontSize: 16 }}>🚨</Text>
            <Text style={styles.launchText}>Launch Simulation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

function SimulationRunning({ activeStep, progressAnim, onStop }: { activeStep: number; progressAnim: Animated.Value; onStop: () => void }) {
  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.runHeader}>
        <View style={styles.runHeaderRow}>
          <TouchableOpacity onPress={onStop}>
            <Text style={styles.runBack}>←</Text>
          </TouchableOpacity>
          <Text style={styles.runTitle}>Attack Simulator</Text>
          <View style={styles.runActions}>
            <TouchableOpacity><Text style={styles.runActionIcon}>?</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.runActionIcon}>⋮</Text></TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.runHero}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE SIMULATION</Text>
          </View>
          <Text style={styles.runHeroTitle}>DDoS Reflection</Text>
          <Text style={styles.runHeroSub}>Executing on Sandbox Environment</Text>
        </LinearGradient>

        <View style={styles.runBody}>
          {/* Pipeline Card */}
          <View style={styles.pipelineCard}>
            <View style={styles.pipelineHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16 }}>🔄</Text>
                <Text style={styles.pipelineTitle}>RESPONSE PIPELINE</Text>
              </View>
              <View style={styles.pipelineLive}>
                <Text style={styles.pipelineLiveText}>LIVE</Text>
              </View>
            </View>

            <View style={styles.pipelineSteps}>
              {PIPELINE_STEPS.map((step, i) => {
                const isDone = i < activeStep;
                const isCurrent = i === activeStep;
                const isPending = i > activeStep;
                return (
                  <View key={i} style={[styles.stepItem, isPending && !step.pending && { opacity: 0.5 }, step.pending && { opacity: 0.5 }]}>
                    {i < PIPELINE_STEPS.length - 1 && (
                      <View style={[styles.stepLine, isDone && { backgroundColor: '#22c55e' }]} />
                    )}
                    <View style={[
                      styles.stepDot,
                      isDone && { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
                      isCurrent && { backgroundColor: '#fff', borderColor: COLORS.navy },
                      isPending && { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1' },
                    ]}>
                      {isDone && <Text style={{ fontSize: 12, color: '#16a34a', fontWeight: '700' }}>✓</Text>}
                      {isCurrent && <Text style={{ fontSize: 10, color: COLORS.navy }}>⟳</Text>}
                      {isPending && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#cbd5e1' }} />}
                    </View>

                    <View style={{ flex: 1, paddingTop: 2 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={[styles.stepTitle, isCurrent && { color: COLORS.navy }]}>{step.title}</Text>
                        <Text style={[styles.stepTime, isCurrent && { color: COLORS.navy, fontWeight: '500' }]}>{step.time}</Text>
                      </View>
                      <Text style={styles.stepDesc}>{step.desc}</Text>
                      {step.detail && isDone && (
                        <View style={styles.stepDetail}>
                          <Text style={styles.stepDetailText}>{step.detail}</Text>
                        </View>
                      )}
                      {step.tags && isDone && (
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                          {step.tags.map((t, j) => (
                            <View key={j} style={[styles.stepTag, j === 0 ? { backgroundColor: '#fef2f2', borderColor: '#fecaca' } : { backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }]}>
                              <Text style={[styles.stepTagText, j === 0 ? { color: '#dc2626' } : { color: '#2563eb' }]}>{t}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {step.progress && isCurrent && (
                        <View style={styles.progressBarWrap}>
                          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Threat Neutralized */}
          <View style={styles.neutralizedCard}>
            <View style={styles.neutralizedHeader}>
              <Text style={{ fontSize: 14 }}>✅</Text>
              <Text style={styles.neutralizedTitle}>THREAT NEUTRALIZED</Text>
            </View>
            <View style={styles.neutralizedBody}>
              <View style={styles.skelBar} />
              <View style={[styles.skelBar, { width: '66%' }]} />
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.stopBar}>
        <TouchableOpacity style={styles.stopBtn} onPress={onStop}>
          <Text style={{ fontSize: 16 }}>⏹️</Text>
          <Text style={styles.stopText}>Stop Simulation</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0f3c' },

  // Select Screen
  selectHeader: { backgroundColor: '#0d1754', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  selectHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  selectClose: { fontSize: 20, color: 'rgba(255,255,255,0.8)' },
  selectTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  demoBadge: { backgroundColor: 'rgba(249,115,22,0.2)', borderWidth: 1, borderColor: 'rgba(249,115,22,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  demoText: { fontSize: 9, fontWeight: '700', color: '#fb923c', letterSpacing: 1 },
  sandboxBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(30,58,138,0.4)', borderTopWidth: 1, borderTopColor: 'rgba(30,64,175,0.5)', paddingVertical: 8 },
  sandboxText: { fontSize: 12, color: '#93c5fd', fontWeight: '500' },

  selectBody: { flex: 1, paddingHorizontal: 16, paddingTop: 24 },
  selectHeading: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 4 },
  selectDesc: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },

  scenarioCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'transparent' },
  scenarioSelected: { backgroundColor: '#e8eaf6', borderWidth: 2, borderColor: '#0d1754' },
  checkCircle: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: 12, backgroundColor: '#0d1754', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  checkMark: { fontSize: 14, color: '#fff', fontWeight: '700' },
  scenarioRow: { flexDirection: 'row', padding: 16, gap: 16 },
  scenarioIcon: { width: 48, height: 48, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  scenarioMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, borderWidth: 1 },
  riskText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  vectorText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  scenarioTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  scenarioDesc: { fontSize: 12, color: '#475569', lineHeight: 18 },

  launchBar: { backgroundColor: '#0d1754', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', padding: 16, paddingBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 20 },
  launchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 16, shadowColor: '#d32f2f', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  launchText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // Running Screen
  runHeader: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  runHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 48 },
  runBack: { fontSize: 22, color: '#475569', fontWeight: '600' },
  runTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  runActions: { flexDirection: 'row', gap: 12 },
  runActionIcon: { fontSize: 18, color: '#475569' },

  runHero: { paddingTop: 24, paddingBottom: 72, paddingHorizontal: 20, alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50, marginBottom: 16 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  liveText: { fontSize: 10, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  runHeroTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  runHeroSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },

  runBody: { paddingHorizontal: 16, marginTop: -48 },

  pipelineCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  pipelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'rgba(248,250,252,0.5)', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  pipelineTitle: { fontSize: 12, fontWeight: '700', color: '#1e293b', letterSpacing: 0.8 },
  pipelineLive: { backgroundColor: 'rgba(26,35,126,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  pipelineLiveText: { fontSize: 9, fontWeight: '700', color: COLORS.navy, letterSpacing: 0.5 },

  pipelineSteps: { padding: 16 },
  stepItem: { flexDirection: 'row', marginBottom: 32, position: 'relative' },
  stepLine: { position: 'absolute', left: 15, top: 32, bottom: -32, width: 2, backgroundColor: '#e5e7eb', zIndex: 0 },
  stepDot: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 16, zIndex: 10 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  stepTime: { fontSize: 12, color: '#94a3b8', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  stepDesc: { fontSize: 12, color: '#64748b' },
  stepDetail: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#f1f5f9', borderRadius: 4, padding: 8, marginTop: 8 },
  stepDetailText: { fontSize: 10, color: '#475569', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  stepTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1 },
  stepTagText: { fontSize: 10, fontWeight: '700' },
  progressBarWrap: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: COLORS.navy, borderRadius: 3 },

  neutralizedCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#f1f5f9', opacity: 0.9 },
  neutralizedHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(240,253,244,0.8)', padding: 12, borderBottomWidth: 1, borderBottomColor: '#dcfce7' },
  neutralizedTitle: { fontSize: 12, fontWeight: '700', color: '#166534', letterSpacing: 0.8 },
  neutralizedBody: { padding: 16, gap: 8 },
  skelBar: { width: '100%', height: 16, backgroundColor: '#f1f5f9', borderRadius: 4 },

  stopBar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0', padding: 16, paddingBottom: 8 },
  stopBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 2, borderColor: '#d32f2f', borderRadius: 12, paddingVertical: 14 },
  stopText: { fontSize: 14, fontWeight: '700', color: '#d32f2f' },
});
