import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '../../src/constants/colors';

type FilterType = 'All' | 'Critical' | 'High' | 'Medium' | 'Low';

const FILTERS: { label: FilterType; color: string }[] = [
  { label: 'All', color: COLORS.navy },
  { label: 'Critical', color: '#d32f2f' },
  { label: 'High', color: '#ed6c02' },
  { label: 'Medium', color: '#f57c00' },
  { label: 'Low', color: '#2e7d32' },
];

const INCIDENTS = [
  {
    id: 'INC-9921', severity: 'CRITICAL' as const, severityColor: '#d32f2f',
    severityBg: '#fef2f2', severityBorder: '#fecaca',
    time: '3 min ago', title: 'Brute Force Attack',
    icon: '🖥️', target: 'voter-auth-api', ip: '203.0.113.50',
    status: 'Active', statusColor: '#dc2626', statusBg: '#fef2f2', statusBorder: '#fecaca',
    statusDot: true, glowing: true,
  },
  {
    id: 'INC-9842', severity: 'HIGH' as const, severityColor: '#ed6c02',
    severityBg: '#fff7ed', severityBorder: '#fed7aa',
    time: '15 min ago', title: 'SQL Injection Attempt',
    icon: '💾', target: 'meity-cms-db', ip: '192.168.1.105',
    status: 'Contained', statusColor: '#15803d', statusBg: '#f0fdf4', statusBorder: '#bbf7d0',
    statusCheck: true, glowing: false,
  },
  {
    id: 'INC-9710', severity: 'MEDIUM' as const, severityColor: '#b45309',
    severityBg: '#fffbeb', severityBorder: '#fde68a',
    time: '42 min ago', title: 'Unusual Login Location',
    icon: '👤', target: 'admin-portal', ip: '45.22.19.112',
    status: 'Investigating', statusColor: '#475569', statusBg: '#f1f5f9', statusBorder: '#e2e8f0',
    statusDot: false, glowing: false,
  },
  {
    id: 'INC-9655', severity: 'CRITICAL' as const, severityColor: '#d32f2f',
    severityBg: '#fef2f2', severityBorder: '#fecaca',
    time: '2h ago', title: 'DDoS Attack',
    icon: '☁️', target: 'public-gateway-lb', ip: 'Multiple Sources',
    status: 'Resolved', statusColor: '#15803d', statusBg: '#f0fdf4', statusBorder: '#bbf7d0',
    statusCheck: true, resolved: true, glowing: false,
  },
];

export default function IncidentsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [search, setSearch] = useState('');

  const filtered = INCIDENTS.filter((inc) => {
    if (activeFilter !== 'All' && inc.severity !== activeFilter.toUpperCase()) return false;
    if (search && !inc.title.toLowerCase().includes(search.toLowerCase()) &&
        !inc.ip.toLowerCase().includes(search.toLowerCase()) &&
        !inc.target.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <View style={styles.root}>
      {/* Sticky Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Incidents</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={{ color: COLORS.navy, fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.label}
              onPress={() => setActiveFilter(f.label)}
              style={[
                styles.filterPill,
                activeFilter === f.label
                  ? { backgroundColor: COLORS.navy }
                  : { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0' },
              ]}
            >
              {f.label !== 'All' && <View style={[styles.filterDot, { backgroundColor: f.color }]} />}
              <Text style={[
                styles.filterLabel,
                { color: activeFilter === f.label ? '#fff' : '#475569' },
              ]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search incident, IP, portal..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </SafeAreaView>

      {/* Incident List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {filtered.map((inc) => (
          <TouchableOpacity
            key={inc.id}
            style={[styles.card, inc.glowing && styles.cardGlow, inc.resolved && { opacity: 0.75 }]}
            onPress={() => router.push(`/incident/${inc.id}`)}
            activeOpacity={0.7}
          >
            <View style={[styles.cardBar, { backgroundColor: inc.severityColor }]} />
            {inc.glowing && <View style={styles.cardOverlay} />}

            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View style={styles.cardTopLeft}>
                  <Text style={styles.incId}>#{inc.id}</Text>
                  <View style={[styles.sevBadge, { backgroundColor: inc.severityBg, borderColor: inc.severityBorder }]}>
                    {inc.severity === 'CRITICAL' && <Text style={{ fontSize: 10 }}>⚠️</Text>}
                    <Text style={[styles.sevText, { color: inc.severityColor }]}>{inc.severity}</Text>
                  </View>
                </View>
                <Text style={styles.incTime}>{inc.time}</Text>
              </View>

              <Text style={styles.incTitle}>{inc.title}</Text>

              <View style={styles.targetRow}>
                <Text style={{ fontSize: 16, opacity: 0.5 }}>{inc.icon}</Text>
                <View style={styles.targetTag}>
                  <Text style={styles.targetText}>{inc.target}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.ipRow}>
                <Text style={{ fontSize: 12, opacity: 0.5 }}>🖥️</Text>
                <Text style={styles.ipText}>{inc.ip}</Text>
              </View>
              <View style={[styles.statusPill, { backgroundColor: inc.statusBg, borderColor: inc.statusBorder }]}>
                {inc.statusDot && <View style={[styles.statusDotSmall, { backgroundColor: inc.statusColor }]} />}
                {inc.statusCheck && <Text style={{ fontSize: 10, color: inc.statusColor }}>✓</Text>}
                <Text style={[styles.statusLabel, { color: inc.statusColor }]}>{inc.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f4f6' },

  headerSafe: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 56 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 22, color: '#475569', fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  filterBtn: { padding: 8 },

  filtersRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 7, borderRadius: 50, gap: 8 },
  filterDot: { width: 8, height: 8, borderRadius: 4 },
  filterLabel: { fontSize: 14, fontWeight: '500' },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16,
    backgroundColor: 'rgba(239,246,255,0.5)', borderRadius: 12, paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 14, color: '#334155' },

  list: { flex: 1 },

  card: {
    backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden',
    borderWidth: 1, borderColor: '#f1f5f9',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardGlow: { borderColor: '#fecaca', shadowColor: '#d32f2f', shadowOpacity: 0.1, shadowRadius: 15 },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(254,242,242,0.3)' },
  cardBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },

  cardBody: { padding: 16, paddingBottom: 0 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTopLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  incId: { fontSize: 10, color: '#64748b', fontWeight: '500', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  sevBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, borderWidth: 1 },
  sevText: { fontSize: 10, fontWeight: '700' },
  incTime: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  incTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  targetRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  targetTag: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  targetText: { fontSize: 12, fontWeight: '500', color: '#475569', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#f8fafc', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingHorizontal: 16, paddingVertical: 10,
  },
  ipRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ipText: { fontSize: 12, color: '#475569', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 50, borderWidth: 1 },
  statusDotSmall: { width: 6, height: 6, borderRadius: 3 },
  statusLabel: { fontSize: 10, fontWeight: '700' },

  fab: {
    position: 'absolute', right: 20, bottom: 96,
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10,
  },
  fabIcon: { fontSize: 28, color: '#fff', fontWeight: '300', marginTop: -2 },
});
