import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section, SectionType } from '../types';
import { createSectionFromType, ALL_SECTION_TYPES, SECTION_CONFIG } from '../data/structures';

interface Props {
  onComplete: (sections: Section[]) => void;
  onBack: () => void;
}

export default function StructureBuilderScreen({ onComplete, onBack }: Props) {
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = (type: SectionType) => {
    setSections((prev) => [...prev, createSectionFromType(type, prev)]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return reLabel(updated);
    });
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    setSections((prev) => {
      const updated = [...prev];
      [updated[index], updated[target]] = [updated[target], updated[index]];
      return reLabel(updated);
    });
  };

  const reLabel = (arr: Section[]): Section[] => {
    const counts: Record<string, number> = {};
    return arr.map((s) => {
      counts[s.type] = (counts[s.type] || 0) + 1;
      const suffix = counts[s.type] > 1 ? ` ${counts[s.type]}` : '';
      return { ...s, label: `${SECTION_CONFIG[s.type].label}${suffix}` };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>PATTERN C</Text>
        <Text style={styles.subtitle}>ブロックを組み合わせて構成を作れ</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>/// ADD BLOCKS ///</Text>
        <View style={styles.palette}>
          {ALL_SECTION_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.paletteBtn, { borderColor: SECTION_COLORS[type] }]}
              onPress={() => addSection(type)}
              activeOpacity={0.8}
            >
              <Text style={styles.palettePlus}>+</Text>
              <Text style={[styles.paletteBtnText, { color: SECTION_COLORS[type] }]}>
                {type.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>
          {`/// STRUCTURE (${sections.length} blocks) ///`}
        </Text>

        {sections.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              {'上のパーツをタップして構成を作れ！\n例: VERSE → PRE-CHORUS → CHORUS → OUTRO'}
            </Text>
          </View>
        ) : (
          sections.map((s, i) => (
            <View
              key={`${i}-${s.type}`}
              style={[styles.blockRow, { borderLeftColor: SECTION_COLORS[s.type] }]}
            >
              <View style={styles.blockInfo}>
                <Text style={styles.blockIndex}>{i + 1}</Text>
                <View style={styles.blockLabels}>
                  <Text style={[styles.blockType, { color: SECTION_COLORS[s.type] }]}>
                    [{s.label.toUpperCase()}]
                  </Text>
                  <Text style={styles.blockMeta}>{s.maxLines} lines</Text>
                </View>
              </View>
              <View style={styles.blockActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => moveSection(i, -1)}
                  disabled={i === 0}
                >
                  <Text style={[styles.actionBtnText, i === 0 && styles.disabled]}>▲</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => moveSection(i, 1)}
                  disabled={i === sections.length - 1}
                >
                  <Text style={[styles.actionBtnText, i === sections.length - 1 && styles.disabled]}>▼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => removeSection(i)}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {sections.length > 0 && (
          <View style={styles.flowPreview}>
            <Text style={styles.flowPreviewLabel}>/// FLOW PREVIEW ///</Text>
            <View style={styles.flowRow}>
              {sections.map((s, i) => (
                <View key={i} style={styles.flowItem}>
                  {i > 0 && <Text style={styles.arrow}>→</Text>}
                  <View style={[styles.flowBadge, { borderColor: SECTION_COLORS[s.type] }]}>
                    <Text style={[styles.flowBadgeText, { color: SECTION_COLORS[s.type] }]}>
                      {s.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.proceedBtn, sections.length === 0 && styles.proceedBtnDisabled]}
          onPress={() => sections.length > 0 && onComplete(sections)}
          disabled={sections.length === 0}
          activeOpacity={0.8}
        >
          <Text style={[styles.proceedBtnText, sections.length === 0 && styles.proceedBtnTextDisabled]}>
            NEXT: STYLE SELECT ▶
          </Text>
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
    color: COLORS.neonGreen,
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
    color: COLORS.neonPink,
  },
  subtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 4,
  },
  palette: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  paletteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
  },
  palettePlus: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '700' },
  paletteBtnText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  emptyBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textDim,
    textAlign: 'center',
    lineHeight: 20,
  },
  blockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    borderRadius: 2,
    padding: 10,
    marginBottom: 6,
  },
  blockInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  blockIndex: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textDim,
    width: 20,
    textAlign: 'center',
  },
  blockLabels: { marginLeft: 8 },
  blockType: { fontWeight: '700', fontSize: 13, letterSpacing: 2 },
  blockMeta: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    marginTop: 1,
  },
  blockActions: { flexDirection: 'row', gap: 4 },
  actionBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
  },
  actionBtnText: { color: COLORS.neonCyan, fontSize: 12 },
  disabled: { color: COLORS.textDim, opacity: 0.3 },
  removeText: { color: COLORS.neonPink, fontSize: 12, fontWeight: '700' },
  flowPreview: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    backgroundColor: COLORS.cardBg,
  },
  flowPreviewLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 2,
    marginBottom: 8,
  },
  flowRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  flowItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  arrow: { color: COLORS.textDim, marginHorizontal: 4, fontSize: 12 },
  flowBadge: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  flowBadgeText: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, fontWeight: '600' },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  proceedBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  proceedBtnDisabled: { backgroundColor: COLORS.cardBg, borderWidth: 1, borderColor: COLORS.border },
  proceedBtnText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 3,
    color: COLORS.bg,
  },
  proceedBtnTextDisabled: { color: COLORS.textDim },
});
