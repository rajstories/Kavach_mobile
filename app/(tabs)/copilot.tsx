import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/constants/colors';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  card?: BriefingCard;
}

interface BriefingCard {
  title: string;
  items: { color: string; label: string; detail: string }[];
  action: string;
}

const SUGGESTED_CHIPS = ['कल रात क्या हुआ?', 'Show critical incidents', 'Generate sitrep'];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1', role: 'user',
    content: 'Can I get a briefing on the current active threats?',
  },
  {
    id: '2', role: 'assistant',
    content: 'Certainly, sir. Here is your daily security briefing based on the latest SOC telemetry.',
    card: {
      title: 'Daily Security Briefing',
      items: [
        { color: '#d32f2f', label: 'Critical:', detail: '2 active incidents (Brute Force on Voter API, DDoS on Gateway)' },
        { color: '#ed6c02', label: 'High:', detail: '1 contained SQL Injection attempt on MeitY CMS' },
        { color: '#f57c00', label: 'Medium:', detail: '4 alerts under investigation' },
      ],
      action: 'Download Full PDF',
    },
  },
];

export default function CopilotScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    // Simulate assistant reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I am processing your request. Please wait while I analyze the latest SOC data...',
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.menuBtn}>
              <Text style={{ fontSize: 18 }}>☰</Text>
            </TouchableOpacity>
            <View style={styles.headerAvatar}>
              <Text style={{ fontSize: 14 }}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>KAVACH Co-Pilot</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>
          </View>
          <View style={styles.langSwitch}>
            <TouchableOpacity
              onPress={() => setLang('HI')}
              style={[styles.langBtn, lang === 'HI' && styles.langBtnActive]}
            >
              <Text style={[styles.langText, lang === 'HI' && styles.langTextActive]}>HI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLang('EN')}
              style={[styles.langBtn, lang === 'EN' && styles.langBtnActive]}
            >
              <Text style={[styles.langText, lang === 'EN' && styles.langTextActive]}>EN</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.alertBanner}>
          <Text style={{ fontSize: 12 }}>ℹ️</Text>
          <Text style={styles.alertText}>
            Current: <Text style={{ fontWeight: '700', color: '#d32f2f' }}>2 Critical</Text> Active Incidents
          </Text>
        </View>
      </SafeAreaView>

      {/* Chat Body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.chatBody}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeIcon}>
              <Text style={{ fontSize: 32 }}>⭐</Text>
            </View>
            <Text style={styles.welcomeTitle}>नमस्ते, Joint Secretary जी</Text>
            <Text style={styles.welcomeDesc}>
              I am your KAVACH Co-Pilot. How can I assist you with cybersecurity operations today?
            </Text>
            <View style={styles.chipsRow}>
              {SUGGESTED_CHIPS.map((chip, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.chip}
                  onPress={() => sendMessage(chip)}
                >
                  <Text style={styles.chipText}>{chip}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Messages */}
          {messages.map((msg) => (
            <View key={msg.id} style={msg.role === 'user' ? styles.userMsgRow : styles.assistantMsgRow}>
              {msg.role === 'assistant' && (
                <View style={styles.assistantAvatar}>
                  <Text style={{ fontSize: 12 }}>🛡️</Text>
                </View>
              )}
              <View style={msg.role === 'user' ? styles.userBubble : styles.assistantBubble}>
                <Text style={msg.role === 'user' ? styles.userText : styles.assistantText}>{msg.content}</Text>
                {msg.card && (
                  <View style={styles.briefCard}>
                    <View style={styles.briefHeader}>
                      <Text style={{ fontSize: 14 }}>⚠️</Text>
                      <Text style={styles.briefTitle}>{msg.card.title}</Text>
                    </View>
                    {msg.card.items.map((item, i) => (
                      <View key={i} style={styles.briefItem}>
                        <View style={[styles.briefDot, { backgroundColor: item.color }]} />
                        <Text style={styles.briefItemText}>
                          <Text style={{ fontWeight: '700', color: '#1e293b' }}>{item.label}</Text> {item.detail}
                        </Text>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.briefAction}>
                      <Text style={{ fontSize: 12 }}>📄</Text>
                      <Text style={styles.briefActionText}>{msg.card.action}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input Bar */}
        <SafeAreaView edges={['bottom']} style={styles.inputBar}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.inputIconBtn}>
              <Text style={{ fontSize: 18 }}>📋</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Ask KAVACH Co-Pilot..."
              placeholderTextColor="#94a3b8"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => sendMessage(inputText)}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => sendMessage(inputText)}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },

  headerSafe: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, height: 56 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuBtn: { padding: 4 },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' },
  onlineText: { fontSize: 10, color: '#16a34a', fontWeight: '500' },
  langSwitch: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 8, padding: 2 },
  langBtn: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  langBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  langText: { fontSize: 10, fontWeight: '700', color: '#64748b' },
  langTextActive: { color: COLORS.navy },

  alertBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#eff6ff', borderBottomWidth: 1, borderBottomColor: '#dbeafe', paddingVertical: 8 },
  alertText: { fontSize: 12, color: '#1e40af', fontWeight: '500' },

  chatBody: { flex: 1 },
  chatContent: { paddingHorizontal: 16, paddingTop: 24 },

  // Welcome
  welcomeSection: { alignItems: 'center', paddingTop: 32, paddingBottom: 16 },
  welcomeIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  welcomeTitle: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginBottom: 8, textAlign: 'center' },
  welcomeDesc: { fontSize: 14, color: '#64748b', textAlign: 'center', marginBottom: 24 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: COLORS.navy },
  chipText: { fontSize: 14, fontWeight: '500', color: COLORS.navy },

  // User Message
  userMsgRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  userBubble: { backgroundColor: COLORS.navy, borderRadius: 16, borderTopRightRadius: 4, paddingHorizontal: 16, paddingVertical: 12, maxWidth: '85%' },
  userText: { fontSize: 14, color: '#fff' },

  // Assistant Message
  assistantMsgRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
  assistantAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  assistantBubble: { backgroundColor: '#fff', borderRadius: 16, borderTopLeftRadius: 4, paddingHorizontal: 16, paddingVertical: 12, maxWidth: '85%', borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  assistantText: { fontSize: 14, color: '#334155', marginBottom: 12 },

  // Briefing Card
  briefCard: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 12 },
  briefHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 8, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  briefTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  briefItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  briefDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  briefItemText: { fontSize: 12, color: '#475569', flex: 1 },
  briefAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, paddingVertical: 8, marginTop: 4 },
  briefActionText: { fontSize: 12, fontWeight: '700', color: COLORS.navy },

  // Input
  inputBar: { backgroundColor: '#f8f9fa', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50, borderWidth: 1, borderColor: '#cbd5e1', padding: 4, paddingRight: 8 },
  inputIconBtn: { padding: 8 },
  textInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 14, color: '#334155' },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center' },
  sendIcon: { fontSize: 16, color: '#fff' },
});
