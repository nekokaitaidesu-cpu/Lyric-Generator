import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal,
} from 'react-native';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section } from '../types';
import { getCandidatesForSection, getRandomPhrase } from '../utils/generator';

interface Props {
  sections: Section[];
  onComplete: (sections: Section[]) => void;
  onBack: () => void;
}

type InputMode = 'candidates' | 'custom';

export default function WizardScreen({ sections: initialSections, onComplete, onBack }: Props) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [candidates, setCandidates] = useState<string[]>(() =>
    getCandidatesForSection(initialSections[0], 0)
  );
  const [inputMode, setInputMode] = useState<InputMode>('candidates');
  const [customText, setCustomText] = useState('');
  const [copyMode, setCopyMode] = useState(false);
  // frontier: furthest line the user has reached (can jump back to any line up to here)
  const [frontier, setFrontier] = useState<{ s: number; l: number }>({ s: 0, l: 0 });

  // Total lines across all sections
  const totalLines = sections.reduce((acc, s) => acc + s.maxLines, 0);
  const filledLines = sections.reduce(
    (acc, s) => acc + s.lines.filter(Boolean).length, 0
  );
  const progress = totalLines > 0 ? filledLines / totalLines : 0;

  const currentSection = sections[sectionIdx];

  const refreshCandidates = useCallback(
    (si: number, li: number, secs: Section[]) => {
      setCandidates(getCandidatesForSection(secs[si], li));
    },
    []
  );

  const commitLine = (text: string) => {
    if (!text.trim()) return;
    const updated = sections.map((s, si) => {
      if (si !== sectionIdx) return s;
      const newLines = [...s.lines];
      newLines[lineIdx] = text;
      return { ...s, lines: newLines };
    });
    setSections(updated);
    setCustomText('');
    setInputMode('candidates');
    setCopyMode(false);
    advanceCursor(updated);
  };

  // COPYモード用: 既に入力済みの全行を収集
  const copyableLines = sections.flatMap((s, si) =>
    s.lines
      .map((line, li) => ({ si, li, text: line, label: s.label }))
      .filter(({ text, si: fsi, li: fli }) =>
        text && text !== '（スキップ）' && !(fsi === sectionIdx && fli === lineIdx)
      )
  );

  const advanceCursor = (updatedSections: Section[]) => {
    const section = updatedSections[sectionIdx];
    const nextLine = lineIdx + 1;
    if (nextLine < section.maxLines) {
      // advance within section
      const newFrontier =
        sectionIdx > frontier.s || (sectionIdx === frontier.s && nextLine > frontier.l)
          ? { s: sectionIdx, l: nextLine }
          : frontier;
      setFrontier(newFrontier);
      setLineIdx(nextLine);
      refreshCandidates(sectionIdx, nextLine, updatedSections);
    } else {
      // advance to next section
      const nextSection = sectionIdx + 1;
      if (nextSection < updatedSections.length) {
        const newFrontier =
          nextSection > frontier.s ? { s: nextSection, l: 0 } : frontier;
        setFrontier(newFrontier);
        setSectionIdx(nextSection);
        setLineIdx(0);
        refreshCandidates(nextSection, 0, updatedSections);
      } else {
        // all done
        onComplete(updatedSections);
      }
    }
  };

  const handleSkip = () => {
    const updated = sections.map((s, si) => {
      if (si !== sectionIdx) return s;
      const newLines = [...s.lines];
      if (!newLines[lineIdx]) newLines[lineIdx] = '（スキップ）';
      return { ...s, lines: newLines };
    });
    setSections(updated);
    setInputMode('candidates');
    advanceCursor(updated);
  };

  const handleReload = () => {
    refreshCandidates(sectionIdx, lineIdx, sections);
  };

  const handleRandom = () => {
    const phrase = getRandomPhrase(currentSection, lineIdx);
    commitLine(phrase);
  };

  const jumpTo = (si: number, li: number) => {
    setSectionIdx(si);
    setLineIdx(li);
    setInputMode('candidates');
    setCustomText('');
    setCopyMode(false);
    refreshCandidates(si, li, sections);
  };

  // Check if a position is reachable (at or before frontier)
  const isReachable = (si: number, li: number) => {
    if (si < frontier.s) return true;
    if (si === frontier.s && li <= frontier.l) return true;
    // also allow the very next line after last filled
    if (si === sectionIdx && li === lineIdx) return true;
    return false;
  };

  const sectionColor = SECTION_COLORS[currentSection.type] ?? COLORS.textSecondary;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>LYRIC WIZARD</Text>
          <Text style={styles.headerSub}>
            {`${filledLines} / ${totalLines} lines`}
          </Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Section Overview */}
        <View style={styles.overviewBox}>
          {sections.map((s, si) => {
            const sc = SECTION_COLORS[s.type] ?? COLORS.textSecondary;
            const isCurrent = si === sectionIdx;
            return (
              <View key={si} style={styles.overviewSection}>
                <Text style={[styles.overviewLabel, { color: isCurrent ? sc : COLORS.textDim }]}>
                  {isCurrent ? '▶ ' : '  '}{s.label.toUpperCase()}
                </Text>
                <View style={styles.overviewLines}>
                  {s.lines.map((line, li) => {
                    const isCurLine = si === sectionIdx && li === lineIdx;
                    const filled = Boolean(line && line !== '（スキップ）');
                    const reachable = isReachable(si, li);
                    return (
                      <TouchableOpacity
                        key={li}
                        disabled={!reachable}
                        onPress={() => reachable && jumpTo(si, li)}
                      >
                        <Text style={[
                          styles.overviewLine,
                          isCurLine && { color: sc },
                          !isCurLine && filled && styles.overviewLineFilled,
                          !isCurLine && !filled && !reachable && styles.overviewLineLocked,
                        ]}>
                          {isCurLine ? `  ▶ ${li + 1}. ` : (filled ? `  ◁ ${li + 1}. ` : `  ▷ ${li + 1}. `)}
                          {filled && !isCurLine ? `${line.slice(0, 18)}...` : ''}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* Current position indicator */}
        <View style={[styles.cursorBox, { borderColor: sectionColor }]}>
          <Text style={[styles.cursorLabel, { color: sectionColor }]}>
            {`[${currentSection.label.toUpperCase()}]  Line ${lineIdx + 1} / ${currentSection.maxLines}`}
          </Text>
        </View>

        {/* Input area */}
        {copyMode ? (
          <View style={styles.copyBox}>
            <Text style={styles.candidatesLabel}>// COPY FROM PREVIOUS LINES //</Text>
            {copyableLines.length === 0 ? (
              <Text style={styles.copyEmptyText}>コピー可能な行がありません</Text>
            ) : (
              copyableLines.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.copyItem}
                  onPress={() => commitLine(item.text)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.copyItemLabel}>[{item.label}]</Text>
                  <Text style={styles.copyItemText} numberOfLines={1}>{item.text}</Text>
                </TouchableOpacity>
              ))
            )}
            <TouchableOpacity style={styles.copyCancelBtn} onPress={() => setCopyMode(false)}>
              <Text style={styles.copyCancelText}>✕  CANCEL</Text>
            </TouchableOpacity>
          </View>
        ) : inputMode === 'candidates' ? (
          <View style={styles.candidatesBox}>
            <Text style={styles.candidatesLabel}>// CANDIDATES — タップして選択 //</Text>
            {candidates.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={styles.candidateBtn}
                onPress={() => commitLine(c)}
                activeOpacity={0.8}
              >
                <Text style={styles.candidateNum}>
                  {['①', '②', '③'][i] ?? `${i + 1}.`}
                </Text>
                <Text style={styles.candidateText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.customBox}>
            <Text style={styles.candidatesLabel}>// CUSTOM INPUT //</Text>
            <TextInput
              style={styles.textInput}
              value={customText}
              onChangeText={setCustomText}
              placeholder="自由に入力してください..."
              placeholderTextColor={COLORS.textDim}
              multiline
              autoFocus
            />
            <TouchableOpacity
              style={[styles.customSubmitBtn, !customText.trim() && styles.disabledBtn]}
              onPress={() => commitLine(customText)}
              disabled={!customText.trim()}
            >
              <Text style={[styles.customSubmitText, !customText.trim() && styles.disabledText]}>
                ✓  CONFIRM
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleReload}>
            <Text style={styles.actionBtnText}>↺{'\n'}RELOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleRandom}>
            <Text style={styles.actionBtnText}>⚄{'\n'}RANDOM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              setInputMode(inputMode === 'custom' ? 'candidates' : 'custom');
              setCopyMode(false);
              setCustomText('');
            }}
          >
            <Text style={styles.actionBtnText}>✏{'\n'}INPUT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => { setCopyMode(!copyMode); setInputMode('candidates'); setCustomText(''); }}
          >
            <Text style={styles.actionBtnText}>⧉{'\n'}COPY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleSkip}>
            <Text style={styles.actionBtnText}>▷{'\n'}SKIP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  backBtn: { width: 48 },
  backText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.neonGreen,
    letterSpacing: 1,
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonGreen,
  },
  headerSub: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 2,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.cardBg2,
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.neonGreen,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 14 },
  overviewBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 10,
    marginBottom: 12,
  },
  overviewSection: { marginBottom: 8 },
  overviewLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 2,
  },
  overviewLines: { paddingLeft: 8 },
  overviewLine: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  overviewLineFilled: { color: COLORS.textSecondary },
  overviewLineLocked: { color: COLORS.textDim },
  cursorBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 10,
    marginBottom: 12,
  },
  cursorLabel: {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  candidatesBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
  },
  candidatesLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 10,
  },
  candidateBtn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 10,
    marginBottom: 6,
  },
  candidateNum: {
    fontSize: 16,
    color: COLORS.neonGreen,
    fontWeight: '700',
    width: 22,
  },
  candidateText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 22,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  customBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 10,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    fontSize: 13,
    minHeight: 60,
    marginBottom: 10,
  },
  customSubmitBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 10,
    alignItems: 'center',
  },
  customSubmitText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.bg,
  },
  disabledBtn: { backgroundColor: COLORS.cardBg2, borderWidth: 1, borderColor: COLORS.border },
  disabledText: { color: COLORS.textDim },
  copyBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.neonPink,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
    maxHeight: 220,
  },
  copyEmptyText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textDim,
    textAlign: 'center',
    paddingVertical: 12,
  },
  copyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.neonPink + '66',
    backgroundColor: COLORS.neonPink + '11',
    borderRadius: 2,
    padding: 8,
    marginBottom: 4,
    gap: 8,
  },
  copyItemLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.neonPink,
    letterSpacing: 1,
    width: 72,
  },
  copyItemText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  copyCancelBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
  },
  copyCancelText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.neonPink,
    letterSpacing: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionBtnText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 16,
  },
});
