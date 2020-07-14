import React from "react";
import Header from "../Components/Header";
import Search from "../Components/Search";

export default class Fellows extends React.Component {
  state = { search: "" };

  handleInput = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <div className="Search">
            <Search handleInput={this.handleInput} />
          </div>
        </header>
        <main className="container">Fellows</main>
      </div>
    );
  }
}
