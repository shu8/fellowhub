import React from "react";
import image from "../img/mlh.png";
import Search from "./Search";

const Header = () => {
  return (
    <div>
      <img src={image} alt="mlh"/>
      <Search />
      <div>
        <nav>
          <ul>
            <li>Fellowhunt</li>
            <li>FellowJob</li>
            <li>Fellowactivity</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
