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
import homebrew from "../img/homebrew.png";
import devto from "../img/devto.png";
import ohmyzsh from "../img/ohmyzsh.png";
import circuitPython from "../img/circuitPython.png";
import beagleBoard from "../img/beagleBoard.png";
import AliceVision from "../img/AliceVision.png";
import keras from "../img/keras.png";
import bentoml from "../img/bentoml.png";
import scikit_learn from "../img/scikit_learn.png";
import julia from "../img/julia.svg";
import docusaurus from "../img/docusaurus.png";
import wfp from "../img/wfp.png";
import Nextjs from "../img/Nextjs.png";
import react from "../img/react.png";
import reactNative from "../img/react-native.png";
import relay from "../img/relay.svg";
import jest from "../img/jest.png";
import reactJson from "../img/react-jsonschema-form.png";
import httpie from "../img/httpie.jpg";
import pallets from "../img/pallets.png";
import fastApi from "../img/fastApi.png";
import typer from "../img/typer.svg";
import hdi from "../img/HDI.png";

import TabPanel from "../Components/TabPanel";
import { TabNav } from "@primer/components";
import {
  NoteIcon,
  PersonIcon,
  RepoIcon,
  PeopleIcon,
} from "@primer/octicons-react";

import octocat from "../img/octocat-white.png";
import { PodmateAvatar } from "../Components/PodmateAvatar";

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
      <Profile fellows={props.fellows} />
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
              gridTemplateColumns: "auto auto auto auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {createAvatars()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          <Pods {...props} />
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
              description="AWS Amplify is a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications, powered by AWS."
              alt="Amplify"
              image={amplify}
              link="https://github.com/aws-amplify"
            />
            <Projects
              name="Sheetjs"
              description="Spreadsheets simplified. Read, edit, and export spreadsheets Works in web browsers and servers Supports every Excel file format"
              alt="Sheetjs"
              image={sheetjs}
              link="https://github.com/SheetJS"
            />
            <Projects
              name="N8N"
              description="Free and open self hostable workflow automation tool."
              alt="N8N"
              image={n8n}
              link="https://github.com/n8n-io"
            />
            <Projects
              name="Webaverse"
              description="The Webaverse is a blanket term used to describe a set of technologies that enable the use of spatial applications and objects powered by WebXR."
              alt="Webaverse"
              image={webaverse}
              link="https://github.com/webaverse"
            />
            <Projects
              name="Docsify"
              description="A magical documentation site generator."
              alt="Docsify"
              image={docsify}
              link="https://github.com/docsifyjs"
            />
            <Projects
              name="Homebrew"
              description="The Missing Package Manager for macOS (or Linux)."
              alt="Homebrew"
              image={homebrew}
              link="https://github.com/Homebrew"
            />
            <Projects
              name="Dev.to"
              description="A constructive and inclusive social network. Open source and radically transparent."
              alt="Dev.to"
              image={devto}
              link="https://github.com/thepracticaldev"
            />
            <Projects
              name="Oh-My-Zsh"
              description="Oh-My-Zsh is a delightful, open source, community-driven framework for managing your ZSH configuration."
              alt="Oh-My-Zsh"
              image={ohmyzsh}
              link="https://github.com/ohmyzsh"
            />
            <Projects
              name="CircuitPython"
              description="CircuitPython is a programming language designed to simplify
              experimenting and learning to code on low-cost microcontroller
              boards."
              alt="CircuitPython"
              image={circuitPython}
              link="https://github.com/adafruit/circuitpython"
            />
            <Projects
              name="BeagleBoard"
              description="The BeagleBoard is a low-power open-source single-board computer produced by Texas Instruments in association with Digi-Key and Newark element14."
              image={beagleBoard}
              link="https://github.com/beagleboard/"
            />
            <Projects
              name="AliceVision"
              description="AliceVision is a Photogrammetric Computer Vision framework for 3D Reconstruction and Camera Tracking."
              alt="AliceVision"
              image={AliceVision}
              link="https://github.com/alicevision"
            />
            <Projects
              name="Keras"
              description="Keras is a deep learning API written in Python, running on top of the machine learning platform TensorFlow."
              alt="Keras"
              image={keras}
              link="https://github.com/keras-team"
            />
            <Projects
              name="BentoML"
              description="BentoML is an open-source framework for high-performance machine learning model serving.."
              alt="BentoML"
              image={bentoml}
              link="https://github.com/bentoml"
            />
            <Projects
              name="Scikit-learn"
              description="Scikit-learn is a free software machine learning library for the Python programming language."
              alt="Scikit-learn"
              image={scikit_learn}
              link="https://github.com/scikit-learn"
            />
            <Projects
              name="Julia"
              description="Julia is a high-level, high-performance, dynamic programming language."
              alt="Julia"
              image={julia}
              link="https://github.com/JuliaLang"
            />
            <Projects
              name="SciML"
              description="SciML is anOpen source software for scientific machine learning"
              alt="SciML"
              image={docsify}
              link="https://github.com/SciML"
            />
            <Projects
              name="Next.js"
              description="Next.js is a Production grade React applications that scale."
              alt="Next.js"
              image={Nextjs}
              link="https://github.com/vercel"
            />
            <Projects
              name="Docusaurus"
              description="Docusaurus is an open-source static site generator that converts Markdown files to a documentation website."
              alt="Docusaurus"
              image={docusaurus}
              link="https://github.com/facebook/docusaurus"
            />
            <Projects
              name="WFP PRISM project"
              description="The World Food Programme (WFP) is the food-assistance branch of the United Nations and the world's largest humanitarian organization addressing hunger and promoting food security."
              alt="WFP"
              image={wfp}
              link="https://github.com/oviohub/opportunities/issues/10"
            />
            <Projects
              name="React"
              description="React is a JavaScript library for building user interfaces. Declarative: React makes it painless to create interactive UIs."
              alt="React"
              image={react}
              link="https://github.com/facebook/react"
            />
            <Projects
              name="React Native"
              description="A framework for building native apps with React."
              alt="ReactNative"
              image={reactNative}
              link="https://github.com/facebook/react-native"
            />
            <Projects
              name="Relay"
              description="A JavaScript framework for building data-driven React applications powered by GraphQL, designed from the ground up to be easy to use, extensible and, most of all, performant."
              alt="relay"
              image={relay}
              link="https://github.com/facebook/relay"
            />
            <Projects
              name="Jest"
              description="A comprehensive JavaScript testing solution. Works out of the box for most JavaScript projects."
              alt="Jest"
              image={jest}
              link="https://github.com/facebook/jest"
            />
            <Projects
              name="React-Jsonschema-Form"
              description="A React component for building Web forms from JSON Schema."
              alt="react-jsonschema-form"
              image={reactJson}
              link="https://github.com/rjsf-team/react-jsonschema-form"
            />
            <Projects
              name="HTTPie"
              description="HTTPie is a command-line HTTP client that will make you smile."
              alt="HTTPie"
              image={httpie}
              link="https://github.com/jakubroztocil/httpie"
            />
            <Projects
              name="Pallets"
              description="The Pallets Projects are a collection of Python web development libraries that were independently developed by Armin Ronacher and later used as the basis of the Flask microframework. "
              alt="ReactNative"
              image={pallets}
              link="https://github.com/pallets"
            />
            <Projects
              name="FastAPI"
              description="FastAPI framework, high performance, easy to learn, fast to code, ready for production."
              alt="FastAPI"
              image={fastApi}
              link="https://github.com/tiangolo/fastapi"
            />
            <Projects
              name="Typer"
              description="Typer is a library for building CLI applications that users will love using and developers will love creating."
              alt="Typer"
              image={typer}
              link="https://github.com/tiangolo/typer"
            />
            <Projects
              name="howdoi"
              description="instant coding answers via the command line."
              alt="howdoi"
              image={hdi}
              link="https://github.com/gleitz/howdoi"
            />
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
