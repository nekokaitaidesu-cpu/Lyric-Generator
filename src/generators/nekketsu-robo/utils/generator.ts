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

function filterUsed(pool: string[], used: Set<string>, minRequired: number): string[] {
  const available = pool.filter((p) => !used.has(p));
  return available.length >= minRequired ? available : pool;
}

export function getCandidatesForSection(
  sectionType: SectionType,
  lineIndex: number,
  isFirstChorus: boolean = false,
  usedPhrases: Set<string> = new Set(),
): string[] {
  switch (sectionType) {
    case 'intro':
      return pickRandomN([
        '(熱いブラスイントロ)',
        '(ドラムフィル → ギターリフ)',
        '(警報音 → エンジン起動音)',
        '(合体バンク → タイトルコール)',
        pickRandom(ENGLISH_HOOKS),
      ], 3);

    case 'chorus': {
      if (lineIndex === 0) {
        return pickRandomN(CHORUS_ENGLISH_LINES, 3);
      }
      if (lineIndex === 3) {
        return getChorusEndingCandidates(isFirstChorus);
      }
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
        '(サビリピート → シャウト)',
        '(ブラス → フェードアウト)',
        pickRandom(ENGLISH_HOOKS),
        pickRandom(CHORUS_JAPANESE_LINES),
      ], 3);

    default:
      return pickRandomN(JAPANESE_PHRASES, 3);
  }
}

function getChorusEndingCandidates(isFirstChorus: boolean): string[] {
  if (isFirstChorus) {
    const burningVariants = CHORUS_ENDING_ENGLISH.filter((e) =>
      e.startsWith('BURNING')
    );
    const others = CHORUS_ENDING_ENGLISH.filter((e) => !e.startsWith('BURNING'));
    const picked = [pickRandom(burningVariants), ...pickRandomN(others, 2)];
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
Hot-blooded Super Robot Anime OP, Hard Rock, Brass Section, Power Vocals, Male Choir, Fast Tempo, 80s-90s Anime Style, Dramatic, Heroic March, Heavy Guitar Riff, Trumpet Fanfare, Explosive Energy, Don't sing text in parentheses`;

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
      lyrics += '(合いの手: セイヤー! ソイヤー!)\n';
    }
  }

  return `${style}\n\n${titleSection}\n\n${lyrics}`;
}
