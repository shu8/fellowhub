import React from "react";
import Profile from "../Components/Profile";
import SimpleAvatar from "../Components/SimpleAvatar";
import Pods from "../Components/Pods";
import Projects from "../Components/Projects";
import Login from "../Components/Login";

import TabPanel from "../Components/TabPanel";
import { TabNav } from "@primer/components";
import {
  NoteIcon,
  PersonIcon,
  RepoIcon,
  PeopleIcon,
} from "@primer/octicons-react";

import { PodmateAvatar } from "../Components/PodmateAvatar";

import projectsData from "../data/projects.json";
import projectImages from "../img/projects";
import Loading from "../Components/Loading";

export default function Home(props) {
  const [tab, setTab] = React.useState(
    window.location.hash.substr(1) || "home"
  );

  const createAvatars = () =>
    props.fellows
      .filter((fellow) => {
        if (!props.search) return true;
        if (!fellow.name) return false;
        return [
          fellow.name.toLowerCase(),
          fellow.username.toLowerCase(),
          fellow.pod.toLowerCase(),
        ].some((t) => t.includes(props.search));
      })
      .map((fellow, i) => (
        <SimpleAvatar
          bgPhoto={fellow.avatar_url}
          cta="View profile"
          ctaUrl={`/fellows/${fellow.username}`}
          key={i}
        />
      ));

  const createProjects = () =>
    Object.entries(projectsData)
      .filter(([name, details]) => {
        if (!props.search) return true;
        return name.toLowerCase().includes(props.search);
      })
      .map(([name, details], i) => (
        <Projects
          key={i}
          name={name}
          description={details.description}
          alt={name}
          image={projectImages[details.image]}
          link={details.githubUrl}
        />
      ));

  if (!props.accessToken) return <Login />;

  return (
    <div style={{ display: "flex" }}>
      <Profile fellows={props.fellows} />
      <div style={{ width: "100%" }}>
        <TabNav aria-label="Main">
          <TabNav.Link
            href="#home"
            selected={tab === "home"}
            onClick={() => setTab("home")}
          >
            <NoteIcon /> Overview
          </TabNav.Link>
          <TabNav.Link
            href="#pods"
            selected={tab === "pods"}
            onClick={() => setTab("pods")}
          >
            <PersonIcon /> Pods
          </TabNav.Link>
          <TabNav.Link
            href="#podmates"
            selected={tab === "podmates"}
            onClick={() => setTab("podmates")}
          >
            <PeopleIcon /> Podmates
          </TabNav.Link>
          <TabNav.Link
            href="#projects"
            selected={tab === "projects"}
            onClick={() => setTab("projects")}
          >
            <RepoIcon /> Projects
          </TabNav.Link>
        </TabNav>

        <TabPanel tab={tab} value={"home"}>
          <div
            style={{
              display: "grid",
              columnGap: "15px",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
              gridTemplateRows: "repeat(4, 110px)",
            }}
          >
            {props.fellows.length ? createAvatars() : <Loading small />}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          <Pods {...props} />
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          <div
            style={{
              display: "grid",
              columnGap: "15px",
              gridTemplateColumns: "auto auto",
              rowGap: "10px",
            }}
          >
            {createProjects()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"podmates"}>
          {props.podmates.map((mate, i) => (
            <PodmateAvatar key={i} mate={mate}>
              {mate.name || mate.username}
            </PodmateAvatar>
          ))}
        </TabPanel>
      </div>
    </div>
  );
}
