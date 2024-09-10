import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({userAnswers}) {
  const skippendAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

  const skippendAnswersShare = Math.round((skippendAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);

  const wrongAnswersShare = 100 - skippendAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippendAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let cssClass = "user-answer";

            if (answer === null) {
              cssClass += ' skipped';
            } else if (answer === QUESTIONS[index].answers[0]) {
              cssClass += ' correct'
            } else {
              cssClass += ' wrong'
            };

            return <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
              {/* 在 JavaScript 和 TypeScript 中，`??` 是「Nullish Coalescing Operator」（空值合併運算符）。它的作用是當左邊的操作數為 `null` 或 `undefined` 時，返回右邊的操作數。否則，返回左邊的操作數。 */}
            </li>
          })
        }
      </ol>
    </div>
  );
};