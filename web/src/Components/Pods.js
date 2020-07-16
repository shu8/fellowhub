import React from "react";
import { AvatarStack, BorderBox } from "@primer/components";
const fellowsById = {
  "0.0.1": [],
  "0.1.1": [],
  "0.1.2": [],
  "0.2.1": [],
  "0.2.2": [],
  "0.3.1": [],
  "0.3.2": [],
  "0.4.1": [],
  "0.4.2": [],
  "0.5.1": [],
  "0.5.2": [],
  "0.6.3": [],
  "MLH Staff": [],
  "Mentors": [],
};
const Pods = (props) => {
  let fellows = props;
  // console.log(fellows);
  fellows.filter((fellow) => {
    if (fellow.pod_url == fellowsById[fellow.pod.id]) {
      fellowsById[fellow.pod_id].push(fellow);
    }
  });
  return (
    <BorderBox
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div>
        <p class="h2">{fellows.pod_id}</p>
        <p class="h5">{fellows.description}</p>
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
