import React from "react";

import logoQuiz from "../img/undraw_adventure_4hum 1.svg";
import logoResults from "../img/undraw_winners_ao2o 2.svg";

function QuizHeader({ cuestionCountry, displayResults, gameStarted }) {
  const logo = displayResults === false ? logoQuiz : logoResults;

  if (gameStarted === true) {
    return (
      <div className="quiz-header">
        <div className="img-header-container">
          <img className="img-header" src={logo} alt="icon" />
        </div>
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
    );
  } else {
    return (
      <div className="quiz-header">
        <div className="img-header-container">
          <img className="img-header" src={logo} alt="icon" />
        </div>
        <h1 className="title">Country Quiz</h1>

        <h2>Select The Mode</h2>
      </div>
    );
  }
}

export default QuizHeader;
