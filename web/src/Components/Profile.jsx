import React from "react";
import image from "../img/mlh-logo-color.svg";

import { BorderBox, CounterLabel } from "@primer/components";

function profile() {
  return (
    <div>
      <div>
        <img
          src={image}
          alt="MLH"
          style={{
            width: "360px",
            height: "350px",
            borderStyle: "solid",
            borderColor: "#000",
            borderRadius: "100%",
            margin: "20px",
            objectFit: "scale-down",
          }}
        />
        <BorderBox
          style={{
            padding: "15px",
            margin: "10px",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>
            <CounterLabel
              padding="10px"
              style={{
                minWidth: "50px",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              160
            </CounterLabel>{" "}
            Fellows
          </h3>
          <h3 style={{ marginBottom: "5px" }}>
            <CounterLabel
              padding="10px"
              style={{
                minWidth: "50px",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              20
            </CounterLabel>{" "}
            Mentors
          </h3>
          <h3 style={{ marginBottom: "5px" }}>
            <CounterLabel
              padding="10px"
              style={{
                minWidth: "50px",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              5
            </CounterLabel>{" "}
            MLH Staff
          </h3>
        </BorderBox>
      </div>
    </div>
  );
}

export default profile;
