import React from "react";
import { BorderBox } from "@primer/components";

const Projects = () => {
  return (
    <div>
      <BorderBox
        style={{
          padding: "20px",
        }}
      >
        <div class="d-table col-12">
          <div class="col-4 d-table-cell v-align-middle">
            <img
              class="width-full avatar"
              src="https://github.com/github.png"
              alt="github"
            />
          </div>
          <div class="col-10 d-table-cell v-align-middle pl-4">
            <h1 class="text-normal lh-condensed">GitHub</h1>
            <p class="h4 text-gray text-normal mb-2">
              How people build software.
            </p>
            <a class="text-gray text-small" href="#url">
              https://github.com/about
            </a>
          </div>
        </div>
      </BorderBox>
    </div>
  );
};

export default Projects;
