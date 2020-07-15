import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Pages/Home.jsx';
import Fellows from './Pages/Fellows';
import Events from './Pages/Events';
import Jobs from './Pages/Jobs';
import About from './Pages/About';
import GetHelp from './Pages/GetHelp';
import Portfolio from './Pages/Portfolio';

import "./App.css";
import Header from "./Components/Header";
import "font-awesome/css/font-awesome.min.css";
import { fetchFellows, fetchEvents } from "./Components";

class App extends React.Component {
  state = {
    fellows: [],
    accessToken: null,
    events: {},
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
      const fellows = await fetchFellows(accessToken);
      const events = await fetchEvents(accessToken);
      console.log(events, fellows);
      this.setState({ fellows, accessToken, events });
    }
  }

  setAccessToken = accessToken => this.setState({ accessToken });
  setFetchedFellows = fellows => this.setState({ fellows });

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/fellows/:username" component={props =>
              <Portfolio accessToken={this.state.accessToken} {...props} />
            } />
            <Route path="/fellows" component={() =>
              <Fellows accessToken={this.state.accessToken} />
            } />
            <Route path="/events/:id" component={props =>
              <Events accessToken={this.state.accessToken} events={this.state.events} {...props} />
            } />
            <Route path="/events" component={() =>
              <Events accessToken={this.state.accessToken} events={this.state.events} />
            } />
            <Route path="/jobs" component={Jobs} />
            <Route path="/about" component={About} />
            <Route path="/get-help" render={() =>
              <GetHelp fellows={this.state.fellows} />
            } />
            <Route path="/">
              <Home
                setAccessToken={this.setAccessToken}
                setFetchedFellows={this.setFetchedFellows}
                fellows={this.state.fellows}
                accessToken={this.state.accessToken} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
