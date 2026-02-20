import { StyleSheet } from 'react-native';

export const COLORS = {
  // Backgrounds
  bg: '#0a0f1a',
  cardBg: '#0f1825',
  cardBg2: '#131f2e',
  // Accent colors (school theme)
  skyBlue: '#5bc8f5',      // 教室の窓の空
  skyBlueDim: '#3a9fc8',
  yellow: '#f9e04b',       // 蛍光ペン
  coral: '#ff7b7b',        // 赤ペン
  mint: '#4ecdc4',         // 黒板
  lavender: '#b8a9e8',     // ノートの罫線
  // Text
  textPrimary: '#d8eaf8',
  textSecondary: '#7a9ab5',
  textDim: '#3a5a7a',
  // Style accent colors
  yururiAccent: '#5bc8f5',   // sky blue = chill/lo-fi
  norinoriAccent: '#f9e04b', // yellow = energetic/pop
  // Borders
  border: '#1a2a3a',
  borderBright: '#2a3a5a',
};

export const TYPOGRAPHY = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.skyBlue,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.skyBlue,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2,
    color: COLORS.textSecondary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.5,
    color: COLORS.textPrimary,
  },
  mono: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: COLORS.textPrimary,
  },
  monoSmall: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: COLORS.textSecondary,
  },
  small: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.skyBlue,
  },
});

export const SECTION_COLORS: Record<string, string> = {
  intro: COLORS.yellow,
  verse: COLORS.skyBlue,
  verse2: COLORS.mint,
  'pre-chorus': COLORS.lavender,
  chorus: COLORS.coral,
  bridge: COLORS.mint,
  outro: COLORS.textSecondary,
};
