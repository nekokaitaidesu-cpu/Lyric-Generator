import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import * as ExpoClipboard from 'expo-clipboard';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section, StyleOption, STYLE_PROMPTS } from '../types';
import { generateLyricsText } from '../utils/generator';

interface Props {
  title: string;
  sections: Section[];
  style: StyleOption;
  onBack: () => void;
  onRestart: () => void;
}

type CopiedKey = 'lyrics' | 'style' | 'title' | null;

export default function ExportScreen({ title, sections, style, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState<CopiedKey>(null);

  const styleLabel = style === 'yururi' ? 'ゆるりスタイル' : 'ノリノリスタイル';
  const styleAccent = style === 'yururi' ? COLORS.skyBlue : COLORS.yellow;
  const stylePrompt = STYLE_PROMPTS[style];
  const lyricsText = generateLyricsText(sections);

  const handleCopy = async (key: CopiedKey, text: string) => {
    await ExpoClipboard.setStringAsync(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
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

        {/* ── STYLE BLOCK ── */}
        <View style={[styles.block, { borderColor: styleAccent }]}>
          <Text style={[styles.blockTag, { color: styleAccent }]}>// STYLE //</Text>
          <Text style={[styles.styleName, { color: styleAccent }]}>{styleLabel}</Text>
          <Text style={[styles.stylePrompt, { color: styleAccent + 'bb' }]}>{stylePrompt}</Text>
          <TouchableOpacity
            style={[styles.copyBtn, { borderColor: styleAccent }, copied === 'style' && { backgroundColor: styleAccent }]}
            onPress={() => handleCopy('style', stylePrompt)}
            activeOpacity={0.8}
          >
            <Text style={[styles.copyBtnText, { color: copied === 'style' ? COLORS.bg : styleAccent }]}>
              {copied === 'style' ? '✓  COPIED!' : '⎘  スタイルをコピー'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── TITLE BLOCK ── */}
        <View style={styles.titleBlock}>
          <Text style={styles.blockTag}>// TITLE //</Text>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity
            style={[styles.copyBtn, { borderColor: COLORS.yellow }, copied === 'title' && { backgroundColor: COLORS.yellow }]}
            onPress={() => handleCopy('title', title)}
            activeOpacity={0.8}
          >
            <Text style={[styles.copyBtnText, { color: copied === 'title' ? COLORS.bg : COLORS.yellow }]}>
              {copied === 'title' ? '✓  COPIED!' : '⎘  タイトルをコピー'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── LYRICS BLOCK ── */}
        <View style={styles.lyricsBlock}>
          <Text style={styles.blockTag}>// LYRICS //</Text>
          {sections.map((s, si) => {
            const sc = SECTION_COLORS[s.type] ?? COLORS.textSecondary;
            const hasContent = s.lines.some((l) => l && l !== '（スキップ）');
            if (!hasContent) return null;
            return (
              <View key={si} style={styles.sectionBlock}>
                <Text style={[styles.sectionLabel, { color: sc }]}>
                  [{s.label.toUpperCase()}]
                </Text>
                {s.lines.map((line, li) => {
                  if (!line || line === '（スキップ）') return null;
                  return (
                    <Text key={li} style={styles.lyricLine}>{line}</Text>
                  );
                })}
              </View>
            );
          })}
          <TouchableOpacity
            style={[styles.copyBtn, styles.copyBtnLyrics, copied === 'lyrics' && styles.copyBtnLyricsCopied]}
            onPress={() => handleCopy('lyrics', lyricsText)}
            activeOpacity={0.8}
          >
            <Text style={[styles.copyBtnText, styles.copyBtnLyricsText, copied === 'lyrics' && styles.copyBtnLyricsTextCopied]}>
              {copied === 'lyrics' ? '✓  COPIED!' : '⎘  歌詞をコピー'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── NEW MISSION ── */}
        <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
          <Text style={styles.restartBtnText}>▶  NEW MISSION</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
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

  // ── STYLE BLOCK ──
  block: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  blockTag: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 8,
  },
  styleName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  stylePrompt: {
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 17,
    letterSpacing: 0.3,
    marginBottom: 12,
  },

  // ── TITLE BLOCK ──
  titleBlock: {
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.yellow + '55',
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.yellow,
    textShadowColor: COLORS.yellow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: 12,
  },

  // ── LYRICS BLOCK ──
  lyricsBlock: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 6,
  },
  lyricLine: {
    fontSize: 14,
    lineHeight: 26,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    paddingLeft: 8,
  },

  // ── COPY BUTTONS ──
  copyBtn: {
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  copyBtnText: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  copyBtnLyrics: {
    backgroundColor: COLORS.skyBlue,
    borderColor: COLORS.skyBlue,
    marginTop: 4,
    paddingVertical: 13,
  },
  copyBtnLyricsCopied: {
    backgroundColor: COLORS.mint,
    borderColor: COLORS.mint,
  },
  copyBtnLyricsText: {
    color: COLORS.bg,
    fontSize: 13,
  },
  copyBtnLyricsTextCopied: {
    color: COLORS.bg,
  },

  // ── RESTART ──
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
