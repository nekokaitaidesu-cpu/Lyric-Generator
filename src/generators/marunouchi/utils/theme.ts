import { StyleSheet } from 'react-native';

export const COLORS = {
  // Backgrounds
  bg: '#0a0a0f',
  cardBg: '#12121a',
  cardBg2: '#1a1a2e',
  // Neon accents
  neonGreen: '#00ff41',
  neonGreenDim: '#00cc33',
  neonCyan: '#00e5ff',
  neonPink: '#ff2d78',
  neonYellow: '#ffd700',
  neonPurple: '#b388ff',
  // Text
  textPrimary: '#e0e0e0',
  textSecondary: '#888888',
  textDim: '#555555',
  // Style accent colors
  yururiAccent: '#00e5ff',   // cyan = chill/jazz
  norinoriAccent: '#ff2d78', // pink = energetic/pop
  // Borders
  border: '#2a2a3e',
  borderBright: '#3a3a5e',
};

export const TYPOGRAPHY = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonGreen,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.neonGreen,
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
    color: COLORS.neonGreen,
  },
});

export const SECTION_COLORS: Record<string, string> = {
  verse: COLORS.neonGreen,
  verse2: COLORS.neonCyan,
  'pre-chorus': COLORS.neonCyan,
  chorus: COLORS.neonPink,
  outro: COLORS.textSecondary,
};
