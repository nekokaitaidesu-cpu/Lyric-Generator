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
    'Lo-fi, Dream Pop, Acoustic Guitar, Soft Female Vocals, 80bpm, Chill, Warm, Nostalgic, School Days vibes',
  norinori:
    'J-Pop, Synth Pop, Dance, Up-tempo, 128bpm, Energetic, Catchy, Bright, Cheerful, School Days vibes',
};
