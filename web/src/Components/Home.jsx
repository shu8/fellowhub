import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Profile from "./Profile";
import SimpleAvatar from "./SimpleAvatar";

import { TabNav } from "@primer/components";
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [tab, setTab] = React.useState("home");

  const createAvatars = () => {
    const avatars = [];
    for (let i = 0; i < 45; i++) {
      avatars.push(
        <SimpleAvatar
          bgPhoto={`https://picsum.photos/740/420/?random?${i}`}
          cta="View profile"
        />
      );
    }
    return avatars;
  };

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
              gridTemplateColumns: "auto auto auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {createAvatars()}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"pods"}>
          Pods
        </TabPanel>
        <TabPanel tab={tab} value={"projects"}>
          Projects
        </TabPanel>
      </div>
    </div>
  );
}
