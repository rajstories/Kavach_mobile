import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../src/store/authStore';
import { COLORS } from '../../src/constants/colors';

export default function LoginScreen() {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    setAuthenticated(true);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      {/* Top White Section */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top']} style={styles.topNav}>
          <TouchableOpacity style={styles.navBtn}>
            <Text style={[styles.navIcon, { color: COLORS.navy }]}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn}>
            <Text style={[styles.navIcon, { color: COLORS.navy }]}>?</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.logoContainer}>
          <View style={styles.logoOuter}>
            <LinearGradient
              colors={['#1a237e', '#e65100']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoInner}
            >
              <Text style={{ fontSize: 24, color: '#fff' }}>🔒</Text>
            </LinearGradient>
          </View>

          <Text style={styles.appName}>KAVACH</Text>
          <Text style={styles.hindiName}>कवच</Text>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>System Active — 5 Portals Monitored</Text>
          </View>
        </View>
      </View>

      {/* Bottom Dark Panel */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottomPanel}
      >
        <View style={styles.handleBar}>
          <View style={styles.handle} />
        </View>

        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.signInTitle}>Sign In</Text>
          <Text style={styles.signInSubtitle}>Authorized Government Officials Only</Text>

          {/* Warning */}
          <View style={styles.warningBox}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.warningBold}>Restricted Access</Text>
              <Text style={styles.warningBody}>
                This system is monitored. Unauthorized access is a punishable offense under the IT Act, 2000.
              </Text>
            </View>
          </View>

          {/* Email */}
          <Text style={styles.fieldLabel}>OFFICIAL EMAIL</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>✉️</Text>
            <TextInput
              style={styles.input}
              placeholder="official@gov.in"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Employee ID */}
          <Text style={styles.fieldLabel}>EMPLOYEE ID</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🪪</Text>
            <TextInput
              style={styles.input}
              placeholder="GOV-XXXX-XXXX"
              placeholderTextColor="#64748b"
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="characters"
            />
          </View>

          {/* Password */}
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="••••••••••••"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Text style={{ fontSize: 16 }}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.85}>
            <LinearGradient
              colors={[COLORS.navy, '#283593']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInBtn}
            >
              <Text style={styles.signInBtnText}>Access KAVACH Dashboard</Text>
              <Text style={styles.signInArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Biometric */}
          <TouchableOpacity style={styles.biometricBtn}>
            <Text style={{ fontSize: 18 }}>🔐</Text>
            <Text style={styles.biometricText}>Use Biometric Authentication</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Footer */}
          <Text style={styles.footerSecured}>SECURED BY NIC MEGHRAJ | CERT-IN COMPLIANT</Text>
          <View style={styles.footerLogos}>
            <View style={styles.footerBadge}>
              <Text style={{ fontSize: 14 }}>🏛️</Text>
            </View>
            <View style={styles.footerDigital}>
              <Text style={styles.footerDigitalText}>DIGITAL INDIA</Text>
            </View>
          </View>
          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },
  topSection: { backgroundColor: '#ffffff', paddingBottom: 20 },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  navBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  navIcon: { fontSize: 22, fontWeight: '600' },
  logoContainer: { alignItems: 'center', paddingTop: 8 },
  logoOuter: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12,
    elevation: 8, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16,
  },
  logoInner: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  appName: { fontSize: 32, fontWeight: '800', color: '#1a237e', letterSpacing: -0.5 },
  hindiName: { fontSize: 24, fontWeight: '700', color: '#424242', marginTop: 2, marginBottom: 16 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9',
    borderWidth: 1, borderColor: 'rgba(46,125,50,0.3)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6, gap: 8,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2e7d32' },
  statusText: { fontSize: 12, fontWeight: '500', color: '#2e7d32' },

  bottomPanel: {
    flex: 1, backgroundColor: '#1e1e2f', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    marginTop: -6, shadowColor: '#000', shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15, shadowRadius: 20, elevation: 20,
  },
  handleBar: { alignItems: 'center', paddingTop: 12, paddingBottom: 8 },
  handle: { width: 48, height: 5, borderRadius: 3, backgroundColor: '#475569' },
  formScroll: { flex: 1 },
  formContent: { paddingHorizontal: 24, paddingTop: 8 },
  signInTitle: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  signInSubtitle: { fontSize: 14, fontWeight: '500', color: '#94a3b8', marginBottom: 20 },

  warningBox: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'rgba(234,88,12,0.12)',
    borderWidth: 1, borderColor: 'rgba(234,88,12,0.25)', borderRadius: 12,
    padding: 12, marginBottom: 20, gap: 10,
  },
  warningIcon: { fontSize: 18, marginTop: 2 },
  warningBold: { fontSize: 13, fontWeight: '700', color: '#fb923c', marginBottom: 4 },
  warningBody: { fontSize: 12, color: '#fdba74', lineHeight: 18 },

  fieldLabel: { fontSize: 10, fontWeight: '600', color: '#94a3b8', letterSpacing: 1, marginBottom: 6, marginLeft: 4, marginTop: 8 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#121220',
    borderWidth: 1, borderColor: '#334155', borderRadius: 14, paddingHorizontal: 14, marginBottom: 4,
  },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, paddingVertical: 14, fontSize: 14, color: '#ffffff' },
  eyeBtn: { padding: 8, marginLeft: 4 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 16, marginTop: 4 },
  forgotText: { fontSize: 12, fontWeight: '500', color: '#818cf8' },

  signInBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderRadius: 14, paddingVertical: 16, gap: 8,
    shadowColor: '#1a237e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 12, elevation: 8,
  },
  signInBtnText: { fontSize: 14, fontWeight: '700', color: '#ffffff' },
  signInArrow: { fontSize: 16, fontWeight: '700', color: '#ffffff' },

  biometricBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8, marginTop: 16 },
  biometricText: { fontSize: 14, fontWeight: '500', color: '#cbd5e1' },

  divider: { height: 1, backgroundColor: '#334155', marginVertical: 20 },

  footerSecured: { fontSize: 9, fontWeight: '600', color: '#64748b', letterSpacing: 1, textAlign: 'center', marginBottom: 12 },
  footerLogos: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  footerBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  footerDigital: { height: 24, paddingHorizontal: 8, borderRadius: 4, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  footerDigitalText: { fontSize: 7, fontWeight: '700', color: '#64748b' },
});
