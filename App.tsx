import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';

import HubScreen from './src/screens/HubScreen';
import GWingApp from './src/generators/g-wing/GeneratorApp';
import NekketsuRoboApp from './src/generators/nekketsu-robo/GeneratorApp';
import YasukeApp from './src/generators/yasuke/GeneratorApp';
import MarunouchiApp from './src/generators/marunouchi/GeneratorApp';

type GeneratorId = 'g-wing' | 'nekketsu-robo' | 'yasuke' | 'marunouchi' | null;

export default function App() {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorId>(null);

  const handleBackToHub = () => setActiveGenerator(null);

  if (!activeGenerator) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#080810" />
        <HubScreen onSelect={setActiveGenerator} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080810" />
      {activeGenerator === 'g-wing' && (
        <GWingApp onBackToHub={handleBackToHub} />
      )}
      {activeGenerator === 'nekketsu-robo' && (
        <NekketsuRoboApp onBackToHub={handleBackToHub} />
      )}
      {activeGenerator === 'yasuke' && (
        <YasukeApp onBackToHub={handleBackToHub} />
      )}
      {activeGenerator === 'marunouchi' && (
        <MarunouchiApp onBackToHub={handleBackToHub} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080810',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
