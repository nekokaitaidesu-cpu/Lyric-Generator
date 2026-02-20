import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { generateTitleWords } from '../utils/generator';
import { TITLE_STARTERS, TITLE_ENDERS } from '../data/dictionary';

interface Props {
  title: string;
  onUpdate: (title: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TitleScreen({ title, onUpdate, onNext, onBack }: Props) {
  const getInitWords = (): [string, string] => {
    for (const s of TITLE_STARTERS) {
      if (title.startsWith(s)) {
        const rest = title.slice(s.length);
        if (TITLE_ENDERS.includes(rest)) return [s, rest];
      }
    }
    return generateTitleWords();
  };

  const initWords = getInitWords();
  const [wordA, setWordA] = useState(initWords[0]);
  const [wordB, setWordB] = useState(initWords[1]);
  const [editingA, setEditingA] = useState(false);
  const [editingB, setEditingB] = useState(false);
  const [customA, setCustomA] = useState(initWords[0]);
  const [customB, setCustomB] = useState(initWords[1]);

  const combinedTitle = `${wordA}${wordB}`;

  const rerollA = () => {
    const newA = TITLE_STARTERS[Math.floor(Math.random() * TITLE_STARTERS.length)];
    setWordA(newA);
    setCustomA(newA);
    onUpdate(`${newA}${wordB}`);
  };

  const rerollB = () => {
    const newB = TITLE_ENDERS[Math.floor(Math.random() * TITLE_ENDERS.length)];
    setWordB(newB);
    setCustomB(newB);
    onUpdate(`${wordA}${newB}`);
  };

  const rerollBoth = () => {
    const [a, b] = generateTitleWords();
    setWordA(a); setCustomA(a);
    setWordB(b); setCustomB(b);
    onUpdate(`${a}${b}`);
  };

  const commitA = () => {
    setWordA(customA);
    onUpdate(`${customA}${wordB}`);
    setEditingA(false);
  };

  const commitB = () => {
    setWordB(customB);
    onUpdate(`${wordA}${customB}`);
    setEditingB(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>TITLE</Text>
        <Text style={styles.subtitle}>タイトルを生成してください</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleDisplay}>
          <Text style={styles.titleDisplayLabel}>// TITLE //</Text>
          <Text style={styles.titleDisplayText}>{combinedTitle}</Text>
        </View>

        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>// 合成フォーミュラ //</Text>
          <View style={styles.formulaRow}>
            <View style={styles.formulaPart}>
              <Text style={styles.formulaPartLabel}>[WORD A]</Text>
              {editingA ? (
                <View style={styles.formulaInputRow}>
                  <TextInput
                    style={styles.formulaInput}
                    value={customA}
                    onChangeText={setCustomA}
                    autoFocus
                  />
                  <TouchableOpacity onPress={commitA} style={styles.miniConfirm}>
                    <Text style={styles.miniConfirmText}>✓</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.wordBox}
                  onPress={() => setEditingA(true)}
                >
                  <Text style={styles.wordText}>{wordA}</Text>
                  <Text style={styles.wordEdit}>✏</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.rerollBtn} onPress={rerollA}>
                <Text style={styles.rerollText}>↻ REROLL</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.formulaPlus}>+</Text>

            <View style={styles.formulaPart}>
              <Text style={styles.formulaPartLabel}>[WORD B]</Text>
              {editingB ? (
                <View style={styles.formulaInputRow}>
                  <TextInput
                    style={styles.formulaInput}
                    value={customB}
                    onChangeText={setCustomB}
                    autoFocus
                  />
                  <TouchableOpacity onPress={commitB} style={styles.miniConfirm}>
                    <Text style={styles.miniConfirmText}>✓</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.wordBox}
                  onPress={() => setEditingB(true)}
                >
                  <Text style={styles.wordText}>{wordB}</Text>
                  <Text style={styles.wordEdit}>✏</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.rerollBtn} onPress={rerollB}>
                <Text style={styles.rerollText}>↻ REROLL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.rerollAllBtn} onPress={rerollBoth} activeOpacity={0.8}>
          <Text style={styles.rerollAllText}>↻  REROLL BOTH</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>// TITLE FORMULA //</Text>
          <Text style={styles.infoText}>
            {'[WORD A]  教科書フレーズの冒頭\n'}
            {'[WORD B]  教科書フレーズの結末\n'}
            {'→ 両方をタップして直接編集も可能'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => { onUpdate(combinedTitle); onNext(); }}
          activeOpacity={0.8}
        >
          <Text style={styles.proceedBtnText}>NEXT: EXPORT ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  backBtn: { marginBottom: 10 },
  backText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.skyBlue,
    letterSpacing: 1,
  },
  title: { fontSize: 20, fontWeight: '700', letterSpacing: 4, color: COLORS.skyBlue },
  subtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  titleDisplay: {
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.skyBlue,
    borderRadius: 2,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  titleDisplayLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 10,
  },
  titleDisplayText: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.skyBlue,
    textAlign: 'center',
    textShadowColor: COLORS.skyBlue,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  formulaBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 14,
    marginBottom: 12,
  },
  formulaLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 12,
  },
  formulaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  formulaPart: { flex: 1 },
  formulaPartLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginBottom: 6,
  },
  formulaInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  formulaInput: {
    flex: 1,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: 2,
    padding: 6,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    fontSize: 13,
  },
  miniConfirm: {
    backgroundColor: COLORS.skyBlue,
    borderRadius: 2,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniConfirmText: { color: COLORS.bg, fontWeight: '700', fontSize: 14 },
  wordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 8,
    marginBottom: 6,
  },
  wordText: { fontSize: 14, color: COLORS.yellow, fontWeight: '700' },
  wordEdit: { fontSize: 11, color: COLORS.textDim },
  rerollBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  rerollText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  formulaPlus: {
    fontSize: 20,
    color: COLORS.textDim,
    paddingTop: 30,
  },
  rerollAllBtn: {
    borderWidth: 1,
    borderColor: COLORS.yellow,
    borderRadius: 2,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  rerollAllText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.yellow,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    backgroundColor: COLORS.cardBg,
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.skyBlueDim,
    letterSpacing: 2,
    marginBottom: 6,
  },
  infoText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
  proceedBtn: {
    backgroundColor: COLORS.skyBlue,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  proceedBtnText: { fontSize: 14, fontWeight: '900', letterSpacing: 3, color: COLORS.bg },
});
