import React from "react";

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
          <div className="Search">
            <Search handleInput={this.handleInput} />
          </div>
        </header>
        <main className="container">Fellows</main>
      </div>
    );
  }
}
