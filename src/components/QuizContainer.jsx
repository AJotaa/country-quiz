import React from "react";

import OptionsList from "./OptionsList";
import BaseButton from "./ui/BaseButton";

function QuizContainer({
  cuestionCountry,
  // gameOver,
  displayResults,
  finalResult,
  anwserOptions,
  showAnwser,
  anwserName,

  optionSelection,
  // showResults,
  restartQuiz,
}) {
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="title">Country Quiz</h1>
        {cuestionCountry && displayResults === false ? (
          <h2 className="cuestion">
            The capital of
            <span className="cuestion-country">
              {` ${cuestionCountry.name} `}
            </span>
            <img
              className="country-flag"
              src={cuestionCountry.flag}
              alt={cuestionCountry.name}
            />{" "}
            is...
          </h2>
        ) : (
          <h2>Your Results Are Ready</h2>
        )}
      </div>

      {displayResults === false ? (
        <div className="selection-area">
          <OptionsList
            showAnwser={showAnwser}
            anwserName={anwserName}
            anwserOptions={anwserOptions}
            optionSelection={optionSelection}
          />
        </div>
      ) : (
        <div className="selection-area">
          <div className="results">
            <h3>{`${finalResult}%`}</h3>
          </div>
          <BaseButton action={restartQuiz}>Restart</BaseButton>
        </div>
      )}
    </div>
  );
}

export default QuizContainer;
