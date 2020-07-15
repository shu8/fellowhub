import React from "react"
import { useHistory, Link } from "react-router-dom";

import { StyledOcticon } from "@primer/components";
import { HeartFillIcon } from "@primer/octicons-react";

export default function Home(props) {
  const history = useHistory();

  return (
    <div className='App'>
      <h1>MLH Fellowship</h1>
      <p>The MLH Fellowship is the future of tech internships -- an internship alternative for software engineers.</p>
      <p>Contribute to Open Source projects that companies actually depend on, whilst working with a group of 10 students in a "Pod".</p>
      <p>
        <strong>FellowHub</strong> is your all-in-one resource for all things Fellowship-related:
        <ul style={{ paddingLeft: '25px' }}>
          <li>
            <Link onClick={() => history.push("/")}>
              Find your fellow Fellows
            </Link>
          </li>
          <li>
            <Link onClick={() => history.push("/events")}>
              Keep track of upcoming events from the MLH Fellowship Events Calendar
            </Link>
          </li>
          <li>
            <Link onClick={() => history.push("/jobs")}>
              Find job sites curated for the Fellows
            </Link>
          </li>
          <li>
            <Link onClick={() => history.push("/fellows")}>
              Share your own or view other Fellows' personalised portfolios, reflecting all the amazing work done during the Fellowship!
            </Link>
          </li>
        </ul>
      </p>
      <p>
        Developed with <StyledOcticon icon={HeartFillIcon} size={20} color="#1d539f" mr={1} />by <a href="https://github.com/kendevops" target="_blank" rel="noopener noreferrer">@kendevops</a>, <a href="https://github.com/ivov" target="_blank" rel="noopener noreferrer">@ivov</a> & <a href="https://github.com/shu8" target="_blank" rel="noopener noreferrer">@shu8</a> as part of the Fellowship <a href="https://mlh-fellowship-halfway-2020.devpost.com/" target="_blank" rel="noopener noreferrer">Halfway Hackathon</a>.
      </p>
    </div>
  );
}
