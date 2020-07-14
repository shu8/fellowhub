import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Fellows from './Pages/Fellows';
import Events from './Pages/Events';

import "./App.css";

import "font-awesome/css/font-awesome.min.css";
class App extends React.Component {
  state = {
    data: [],
    accessToken: null,
  };

  async componentDidMount() {
    // Get saved access token from session storage
    let accessToken = window.sessionStorage.getItem("accessToken");
    this.setState({ accessToken: accessToken || null });
  }

  setAccessToken = token => this.setState({ accessToken: token });
  setFetchedFellows = data => this.setState({ data });

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/fellows/:username" render={props =>
              <Fellows accessToken={this.state.accessToken} {...props} />
            } />
            <Route path="/fellows" render={() =>
              <Fellows accessToken={this.state.accessToken} />
            } />
            <Route path="/events">
              <Events />
            </Route>
            <Route path="/">
              <Home
                setAccessToken={this.setAccessToken}
                setFetchedFellows={this.setFetchedFellows}
                data={this.state.data}
                accessToken={this.state.accessToken} />
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
