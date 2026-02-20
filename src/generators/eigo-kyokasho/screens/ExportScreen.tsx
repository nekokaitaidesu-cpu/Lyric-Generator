import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section, StyleOption, STYLE_PROMPTS } from '../types';
import { generateLyricsOnlyText } from '../utils/generator';

interface Props {
  title: string;
  sections: Section[];
  style: StyleOption;
  onBack: () => void;
  onRestart: () => void;
}

export default function ExportScreen({ title, sections, style, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState(false);

  const styleLabel = style === 'yururi' ? 'ゆるりスタイル' : 'ノリノリスタイル';
  const styleAccent = style === 'yururi' ? COLORS.skyBlue : COLORS.yellow;
  const lyricsText = generateLyricsOnlyText(sections);

  const handleCopy = async () => {
    await ExpoClipboard.setStringAsync(lyricsText);
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
          <Text style={styles.headerSub}>歌詞を出力</Text>
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
          <Text style={[styles.styleCardPrompt, { color: styleAccent + 'aa' }]}>
            {STYLE_PROMPTS[style]}
          </Text>
        </View>

        {/* Lyrics */}
        <View style={styles.lyricsContainer}>
          <Text style={styles.lyricsHeader}>// LYRICS //</Text>
          {sections.map((s, si) => {
            const sc = SECTION_COLORS[s.type] ?? COLORS.textSecondary;
            const hasContent = s.lines.some((l) => l && l !== '（スキップ）');
            if (!hasContent) return null;
            return (
              <View key={si} style={styles.sectionBlock}>
                <View style={[styles.sectionDivider, { backgroundColor: sc }]} />
                {s.lines.map((line, li) => {
                  if (!line || line === '（スキップ）') return null;
                  return (
                    <Text key={li} style={styles.lyricLine}>{line}</Text>
                  );
                })}
              </View>
            );
          })}
        </View>

        {/* Copy hint */}
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>
            {'↓ 歌詞テキストのみコピーされます\n  [Section]ラベル・スタイルタグは含まれません'}
          </Text>
        </View>

        {/* Copy button */}
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.8}>
          <Text style={styles.copyBtnText}>
            {copied ? '✓  COPIED!' : '⎘  COPY LYRICS'}
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
    color: COLORS.skyBlue,
    letterSpacing: 1,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.skyBlue,
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
    borderColor: COLORS.skyBlue,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  titleLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 6,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.skyBlue,
    textShadowColor: COLORS.skyBlue,
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
    marginBottom: 4,
  },
  styleCardPrompt: {
    fontFamily: 'monospace',
    fontSize: 9,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  lyricsContainer: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 16,
    marginBottom: 12,
  },
  lyricsHeader: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 16,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionDivider: {
    height: 1,
    opacity: 0.3,
    marginBottom: 10,
  },
  lyricLine: {
    fontSize: 14,
    lineHeight: 28,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  hintBox: {
    backgroundColor: COLORS.cardBg2,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.yellow,
  },
  hintText: {
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  copyBtn: {
    backgroundColor: COLORS.skyBlue,
    borderRadius: 2,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  copyBtnText: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 3,
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
