import { Section, SectionType } from '../types';
import {
  ENGLISH_HOOKS,
  ENGLISH_STARTERS,
  ENGLISH_WORDS,
  JAPANESE_NOUNS,
  JAPANESE_VERBS,
  JAPANESE_PHRASES,
  VERSE_PHRASES,
  PRECHORUS_PHRASES,
  CHORUS_ENGLISH_LINES,
  CHORUS_JAPANESE_LINES,
  CHORUS_ENDING_ENGLISH,
  BRIDGE_PHRASES,
  TITLE_STARTERS,
  TITLE_ENDERS,
} from '../data/dictionary';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/**
 * Filter out already-used phrases from the pool.
 * Returns filtered array, or falls back to full pool if too few remain.
 */
function filterUsed(pool: string[], used: Set<string>, minRequired: number): string[] {
  const available = pool.filter((p) => !used.has(p));
  return available.length >= minRequired ? available : pool;
}

/**
 * Get candidates for a section line.
 * @param isFirstChorus - true if this is the first chorus in the structure
 * @param usedPhrases - set of already-selected phrases (for verse/pre-chorus dedup)
 */
export function getCandidatesForSection(
  sectionType: SectionType,
  lineIndex: number,
  isFirstChorus: boolean = false,
  usedPhrases: Set<string> = new Set(),
): string[] {
  switch (sectionType) {
    case 'intro':
      return pickRandomN([
        '(Up-tempo Eurobeat Intro)',
        '(Orchestra Hits → Synth Riff)',
        '(Driving Synth Bass)',
        '(Digital Sound Effects)',
        pickRandom(ENGLISH_HOOKS),
      ], 3);

    case 'chorus': {
      // First line: always English starter
      if (lineIndex === 0) {
        return pickRandomN(CHORUS_ENGLISH_LINES, 3);
      }
      // Last line (index 3 for 4-line chorus): always English ending
      if (lineIndex === 3) {
        return getChorusEndingCandidates(isFirstChorus);
      }
      // Middle lines: mix
      if (lineIndex % 2 === 1) {
        return pickRandomN(CHORUS_JAPANESE_LINES, 3);
      }
      return pickRandomN([...CHORUS_ENGLISH_LINES, ...CHORUS_JAPANESE_LINES], 3);
    }

    case 'verse': {
      const available = filterUsed(VERSE_PHRASES, usedPhrases, 3);
      return pickRandomN(available, 3);
    }

    case 'pre-chorus': {
      const available = filterUsed(PRECHORUS_PHRASES, usedPhrases, 3);
      return pickRandomN(available, 3);
    }

    case 'bridge':
      return pickRandomN(BRIDGE_PHRASES, 3);

    case 'outro':
      return pickRandomN([
        '(Repeat Chorus Hook)',
        '(Fade Out with Synth)',
        pickRandom(ENGLISH_HOOKS),
        pickRandom(CHORUS_JAPANESE_LINES),
      ], 3);

    default:
      return pickRandomN(JAPANESE_PHRASES, 3);
  }
}

/**
 * Get chorus ending candidates (always English).
 * First chorus: SO FAR AWAY is guaranteed in the candidates.
 */
function getChorusEndingCandidates(isFirstChorus: boolean): string[] {
  if (isFirstChorus) {
    // Always include a SO FAR AWAY variant, plus 2 random others
    const soFarAwayVariants = CHORUS_ENDING_ENGLISH.filter((e) =>
      e.startsWith('SO FAR AWAY')
    );
    const others = CHORUS_ENDING_ENGLISH.filter((e) => !e.startsWith('SO FAR AWAY'));
    const picked = [pickRandom(soFarAwayVariants), ...pickRandomN(others, 2)];
    // Shuffle so SO FAR AWAY isn't always first
    return picked.sort(() => Math.random() - 0.5);
  }
  return pickRandomN(CHORUS_ENDING_ENGLISH, 3);
}

export function getRandomCandidate(sectionType: SectionType): string {
  if (sectionType === 'chorus') {
    return pickRandom(CHORUS_ENDING_ENGLISH);
  }
  const all = [
    ...ENGLISH_HOOKS,
    ...JAPANESE_PHRASES,
    ...CHORUS_ENGLISH_LINES,
    ...CHORUS_JAPANESE_LINES,
  ];
  return pickRandom(all);
}

export function generateTitle(): string {
  return `${pickRandom(TITLE_STARTERS)} ${pickRandom(TITLE_ENDERS)}`;
}

export function generateSunoPrompt(title: string, sections: Section[]): string {
  const style = `【Style】
Hi-NRG, Synthwave, Fast Tempo, Female Vocals, Syncopated Bassline, 90s Anime Style, Electronic Dance, Melodic, Bright Major Verse, Dramatic Minor Chorus, Heavy Dotted Rhythms, Repetitive Catchy Hook, Don't sing text in parentheses`;

  const titleSection = `【Title】\n${title}`;

  let lyrics = '【Lyrics】\n';
  for (const section of sections) {
    lyrics += `\n[${section.label}]\n`;
    for (const tag of section.metaTags) {
      lyrics += `${tag}\n`;
    }
    for (const line of section.lines) {
      if (line === '（スキップ）') {
        lyrics += '\n';
      } else if (line.trim()) {
        lyrics += `${line}\n`;
      }
    }
    if (section.type === 'chorus') {
      lyrics += '(Rhythm: Ta-aa, Ta-aa, Ta!)\n';
    }
  }

  return `${style}\n\n${titleSection}\n\n${lyrics}`;
}
