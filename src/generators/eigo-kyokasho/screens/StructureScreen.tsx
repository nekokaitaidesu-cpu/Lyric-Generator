import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';
import { STRUCTURE_PATTERNS } from '../data/structures';
import { StructurePattern } from '../types';

interface Props {
  onSelect: (pattern: StructurePattern) => void;
  onSelectZero: () => void;
  onBack: () => void;
}

export default function StructureScreen({ onSelect, onSelectZero, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>STRUCTURE SELECT</Text>
        <Text style={styles.subtitle}>楽曲構成を選択してください</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {STRUCTURE_PATTERNS.map((pattern) => (
          <TouchableOpacity
            key={pattern.id}
            style={styles.card}
            onPress={() => onSelect(pattern)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardName}>{pattern.name}</Text>
            <View style={styles.flowRow}>
              {pattern.sections.map((s, i) => (
                <View key={i} style={styles.flowItem}>
                  {i > 0 && <Text style={styles.arrow}>→</Text>}
                  <View style={styles.sectionBadge}>
                    <Text style={styles.sectionBadgeText}>{s.toUpperCase()}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.cardDesc}>{pattern.description}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.cardZero} onPress={onSelectZero} activeOpacity={0.8}>
          <Text style={styles.cardNameZero}>PATTERN C</Text>
          <Text style={styles.cardDescZero}>
            自由構成 — ブロックを自由に組み合わせて{'\n'}
            オリジナルの楽曲構成を作れ！
          </Text>
          <View style={styles.zeroBadges}>
            {['INTRO', 'VERSE', 'PRE-CH', 'CHORUS', 'BRIDGE', 'OUTRO'].map((b) => (
              <View key={b} style={styles.zeroBadge}>
                <Text style={styles.zeroBadgeText}>{b}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>/// STRUCTURE GUIDE ///</Text>
          <Text style={styles.infoText}>
            {'A — Verse始まりのスタンダード構成\n'}
            {'B — Chorus中心の盛り上がり重視構成\n'}
            {'C — 自由にブロックを並べる'}
          </Text>
        </View>
      </ScrollView>
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
    color: COLORS.skyBlue,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    color: COLORS.skyBlue,
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
  card: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 16,
    marginBottom: 12,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
    color: COLORS.skyBlue,
    marginBottom: 12,
  },
  flowRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 8,
  },
  flowItem: { flexDirection: 'row', alignItems: 'center' },
  arrow: { color: COLORS.textDim, marginHorizontal: 4, fontSize: 12 },
  sectionBadge: {
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.borderBright,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sectionBadgeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 1,
  },
  cardDesc: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  cardZero: {
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.coral,
    borderRadius: 2,
    padding: 16,
    marginBottom: 12,
  },
  cardNameZero: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
    color: COLORS.coral,
    marginBottom: 8,
  },
  cardDescZero: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  zeroBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  zeroBadge: {
    borderWidth: 1,
    borderColor: COLORS.coral,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  zeroBadgeText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.coral,
    letterSpacing: 1,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    backgroundColor: COLORS.cardBg,
    marginTop: 4,
  },
  infoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
