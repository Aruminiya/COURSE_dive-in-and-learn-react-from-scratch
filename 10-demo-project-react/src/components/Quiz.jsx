import { useCallback, useState, useRef } from "react";

import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";

import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const shuffledAnswers = useRef(0);
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = activeQuestionIdex === QUESTIONS.length;
  
  const handelSelectAnswer = useCallback((selectedAnswer) => {
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIdex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000)
    }, 1000)
  }, [activeQuestionIdex]);

  const handleSkipAnswer = useCallback(() => handelSelectAnswer(null), [handelSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  };

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIdex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5 );
  };

  
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIdex} timeout={10000} onTimeout={handleSkipAnswer}/>
        {/*
          在 React 中，`key` 屬性主要用於列表中的元素，
          以幫助 React 識別哪些項目發生了變化、被添加或被移除。
          然而，`key` 屬性也可以用於強制重新渲染組件，即使該組件不是列表的一部分。
          當 `key` 屬性改變時，React 會銷毀舊的組件並創建一個新的組件。
        */}
        <h2>{QUESTIONS[activeQuestionIdex].text}</h2>
        <ul id="answers">
        {shuffledAnswers.current.map(answer => {
          const isSelected = userAnswers[userAnswers.length - 1] === answer
          let cssClass = '';

          if (answerState === 'answered' && isSelected) {
            cssClass = 'selected';
          };

          if ((answerState === 'correct' || answerState === 'wrong') && isSelected ) {
            cssClass = answerState;
          };

          return <li key={answer} className="answer">
            <button onClick={() => handelSelectAnswer(answer)} className={cssClass}>
              {answer}
            </button>
          </li>;
        })}
        </ul>
      </div>      
    </div>
  );
};