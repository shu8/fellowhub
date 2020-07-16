import React from "react";
import { AvatarStack, BorderBox } from "@primer/components";

const Pods = (props) => {
  return (
    <BorderBox
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div>
        <p class="h2">{props.name}</p>
        <p class="h5">{props.description}</p>
      </div>
      <AvatarStack style={{ marginRight: "100px", paddingTop: "40px" }}>
        <img alt="Primer" src="https://avatars.githubusercontent.com/github" />
        <img alt="GitHub" src="https://avatars.githubusercontent.com/github" />
        <img alt="Atom" src="https://avatars.githubusercontent.com/atom" />
        <img
          alt="Desktop"
          src="https://avatars.githubusercontent.com/desktop"
        />
      </AvatarStack>
    </BorderBox>
  );
};

export default Pods;
