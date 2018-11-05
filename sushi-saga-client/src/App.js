import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushi: [],
    funds: 30,
    sushiToDisplayIndex: 0,
    numberOfSushiPiecesToDisplay: 4
  };

  componentDidMount() {
    fetch(API)
      .then(r => r.json())
      .then(sushiApiData => {
        const sushi = sushiApiData.map(apiData => {
          return Object.assign({}, apiData, { eaten: false });
        });
        this.setState({ sushi });
      });
  }

  attemptToBillSushi = sushi => {
    const { price } = sushi;
    const {
      state: { funds }
    } = this;
    if (price <= funds) {
      this.setState(currentState => ({ funds: funds - price }));
      return true;
    }
  };

  // consumeSushi = sushiData => {
  //   if (this.attemptToBillSushi(sushiData)) {
  //     const sushi = this.state.sushi.map(sushiObj => {
  //       if (sushiObj.id === sushiData.id) {
  //         sushiObj.eaten = true;
  //       }
  //       return sushiObj;
  //     });
  //     this.setState({ sushi });
  //   }
  // };

  consumeSushi = ({ price, id }) => {
    if (price <= this.state.funds) {
      const sushi = this.state.sushi.map(sushiObj => {
        if (sushiObj.id === id) {
          sushiObj.eaten = true;
        }
        return sushiObj;
      });

      this.setState(currentState => ({
        sushi,
        funds: currentState.funds - price
      }));
    }
  };

  sushiToDisplay = () => {
    return this.state.sushi.slice(
      this.state.sushiToDisplayIndex,
      this.state.sushiToDisplayIndex + this.state.numberOfSushiPiecesToDisplay
    );
  };

  showNextRound = () => {
    //debugger;
    this.setState(currentState => ({
      sushiToDisplayIndex: currentState.sushiToDisplayIndex + 4
    }));
  };

  consumedSushi = () => {
    return this.state.sushi.filter(({ eaten }) => eaten);
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          consumeSushi={this.consumeSushi}
          sushi={this.sushiToDisplay()}
          showNextRound={this.showNextRound}
        />
        <Table consumedSushi={this.consumedSushi()} funds={this.state.funds} />
      </div>
    );
  }
}

export default App;
