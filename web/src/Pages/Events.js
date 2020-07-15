import React from "react";
import Search from "../Components/Search";

import Event from "../Components/Event";

export default class Events extends React.Component {
  state = { search: "" };

  handleInput = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  createEvents() {
    return this.props.events.items.filter(e => e.summary && e.start.dateTime).map((event, i) => (
      <Event event={event} key={i} />
    ));
  }

  render() {
    if (!this.props.events.items) return <div />

    const id = this.props.match && this.props.match.params
      ? this.props.match.params.id
      : null;

    if (id) {
      const event = this.props.events.items.find(e => e.id === id);
      if (event) {
        return (
          <div className="App">
            <main className="container">
              Event: {event.summary}
            </main>
          </div>
        );
      } else {
        return (
          <div className="App">
            <main className="container">
              <h1>No event found for ID {id}!</h1>
            </main>
          </div>
        );
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="Search">
            <Search handleInput={this.handleInput} />
          </div>
        </header>
        <h1>Events</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridRowGap: "20px",
          }}
        >
          {this.createEvents()}
        </div>
      </div>
    );
  }
}
