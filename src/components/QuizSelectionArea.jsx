import React, { Fragment } from "react";
import OptionsList from "./OptionsList";
import BaseButton from "./ui/BaseButton";

function QuizSelectionArea({
  anwserName,
  optionSelection,
  cleanQuiz,

  gameStart,
  quizInfo,
}) {
  const {
    gameStarted,
    anwserOptions,
    finalResult,
    displayResults,
    showAnwser,
  } = quizInfo;

  if (gameStarted === true) {
    return (
      <div className="selection-area">
        {displayResults === false ? (
          <OptionsList
            showAnwser={showAnwser}
            anwserName={anwserName}
            anwserOptions={anwserOptions}
            optionSelection={optionSelection}
          />
        ) : (
          <Fragment>
            <div className="results">
              <h3>{`${finalResult}%`}</h3>
            </div>
            <BaseButton action={cleanQuiz}>Restart</BaseButton>
            <BaseButton action={gameStart}>Menu</BaseButton>
          </Fragment>
        )}
      </div>
    );
  } else {
    return (
      <div className="selection-area">
        <BaseButton action={gameStart}>Start</BaseButton>
      </div>
    );
  }
}

export default QuizSelectionArea;
