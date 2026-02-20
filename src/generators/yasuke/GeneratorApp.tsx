import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StructurePattern, Section, VocalType } from './types';
import { createSectionsFromPattern } from './data/structures';
import { generateTitle } from './utils/generator';
import { COLORS } from './utils/theme';

import HomeScreen from './screens/HomeScreen';
import StructureScreen from './screens/StructureScreen';
import StructureBuilderScreen from './screens/StructureBuilderScreen';
import WizardScreen from './screens/WizardScreen';
import ReviewScreen from './screens/ReviewScreen';
import TitleScreen from './screens/TitleScreen';
import ExportScreen from './screens/ExportScreen';

type Screen = 'home' | 'structure' | 'builder' | 'wizard' | 'review' | 'title' | 'export';

interface Props {
  onBackToHub: () => void;
}

export default function GeneratorApp({ onBackToHub }: Props) {
  const [screen, setScreen] = useState<Screen>('home');
  const [pattern, setPattern] = useState<StructurePattern | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [title, setTitle] = useState('');
  const [vocalType, setVocalType] = useState<VocalType>('male');

  const handleStart = (vocal: VocalType) => {
    setVocalType(vocal);
    setScreen('structure');
  };

  const handleSelectPattern = (p: StructurePattern) => {
    setPattern(p);
    setSections(createSectionsFromPattern(p));
    setTitle(generateTitle());
    setScreen('wizard');
  };

  const handleSelectZero = () => setScreen('builder');

  const handleBuilderComplete = (builtSections: Section[]) => {
    setPattern({
      id: 'zero',
      name: '陣形・自由',
      description: 'Custom structure',
      sections: builtSections.map((s) => s.type),
    });
    setSections(builtSections);
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
      case 'wizard':
        return (
          <WizardScreen
            sections={sections}
            onComplete={handleWizardComplete}
            onBack={() => setScreen(pattern?.id === 'zero' ? 'builder' : 'structure')}
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
            vocalType={vocalType}
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
