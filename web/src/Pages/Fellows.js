import React from "react";

import Search from "../Components/Search";

export default class Fellows extends React.Component {
  state = { search: "" };

  handleInput = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  render() {
    let username;
    if (this.props.match && this.props.match.params) username = this.props.match.params.username;

    if (username) {
      return (
        <div className="App">
          <main className="container">Fellow: {username}</main>
        </div>
      );
    }

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
