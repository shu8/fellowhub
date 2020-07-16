import React from "react";
import { SubNav, TextInput, Heading } from "@primer/components";

import Event from "../Components/Event";
import TabPanel from "../Components/TabPanel";

import { SearchIcon } from "@primer/octicons-react";

export default function Events(props) {
  const [tab, setTab] = React.useState("upcoming");
  const [search, setSearch] = React.useState(props.search);

  const createEvents = () => {
    const events = props.events.items
      .filter(e => e.summary && e.start.dateTime)
      .filter(e => search ? e.summary.toLowerCase().includes(search) : true)
      .sort((a, b) => new Date(a.end.dateTime) - new Date(b.end.dateTime));

    const pastEvents = events.filter(e => new Date(e.end.dateTime).getTime() < new Date().getTime());
    const futureEvents = events.filter(e => new Date(e.end.dateTime).getTime() >= new Date().getTime());

    return (
      <div>
        <SubNav aria-label="Main">
          <SubNav.Links>
            <SubNav.Link
              href="#upcoming"
              selected={tab === "upcoming"}
              onClick={() => setTab("upcoming")}>
              Upcoming Events
          </SubNav.Link>
            <SubNav.Link
              href="#past"
              selected={tab === "past"}
              onClick={() => setTab("past")}>
              Past Events
          </SubNav.Link>
          </SubNav.Links>

          <TextInput
            type="search"
            icon={SearchIcon}
            width={320}
            onInput={(e) => setSearch(e.target.value.toLowerCase())} />
        </SubNav>

        <TabPanel tab={tab} value={"upcoming"}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {futureEvents.map((event, i) => (
              <Event event={event} key={i} />
            ))}
          </div>
        </TabPanel>
        <TabPanel tab={tab} value={"past"}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridRowGap: "20px",
            }}
          >
            {pastEvents.map((event, i) => (
              <Event event={event} key={i} />
            ))}
          </div>
        </TabPanel>
      </div >
    );
  };

  if (!props.events.items) return <div />

  const id = props.match && props.match.params
    ? props.match.params.id
    : null;

  if (id) {
    const event = props.events.items.find(e => e.id === id);
    if (event) {
      return (
        <div className="App">
          <Event event={event} extended />
          <div className="description" dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br/>') }} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <main className="container">
            <h1>No event found for ID {id}!</h1>
          </main>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <Heading fontSize={7} mb={3}>
        Events
      </Heading>
      <Heading fontSize={2} mb={20}>
        Your all-in-one resource for all the events, talks and workshops throughout the MLH Fellowship.
      </Heading>
      {createEvents()}
    </div>
  );
}
