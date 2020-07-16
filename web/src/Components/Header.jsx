import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../img/mlh-logo-yellow.svg";

function Header(props) {
  const searchEnabled = ['/', '/events', '/jobs'].includes(window.location.pathname);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div className="Header" style={{ backgroundColor: "#1d539f" }}>
        <div className="Header-item">
          <Link to="/" className="Header-link f4 d-flex flex-items-center">
            <img className="logo" src={logo} />
            <span>FellowHub</span>
          </Link>
        </div>
        <div className="Header-item">
          <input
            type="search"
            className="header-search form-control"
            placeholder="Search"
            disabled={!searchEnabled}
            onInput={e => props.onSearchInput(e.target.value.toLowerCase())}
          />
        </div>
        <div className="Header-item">
          <Link to="/" className="Header-link">
            Home
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/events" className="Header-link">
            Events
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/voting-contest" className="Header-link">
            Voting
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/jobs" className="Header-link">
            Jobs
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/get-help" className="Header-link">
            Get Help
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/templates" className="Header-link">
            Templates
          </Link>
        </div>
        <div className="Header-item">
          <Link to="/about" className="Header-link">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
