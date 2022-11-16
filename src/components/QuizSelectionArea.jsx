import React, { Fragment } from "react";
import OptionsList from "./OptionsList";
import BaseButton from "./ui/BaseButton";
import BaseSpinner from "./ui/BaseSpinner";

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
    // cuestionCountry,
    // stage
    isLoading
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
            // stage={stage}
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
        { !isLoading ? <BaseButton action={gameStart}>Start</BaseButton> :
        <BaseSpinner />}
      </div>
    );
  }
}

export default QuizSelectionArea;
