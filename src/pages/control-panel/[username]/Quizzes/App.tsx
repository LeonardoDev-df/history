import React, { useState,  useRef } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from '../../../../components/Question/QuestionCard';
// types
import { QuestionsState, Difficulty } from './API';

// Styles
import { GlobalStyle, Wrapper } from './App.styles';

import { Loading } from '../../../../components/Loading'
import { Select } from '../../../../components/Select'
import { Input } from '../../../../components/Input'

import background from "../../../../assets/laptops.png";


import {
    Container,
    PaperStart,
    StFormStart,
    FormGroup,
    StButton,
    Copy,
    StForm,
    FormInputContainer
} from '../../../../styles/pages/shared/control-panel.styles'





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
  const divRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<FormHandles>(null)
  { /* Apagar um campo */ }
  const [show, setShow] = useState(true);



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

    const [isLoading, setIsLoading] = useState(false)


    // execute the script above in a useEffect to garantee that is in client-side




      const startQuizButton = (e) => {
        e.preventDefault()

        setShow((s) => !s)
    };

    const optionsCategory = [
        { value: 'Sítio', label: 'Sítio' },
        { value: 'Monumento', label: 'Monumento' },
        { value: 'Museu', label: 'Museu' }
      ];
    const optionsDificulty = [
        { value: 'Facil', label: 'Fácil' },
        { value: 'Medio', label: 'Médio' },
        { value: 'Dificil', label: 'Difícil' }
      ];



  return (
    <>


             <GlobalStyle />
                <Wrapper>

                    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <>

                        <PaperStart ref={divRef}>
                            <h1>Quiz History</h1>
                        <StFormStart ref={formRef}>

                            <FormGroup mult={true}>

                                <FormInputContainer gridColumn="2 / 4" id="apelido">
                                    <label htmlFor="complement" id="category">Informe seu apelido</label>
                                    <Input name="complement" id="complement" />
                                </FormInputContainer>

                            </FormGroup>

                            <FormGroup mult={true}>

                                        <div id="category">
                                            <label htmlFor="uf" id="category">Selecione a Categoria</label>

                                            <Select
                                                options={optionsCategory}
                                                name="uf"
                                                id="category"
                                                instanceId="uf"
                                                // isSearchable
                                                onChange={''}
                                                placeholder="Selecione..."
                                            />
                                        </div>

                                    </FormGroup>
                                    <FormGroup mult={true}>

                                    <div id="category">
                                            <label htmlFor="city" id="category">Selecione a dificuldade</label>

                                            <Select
                                                options={optionsDificulty}
                                                name="city"
                                                id="category"
                                                instanceId="city"
                                                placeholder="Selecione..."
                                            />
                                        </div>

                                    </FormGroup>
                                    <button className='start' onClick={startTrivia}>
                                         Start
                                     </button>

                            </StFormStart>
                            <Loading isVisible={isLoading} />
                            <Copy>&copy; 2021 RVHistory. All right reserved.</Copy>
                        </PaperStart>


                    </>


                    ) : null}
                    {!gameOver ? <>
                    <p className='welcome'>Bem vindo: Leonardo!</p>
                    <p className='score'>Score: {score}</p>
                    </>: null}
                    {loading ? <>
                     <p>Loading Questions...</p>
                    </>: null}
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
                    <>
                    <button className='next' onClick={nextQuestion}>
                        Next Question
                    </button>
                    </>

                    ) : null}
                </Wrapper>




    </>
  );
};

export default App;
