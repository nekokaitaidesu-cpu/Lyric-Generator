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
        <Text style={styles.systemLabel}>/// SYSTEM ONLINE ///</Text>
        <View style={styles.divider} />
        <Text style={styles.title}>G-WING</Text>
        <Text style={styles.subtitle}>LYRIC GENERATOR</Text>
        <View style={styles.divider} />
        <Text style={styles.version}>ver 1.0 — TWO-◯IX PROTOCOL</Text>
      </View>

      <View style={styles.descArea}>
        <Text style={styles.descText}>
          {'> JUST ...'}
        </Text>
        <Text style={styles.descText}>
          {'  RHYTHM ...'}
        </Text>
        <Text style={styles.descSpacer}>{''}</Text>
        <Text style={styles.descDetail}>
          {'  90s Robot Anime Style Lyric'}
        </Text>
        <Text style={styles.descDetail}>
          {'  Composition System.'}
        </Text>
        <Text style={styles.descDetail}>
          {'  Select structure, build phrases,'}
        </Text>
        <Text style={styles.descDetail}>
          {'  export prompt for AI.'}
        </Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onStart}>
        <Text style={styles.startButtonText}>▶ MISSION START</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>[ PRESS TO INITIALIZE ]</Text>
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
    backgroundColor: COLORS.neonGreen,
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  systemLabel: {
    color: COLORS.neonGreen,
    ...FONTS.small,
    letterSpacing: 3,
    marginBottom: 12,
  },
  divider: {
    width: width * 0.6,
    height: 1,
    backgroundColor: COLORS.neonGreenBorder,
    marginVertical: 8,
  },
  title: {
    color: COLORS.neonGreen,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 12,
    marginVertical: 4,
  },
  subtitle: {
    color: COLORS.neonGreenDim,
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
    borderColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 4,
  },
  descText: {
    color: COLORS.neonGreenDim,
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
    borderColor: COLORS.neonGreen,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 2,
    marginBottom: 24,
  },
  startButtonText: {
    color: COLORS.neonGreen,
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
    borderColor: COLORS.neonGreenBorder,
    borderRadius: 2,
  },
  hubBtnText: {
    color: COLORS.neonGreen,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
