import React from "react";
import PropTypes from "prop-types";

import { Box, Text } from "@primer/components";

export default function TabPanel(props) {
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
