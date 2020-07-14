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
            width: "350px",
            borderStyle: "solid",
            borderColor: "#000",
            borderRadius: "100%",
            margin: "20px",
          }}
        />
        <div>
          <h3>Fellows</h3>
          <h3>Mentors</h3>
          <h3>MLH Staffs</h3>
        </div>
      </div>
    </div>
  );
}

// profile.propTypes = {};

export default profile;
