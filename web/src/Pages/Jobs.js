import React from "react";
import { Heading, FilterList } from "@primer/components";

import jobsData from "../data/jobs.json";

export default function Jobs(props) {
  const jobSites = Object.keys(jobsData);
  return (
    <div style={{ backgroundColor: "", margin: "50px" }}>
      <Heading fontSize={7} mb={3}>
        Jobs!
      </Heading>
      <Heading fontSize={3} mb={5}>
        Monster list of more job search sites, collected for our fellows:
      </Heading>
      <FilterList>
        <ul style={{ columns: 3, listStyleType: "none" }}>
          {jobSites.map((jobSite) => {
            return (
              <FilterList.Item>
                <li>
                  <a href={jobsData[jobSite]}>{jobSite}</a>
                </li>
              </FilterList.Item>
            );
          })}
        </ul>
      </FilterList>
    </div>
  );
}
