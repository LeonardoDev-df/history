import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from '../../components/Question/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles';
import { Box } from './Box';
import { Flex } from './Flex';

import {
    SectionFour,
    LayingMan,
    Quizback,
    Quizhist,

} from '../../styles/pages/Home'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (

    <>
    <div className="App">
      <h1>Basic flexbox</h1>
      <Flex
        padding={3}
        bgColor="pink"
        height="200px"
        container
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Box bgColor="green" />
        <Box width="200px" />
        <Box bgColor="orange" />
      </Flex>

      <h1>Flex, Flex Grow, Flex Basis, Flex Shrink</h1>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        container
        bgColor="gray"
        margin={[0, 0, 0, 5]}
      >
        <Flex flex="10 2 400px">
          <Box width="auto" height="300px" bgColor="red" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex alignSelf="end" flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
      </Flex>

      <h1>Pushing Away</h1>

      <Flex container>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex pushRight margin={0.5}>
          <Box bgColor="red" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="red" />
        </Flex>
      </Flex>

      <h1>Pushed column</h1>
      <Flex container direction="column" height="500px">
        <Flex>
          <Box />
        </Flex>
        <Flex>
          <Box />
        </Flex>
        <Flex pushDown>
          <Box bgColor="red" />
        </Flex>
      </Flex>
    </div>
      <GlobalStyle />
      <Wrapper>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>


    </>

  );
};

export default App;
