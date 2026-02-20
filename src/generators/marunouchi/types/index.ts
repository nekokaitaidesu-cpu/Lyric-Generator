export type StyleOption = 'yururi' | 'norinori';

export type SectionType = 'intro' | 'chorus' | 'verse' | 'pre-chorus' | 'bridge' | 'outro';

export interface Section {
  type: SectionType;
  label: string;
  lines: string[];
  maxLines: number;
  metaTags: string[];
}

export interface StructurePattern {
  id: string;
  name: string;
  description: string;
  sections: SectionType[];
}

export interface LyricState {
  pattern: StructurePattern;
  sections: Section[];
  title: string;
  style: StyleOption;
  currentSectionIndex: number;
  currentLineIndex: number;
}

export const STYLE_PROMPTS: Record<StyleOption, string> = {
  yururi:
    'Acid Jazz, Neo Soul, Chill, Downtempo, Groovy Bass, Jazzy Piano, Laid-back, Mid-tempo, 95bpm, Female Vocals, R&B',
  norinori:
    'J-Pop, Jazz Rock, Piano Rock, Swing, Syncopated, Female Vocals, Groovy Bass, Fast Paced, 90s Japanese City Pop vibe, 100bpm, Expressive Ad-lib',
};
