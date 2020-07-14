import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import "font-awesome/css/font-awesome.min.css";
// import { fetchData } from "./Components";

// const lower = (data) => (data ? data.toLowerCase() : "");
class App extends React.Component {
  // state = {
  //   data: [],
  //   search: "",
  //   accessToken: null,
  // };

  // handleInput = (e) => {
  //   this.setState({ search: e.target.value.toLowerCase() });
  // };

  // async componentDidMount() {
  //   // Get saved access token from session storage
  //   let accessToken = window.sessionStorage.getItem("accessToken");

  //   if (window.location.search.includes("access_token")) {
  //     accessToken = window.location.search.substr(1).split("=")[1];
  //     window.sessionStorage.setItem("accessToken", accessToken);
  //     window.location = "/";
  //   }

  //   const fetchedData = await fetchData(accessToken);
  //   console.log(fetchedData);
  //   if (!fetchedData || !fetchedData.length) accessToken = null;
  //   this.setState({ data: fetchedData, accessToken });
  // }

  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
