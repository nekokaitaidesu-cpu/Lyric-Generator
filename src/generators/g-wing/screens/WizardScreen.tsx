import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { Section } from '../types';
import { getCandidatesForSection, getRandomCandidate } from '../utils/generator';

const { width } = Dimensions.get('window');

interface Props {
  sections: Section[];
  onComplete: (sections: Section[]) => void;
  onBack: () => void;
}

function getGlobalIndex(sections: Section[], si: number, li: number): number {
  let idx = 0;
  for (let i = 0; i < si; i++) idx += sections[i].maxLines;
  return idx + li;
}

// Track the furthest point reached (the "frontier")
function getFurthestFilled(sections: Section[]): number {
  let last = -1;
  for (let si = 0; si < sections.length; si++) {
    for (let li = 0; li < sections[si].lines.length; li++) {
      if (sections[si].lines[li].trim()) {
        last = getGlobalIndex(sections, si, li);
      }
    }
  }
  return last;
}

export default function WizardScreen({ sections: initialSections, onComplete, onBack }: Props) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [copyMode, setCopyMode] = useState(false);
  const [usedPhrases, setUsedPhrases] = useState<Set<string>>(new Set());
  // Track the highest line index ever reached
  const [frontier, setFrontier] = useState(0);
  const previewRef = useRef<ScrollView>(null);

  const currentSection = sections[sectionIdx];
  const totalLines = sections.reduce((a, s) => a + s.maxLines, 0);
  const currentGlobal = getGlobalIndex(sections, sectionIdx, lineIdx);
  const progress = totalLines > 0 ? currentGlobal / totalLines : 0;

  // Update frontier whenever we advance
  useEffect(() => {
    setFrontier((prev) => Math.max(prev, currentGlobal));
  }, [currentGlobal]);

  const isFirstChorus = useMemo(() => {
    if (!currentSection || currentSection.type !== 'chorus') return false;
    for (let i = 0; i < sectionIdx; i++) {
      if (sections[i].type === 'chorus') return false;
    }
    return true;
  }, [currentSection, sectionIdx, sections]);

  const refreshCandidates = useCallback(() => {
    if (currentSection) {
      setCandidates(
        getCandidatesForSection(currentSection.type, lineIdx, isFirstChorus, usedPhrases)
      );
    }
  }, [currentSection, lineIdx, isFirstChorus, usedPhrases]);

  useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  const setLine = (text: string) => {
    const updated = [...sections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      lines: updated[sectionIdx].lines.map((l, i) => (i === lineIdx ? text : l)),
    };
    setSections(updated);

    if (text.trim() && (currentSection.type === 'verse' || currentSection.type === 'pre-chorus')) {
      setUsedPhrases((prev) => new Set(prev).add(text));
    }

    advanceLine(updated);
  };

  const advanceLine = (updatedSections: Section[]) => {
    const nextLine = lineIdx + 1;
    if (nextLine < sections[sectionIdx].maxLines) {
      setLineIdx(nextLine);
    } else {
      const nextSection = sectionIdx + 1;
      if (nextSection < sections.length) {
        setSectionIdx(nextSection);
        setLineIdx(0);
      } else {
        onComplete(updatedSections);
      }
    }
    setShowInput(false);
    setCustomInput('');
    setCopyMode(false);
  };

  const handleSkip = () => {
    setLine('');
  };

  const handleRandom = () => {
    const text = getRandomCandidate(currentSection.type);
    setLine(text);
  };

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      setLine(customInput.trim());
    }
  };

  // Jump to any past or already-visited-future line
  const jumpTo = (si: number, li: number) => {
    const targetGlobal = getGlobalIndex(sections, si, li);
    if (targetGlobal === currentGlobal) return;
    // Allow jump to past lines, or forward lines up to frontier
    if (targetGlobal <= frontier) {
      setSectionIdx(si);
      setLineIdx(li);
      setShowInput(false);
      setCustomInput('');
      setCopyMode(false);
    }
  };

  // Copy mode: collect all filled lines as candidates
  const filledLines = useMemo(() => {
    const result: { si: number; li: number; text: string; label: string }[] = [];
    for (let si = 0; si < sections.length; si++) {
      for (let li = 0; li < sections[si].lines.length; li++) {
        const text = sections[si].lines[li];
        if (text.trim() && getGlobalIndex(sections, si, li) !== currentGlobal) {
          result.push({ si, li, text, label: sections[si].label });
        }
      }
    }
    return result;
  }, [sections, currentGlobal]);

  const handleCopyLine = (text: string) => {
    // Set the copied text into current line without advancing
    const updated = [...sections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      lines: updated[sectionIdx].lines.map((l, i) => (i === lineIdx ? text : l)),
    };
    setSections(updated);

    if (text.trim() && (currentSection.type === 'verse' || currentSection.type === 'pre-chorus')) {
      setUsedPhrases((prev) => new Set(prev).add(text));
    }

    advanceLine(updated);
  };

  if (!currentSection) return null;

  const isChorusLastLine = currentSection.type === 'chorus' && lineIdx === currentSection.maxLines - 1;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ ABORT</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerSection}>
            [{currentSection.label.toUpperCase()}]
          </Text>
          <Text style={styles.headerLine}>
            LINE {lineIdx + 1} / {currentSection.maxLines}
            {isChorusLastLine ? '  ※ ENGLISH ENDING' : ''}
          </Text>
        </View>
      </View>

      {/* Preview */}
      <ScrollView
        style={styles.preview}
        ref={previewRef}
        onContentSizeChange={() => previewRef.current?.scrollToEnd()}
      >
        {sections.map((section, si) => (
          <View key={si} style={styles.previewSection}>
            <Text style={styles.previewSectionLabel}>[{section.label}]</Text>
            {section.lines.map((line, li) => {
              const isCurrent = si === sectionIdx && li === lineIdx;
              const isFilled = line.trim() !== '';
              const targetGlobal = getGlobalIndex(sections, si, li);
              const isPast = targetGlobal < currentGlobal;
              const isFuture = targetGlobal > currentGlobal;
              const isJumpable = targetGlobal !== currentGlobal && targetGlobal <= frontier;
              return (
                <TouchableOpacity
                  key={li}
                  style={[
                    styles.previewLineRow,
                    isJumpable && styles.previewLineRowTappable,
                    isFuture && isJumpable && styles.previewLineRowFuture,
                  ]}
                  onPress={isJumpable ? () => jumpTo(si, li) : undefined}
                  disabled={!isJumpable}
                  activeOpacity={isJumpable ? 0.5 : 1}
                >
                  {isCurrent && <Text style={styles.cursor}>▶</Text>}
                  {isPast && !isCurrent && <Text style={styles.cursorBack}>◁</Text>}
                  {isFuture && isJumpable && <Text style={styles.cursorForward}>▷</Text>}
                  <Text
                    style={[
                      styles.previewLine,
                      isCurrent && styles.previewLineCurrent,
                      isPast && styles.previewLinePast,
                      isFuture && isJumpable && styles.previewLineFuture,
                      !isFilled && !isCurrent && !isJumpable && styles.previewLineEmpty,
                    ]}
                    numberOfLines={1}
                  >
                    {isFilled ? line : isCurrent ? '█████████' : '─────────'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Selection Area */}
      <View style={styles.selectionArea}>
        {copyMode ? (
          /* Copy Mode UI */
          <View>
            <Text style={styles.selectLabel}>/// COPY FROM ///</Text>
            {filledLines.length === 0 ? (
              <Text style={styles.copyEmptyText}>コピー可能な行がありません</Text>
            ) : (
              <ScrollView style={styles.copyList}>
                {filledLines.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.copyItem}
                    onPress={() => handleCopyLine(item.text)}
                  >
                    <Text style={styles.copyItemLabel}>[{item.label}]</Text>
                    <Text style={styles.copyItemText} numberOfLines={1}>{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.copyCancelBtn}
              onPress={() => setCopyMode(false)}
            >
              <Text style={styles.copyCancelText}>✕ CANCEL</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Normal Mode UI */
          <View>
            <Text style={styles.selectLabel}>
              {isChorusLastLine && isFirstChorus
                ? '/// SELECT ENDING (SO FAR AWAY…) ///'
                : isChorusLastLine
                ? '/// SELECT ENGLISH ENDING ///'
                : '/// SELECT PHRASE ///'}
            </Text>

            {candidates.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={styles.candidateBtn}
                onPress={() => setLine(c)}
              >
                <Text style={styles.candidateNumber}>{i + 1}</Text>
                <Text style={styles.candidateText} numberOfLines={1}>{c}</Text>
              </TouchableOpacity>
            ))}

            {/* Action Buttons Row */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={refreshCandidates}>
                <Text style={styles.actionIcon}>↻</Text>
                <Text style={styles.actionLabel}>RELOAD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={handleRandom}>
                <Text style={styles.actionIcon}>⚡</Text>
                <Text style={styles.actionLabel}>RANDOM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => { setShowInput(!showInput); setCopyMode(false); }}
              >
                <Text style={styles.actionIcon}>✎</Text>
                <Text style={styles.actionLabel}>INPUT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => { setCopyMode(true); setShowInput(false); }}
              >
                <Text style={styles.actionIcon}>⧉</Text>
                <Text style={styles.actionLabel}>COPY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={handleSkip}>
                <Text style={styles.actionIcon}>▷</Text>
                <Text style={styles.actionLabel}>SKIP</Text>
              </TouchableOpacity>
            </View>

            {/* Custom Input */}
            {showInput && (
              <View style={styles.customInputArea}>
                <TextInput
                  style={styles.textInput}
                  value={customInput}
                  onChangeText={setCustomInput}
                  placeholder="直接入力..."
                  placeholderTextColor={COLORS.textDim}
                  autoFocus
                  onSubmitEditing={handleCustomSubmit}
                />
                <TouchableOpacity style={styles.submitBtn} onPress={handleCustomSubmit}>
                  <Text style={styles.submitText}>OK</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.border,
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.neonGreen,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    marginRight: 16,
  },
  backText: {
    color: COLORS.neonPink,
    ...FONTS.small,
    letterSpacing: 2,
  },
  headerInfo: {
    flex: 1,
  },
  headerSection: {
    color: COLORS.neonGreen,
    ...FONTS.subtitle,
  },
  headerLine: {
    color: COLORS.textSecondary,
    ...FONTS.small,
    letterSpacing: 1,
    marginTop: 2,
  },
  preview: {
    flex: 1,
    padding: 16,
  },
  previewSection: {
    marginBottom: 12,
  },
  previewSectionLabel: {
    color: COLORS.neonCyan,
    ...FONTS.small,
    letterSpacing: 2,
    marginBottom: 4,
  },
  previewLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  previewLineRowTappable: {
    backgroundColor: 'rgba(0,229,255,0.05)',
  },
  previewLineRowFuture: {
    backgroundColor: 'rgba(255,215,0,0.05)',
  },
  cursor: {
    color: COLORS.neonGreen,
    fontSize: 10,
    marginRight: 6,
  },
  cursorBack: {
    color: COLORS.neonCyan,
    fontSize: 8,
    marginRight: 6,
    opacity: 0.6,
  },
  cursorForward: {
    color: COLORS.neonYellow,
    fontSize: 8,
    marginRight: 6,
    opacity: 0.6,
  },
  previewLine: {
    color: COLORS.textPrimary,
    ...FONTS.mono,
    flex: 1,
  },
  previewLineCurrent: {
    color: COLORS.neonGreen,
    fontWeight: '700',
  },
  previewLinePast: {
    color: COLORS.neonCyan,
    opacity: 0.8,
  },
  previewLineFuture: {
    color: COLORS.neonYellow,
    opacity: 0.7,
  },
  previewLineEmpty: {
    color: COLORS.textDim,
  },
  selectionArea: {
    borderTopWidth: 1,
    borderTopColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.bgCard,
    padding: 12,
    paddingBottom: 24,
  },
  selectLabel: {
    color: COLORS.neonYellow,
    ...FONTS.small,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  candidateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 2,
    padding: 10,
    marginBottom: 6,
  },
  candidateNumber: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    fontSize: 14,
    width: 24,
    textAlign: 'center',
  },
  candidateText: {
    color: COLORS.textPrimary,
    ...FONTS.body,
    flex: 1,
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  actionBtn: {
    alignItems: 'center',
    padding: 8,
    minWidth: 52,
  },
  actionIcon: {
    color: COLORS.neonCyan,
    fontSize: 18,
  },
  actionLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
  },
  customInputArea: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.neonGreenBorder,
    backgroundColor: COLORS.bgCardAlt,
    color: COLORS.textPrimary,
    borderRadius: 2,
    padding: 10,
    ...FONTS.body,
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    backgroundColor: COLORS.neonGreenDark,
    borderRadius: 2,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  submitText: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    letterSpacing: 2,
  },
  // Copy mode styles
  copyList: {
    maxHeight: 160,
  },
  copyEmptyText: {
    color: COLORS.textDim,
    ...FONTS.mono,
    textAlign: 'center',
    paddingVertical: 16,
  },
  copyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.neonYellowDim,
    backgroundColor: 'rgba(255,215,0,0.05)',
    borderRadius: 2,
    padding: 10,
    marginBottom: 4,
  },
  copyItemLabel: {
    color: COLORS.neonYellow,
    fontSize: 10,
    letterSpacing: 1,
    width: 80,
  },
  copyItemText: {
    color: COLORS.textPrimary,
    ...FONTS.body,
    flex: 1,
    marginLeft: 4,
  },
  copyCancelBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 4,
  },
  copyCancelText: {
    color: COLORS.neonPink,
    ...FONTS.small,
    letterSpacing: 2,
  },
});
