import React from "react";

import QuizHeader from "./QuizHeader";
import QuizSelectionArea from "./QuizSelectionArea";

function QuizContainer({
  optionSelection,
  cleanQuiz,
  gameStart,

  quizInfo,
}) {
  const { cuestionCountry, displayResults, gameStarted } = quizInfo;

  const anwserName = cuestionCountry && cuestionCountry.capital;

  return (
    <div className="quiz-container">
      <QuizHeader
        cuestionCountry={cuestionCountry}
        displayResults={displayResults}
        gameStarted={gameStarted}
      />

      <QuizSelectionArea
        quizInfo={quizInfo}
        anwserName={anwserName}
        optionSelection={optionSelection}
        cleanQuiz={cleanQuiz}
        gameStart={gameStart}
      />
    </div>
  );
}

export default QuizContainer;
