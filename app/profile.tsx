import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../src/constants/colors';
import { useAuthStore } from '../src/store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clear);

  const [biometric, setBiometric] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [appearance, setAppearance] = useState<'Light' | 'Dark' | 'Auto'>('Light');
  const [reportLang, setReportLang] = useState('English');
  const [alertThreshold, setAlertThreshold] = useState('High & Above');
  const [alertChannel, setAlertChannel] = useState('Telegram');
  const [refreshRate, setRefreshRate] = useState('30 seconds');

  const handleSignOut = () => {
    clearAuth();
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <LinearGradient colors={[COLORS.navy, '#1e3a5f']} style={styles.profileHero}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>JS</Text>
          </View>
          <Text style={styles.profileName}>Joint Secretary</Text>
          <Text style={styles.profileDesig}>Ministry of Electronics & IT</Text>
          <View style={styles.superBadge}>
            <Text style={styles.superBadgeText}>SUPER ADMIN</Text>
          </View>
          <View style={styles.profileStatsRow}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatVal}>47</Text>
              <Text style={styles.profileStatLabel}>Sessions</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatVal}>89%</Text>
              <Text style={styles.profileStatLabel}>Incidents Reviewed</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatVal}>23</Text>
              <Text style={styles.profileStatLabel}>Reports Filed</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Account */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#eff6ff' }]}>
                <Text style={{ fontSize: 14 }}>👤</Text>
              </View>
              <Text style={styles.settingsLabel}>Profile Information</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={{ fontSize: 14 }}>🔒</Text>
              </View>
              <Text style={styles.settingsLabel}>Password & Security</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#f0fdf4' }]}>
                <Text style={{ fontSize: 14 }}>🔐</Text>
              </View>
              <Text style={styles.settingsLabel}>Biometric Login</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: '#e2e8f0', true: COLORS.navy }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#fef2f2' }]}>
                <Text style={{ fontSize: 14 }}>🔔</Text>
              </View>
              <Text style={styles.settingsLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: COLORS.navy }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* SOC Preferences */}
        <Text style={styles.sectionTitle}>SOC Preferences</Text>
        <View style={styles.card}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#eff6ff' }]}>
                <Text style={{ fontSize: 14 }}>🌐</Text>
              </View>
              <Text style={styles.settingsLabel}>Report Language</Text>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{reportLang}</Text>
              <Text style={styles.dropdownChevron}>▾</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={{ fontSize: 14 }}>⚡</Text>
              </View>
              <Text style={styles.settingsLabel}>Alert Threshold</Text>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{alertThreshold}</Text>
              <Text style={styles.dropdownChevron}>▾</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#f0fdf4' }]}>
                <Text style={{ fontSize: 14 }}>📱</Text>
              </View>
              <Text style={styles.settingsLabel}>Alert Channel</Text>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{alertChannel}</Text>
              <Text style={styles.dropdownChevron}>▾</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* System */}
        <Text style={styles.sectionTitle}>System</Text>
        <View style={styles.card}>
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#f5f3ff' }]}>
                <Text style={{ fontSize: 14 }}>🎨</Text>
              </View>
              <Text style={styles.settingsLabel}>Appearance</Text>
            </View>
            <View style={styles.segmentRow}>
              {(['Light', 'Dark', 'Auto'] as const).map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setAppearance(opt)}
                  style={[styles.segmentBtn, appearance === opt && styles.segmentBtnActive]}
                >
                  <Text style={[styles.segmentText, appearance === opt && styles.segmentTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <View style={styles.settingsLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: '#fef2f2' }]}>
                <Text style={{ fontSize: 14 }}>⏱️</Text>
              </View>
              <Text style={styles.settingsLabel}>Data Refresh Rate</Text>
            </View>
            <TouchableOpacity style={styles.dropdownBtn}>
              <Text style={styles.dropdownText}>{refreshRate}</Text>
              <Text style={styles.dropdownChevron}>▾</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <Text style={[styles.sectionTitle, { color: '#dc2626' }]}>Danger Zone</Text>
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={{ fontSize: 14 }}>🚪</Text>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerBadges}>
            <View style={styles.footerBadge}><Text style={styles.footerBadgeText}>NIC</Text></View>
            <View style={styles.footerBadge}><Text style={styles.footerBadgeText}>MeitY</Text></View>
            <View style={styles.footerBadge}><Text style={styles.footerBadgeText}>CERT-In</Text></View>
          </View>
          <Text style={styles.footerVersion}>KAVACH v2.0.0-beta</Text>
          <Text style={styles.footerCopy}>National Informatics Centre</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 56, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },

  scrollContent: { gap: 16, paddingBottom: 20 },

  // Profile Hero
  profileHero: { padding: 24, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)', marginBottom: 12 },
  avatarText: { fontSize: 24, fontWeight: '800', color: '#fff' },
  profileName: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 2 },
  profileDesig: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 12 },
  superBadge: { backgroundColor: '#f59e0b', paddingHorizontal: 12, paddingVertical: 3, borderRadius: 50, marginBottom: 20 },
  superBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  profileStatsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 8, width: '100%', justifyContent: 'space-around' },
  profileStat: { alignItems: 'center' },
  profileStatVal: { fontSize: 20, fontWeight: '800', color: '#fff' },
  profileStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  profileStatDivider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Section
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginTop: 8, paddingHorizontal: 16 },

  // Card
  card: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 16, borderWidth: 1, borderColor: '#f1f5f9', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  settingsLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingsIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  settingsLabel: { fontSize: 14, fontWeight: '500', color: '#1e293b' },
  chevron: { fontSize: 20, color: '#cbd5e1' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 64 },

  // Dropdown btn
  dropdownBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f8fafc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#e2e8f0' },
  dropdownText: { fontSize: 12, fontWeight: '500', color: '#475569' },
  dropdownChevron: { fontSize: 10, color: '#94a3b8' },

  // Segment
  segmentRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 8, padding: 2 },
  segmentBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  segmentBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  segmentText: { fontSize: 11, fontWeight: '600', color: '#64748b' },
  segmentTextActive: { color: COLORS.navy },

  // Sign out
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 16, borderWidth: 2, borderColor: '#fecaca', backgroundColor: '#fef2f2', borderRadius: 12, paddingVertical: 14 },
  signOutText: { fontSize: 14, fontWeight: '700', color: '#dc2626' },

  // Footer
  footer: { alignItems: 'center', paddingTop: 24 },
  footerBadges: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  footerBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, backgroundColor: '#f1f5f9' },
  footerBadgeText: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  footerVersion: { fontSize: 11, fontWeight: '600', color: '#94a3b8', marginBottom: 2 },
  footerCopy: { fontSize: 10, color: '#cbd5e1' },
});
