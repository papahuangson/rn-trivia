import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CountContext } from './CountContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [count, setCount] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CountContext.Provider value={count}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CountContext.Provider>
      </SafeAreaProvider>
    );
  }
}
