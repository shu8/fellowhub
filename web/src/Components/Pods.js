import React from "react";
import { BorderBox } from "@primer/components";

const Pods = (props) => {
  return (
    <BorderBox
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ padding: "20px" }}>
        <p class="h2">{props.name}</p>
        <p class="h5">{props.description}</p>
      </div>
      <div
        class="AvatarStack AvatarStack--three-plus"
        style={{ paddingTop: "30px", paddingRight: "190px" }}
      >
        <div
          class="AvatarStack-body tooltipped tooltipped-se tooltipped-align-left-1"
          aria-label="octocat, octocat, and octocat"
        >
          <img
            class="avatar"
            height="40"
            alt="@octocat"
            src="https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
            width="20"
          />
          <img
            class="avatar"
            height="20"
            alt="@octocat"
            src="https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
            width="20"
          />
          <img
            class="avatar"
            height="20"
            alt="@octocat"
            src="https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png"
            width="20"
          />
        </div>
      </div>
    </BorderBox>
  );
};

export default Pods;
