import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
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
        <Text style={styles.subtitle}>楽曲構成を選択せよ</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {STRUCTURE_PATTERNS.map((pattern) => (
          <TouchableOpacity
            key={pattern.id}
            style={styles.card}
            onPress={() => onSelect(pattern)}
          >
            <Text style={styles.cardName}>{pattern.name}</Text>
            <View style={styles.flowContainer}>
              {pattern.sections.map((s, i) => (
                <View key={i} style={styles.flowItem}>
                  {i > 0 && <Text style={styles.arrow}>→</Text>}
                  <View style={styles.sectionBadge}>
                    <Text style={styles.sectionText}>{s.toUpperCase()}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.cardDesc}>{pattern.description}</Text>
          </TouchableOpacity>
        ))}

        {/* PATTERN ZERO */}
        <TouchableOpacity style={styles.cardZero} onPress={onSelectZero}>
          <Text style={styles.cardNameZero}>PATTERN ZERO</Text>
          <Text style={styles.cardDescZero}>
            自由構成 — ブロックを組み合わせて{'\n'}
            オリジナルの楽曲構成を構築する
          </Text>
          <View style={styles.zeroBlocks}>
            {['INTRO', 'VERSE', 'CHORUS', 'BRIDGE', '...'].map((b, i) => (
              <View key={i} style={styles.zeroBadge}>
                <Text style={styles.zeroBadgeText}>{b}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>/// INFO ///</Text>
          <Text style={styles.infoText}>
            α — イントロから始まるスタンダード構成{'\n'}
            β — サビ始まりのインパクト重視構成{'\n'}
            ZERO — 自由にブロックを組み合わせる
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    padding: 20,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    marginBottom: 12,
  },
  backText: {
    color: COLORS.neonGreen,
    ...FONTS.small,
    letterSpacing: 2,
  },
  title: {
    color: COLORS.neonGreen,
    ...FONTS.title,
  },
  subtitle: {
    color: COLORS.textSecondary,
    ...FONTS.small,
    letterSpacing: 2,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.bgCard,
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
  },
  cardName: {
    color: COLORS.neonGreen,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 12,
  },
  flowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 12,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  arrow: {
    color: COLORS.textDim,
    marginHorizontal: 6,
    fontSize: 14,
  },
  sectionBadge: {
    backgroundColor: COLORS.neonGreenDark,
    borderWidth: 1,
    borderColor: COLORS.neonGreenBorder,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  sectionText: {
    color: COLORS.neonCyan,
    ...FONTS.small,
    letterSpacing: 1,
  },
  cardDesc: {
    color: COLORS.textSecondary,
    ...FONTS.mono,
  },
  // PATTERN ZERO
  cardZero: {
    borderWidth: 1,
    borderColor: COLORS.neonPink,
    backgroundColor: COLORS.neonPinkDim,
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
  },
  cardNameZero: {
    color: COLORS.neonPink,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 8,
  },
  cardDescZero: {
    color: COLORS.textSecondary,
    ...FONTS.mono,
    lineHeight: 20,
    marginBottom: 12,
  },
  zeroBlocks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  zeroBadge: {
    borderWidth: 1,
    borderColor: COLORS.neonPink,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  zeroBadgeText: {
    color: COLORS.neonPink,
    ...FONTS.small,
    letterSpacing: 1,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgCardAlt,
    borderRadius: 4,
    padding: 16,
    marginTop: 8,
  },
  infoTitle: {
    color: COLORS.neonYellow,
    ...FONTS.small,
    letterSpacing: 2,
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.textSecondary,
    ...FONTS.mono,
    lineHeight: 20,
  },
});
