import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { QuestionItem } from '../components/QuestionItem';
import { Text } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  let scrollView: any;

  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  const [answers, updateAnswers] = useState<boolean[]>([]);

  const fetchData: () => Promise<void> = async () => {
    const result: any = await axios('https://opentdb.com/api.php?amount=5');
    const items = result.data.results;
    for (let i = 0; i < items.length; i++) {
      items[i].answers = randomizeAnswers([...items[i].incorrect_answers, items[i].correct_answer]);
    }
    setQuestions(items);
    setLoading(false);
  };

  const randomizeAnswers = (answers: any[]) => {
    //https://github.com/coolaj86/knuth-shuffle
    var currentIndex = answers.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex], answers[currentIndex]];
    }

    return answers;
  }

  const onAnswer = (isCorrect: boolean) => {
    updateAnswers(arr => [...arr, isCorrect]);
    if (answers.length + 1 === 5) {
      updateLocalStats();
      scrollView.scrollToEnd();
    }
  }

  const updateLocalStats = async () => {
    try {
      const numberOfGames = await AsyncStorage.getItem('@numberOfGames');
      const correctAnswers = await AsyncStorage.getItem('@correctAnswers');
      await AsyncStorage.setItem('@numberOfGames', (numberOfGames ? Number(numberOfGames) + 1 : 1).toString());
      await AsyncStorage.setItem('@correctAnswers', (correctAnswers ? Number(correctAnswers) + answers.filter(Boolean).length : answers.filter(Boolean).length).toString());      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      ref={ref => scrollView = ref}
      style={{paddingVertical: 20, flex: 1}}
      contentContainerStyle={styles.container}>
        {!loading ? (
          <>
            {questions.map((question: any, index: number) => <QuestionItem question={question} key={index} onAnswer={(isCorrect: boolean) => onAnswer(isCorrect)} />)}
            {answers.length === 5 && (
              <Text style={styles.correctAnswersText}>{answers.filter(Boolean).length}/5 Correct</Text>
            )}
            <TouchableOpacity testID="startGameButton" onPress={() => {
              updateAnswers([]);
              setQuestions([]);
              setGameInProgress(true);
              fetchData();
              setLoading(true);
            }}>
              <Text style={styles.startGameButtonText}>{answers.length === 5 ? 'Play again' : 'Start a new round'}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  startGameButtonText: {
    fontSize: 20,
    padding: 20,
    backgroundColor: 'red',
    color: 'white',
  },
  correctAnswersText: {
    fontSize: 24,
    margin: 20,
    marginTop: 200,
  },
});
