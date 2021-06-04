import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {decode} from 'html-entities';

export function QuestionItem(props: {question: any, onAnswer: any}) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  return (
    <View style={[styles.questionContainer, Platform.OS === 'android' ? {elevation: 8} : styles.iosShadow]} key={props.question}>
        {!isCorrect && !isIncorrect ? (
          <>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{props.question.category}</Text>
            </View>
            <Text style={styles.questionText}>{decode(props.question.question)}</Text>
            <View style={styles.answerContainer}>
              {props.question.answers.map((choice: any) => (
                <TouchableOpacity
                  key={choice}
                  style={styles.answerButton}
                  onPress={() => {
                    choice === props.question.correct_answer ? setIsCorrect(true) : setIsIncorrect(true);
                    props.onAnswer(choice === props.question.correct_answer);
                  }}>
                  <Text style={styles.answerText}>{decode(choice)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            <View style={styles.correctContainer}>
              <Text style={styles.correctText}>{isCorrect ? 'Yep!' : 'Nope!'}{'\n\n'}The correct answer is {decode(props.question.correct_answer)}</Text>
            </View>
          </>
        )}
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: Platform.OS === 'android' ? '#3185FC' : '#111D4A',
  },
  categoryText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  questionText: {
    paddingVertical: 20,
    textAlign: 'center',
  },
  answerContainer: {
    alignItems: 'center',
  },
  answerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Platform.OS === 'android' ? '#F9DC5C' : '#FFCF99',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
    margin: 5,
  },
  answerText: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correctContainer: {
    padding: 20,
  },
  correctText: {
    textAlign: 'center',
    color: 'black',
  },
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
});
