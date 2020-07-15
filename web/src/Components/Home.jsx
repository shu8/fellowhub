import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./Profile";
import SimpleAvatar from "./SimpleAvatar";
import Pods from "./Pods";

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
          <Pods name="0.0.1" description="Sea Saws." />
          <Pods name="0.0.2" description="The Podist" />
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          Projects
        </TabPanel>
      </div>
    </div>
  );
}
