import ReactDOM from 'react-dom';
import App from './App';

import React, { useState } from 'react';
import { fetchQuizQuestions } from './App';
// types
import { QuestionsState, Difficulty } from './App';

import {
    useContext,
    useRef,
    useEffect,
    useCallback,
    FocusEvent
} from 'react'
import { ActionMeta, GroupTypeBase, OptionTypeBase } from 'react-select'
import { FormHandles, SubmitHandler } from '@unform/core'
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import * as Yup from 'yup'
import axios from 'axios'

import {
    Container,
    Paper,
    FormGroup,
    StButton,
    Copy,
    StForm,
    FormInputContainer
} from '../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../components/layouts/sidebar-layout-quiz'
import getValidationErrors from '../../../../utils/getValidationErrors'
import { sortArrayObject } from '../../../../utils/sortArrayObject'
import { asyncHandler } from '../../../../utils/asyncHandler'
import { InputMask } from '../../../../components/InputMask'
import { FileForm } from '../../../../components/FileForm'
import { AUTH_TOKEN_KEY } from '../../../../contexts/auth'
import { Loading } from '../../../../components/Loading'
import { Select } from '../../../../components/Select'
import { useToast } from '../../../../hooks/use-toast'
import { Input } from '../../../../components/Input'
import Head from '../../../../infra/components/Head'


export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };

  const TOTAL_QUESTIONS = 10;


type OptionProps = readonly (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[]

type FormSiteData = {
    siteName: string
    zipCode: string
    streetAddress: string
    number: string
    complement: string
    province: string
    city: string
    uf: string
}

function Upload() {


    const [isLoading, setIsLoading] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<FormHandles>(null)
    const [ quizes, setQuizes] = useState([])


    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
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

      const startQuizButton = (e) => {
        e.preventDefault()

        setQuizes([...quizes, ""]);
        setShow((s) => !s)
    };



    return (
        <Container>
            <Head title="Quiz | RV History" />


                    <React.StrictMode >
                     <App  />

                    </React.StrictMode>



        </Container>
    )
}

Upload.Layout = SidebarLayout

export default Upload










