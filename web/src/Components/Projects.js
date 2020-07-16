import React from "react";
import { BorderBox } from "@primer/components";

const Projects = (props) => {
  return (
    <div>
      <BorderBox
        style={{
          padding: "20px",
          height: "250px",
        }}
      >
        <div class="d-table col-12">
          <div class="col-4 d-table-cell v-align-middle">
            <img class="width-full avatar" src={props.image} alt={props.alt} />
          </div>
          <div class="col-10 d-table-cell v-align-middle pl-4">
            <h1 class="text-normal lh-condensed">{props.name}</h1>
            <p class="h4 text-gray text-normal mb-2">{props.description}</p>
            <a
              class="text-gray text-small"
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
