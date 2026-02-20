import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS } from '../utils/theme';

const { width } = Dimensions.get('window');

interface Props {
  onStart: () => void;
  onBackToHub: () => void;
}

export default function HomeScreen({ onStart, onBackToHub }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.scanlineOverlay} />

      <TouchableOpacity style={styles.hubBtn} onPress={onBackToHub}>
        <Text style={styles.hubBtnText}>← HUB</Text>
      </TouchableOpacity>

      <View style={styles.headerArea}>
        <Text style={styles.systemLabel}>/// 全システム起動完了 ///</Text>
        <View style={styles.divider} />
        <Text style={styles.title}>熱血ROBO</Text>
        <Text style={styles.subtitle}>LYRIC GENERATOR</Text>
        <View style={styles.divider} />
        <Text style={styles.version}>ver 1.0 — 超合金プロトコル</Text>
      </View>

      <View style={styles.descArea}>
        <Text style={styles.descText}>
          {'> 燃えろ ...'}
        </Text>
        <Text style={styles.descText}>
          {'  正義の魂 ...'}
        </Text>
        <Text style={styles.descSpacer}>{''}</Text>
        <Text style={styles.descDetail}>
          {'  80〜90年代熱血ロボットアニメ風'}
        </Text>
        <Text style={styles.descDetail}>
          {'  主題歌作詞システム。'}
        </Text>
        <Text style={styles.descDetail}>
          {'  作戦を選び、歌詞を構築し、'}
        </Text>
        <Text style={styles.descDetail}>
          {'  AI生成用プロンプトを出力せよ！'}
        </Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startButtonText}>▶ 出撃開始</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>[ パイロット、出撃準備を完了せよ ]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  scanlineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: COLORS.blazeRed,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  systemLabel: {
    color: COLORS.burningOrange,
    ...FONTS.small,
    letterSpacing: 3,
    marginBottom: 12,
  },
  divider: {
    width: width * 0.6,
    height: 1,
    backgroundColor: COLORS.blazeRedBorder,
    marginVertical: 8,
  },
  title: {
    color: COLORS.blazeRed,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 12,
    marginVertical: 4,
  },
  subtitle: {
    color: COLORS.burningOrange,
    ...FONTS.subtitle,
    letterSpacing: 6,
  },
  version: {
    color: COLORS.textDim,
    ...FONTS.small,
    letterSpacing: 2,
    marginTop: 4,
  },
  descArea: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.blazeRedBorder,
    backgroundColor: COLORS.blazeRedDark,
    borderRadius: 4,
  },
  descText: {
    color: COLORS.burningOrange,
    ...FONTS.mono,
    lineHeight: 20,
    marginBottom: 2,
  },
  descSpacer: {
    height: 6,
  },
  descDetail: {
    color: COLORS.textDim,
    ...FONTS.mono,
    lineHeight: 18,
  },
  startButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: COLORS.blazeRed,
    backgroundColor: COLORS.blazeRedDark,
    borderRadius: 2,
    marginBottom: 24,
  },
  startButtonText: {
    color: COLORS.blazeRed,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 4,
  },
  footer: {
    color: COLORS.textDim,
    ...FONTS.small,
    letterSpacing: 2,
  },
  hubBtn: {
    position: 'absolute',
    top: 12,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.blazeRedBorder,
    borderRadius: 2,
  },
  hubBtnText: {
    color: COLORS.burningOrange,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
