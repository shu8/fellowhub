import React from "react";
import image from "./../../img/mlh.png";
import { TabNav } from "@primer/components";
import Search from "../Search";
const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#878787",
        maxWidth: "100%",
        color: "white",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src={image}
          alt="MLH logo"
          style={{ width: "50px", height: "50px", paddingRight: "50px" }}
        />
        <Search />
      </div>
      <TabNav aria-label="Main">
        <TabNav.Link href="#home" selected>
          Home
        </TabNav.Link>
        <TabNav.Link href="#documentation">Documentation</TabNav.Link>
        <TabNav.Link href="#support">Support</TabNav.Link>
      </TabNav>
    </div>
  );
};

export default Header;
