import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {decode} from 'html-entities';

export function QuestionItem(props: {question: any, onAnswer: any}) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  return (
    <View style={[styles.questionContainer, Platform.OS === 'android' ? {elevation: 8} : styles.iosShadow]} key={props.question}>
        {!isCorrect && !isIncorrect ? (
          <>
            <Text style={styles.categoryText}>{props.question.category}</Text>
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
                    <Text>{decode(choice)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
          </>
        ) : (
          <>
            <View style={styles.correctContainer}>
              <Text>{isCorrect ? 'Yep!\n' : 'Nope!\n'}The correct answer is {decode(props.question.correct_answer)}</Text>
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
  categoryText: {
    alignSelf: 'center',
    fontSize: 24,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: 'red',
    color: 'white',
  },
  questionText: {
    paddingVertical: 20,
    alignSelf: 'center',
  },
  answerContainer: {
    alignItems: 'center',
  },
  answerButton: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 15,
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  correctContainer: {
    textAlign: 'center',
    padding: 20,
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
