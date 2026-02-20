import { StructurePattern, Section, SectionType } from '../types';

export const STRUCTURE_PATTERNS: StructurePattern[] = [
  {
    id: 'pattern1',
    name: '作戦A(アルファ)',
    description: 'Intro → Chorus → Verse → Pre-Chorus → Chorus',
    sections: ['intro', 'chorus', 'verse', 'pre-chorus', 'chorus'],
  },
  {
    id: 'pattern2',
    name: '作戦B(ブレイブ)',
    description: 'Chorus → Verse → Pre-Chorus → Chorus → Bridge → Chorus',
    sections: ['chorus', 'verse', 'pre-chorus', 'chorus', 'bridge', 'chorus'],
  },
];

export const SECTION_CONFIG: Record<SectionType, { label: string; maxLines: number; metaTags: string[] }> = {
  intro: {
    label: 'Intro',
    maxLines: 2,
    metaTags: ['(熱いブラスイントロ)', '(ドラムフィル → ギターリフ)'],
  },
  chorus: {
    label: 'Chorus',
    maxLines: 4,
    metaTags: [
      '(Key: Minor, Powerful, Fast, Dramatic)',
      '(ブラス全開・シャウト・合いの手)',
    ],
  },
  verse: {
    label: 'Verse',
    maxLines: 4,
    metaTags: ['(Key: Major, Melodic, Story-driven)', '(Rhythm: Steady March)'],
  },
  'pre-chorus': {
    label: 'Pre-Chorus',
    maxLines: 2,
    metaTags: ['(テンション上昇・ドラムロール)', '(Rhythm: Accelerating)'],
  },
  bridge: {
    label: 'Bridge',
    maxLines: 3,
    metaTags: ['(Breakdown, Emotional, ギターソロ)', '(Rhythm: Free, Dramatic)'],
  },
  outro: {
    label: 'Outro',
    maxLines: 2,
    metaTags: ['(最後の叫び)', '(リピート → フェードアウト)'],
  },
};

export function createSectionsFromPattern(pattern: StructurePattern): Section[] {
  const chorusCount: Record<string, number> = {};
  return pattern.sections.map((type) => {
    const config = SECTION_CONFIG[type];
    chorusCount[type] = (chorusCount[type] || 0) + 1;
    const suffix = chorusCount[type] > 1 ? ` ${chorusCount[type]}` : '';
    return {
      type,
      label: `${config.label}${suffix}`,
      lines: Array(config.maxLines).fill(''),
      maxLines: config.maxLines,
      metaTags: [...config.metaTags],
    };
  });
}

export function createSectionFromType(type: SectionType, existingSections: Section[]): Section {
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

export const ALL_SECTION_TYPES: SectionType[] = ['intro', 'verse', 'pre-chorus', 'chorus', 'bridge', 'outro'];
