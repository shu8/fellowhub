import React from "react";
import { Heading, FilterList, StyledOcticon } from "@primer/components";
import { HeartFillIcon } from "@primer/octicons-react";

import jobsData from "../data/jobs.json";

export default function Jobs(props) {
  const jobSites = Object.keys(jobsData);
  return (
    <div className="App">
      <Heading fontSize={7} mb={3}>
        Jobs!
      </Heading>
      <Heading fontSize={3} mb={5}>
        Monster list of job search sites, collected with <StyledOcticon icon={HeartFillIcon} size={24} color="#1d539f" mr={1} /> for our fellows:
      </Heading>
      <FilterList>
        <ul style={{ columns: 3, listStyleType: "none" }}>
          {jobSites.filter(j => {
            if (!props.search) return true;
            return j.toLowerCase().includes(props.search);
          }).map((jobSite) => {
            return (
              <FilterList.Item>
                <li>
                  <a href={jobsData[jobSite]} target="_blank" rel="noopener noreferrer">{jobSite}</a>
                </li>
              </FilterList.Item>
            );
          })}
        </ul>
      </FilterList>
    </div>
  );
}
