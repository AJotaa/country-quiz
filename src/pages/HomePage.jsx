import React, { Component } from "react";

import QuizContainer from "../components/QuizContainer";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesList: null,
      cuestionCountry: null,
      anwserOptions: null,
      oldCuestions: [],
      results: [],
      stage: 0,
      finalResult: 0,
      displayResults: false,
      showAnwser: false,
      gameStarted: false,
    };

    this.getCountries = this.getCountries.bind(this);
    this.gameStart = this.gameStart.bind(this);
    this.cuestionSelector = this.cuestionSelector.bind(this);
    this.optionSelection = this.optionSelection.bind(this);
    this.showResults = this.showResults.bind(this);
    this.cleanQuiz = this.cleanQuiz.bind(this);
  }
  timeOut = 1500;

  componentDidMount() {
    this.getCountries();
  }

  async getCountries() {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  gameStart() {
    if (this.state.gameStarted === true) {
      this.cleanQuiz();
    }

    this.setState({
      gameStarted: !this.state.gameStarted,
    });
  }

  async cuestionSelector() {
    const { countriesList, oldCuestions } = this.state;
    const max = countriesList && countriesList.length;
    const min = 0;

    let selector = Math.floor(Math.random() * (max - min) + min);
    try {
      const cuestionCountry =
        (await countriesList) &&
        countriesList.filter((c) => {
          return oldCuestions.indexOf(c.name) === -1;
        })[selector];

      const otherOptions =
        (await cuestionCountry) && countriesList
          ? countriesList
              .filter((i) => {
                return i.name !== cuestionCountry.name;
              })
              .sort(function () {
                return 0.5 - Math.random();
              })
              .splice(0, 3)
          : [];

      const anwserOptions = [cuestionCountry, ...otherOptions].sort(
        function () {
          return 0.5 - Math.random();
        }
      );

      this.setState({
        cuestionCountry: cuestionCountry,
        anwserOptions: anwserOptions,
        showAnwser: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  optionSelection(value) {
    const { cuestionCountry, results, stage, oldCuestions } = this.state;

    let result;
    if (value === cuestionCountry.capital) {
      result = 1;
    } else result = 0;

    this.setState({
      results: [...results, result],
      oldCuestions: [...oldCuestions, cuestionCountry.name],
      stage: stage + 1,
      showAnwser: true,
    });

    if (stage >= 3) {
      setTimeout(() => this.showResults(), this.timeOut);
    } else {
      setTimeout(() => this.cuestionSelector(), this.timeOut);
    }
  }

  async showResults() {
    const { results } = this.state;

    const calculateArray = results.reduce((prev, curr) => prev + curr);

    const calculateResults = Math.round(
      ((await calculateArray) * 100) / results.length
    );

    this.setState({
      displayResults: true,
      finalResult: calculateResults,
    });
  }

  cleanQuiz() {
    this.setState({
      cuestionCountry: null,
      otherOptions: null,
      results: [],
      oldCuestions: [],
      stage: 0,
      displayResults: false,
      finalResult: 0,
    });

    this.cuestionSelector();
  }

  render() {
    const {
      cuestionCountry,
      displayResults,
      finalResult,
      anwserOptions,
      showAnwser,
      gameStarted,
    } = this.state;

    const quizInfo = {
      cuestionCountry,
      finalResult,
      displayResults,
      anwserOptions,
      showAnwser,
      gameStarted,
    };

    return (
      <section id="home-page">
        <QuizContainer
          quizInfo={quizInfo}
          optionSelection={this.optionSelection}
          cleanQuiz={this.cleanQuiz}
          gameStart={this.gameStart}
        />
      </section>
    );
  }
}

export default HomePage;
