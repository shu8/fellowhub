import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppsIcon from "@material-ui/icons/Apps";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PeopleIcon from "@material-ui/icons/People";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Profile from "./Profile";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "65%",
    height: "100%",
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Profile />
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="MEDIUM"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<AppsIcon />} label="OVERVIEW" />
          <Tab icon={<PeopleIcon />} label="PODS" />
          <Tab icon={<SettingsEthernetIcon />} label="PROJECTS" />
          <Tab icon={<AccountTreeIcon />} label="FELLOWS" />
        </Tabs>
      </Paper>
    </div>
  );
}
