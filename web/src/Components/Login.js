import React from "react";
import octocat from "../img/octocat-white.png";

export default function Login() {
  return (
    <div className="App">
      <div className="login">
        <h1>Login</h1>
        <p>
          You must be an{" "}
          <a
            href="https://fellowship.mlh.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLH Fellow
                </a>
                , and a member of the{" "}
          <a
            href="https://github.com/MLH-Fellowship"
            target="_blank"
            rel="noopener noreferrer"
          >
            MLH Fellowship GitHub organisation
                </a>{" "}
                to use MLH FellowHub.
              </p>
        <p>Please login with GitHub below</p>
        <a
          href="https://github.com/login/oauth/authorize?client_id=22d8bad72f3469cd766c&scope=user&allow_signup=false&scope=public_repo"
          className="login-btn"
        >
          <img src={octocat} alt="octacat" />
          <span>Login with GitHub</span>
        </a>
      </div>
    </div>
  );
}
