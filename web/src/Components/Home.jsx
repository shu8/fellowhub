import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Profile from "./Profile";
import SimpleAvatar from "./SimpleAvatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createAvatars = () => {
    const avatars = [];
    for (let i = 0; i < 45; i++) {
      avatars.push(<SimpleAvatar
        bgPhoto={`https://picsum.photos/740/420/?random?${i}`}
        cta="View profile"
      />);
    }
    return avatars;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Profile />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="OVERVIEW" icon={<AppsIcon />} {...a11yProps(0)} />
            <Tab label="PODS" icon={<PeopleIcon />} {...a11yProps(1)} />
            <Tab
              label="PROJECTS"
              icon={<SettingsEthernetIcon />}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
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
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
