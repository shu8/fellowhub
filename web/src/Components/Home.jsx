import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile";
import SimpleAvatar from "./SimpleAvatar";
import Pods from "./Pods";
import Projects from "./Projects";
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

import { TabNav, Box, Text } from "@primer/components";
import { NoteIcon, PersonIcon, RepoIcon } from "@primer/octicons-react";

function TabPanel(props) {
  const { children, tab, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tab !== value}
      id={`scrollable-force-tabpanel-${value}`}
      aria-labelledby={`scrollable-force-tab-${value}`}
      {...other}
    >
      {tab === value && (
        <Box p={3} as="div">
          <Text as="div">{children}</Text>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  tab: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

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
    props.data.map((fellow, i) => (
      <SimpleAvatar bgPhoto={fellow.avatar_url} cta="View profile" key={i} />
    ));

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
              image={docsify}
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
              image={docsify}
              link="https://github.com/vercel"
            />
            <Projects
              name="Docusaurus"
              description="Docusaurus is an open-source static site generator that converts Markdown files to a documentation website."
              alt="Docusaurus"
              image={docsify}
              link="https://github.com/facebook/docusaurus"
            />
            <Projects
              name="World Food Programme's PRISM project"
              description="The World Food Programme (WFP) is the food-assistance branch of the United Nations and the world's largest humanitarian organization addressing hunger and promoting food security."
              alt="WFP"
              image={docsify}
              link="https://github.com/oviohub/opportunities/issues/10"
            />
            <Projects
              name="Keras"
              description="Keras is a deep learning API written in Python, running on top of the machine learning platform TensorFlow."
              alt="Keras"
              image={docsify}
              link="https://github.com/keras-team"
            />
            <Projects
              name="Keras"
              description="Keras is a deep learning API written in Python, running on top of the machine learning platform TensorFlow."
              alt="Keras"
              image={docsify}
              link="https://github.com/keras-team"
            />
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
