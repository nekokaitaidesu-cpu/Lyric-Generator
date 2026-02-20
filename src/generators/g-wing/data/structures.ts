import { StructurePattern, Section, SectionType } from '../types';

export const STRUCTURE_PATTERNS: StructurePattern[] = [
  {
    id: 'pattern1',
    name: 'PATTERN α',
    description: 'Intro → Chorus → Verse → Pre-Chorus → Chorus',
    sections: ['intro', 'chorus', 'verse', 'pre-chorus', 'chorus'],
  },
  {
    id: 'pattern2',
    name: 'PATTERN β',
    description: 'Chorus → Verse → Pre-Chorus → Chorus → Bridge → Chorus',
    sections: ['chorus', 'verse', 'pre-chorus', 'chorus', 'bridge', 'chorus'],
  },
];

export const SECTION_CONFIG: Record<SectionType, { label: string; maxLines: number; metaTags: string[] }> = {
  intro: {
    label: 'Intro',
    maxLines: 2,
    metaTags: ['(Up-tempo Eurobeat Intro)', '(Orchestra Hits)'],
  },
  chorus: {
    label: 'Chorus',
    maxLines: 4,
    metaTags: [
      '(Key: Minor, Powerful, Fast, Dramatic)',
      '(Rhythm: Ta-aa, Ta-aa, Ta pattern)',
    ],
  },
  verse: {
    label: 'Verse',
    maxLines: 4,
    metaTags: ['(Key: Major, Bright, Melodic)', '(Rhythm: Steady)'],
  },
  'pre-chorus': {
    label: 'Pre-Chorus',
    maxLines: 2,
    metaTags: ['(Building, Rising, Syncopated)', '(Rhythm: Accelerating)'],
  },
  bridge: {
    label: 'Bridge',
    maxLines: 3,
    metaTags: ['(Breakdown, Emotional, Half-tempo)', '(Rhythm: Free, Expressive)'],
  },
  outro: {
    label: 'Outro',
    maxLines: 2,
    metaTags: ['(Fade Out)', '(Repeat Hook)'],
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
