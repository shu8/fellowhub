import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../Components/Profile";
import SimpleAvatar from "../Components/SimpleAvatar";
import Pods from "../Components/Pods";
import Projects from "../Components/Projects";
import babel from "../img/babel.png";
import amplify from "../img/amplify.png";
import docsify from "../img/docsify.png";
import n8n from "../img/n8n.png";
import sheetjs from "../img/sheetjs.png";
import webaverse from "../img/webaverse.ico";

import TabPanel from "../Components/TabPanel";
import { TabNav } from "@primer/components";
import { NoteIcon, PersonIcon, RepoIcon } from "@primer/octicons-react";

import octocat from "../img/octocat-white.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [tab, setTab] = React.useState("home");

  const createAvatars = () =>
    props.fellows.map((fellow, i) => (
      <SimpleAvatar
        bgPhoto={fellow.avatar_url}
        cta="View profile"
        ctaUrl={`/fellows/${fellow.username}`}
        key={i}
      />
    ));

  if (!props.accessToken) {
    return (
      <div className="App">
        <div className="login">
          <h1>Login</h1>
          <p>
            You must be a{" "}
            <a
              href="https://fellowship.mlh.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLH Fellow
            </a>
            , and a member of the{" "}
            <a
              href="https://github.com/MLH-Fellowship"
              target="_blank"
              rel="noopener noreferrer"
            >
              MLH Fellowship GitHub organisation
            </a>{" "}
            to use the MLH Fellowbook.
          </p>
          <p>Please login with GitHub below</p>
          <a
            href="https://github.com/login/oauth/authorize?client_id=22d8bad72f3469cd766c&scope=user&allow_signup=false"
            className="login-btn"
          >
            <img src={octocat} alt="octacat" />
            <span>Login with GitHub</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Profile />
      <div className={classes.root}>
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
              gridTemplateColumns: "auto auto auto auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {createAvatars()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          <Pods
            name="Mentors"
            description="The mentors for the MLH Fellowship class."
          />
          <Pods name="0.0.1" description="Sudo Seals" />
          <Pods name="0.1.1" description="Smart Sea Cucumbers" />
          <Pods name="0.1.2" description="Baby Shark" />
          <Pods name="0.2.1" description="Distributed Dodos" />
          <Pods name="0.2.2" description="JavaScript Jellies" />
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "20px",
            }}
          >
            <Projects
              name="Babel"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Babel"
              image={babel}
              link="https://github.com/babel"
            />
            <Projects
              name="Amplify"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Amplify"
              image={amplify}
              link="https://github.com/babel"
            />
            <Projects
              name="Sheetjs"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Sheetjs"
              image={sheetjs}
              link="https://github.com/babel"
            />
            <Projects
              name="N8N"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="N8N"
              image={n8n}
              link="https://github.com/babel"
            />
            <Projects
              name="Webaverse"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Webaverse"
              image={webaverse}
              link="https://github.com/babel"
            />
            <Projects
              name="Docsify"
              description="Babel is a popular tool for using the newest features of the JavaScript programming language."
              alt="Docsify"
              image={docsify}
              link="https://github.com/babel"
            />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
