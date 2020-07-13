import React from "react";
import { SubNav } from "@primer/components";

import Styles from "./Home.module.css";

function Home(props) {
  return (
    <SubNav aria-label="Main">
      <SubNav.Links>
        <SubNav.Link href="#home" selected>
          Home
        </SubNav.Link>
        <SubNav.Link href="#documentation">Documentation</SubNav.Link>
        <SubNav.Link href="#support">Support</SubNav.Link>
      </SubNav.Links>
    </SubNav>
  );
}

export default Home;
