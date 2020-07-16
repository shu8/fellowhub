import React from "react";
import { BorderBox } from "@primer/components";

const Projects = (props) => {
  return (
    <div>
      <BorderBox
        style={{
          padding: "20px",
          minHeight: "250px",
        }}
      >
        <div className="d-table col-12">
          <div className="col-4 d-table-cell v-align-middle">
            <img className="width-full avatar" src={props.image} alt={props.alt} />
          </div>
          <div className="col-10 d-table-cell v-align-middle pl-4">
            <h1 className="text-normal lh-condensed">{props.name}</h1>
            <p className="h4 text-gray text-normal mb-2">{props.description}</p>
            <a
              className="text-gray text-small"
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.link}
            </a>
          </div>
        </div>
      </BorderBox>
    </div>
  );
};

export default Projects;
