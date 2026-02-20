import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';
import { StyleOption, STYLE_PROMPTS } from '../types';

interface Props {
  onSelect: (style: StyleOption) => void;
  onBack: () => void;
}

const STYLE_CONFIGS: {
  id: StyleOption;
  label: string;
  subLabel: string;
  desc: string;
  accent: string;
}[] = [
  {
    id: 'yururi',
    label: 'ゆるりスタイル',
    subLabel: 'OPTION A  //  ACID JAZZ / NEO SOUL',
    desc: 'まったりとした夜の空気感。ジャジーなピアノと\nグルーヴィなベースが支える、ちょっと皮肉な夜。',
    accent: COLORS.neonCyan,
  },
  {
    id: 'norinori',
    label: 'ノリノリスタイル',
    subLabel: 'OPTION B  //  J-POP / JAZZ ROCK',
    desc: '疾走感あふれる90s歌謡ロック。スウィングする\nリズムとエクスプレッシブなアドリブが炸裂する。',
    accent: COLORS.neonPink,
  },
];

export default function StyleSelectionScreen({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<StyleOption | null>(null);

  const handleRandom = () => {
    const opts: StyleOption[] = ['yururi', 'norinori'];
    const r = opts[Math.floor(Math.random() * opts.length)];
    setSelected(r);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>STYLE SELECT</Text>
        <Text style={styles.subtitle}>音楽スタイルを選択してください</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>// STYLE OPTIONS //</Text>

        {STYLE_CONFIGS.map((cfg) => {
          const isSelected = selected === cfg.id;
          return (
            <TouchableOpacity
              key={cfg.id}
              style={[
                styles.card,
                { borderColor: isSelected ? cfg.accent : COLORS.border },
                isSelected && { backgroundColor: COLORS.cardBg2 },
              ]}
              onPress={() => setSelected(cfg.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardTop}>
                <View style={[styles.radioOuter, { borderColor: cfg.accent }]}>
                  {isSelected && (
                    <View style={[styles.radioInner, { backgroundColor: cfg.accent }]} />
                  )}
                </View>
                <View style={styles.cardTitles}>
                  <Text style={[styles.cardName, { color: isSelected ? cfg.accent : COLORS.textSecondary }]}>
                    {cfg.label}
                  </Text>
                  <Text style={styles.cardSub}>{cfg.subLabel}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{cfg.desc}</Text>
              {isSelected && (
                <View style={[styles.promptBox, { borderColor: cfg.accent + '55' }]}>
                  <Text style={styles.promptLabel}>SUNO STYLE TAG:</Text>
                  <Text style={[styles.promptText, { color: cfg.accent }]}>
                    {STYLE_PROMPTS[cfg.id]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Random assign */}
        <TouchableOpacity style={styles.randomBtn} onPress={handleRandom} activeOpacity={0.8}>
          <Text style={styles.randomBtnText}>⚄  RANDOM ASSIGN</Text>
        </TouchableOpacity>

        {selected && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedInfoLabel}>// SELECTED //</Text>
            <Text style={[
              styles.selectedInfoValue,
              { color: selected === 'yururi' ? COLORS.neonCyan : COLORS.neonPink },
            ]}>
              {selected === 'yururi' ? 'ゆるりスタイル' : 'ノリノリスタイル'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.proceedBtn, !selected && styles.proceedBtnDisabled]}
          onPress={() => selected && onSelect(selected)}
          disabled={!selected}
          activeOpacity={0.8}
        >
          <Text style={[styles.proceedBtnText, !selected && styles.proceedBtnTextDisabled]}>
            NEXT: LYRIC WIZARD ▶
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  backBtn: { marginBottom: 10 },
  backText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.neonGreen,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    color: COLORS.neonYellow,
  },
  subtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: { width: 8, height: 8, borderRadius: 4 },
  cardTitles: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  cardSub: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  promptBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 8,
    marginTop: 4,
    backgroundColor: COLORS.bg,
  },
  promptLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginBottom: 4,
  },
  promptText: {
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  randomBtn: {
    borderWidth: 1,
    borderColor: COLORS.neonYellow,
    borderRadius: 2,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  randomBtnText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonYellow,
  },
  selectedInfo: {
    backgroundColor: COLORS.cardBg2,
    borderRadius: 2,
    padding: 12,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.neonGreen,
    marginBottom: 8,
  },
  selectedInfoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 2,
    marginBottom: 4,
  },
  selectedInfoValue: { fontSize: 16, fontWeight: '700', letterSpacing: 2 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  proceedBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  proceedBtnDisabled: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  proceedBtnText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3,
    color: COLORS.bg,
  },
  proceedBtnTextDisabled: { color: COLORS.textDim },
});
