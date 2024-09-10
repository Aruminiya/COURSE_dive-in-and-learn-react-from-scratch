import { useCallback, useState } from "react";

import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIdex = userAnswers.length;

  const quizIsComplete = activeQuestionIdex === QUESTIONS.length;
  
  const handelSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handelSelectAnswer(null), [handelSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  };
  
  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuestionIdex}
          index={activeQuestionIdex}
          onSelectAnswer={handelSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
        {/*
          在 React 中，`key` 屬性主要用於列表中的元素，
          以幫助 React 識別哪些項目發生了變化、被添加或被移除。
          然而，`key` 屬性也可以用於強制重新渲染組件，即使該組件不是列表的一部分。
          當 `key` 屬性改變時，React 會銷毀舊的組件並創建一個新的組件。
        */}
      </div>      
    </div>
  );
};