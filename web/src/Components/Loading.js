import React from "react";
import { Heading } from "@primer/components";
import { HourglassIcon } from "@primer/octicons-react";

export default function Loading(props) {
  return (
    <Heading fontSize={props.small ? 5 : 7} mb={3} style={{ textAlign: 'center' }}>
      <HourglassIcon size={props.small ? 35 : 55} /> Loading...
    </Heading>
  );
}
