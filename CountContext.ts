import {createContext} from 'react';

export const CountContext = createContext({
  questionsAnswered: 0,
  correctAnswers: 0,
});
