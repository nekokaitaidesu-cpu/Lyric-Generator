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
          <Text style={styles.backText}>◀ 帰還</Text>
        </TouchableOpacity>
        <Text style={styles.title}>作戦選択</Text>
        <Text style={styles.subtitle}>楽曲構成を選べ、パイロット！</Text>
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

        {/* 自由構成 */}
        <TouchableOpacity style={styles.cardZero} onPress={onSelectZero}>
          <Text style={styles.cardNameZero}>作戦X(エクストラ)</Text>
          <Text style={styles.cardDescZero}>
            自由構成 — ブロックを組み合わせて{'\n'}
            オリジナルの作戦を立案せよ！
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
          <Text style={styles.infoTitle}>/// 司令官からの指令 ///</Text>
          <Text style={styles.infoText}>
            A(アルファ) — イントロから始まる王道構成{'\n'}
            B(ブレイブ) — サビ始まりの必殺構成{'\n'}
            X(エクストラ) — 自由にブロックを組め！
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
    color: COLORS.burningOrange,
    ...FONTS.small,
    letterSpacing: 2,
  },
  title: {
    color: COLORS.blazeRed,
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
    borderColor: COLORS.blazeRedBorder,
    backgroundColor: COLORS.bgCard,
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
  },
  cardName: {
    color: COLORS.blazeRed,
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
    backgroundColor: COLORS.blazeRedDark,
    borderWidth: 1,
    borderColor: COLORS.blazeRedBorder,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  sectionText: {
    color: COLORS.burningOrange,
    ...FONTS.small,
    letterSpacing: 1,
  },
  cardDesc: {
    color: COLORS.textSecondary,
    ...FONTS.mono,
  },
  // 自由構成
  cardZero: {
    borderWidth: 1,
    borderColor: COLORS.hotGold,
    backgroundColor: COLORS.hotGoldDim,
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
  },
  cardNameZero: {
    color: COLORS.hotGold,
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
    borderColor: COLORS.hotGold,
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  zeroBadgeText: {
    color: COLORS.hotGold,
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
    color: COLORS.burningOrange,
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
