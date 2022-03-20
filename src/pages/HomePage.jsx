import React, { Component } from "react";

import OptionsList from "../components/OptionsList";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: null,
      cuestionCountry: null,
      results: [],
      stage: 0,
      gameOver: false,
      displeyResults: false,
      finalResult: 0,
      anwserOptions: null,

      showAnwser: false,
    };

    this.getCountries = this.getCountries.bind(this);
    this.cuestionSelector = this.cuestionSelector.bind(this);
    this.optionSelection = this.optionSelection.bind(this);
    this.showResults = this.showResults.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }
  timeOut = 1500;

  componentDidMount() {
    this.getCountries();
  }

  async getCountries() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const loadCountries = await response.json();

    const independentCountries = loadCountries.filter((item) => {
      return item.independent === true;
    });

    const shuffledCountries = independentCountries.sort(function () {
      return 0.5 - Math.random();
    });
    const selectedCountries = shuffledCountries.slice(0, 50);

    const selectedCountriesInfo = selectedCountries.map((item) => {
      return {
        name: item.name.common,
        capital: item.capital[0],
        flag: item.flags.svg,
        fifa: item.fifa,
        continents: item.continents,
      };
    });

    this.setState({ countriesList: selectedCountriesInfo });

    this.cuestionSelector();
  }

  cuestionSelector() {
    const countriesList = this.state.countriesList;
    const max = countriesList && countriesList.length;
    const min = 0;

    let selector = Math.floor(Math.random() * (max - min) + min);

    const cuestionCountry = countriesList && countriesList[selector];

    const otherOptions =
      countriesList &&
      countriesList
        .filter((i) => {
          return i.name !== cuestionCountry.name;
        })
        .sort(function () {
          return 0.5 - Math.random();
        })
        .splice(0, 3);

    const anwserOptions = [cuestionCountry, ...otherOptions].sort(function () {
      return 0.5 - Math.random();
    });

    this.setState({
      cuestionCountry: cuestionCountry,
      anwserOptions: anwserOptions,
      showAnwser: false,
    });
  }

  optionSelection(value) {
    const { gameOver, cuestionCountry, results, stage } = this.state;

    if (gameOver === false) {
      let result;
      if (value === cuestionCountry.capital) {
        result = 1;
      } else result = 0;

      this.setState({
        results: [...results, result],
        stage: stage + 1,
        showAnwser: true,
      });

      if (stage >= 3) {
        setTimeout(
          () =>
            this.setState({
              gameOver: true,
            }),
          this.timeOut
        );
      } else {
        setTimeout(() => this.cuestionSelector(), this.timeOut);
      }
    }
  }

  async showResults() {
    const { results } = this.state;

    const calculateArray = results.reduce((prev, curr) => prev + curr);

    const calculateResults = Math.round(
      ((await calculateArray) * 100) / results.length
    );

    this.setState({
      displeyResults: true,
      finalResult: calculateResults,
    });
  }

  restartQuiz() {
    this.setState({
      cuestionCountry: null,
      otherOptions: null,
      results: [],
      stage: 0,
      gameOver: false,
      displeyResults: false,
      finalResult: 0,
    });

    this.cuestionSelector();
  }

  render() {
    const {
      cuestionCountry,
      gameOver,
      displeyResults,
      finalResult,
      anwserOptions,
      showAnwser,
    } = this.state;

    const anwserName = cuestionCountry && cuestionCountry.capital;

    console.log(cuestionCountry && cuestionCountry.flag);

    return (
      <section id="home-page">
        <div className="quiz-container">
          <div className="quiz-header">
            <h1 className="title">Country Quiz</h1>
            {cuestionCountry && (
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
            )}
          </div>

          {displeyResults === false ? (
            <div className="selection-area">
              {gameOver === false ? (
                <OptionsList
                  showAnwser={showAnwser}
                  anwserName={anwserName}
                  anwserOptions={anwserOptions}
                  optionSelection={this.optionSelection}
                />
              ) : (
                <button onClick={this.showResults}>show results</button>
              )}
            </div>
          ) : (
            <div className="results-area">
              <div className="results">
                <h3>{finalResult}</h3>
              </div>
              <button onClick={this.restartQuiz}>restart</button>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default HomePage;
