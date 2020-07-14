import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Profile from "./Profile";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 650,
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex" }}>
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
          <Tab icon={<PhoneIcon />} label="OVERVIEW" />
          <Tab icon={<FavoriteIcon />} label="PODS" />
          <Tab icon={<PersonPinIcon />} label="PROJECTS" />
          <Tab icon={<AccountTreeIcon />} label="FELLOWS" />
        </Tabs>
      </Paper>
    </div>
  );
}
