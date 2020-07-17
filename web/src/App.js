import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import Fellows from "./Pages/Fellows";
import Events from "./Pages/Events";
import Jobs from "./Pages/Jobs";
import About from "./Pages/About";
import GetHelp from "./Pages/GetHelp";
import Templates from "./Pages/Templates";
import Portfolio from "./Pages/Portfolio";
import VotingContest from "./Pages/VotingContest";

import "./App.css";
import Header from "./Components/Header";
import "font-awesome/css/font-awesome.min.css";
import { fetchFellows, fetchEvents, fetchActiveFellow } from "./Components";

class App extends React.Component {
  state = {
    activeFellow: "",
    podmates: [],
    fellows: [],
    accessToken: null,
    events: {},
    search: "",
    loggedInFellow: null,
  };

  async componentDidMount() {
    // Get saved access token from session storage
    let accessToken = window.sessionStorage.getItem("accessToken");

    if (window.location.search.includes("access_token")) {
      accessToken = window.location.search.substr(1).split("=")[1];
      window.sessionStorage.setItem("accessToken", accessToken);
      window.location = "/";
    }

    if (accessToken) {
      // Fetch all together, not sequentially!
      const [fellows, events, activeFellowGithubId] = await Promise.all([
        fetchFellows(accessToken), fetchEvents(accessToken), fetchActiveFellow(accessToken),
      ]);
      console.log(fellows, events, activeFellowGithubId);

      // Get all this data from what we've already fetched, no need for more requests!
      const loggedInFellow = fellows.find(f => f.username_original === activeFellowGithubId);
      const podmates = fellows.filter(f => f.pod_id === loggedInFellow.pod_id);
      this.setState({ fellows, accessToken, events, loggedInFellow, podmates });
    }
  }

  setAccessToken = (accessToken) => this.setState({ accessToken });
  setFetchedFellows = (fellows) => this.setState({ fellows });

  onSearchInput = search => this.setState({ search });

  render() {
    return (
      <Router>
        <div>
          <Header
            onSearchInput={this.onSearchInput}
          />
          <Switch>
            <Route
              path="/fellows/:username"
              component={(props) => {
                const username =
                  props.match && props.match.params
                    ? props.match.params.username
                    : null;
                return (
                  <Portfolio
                    username={username}
                    accessToken={this.state.accessToken}
                    loggedInUser={this.state.loggedInFellow}
                  />
                );
              }}
            />
            <Route
              path="/fellows"
              component={() => (
                <Fellows
                  fellows={this.state.fellows}
                  accessToken={this.state.accessToken}
                />
              )}
            />
            <Route
              path="/events/:id"
              component={(props) => (
                <Events
                  accessToken={this.state.accessToken}
                  events={this.state.events}
                  {...props}
                />
              )}
            />
            <Route
              path="/events"
              component={() => (
                <Events
                  accessToken={this.state.accessToken}
                  events={this.state.events}
                  search={this.state.search}
                  setSearch={(s) => this.setState({ search: s })}
                />
              )}
            />
            <Route
              path="/templates"
              component={() => (
                <Templates
                  accessToken={this.state.accessToken}
                  fellow={this.state.loggedInFellow}
                />
              )}
            />
            <Route path="/jobs" component={() => (
              <Jobs
                search={this.state.search}
              />
            )} />
            <Route path="/about" component={About} />
            <Route
              path="/get-help"
              render={() => <GetHelp fellows={this.state.fellows} />}
            />
            <Route path="/voting-contest" component={VotingContest} />
            <Route path="/">
              <Home
                setAccessToken={this.setAccessToken}
                setFetchedFellows={this.setFetchedFellows}
                fellows={this.state.fellows}
                podmates={this.state.podmates}
                accessToken={this.state.accessToken || window.sessionStorage.getItem("accessToken")}
                search={this.state.search}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
