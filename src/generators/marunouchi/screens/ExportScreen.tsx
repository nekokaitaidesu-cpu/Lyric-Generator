import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section, StyleOption, STYLE_PROMPTS } from '../types';
import { generateSunoPrompt } from '../utils/generator';

interface Props {
  title: string;
  sections: Section[];
  style: StyleOption;
  onBack: () => void;
  onRestart: () => void;
}

export default function ExportScreen({ title, sections, style, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'lyrics' | 'suno'>('lyrics');

  const sunoPrompt = generateSunoPrompt(title, sections, style);
  const stylePromptStr = STYLE_PROMPTS[style];
  const styleLabel = style === 'yururi' ? 'ゆるりスタイル' : 'ノリノリスタイル';
  const styleAccent = style === 'yururi' ? COLORS.neonCyan : COLORS.neonPink;

  const handleCopy = async () => {
    await ExpoClipboard.setStringAsync(sunoPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>EXPORT</Text>
          <Text style={styles.headerSub}>Suno AI プロンプトを出力</Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Title display */}
        <View style={styles.titleCard}>
          <Text style={styles.titleLabel}>// TITLE //</Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {/* Style display */}
        <View style={[styles.styleCard, { borderColor: styleAccent }]}>
          <Text style={styles.styleCardLabel}>// STYLE //</Text>
          <Text style={[styles.styleCardName, { color: styleAccent }]}>{styleLabel}</Text>
          <Text style={[styles.styleCardPrompt, { color: styleAccent }]}>
            {stylePromptStr}
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'lyrics' && styles.tabActive]}
            onPress={() => setActiveTab('lyrics')}
          >
            <Text style={[styles.tabText, activeTab === 'lyrics' && styles.tabTextActive]}>
              LYRICS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'suno' && styles.tabActive]}
            onPress={() => setActiveTab('suno')}
          >
            <Text style={[styles.tabText, activeTab === 'suno' && styles.tabTextActive]}>
              SUNO PROMPT
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'lyrics' ? (
          <View style={styles.lyricsContainer}>
            {sections.map((s, si) => {
              const sc = SECTION_COLORS[s.type] ?? COLORS.textSecondary;
              return (
                <View key={si} style={styles.sectionBlock}>
                  <View style={[styles.sectionHeader, { borderLeftColor: sc }]}>
                    <Text style={[styles.sectionName, { color: sc }]}>
                      [{s.label.toUpperCase()}]
                    </Text>
                    {s.metaTags.map((t, ti) => (
                      <Text key={ti} style={styles.metaTag}>{t}</Text>
                    ))}
                  </View>
                  {s.lines.map((line, li) => (
                    <Text key={li} style={styles.lyricLine}>{line || '（空欄）'}</Text>
                  ))}
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.sunoContainer}>
            <Text style={styles.sunoLabel}>// SUNO AI PROMPT //</Text>
            <View style={styles.sunoBox}>
              <Text style={styles.sunoText}>{sunoPrompt}</Text>
            </View>
            <View style={styles.sunoHint}>
              <Text style={styles.sunoHintText}>
                {'↑ このプロンプトを Suno の\n「Custom Mode」の\n  Style of Music / Lyrics 欄にペーストしてください'}
              </Text>
            </View>
          </View>
        )}

        {/* Copy button */}
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.8}>
          <Text style={styles.copyBtnText}>
            {copied ? '✓  COPIED TO CLIPBOARD!' : '⎘  COPY SUNO PROMPT'}
          </Text>
        </TouchableOpacity>

        {/* Restart */}
        <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
          <Text style={styles.restartBtnText}>▶  NEW MISSION</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  backBtn: { width: 48 },
  backText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.neonGreen,
    letterSpacing: 1,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonGreen,
  },
  headerSub: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 2,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  titleCard: {
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  titleLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 6,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonGreen,
    textShadowColor: COLORS.neonGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  styleCard: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    marginBottom: 16,
  },
  styleCardLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 2,
    marginBottom: 4,
  },
  styleCardName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  styleCardPrompt: {
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: -1,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neonGreen,
  },
  tabText: {
    fontFamily: 'monospace',
    fontSize: 11,
    letterSpacing: 1,
    color: COLORS.textDim,
  },
  tabTextActive: { color: COLORS.neonGreen },
  lyricsContainer: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  sectionBlock: { marginBottom: 16 },
  sectionHeader: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 6,
  },
  sectionName: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  metaTag: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    marginTop: 1,
  },
  lyricLine: {
    fontSize: 13,
    lineHeight: 24,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
    paddingLeft: 10,
  },
  sunoContainer: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  sunoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 8,
  },
  sunoBox: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 10,
  },
  sunoText: {
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 20,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  sunoHint: {
    marginTop: 10,
    padding: 8,
    backgroundColor: COLORS.cardBg2,
    borderRadius: 2,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.neonYellow,
  },
  sunoHintText: {
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  copyBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  copyBtnText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
    color: COLORS.bg,
  },
  restartBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  restartBtnText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.textSecondary,
  },
});
