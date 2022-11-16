import React from "react";

import QuizHeader from "./QuizHeader";
import QuizSelectionArea from "./QuizSelectionArea";
import BaseButton from "./ui/BaseButton";

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
      {cuestionCountry ? (
        <>
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
        </>
      ) : (
        <>
          <h3>An error ocurred</h3>
          <BaseButton action={cleanQuiz}>Restart</BaseButton>
        </>
      )}
    </div>
  );
}

export default QuizContainer;
