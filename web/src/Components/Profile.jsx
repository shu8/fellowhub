import React from "react";
// import PropTypes from "prop-types";
import image from "../img/mlh.png";

function profile(props) {
  return (
    <div>
      <div>
        <img
          src={image}
          alt="MLH"
          style={{
            width: "380px",
            height: "350px",
            borderStyle: "solid",
            borderColor: "#000",
            borderRadius: "100%",
            margin: "20px",
          }}
        />
        <div
          style={{
            margin: "20px",
            textAlign: "left",
            borderStyle: "solid",
            backgroundColor: "grey",
          }}
        >
          <h3>
            Fellows{" "}
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "10px",
              }}
            >
              160
            </span>
          </h3>
          <h3>
            Mentors{" "}
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "10px",
              }}
            >
              20
            </span>
          </h3>
          <h3>
            MLH Staffs{" "}
            <span
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "10px",
              }}
            >
              5
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

// profile.propTypes = {};

export default profile;
