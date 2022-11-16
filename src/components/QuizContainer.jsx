import React from "react";

import QuizHeader from "./QuizHeader";
import QuizSelectionArea from "./QuizSelectionArea";
import BaseButton from "./ui/BaseButton";
import BaseSpinner from "./ui/BaseSpinner";

function QuizContainer({
  optionSelection,
  cleanQuiz,
  gameStart,

  quizInfo,
}) {
  const { cuestionCountry, displayResults, gameStarted, isLoading } = quizInfo;

  const anwserName = cuestionCountry && cuestionCountry.capital;

  if (!isLoading) {

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

      } else {
        return (
          <div className="quiz-container">
                <QuizHeader
                  cuestionCountry={cuestionCountry}
                  displayResults={displayResults}
                  gameStarted={gameStarted}
                />
      
                <BaseSpinner />
          </div>
        );
      
      }
}

export default QuizContainer;
