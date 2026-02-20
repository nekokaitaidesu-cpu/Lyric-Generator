import { StructurePattern, Section, SectionType } from '../types';

export const STRUCTURE_PATTERNS: StructurePattern[] = [
  {
    id: 'pattern_alpha',
    name: 'PATTERN A',
    description: 'Verse → Verse 2 → Pre-Chorus → Chorus → Outro',
    sections: ['verse', 'verse', 'pre-chorus', 'chorus', 'outro'],
  },
  {
    id: 'pattern_beta',
    name: 'PATTERN B',
    description: 'Verse → Pre-Chorus → Chorus → Verse 2 → Chorus → Outro',
    sections: ['verse', 'pre-chorus', 'chorus', 'verse', 'chorus', 'outro'],
  },
];

export const SECTION_CONFIG: Record<
  SectionType,
  { label: string; maxLines: number; metaTags: string[] }
> = {
  intro: {
    label: 'Intro',
    maxLines: 2,
    metaTags: [ '(Bass: Groovy intro riff)'],
  },
  verse: {
    label: 'Verse',
    maxLines: 4,
    metaTags: ['(Cynical, Disconnected, Urban)'],
  },
  'pre-chorus': {
    label: 'Pre-Chorus',
    maxLines: 4,
    metaTags: ['(緊張感上昇)'],
  },
  chorus: {
    label: 'Chorus',
    maxLines: 4,
    metaTags: [
      '(Full band, Swing beat)',
    ],
  },
  bridge: {
    label: 'Bridge',
    maxLines: 3,
    metaTags: ['(Jazz breakdown, Piano solo)'],
  },
  outro: {
    label: 'Outro',
    maxLines: 4,
    metaTags: ['(フェードアウト)'],
  },
};

export const ALL_SECTION_TYPES: SectionType[] = [
  'intro',
  'verse',
  'pre-chorus',
  'chorus',
  'bridge',
  'outro',
];

export function createSectionsFromPattern(pattern: StructurePattern): Section[] {
  const counts: Record<string, number> = {};
  return pattern.sections.map((type) => {
    const config = SECTION_CONFIG[type];
    counts[type] = (counts[type] || 0) + 1;
    const suffix = counts[type] > 1 ? ` ${counts[type]}` : '';
    return {
      type,
      label: `${config.label}${suffix}`,
      lines: Array(config.maxLines).fill(''),
      maxLines: config.maxLines,
      metaTags: [...config.metaTags],
    };
  });
}

export function createSectionFromType(
  type: SectionType,
  existingSections: Section[]
): Section {
  const config = SECTION_CONFIG[type];
  const count = existingSections.filter((s) => s.type === type).length + 1;
  const suffix = count > 1 ? ` ${count}` : '';
  return {
    type,
    label: `${config.label}${suffix}`,
    lines: Array(config.maxLines).fill(''),
    maxLines: config.maxLines,
    metaTags: [...config.metaTags],
  };
}
