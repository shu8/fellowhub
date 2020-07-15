import React from "react";
import Header from "../Components/Header";
import Search from "../Components/Search";

export default class Events extends React.Component {
  state = { search: "" };

  handleInput = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  render() {
    let id;
    if (this.props.match && this.props.match.params) id = this.props.match.params.id;

    if (id) {
      return (
        <div className="App">
          <main className="container">Event: {id}</main>
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
        <main className="container">Events</main>
      </div>
    );
  }
}
