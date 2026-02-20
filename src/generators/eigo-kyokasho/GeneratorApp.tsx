import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StructurePattern, Section, StyleOption } from './types';
import { createSectionsFromPattern } from './data/structures';
import { generateTitle } from './utils/generator';
import { COLORS } from './utils/theme';

import HomeScreen from './screens/HomeScreen';
import StructureScreen from './screens/StructureScreen';
import StructureBuilderScreen from './screens/StructureBuilderScreen';
import StyleSelectionScreen from './screens/StyleSelectionScreen';
import WizardScreen from './screens/WizardScreen';
import ReviewScreen from './screens/ReviewScreen';
import TitleScreen from './screens/TitleScreen';
import ExportScreen from './screens/ExportScreen';

type Screen =
  | 'home'
  | 'structure'
  | 'builder'
  | 'style'
  | 'wizard'
  | 'review'
  | 'title'
  | 'export';

interface Props {
  onBackToHub: () => void;
}

export default function GeneratorApp({ onBackToHub }: Props) {
  const [screen, setScreen] = useState<Screen>('home');
  const [pattern, setPattern] = useState<StructurePattern | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [style, setStyle] = useState<StyleOption>('yururi');
  const [title, setTitle] = useState('');

  const handleStart = () => setScreen('structure');

  const handleSelectPattern = (p: StructurePattern) => {
    setPattern(p);
    setSections(createSectionsFromPattern(p));
    setScreen('style');
  };

  const handleSelectZero = () => setScreen('builder');

  const handleBuilderComplete = (builtSections: Section[]) => {
    setPattern({
      id: 'zero',
      name: 'PATTERN C',
      description: 'Custom structure',
      sections: builtSections.map((s) => s.type),
    });
    setSections(builtSections);
    setScreen('style');
  };

  const handleStyleSelect = (s: StyleOption) => {
    setStyle(s);
    setTitle(generateTitle());
    setScreen('wizard');
  };

  const handleWizardComplete = (updatedSections: Section[]) => {
    setSections(updatedSections);
    setScreen('review');
  };

  const handleRestart = () => {
    setScreen('home');
    setPattern(null);
    setSections([]);
    setStyle('yururi');
    setTitle('');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onStart={handleStart} onBackToHub={onBackToHub} />;

      case 'structure':
        return (
          <StructureScreen
            onSelect={handleSelectPattern}
            onSelectZero={handleSelectZero}
            onBack={() => setScreen('home')}
          />
        );

      case 'builder':
        return (
          <StructureBuilderScreen
            onComplete={handleBuilderComplete}
            onBack={() => setScreen('structure')}
          />
        );

      case 'style':
        return (
          <StyleSelectionScreen
            onSelect={handleStyleSelect}
            onBack={() =>
              setScreen(pattern?.id === 'zero' ? 'builder' : 'structure')
            }
          />
        );

      case 'wizard':
        return (
          <WizardScreen
            sections={sections}
            onComplete={handleWizardComplete}
            onBack={() => setScreen('style')}
          />
        );

      case 'review':
        return (
          <ReviewScreen
            sections={sections}
            onUpdate={setSections}
            onNext={() => setScreen('title')}
            onBack={() => setScreen('wizard')}
          />
        );

      case 'title':
        return (
          <TitleScreen
            title={title}
            onUpdate={setTitle}
            onNext={() => setScreen('export')}
            onBack={() => setScreen('review')}
          />
        );

      case 'export':
        return (
          <ExportScreen
            title={title}
            sections={sections}
            style={style}
            onBack={() => setScreen('title')}
            onRestart={handleRestart}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});
