import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { generateTitle } from '../utils/generator';

interface Props {
  title: string;
  onUpdate: (title: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TitleScreen({ title, onUpdate, onNext, onBack }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const handleRegenerate = () => {
    const newTitle = generateTitle();
    onUpdate(newTitle);
    setEditText(newTitle);
  };

  const handleSave = () => {
    const upper = editText.toUpperCase();
    onUpdate(upper);
    setEditText(upper);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TITLE GENERATOR</Text>
        <Text style={styles.subtitle}>楽曲タイトルを決定せよ</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleDisplay}>
          <Text style={styles.titleLabel}>/// GENERATED TITLE ///</Text>
          {isEditing ? (
            <View style={styles.editRow}>
              <TextInput
                style={styles.titleInput}
                value={editText}
                onChangeText={(t) => setEditText(t.toUpperCase())}
                autoFocus
                autoCapitalize="characters"
                onSubmitEditing={handleSave}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => { setEditText(title); setIsEditing(true); }}>
              <Text style={styles.titleValue}>{title}</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.titleHint}>タップして直接編集</Text>
        </View>

        <TouchableOpacity style={styles.regenBtn} onPress={handleRegenerate}>
          <Text style={styles.regenIcon}>↻</Text>
          <Text style={styles.regenText}>REGENERATE</Text>
        </TouchableOpacity>

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>/// FORMULA ///</Text>
          <Text style={styles.formulaText}>
            [STARTER] + [ENDER]{'\n'}
            例: JUST EMOTION, SILENT REVOLUTION
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>PROCEED → EXPORT ▶</Text>
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
    padding: 24,
    justifyContent: 'center',
  },
  titleDisplay: {
    borderWidth: 2,
    borderColor: COLORS.neonGreen,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 4,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  titleLabel: {
    color: COLORS.neonYellow,
    ...FONTS.small,
    letterSpacing: 2,
    marginBottom: 16,
  },
  titleValue: {
    color: COLORS.neonGreen,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
    textAlign: 'center',
  },
  titleHint: {
    color: COLORS.textDim,
    ...FONTS.small,
    marginTop: 12,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  titleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    backgroundColor: COLORS.bgCardAlt,
    color: COLORS.neonGreen,
    borderRadius: 2,
    padding: 12,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  saveBtn: {
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 2,
    padding: 12,
  },
  saveBtnText: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    letterSpacing: 2,
  },
  regenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    backgroundColor: COLORS.neonCyanDim,
    borderRadius: 2,
    padding: 12,
    marginBottom: 24,
    gap: 8,
  },
  regenIcon: {
    color: COLORS.neonCyan,
    fontSize: 20,
  },
  regenText: {
    color: COLORS.neonCyan,
    fontWeight: '700',
    letterSpacing: 3,
  },
  formulaBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
    borderRadius: 4,
    padding: 16,
  },
  formulaLabel: {
    color: COLORS.textDim,
    ...FONTS.small,
    letterSpacing: 2,
    marginBottom: 8,
  },
  formulaText: {
    color: COLORS.textSecondary,
    ...FONTS.mono,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.neonGreenDark,
    borderWidth: 2,
    borderColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 3,
  },
});
