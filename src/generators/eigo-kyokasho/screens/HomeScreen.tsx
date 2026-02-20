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
      <Text style={styles.systemLine}>/// CLASSROOM SYSTEM ONLINE ///</Text>

      <View style={styles.titleBlock}>
        <Text style={styles.mainTitle}>英語教科書</Text>
        <Text style={styles.mainTitleSub}>LYRIC</Text>
        <Text style={styles.mainTitleAccent}>ジェネレーター</Text>
      </View>

      <Text style={styles.version}>VER. 1.0  //  SCHOOL ENGLISH PROTOCOL</Text>

      <View style={styles.descCard}>
        <Text style={styles.descCardLabel}>// SYSTEM INFO //</Text>
        <Text style={styles.descText}>
          {'> 日本人が学習にしか使わんやろ！\n'}
          {'  っていう英文を歌詞に変換するシステム。\n\n'}
          {'  I have a pen. This is a book.\n'}
          {'  My father is a doctor.\n\n'}
          {'  意味は最初から求めていない。\n'}
          {'  ただ英文を歌え。'}
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
          ['⑥', '歌詞テキストをコピーして使用'],
        ].map(([num, desc]) => (
          <View key={num} style={styles.guideStep}>
            <Text style={styles.guideNum}>{num}</Text>
            <Text style={styles.guideDesc}>{desc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sampleCard}>
        <Text style={styles.sampleLabel}>// SAMPLE LYRICS //</Text>
        <Text style={styles.sampleText}>
          {"I have a pen. I have an apple.\n"}
          {"There is a dog under the table.\n"}
          {"My father is a doctor.\n"}
          {"三単現のSが　喉に引っかかってる"}
        </Text>
      </View>

      <TouchableOpacity style={styles.startBtn} onPress={onStart} activeOpacity={0.8}>
        <Text style={styles.startBtnText}>▶  OPEN YOUR TEXTBOOK</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>POWERED BY SCHOOL ENGLISH ALGORITHM</Text>
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
    color: COLORS.skyBlueDim,
    letterSpacing: 3,
    marginBottom: 32,
  },
  titleBlock: { alignItems: 'center', marginBottom: 8 },
  mainTitle: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 4,
    color: COLORS.skyBlue,
    textShadowColor: COLORS.skyBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  mainTitleSub: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 6,
    color: COLORS.yellow,
    textShadowColor: COLORS.yellow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  mainTitleAccent: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.coral,
    textShadowColor: COLORS.coral,
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
    color: COLORS.skyBlueDim,
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
    marginBottom: 20,
  },
  guideTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
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
    color: COLORS.skyBlue,
    fontWeight: '700',
    width: 24,
  },
  guideDesc: {
    fontSize: 13,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  sampleCard: {
    width: '100%',
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.yellow + '55',
    borderRadius: 2,
    padding: 14,
    marginBottom: 28,
  },
  sampleLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.yellow,
    letterSpacing: 2,
    marginBottom: 10,
    opacity: 0.8,
  },
  sampleText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  startBtn: {
    width: '100%',
    backgroundColor: COLORS.skyBlue,
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: 20,
  },
  startBtnText: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 3,
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
    borderColor: 'rgba(91,200,245,0.3)',
    borderRadius: 2,
    marginBottom: 16,
  },
  hubBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.skyBlue,
    letterSpacing: 2,
    fontWeight: '700',
  },
});
