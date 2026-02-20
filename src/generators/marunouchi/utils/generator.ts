import {
  VERSE_LINES_A, VERSE_LINES_B, VERSE_LINES_C, VERSE_LINES_D,
  PRECHORUS_LINES_A, PRECHORUS_LINES_B, PRECHORUS_LINES_C, PRECHORUS_LINES_D,
  CHORUS_LINES_A, CHORUS_LINES_B, CHORUS_LINES_C, CHORUS_LINES_D,
  CHORUS_LINES_E, CHORUS_LINES_F, CHORUS_LINES_G,
  OUTRO_LINES_A, OUTRO_LINES_B, OUTRO_LINES_C, OUTRO_LINES_D,
  INTRO_LINES_A, INTRO_LINES_B, BRIDGE_LINES,
  TITLE_STARTERS, TITLE_ENDERS,
} from '../data/dictionary';
import { Section, SectionType, StyleOption, STYLE_PROMPTS } from '../types';

// ---------- helpers ----------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickUnique<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

// ---------- pool map ----------

/** Returns the phrase pool for a given section type + line index */
function getPool(type: SectionType, lineIndex: number): string[] {
  switch (type) {
    case 'intro':
      return lineIndex === 0 ? INTRO_LINES_A : INTRO_LINES_B;
    case 'verse': {
      const pools = [VERSE_LINES_A, VERSE_LINES_B, VERSE_LINES_C, VERSE_LINES_D];
      return pools[lineIndex % pools.length];
    }
    case 'pre-chorus': {
      const pools = [PRECHORUS_LINES_A, PRECHORUS_LINES_B, PRECHORUS_LINES_C, PRECHORUS_LINES_D];
      return pools[lineIndex % pools.length];
    }
    case 'chorus': {
      const pools = [
        CHORUS_LINES_A, CHORUS_LINES_B, CHORUS_LINES_C, CHORUS_LINES_D,
        CHORUS_LINES_E, CHORUS_LINES_F, CHORUS_LINES_G,
      ];
      return pools[lineIndex % pools.length];
    }
    case 'bridge':
      return BRIDGE_LINES;
    case 'outro': {
      const pools = [OUTRO_LINES_A, OUTRO_LINES_B, OUTRO_LINES_C, OUTRO_LINES_D];
      return pools[lineIndex % pools.length];
    }
  }
}

/** Returns 3 unique candidate phrases for a section line */
export function getCandidatesForSection(section: Section, lineIndex: number): string[] {
  const pool = getPool(section.type, lineIndex);
  const existing = section.lines.filter(Boolean);
  // Prefer phrases not already used in this section
  const fresh = pool.filter((p) => !existing.includes(p));
  const source = fresh.length >= 3 ? fresh : pool;
  return pickUnique(source, 3);
}

/** Returns a single random phrase from the appropriate pool */
export function getRandomPhrase(section: Section, lineIndex: number): string {
  return pick(getPool(section.type, lineIndex));
}

// ---------- title generation ----------

export function generateTitleWords(): [string, string] {
  return [pick(TITLE_STARTERS), pick(TITLE_ENDERS)];
}

export function generateTitle(): string {
  const [s, e] = generateTitleWords();
  return `${s}${e}`;
}

// ---------- suno prompt ----------

export function generateSunoPrompt(
  title: string,
  sections: Section[],
  style: StyleOption
): string {
  const styleStr = STYLE_PROMPTS[style];
  const lyricsBlock = sections
    .map((s) => {
      const metaLine = s.metaTags.map((t) => t).join(' ');
      const linesBlock = s.lines
        .map((l) => (l === '（スキップ）' ? '' : (l.trim() ? l : '（未入力）')))
        .join('\n');
      return `[${s.label}]\n${metaLine}\n${linesBlock}`;
    })
    .join('\n\n');

  return `[Style of Music]\n${styleStr}\n\n[Title]\n${title}\n\n${lyricsBlock}`;
}
