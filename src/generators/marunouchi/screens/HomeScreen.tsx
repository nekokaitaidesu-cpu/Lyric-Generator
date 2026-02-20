import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';

interface Props {
  onStart: () => void;
  onBackToHub: () => void;
}

export default function HomeScreen({ onStart, onBackToHub }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.hubBtn} onPress={onBackToHub}>
        <Text style={styles.hubBtnText}>← HUB</Text>
      </TouchableOpacity>
      <Text style={styles.systemLine}>/// SYSTEM ONLINE ///</Text>

      <View style={styles.titleBlock}>
        <Text style={styles.mainTitle}>◯の内っぽ</Text>
        <Text style={styles.mainTitleSub}>ティック</Text>
        <Text style={styles.mainTitleAccent}>ジェネレーター</Text>
      </View>

      <Text style={styles.version}>VER. 2.0  //  TOKYO CITY POP SYS</Text>

      <View style={styles.descCard}>
        <Text style={styles.descCardLabel}>// SYSTEM INFO //</Text>
        <Text style={styles.descText}>
          {'> なんかどっかで聞いたことある進行の\n'}
          {'  世界観を無限生成するシステムです。\n'}
          {'  日常の断片、皮肉な口語、スーツと楽器と\n'}
          {'  官公庁が溶け合うあの空気感を——\n'}
          {'  ウィザードで一行ずつ召喚せよ。'}
        </Text>
      </View>

      <View style={styles.guideCard}>
        <Text style={styles.guideTitle}>// HOW TO USE //</Text>
        {[
          ['①', '楽曲構成（ストラクチャー）を選択'],
          ['②', 'スタイルを選択（ゆるり or ノリノリ）'],
          ['③', 'ウィザードで歌詞を一行ずつ構築'],
          ['④', 'レビューでブラッシュアップ'],
          ['⑤', 'タイトルを生成して完成！'],
          ['⑥', 'AI用プロンプトをコピーして使用'],
        ].map(([num, desc]) => (
          <View key={num} style={styles.guideStep}>
            <Text style={styles.guideNum}>{num}</Text>
            <Text style={styles.guideDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={onStart} activeOpacity={0.8}>
        <Text style={styles.startBtnText}>▶  MISSION START</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>POWERED BY TOKYO CITY POP ALGORITHM</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  systemLine: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 3,
    marginBottom: 32,
  },
  titleBlock: { alignItems: 'center', marginBottom: 8 },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 4,
    color: COLORS.neonGreen,
    textShadowColor: COLORS.neonGreen,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  mainTitleSub: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 6,
    color: COLORS.neonYellow,
    textShadowColor: COLORS.neonYellow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  mainTitleAccent: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonCyan,
    textShadowColor: COLORS.neonCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  version: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 2,
    marginBottom: 32,
  },
  descCard: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 16,
    marginBottom: 20,
  },
  descCardLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 10,
  },
  descText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  guideCard: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 16,
    marginBottom: 32,
  },
  guideTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 12,
  },
  guideStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  guideNum: {
    fontSize: 16,
    color: COLORS.neonGreen,
    fontWeight: '700',
    width: 24,
  },
  guideDesc: {
    fontSize: 13,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.neonGreen,
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: 20,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 4,
    color: COLORS.bg,
  },
  footer: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: COLORS.textDim,
    letterSpacing: 2,
  },
  hubBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,255,65,0.3)',
    borderRadius: 2,
    marginBottom: 16,
  },
  hubBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.neonGreen,
    letterSpacing: 2,
    fontWeight: '700',
  },
});
