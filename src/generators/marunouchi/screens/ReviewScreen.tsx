import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput,
} from 'react-native';
import { COLORS, SECTION_COLORS } from '../utils/theme';
import { Section } from '../types';
import { getCandidatesForSection } from '../utils/generator';

interface Props {
  sections: Section[];
  onUpdate: (sections: Section[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewScreen({ sections, onUpdate, onNext, onBack }: Props) {
  const [editModal, setEditModal] = useState<{
    sectionIdx: number;
    lineIdx: number;
    text: string;
    candidates: string[];
  } | null>(null);

  const openEdit = (si: number, li: number) => {
    const section = sections[si];
    setEditModal({
      sectionIdx: si,
      lineIdx: li,
      text: section.lines[li] || '',
      candidates: getCandidatesForSection(section, li),
    });
  };

  const commitEdit = (text: string) => {
    if (!editModal) return;
    const updated = sections.map((s, si) => {
      if (si !== editModal.sectionIdx) return s;
      const lines = [...s.lines];
      lines[editModal.lineIdx] = text;
      return { ...s, lines };
    });
    onUpdate(updated);
    setEditModal(null);
  };

  const rerollCandidates = () => {
    if (!editModal) return;
    setEditModal({
      ...editModal,
      candidates: getCandidatesForSection(sections[editModal.sectionIdx], editModal.lineIdx),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>◀ BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>REVIEW</Text>
        <Text style={styles.subtitle}>タップして各行を編集できます</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>// LYRICS REVIEW //</Text>

        {sections.map((section, si) => {
          const sc = SECTION_COLORS[section.type] ?? COLORS.textSecondary;
          return (
            <View key={si} style={styles.sectionBlock}>
              <View style={[styles.sectionHeader, { borderLeftColor: sc }]}>
                <Text style={[styles.sectionName, { color: sc }]}>
                  [{section.label.toUpperCase()}]
                </Text>
                {section.metaTags.map((tag, ti) => (
                  <Text key={ti} style={styles.metaTag}>{tag}</Text>
                ))}
              </View>
              {section.lines.map((line, li) => (
                <TouchableOpacity
                  key={li}
                  style={styles.lineRow}
                  onPress={() => openEdit(si, li)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.lineNum}>{li + 1}.</Text>
                  <Text style={[styles.lineText, !line && styles.lineEmpty]}>
                    {line || '（空欄）'}
                  </Text>
                  <Text style={styles.editIcon}>✏</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.proceedBtn} onPress={onNext} activeOpacity={0.8}>
          <Text style={styles.proceedBtnText}>NEXT: TITLE ▶</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={!!editModal}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>EDIT LINE</Text>
              <TouchableOpacity onPress={() => setEditModal(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {editModal && (
              <>
                <TextInput
                  style={styles.modalInput}
                  value={editModal.text}
                  onChangeText={(t) => setEditModal({ ...editModal, text: t })}
                  multiline
                  autoFocus
                  placeholderTextColor={COLORS.textDim}
                />
                <TouchableOpacity
                  style={styles.modalConfirmBtn}
                  onPress={() => commitEdit(editModal.text)}
                >
                  <Text style={styles.modalConfirmText}>✓  CONFIRM</Text>
                </TouchableOpacity>

                <View style={styles.modalDivider} />
                <View style={styles.modalCandidatesHeader}>
                  <Text style={styles.modalCandLabel}>// CANDIDATES //</Text>
                  <TouchableOpacity onPress={rerollCandidates}>
                    <Text style={styles.rerollText}>↺ REROLL</Text>
                  </TouchableOpacity>
                </View>
                {editModal.candidates.map((c, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.modalCandidate}
                    onPress={() => commitEdit(c)}
                  >
                    <Text style={styles.modalCandNum}>
                      {['①', '②', '③'][i]}
                    </Text>
                    <Text style={styles.modalCandText}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>
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
  title: { fontSize: 20, fontWeight: '700', letterSpacing: 4, color: COLORS.neonGreen },
  subtitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionBlock: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
  },
  sectionHeader: {
    borderLeftWidth: 2,
    paddingLeft: 8,
    marginBottom: 10,
  },
  sectionName: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  metaTag: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: COLORS.textDim,
    marginTop: 2,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
    paddingLeft: 10,
    gap: 6,
  },
  lineNum: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.textDim,
    width: 18,
  },
  lineText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 22,
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  lineEmpty: { color: COLORS.textDim, fontStyle: 'italic' },
  editIcon: { fontSize: 12, color: COLORS.textDim },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border },
  proceedBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 14,
    alignItems: 'center',
  },
  proceedBtnText: { fontSize: 14, fontWeight: '900', letterSpacing: 3, color: COLORS.bg },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: COLORS.cardBg2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16,
    maxHeight: '75%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.neonGreen,
  },
  modalClose: { fontSize: 18, color: COLORS.textSecondary },
  modalInput: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.neonCyan,
    borderRadius: 2,
    padding: 10,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    fontSize: 13,
    minHeight: 50,
    marginBottom: 10,
  },
  modalConfirmBtn: {
    backgroundColor: COLORS.neonGreen,
    borderRadius: 2,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.bg,
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  modalCandidatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalCandLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonGreenDim,
    letterSpacing: 2,
  },
  rerollText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: COLORS.neonYellow,
    letterSpacing: 1,
  },
  modalCandidate: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 2,
    padding: 8,
    marginBottom: 6,
  },
  modalCandNum: { fontSize: 14, color: COLORS.neonGreen, width: 22 },
  modalCandText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
});
