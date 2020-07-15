import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home.jsx';
import Fellows from './Pages/Fellows';
import Events from './Pages/Events';

import "./App.css";
import Header from "./Components/Header";
import "font-awesome/css/font-awesome.min.css";
import { fetchData } from "./Components";

class App extends React.Component {
  state = {
    data: [],
    accessToken: null,
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
      const fetchedData = await fetchData(accessToken);
      console.log(fetchedData);
      if (!fetchedData || !fetchedData.length) accessToken = null;
      this.setState({ data: fetchedData, accessToken });
    }
  }

  setAccessToken = token => this.setState({ accessToken: token });
  setFetchedFellows = data => this.setState({ data });

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/fellows/:username" render={props =>
              <Fellows accessToken={this.state.accessToken} {...props} />
            } />
            <Route path="/fellows" render={() =>
              <Fellows accessToken={this.state.accessToken} />
            } />
            <Route path="/events/:id" render={props =>
              <Events accessToken={this.state.accessToken} {...props} />
            } />
            <Route path="/events" render={() =>
              <Events accessToken={this.state.accessToken} />
            } />
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
