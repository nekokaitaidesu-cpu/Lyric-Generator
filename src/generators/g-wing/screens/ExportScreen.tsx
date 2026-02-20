import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { COLORS, FONTS } from '../utils/theme';
import { Section } from '../types';
import { generateSunoPrompt } from '../utils/generator';

interface Props {
  title: string;
  sections: Section[];
  onBack: () => void;
  onRestart: () => void;
}

export default function ExportScreen({ title, sections, onBack, onRestart }: Props) {
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => generateSunoPrompt(title, sections), [title, sections]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AI EXPORT</Text>
        <Text style={styles.subtitle}>AI音楽生成用プロンプト出力</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.copyButton, copied && styles.copyButtonDone]}
          onPress={handleCopy}
        >
          <Text style={[styles.copyButtonText, copied && styles.copyButtonTextDone]}>
            {copied ? '✓ COPIED' : 'COPY'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartText}>↻ NEW MISSION</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  promptBox: {
    borderWidth: 1,
    borderColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.bgCard,
    borderRadius: 4,
    padding: 16,
  },
  promptText: {
    color: COLORS.textPrimary,
    ...FONTS.mono,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: 8,
  },
  copyButton: {
    backgroundColor: COLORS.neonGreenDark,
    borderWidth: 2,
    borderColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  copyButtonDone: {
    borderColor: COLORS.neonCyan,
    backgroundColor: COLORS.neonCyanDim,
  },
  copyButtonText: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 3,
  },
  copyButtonTextDone: {
    color: COLORS.neonCyan,
  },
  restartButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    alignItems: 'center',
  },
  restartText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
