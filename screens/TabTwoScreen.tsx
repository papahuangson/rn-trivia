import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [numberOfGames, setNumberOfGames] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    updateLocalStats();
  });

  const updateLocalStats = async () => {
    try {
      setNumberOfGames(Number(await AsyncStorage.getItem('@numberOfGames')));
      setCorrectAnswers(Number(await AsyncStorage.getItem('@correctAnswers')));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}><Text style={styles.value}>{numberOfGames}</Text> Games Played</Text>
      <Text style={styles.text}><Text style={styles.value}>{correctAnswers} / {numberOfGames * 5}</Text> questions answered correctly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 20,
  },
  value: {
    fontSize: 24,
    color: 'red',
    paddingRight: 20,
  },
});
