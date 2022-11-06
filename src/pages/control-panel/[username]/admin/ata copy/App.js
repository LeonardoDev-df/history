import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState, useCallback, useMemo, useContext } from 'react'
import { useContextSelector } from 'use-context-selector'
import { ThemeContext } from 'styled-components'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Column } from 'react-table'
import { useRouter } from 'next/router'
import axios, { AxiosResponse } from 'axios'

import {
    Container,
    Paper,
    Copy,
    ActionButtonContainer,
    ActButton,
    StEye,
    StTrash,
    ModalCloseButton,
    StClose,
    ModalContainer,
    StButton
} from '../../../../../styles/pages/shared/control-panel.styles'
import { SidebarLayout } from '../../../../../components/layouts/sidebar-layout'
import { AUTH_TOKEN_KEY, AuthContext } from '../../../../../contexts/auth'
import { asyncHandler } from '../../../../../utils/asyncHandler'
import { IUser } from '../../../../../shared/model/user.model'
import { getAPIClient } from '../../../../../services/axios'
import { useToast } from '../../../../../hooks/use-toast'
import { Table } from '../../../../../components/Table'
import { Modal } from '../../../../../components/Modal'
import Head from '../../../../../infra/components/Head'

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/result">
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
