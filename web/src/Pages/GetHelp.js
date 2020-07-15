import React from "react";
import { Heading, SelectMenu, Button } from "@primer/components";
import SimpleAvatar from "../Components/SimpleAvatar";

import techs from "../data/techs.json";

export default function GetHelp(props) {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");

  const getSelectMenuItems = () => techs
    .filter(t => t.toLowerCase().includes(search))
    .map(t => <SelectMenu.Item href="#" onClick={() => setSelected(t)} selected={t === selected}>{t}</SelectMenu.Item>);

  const createAvatars = () =>
    props.fellows
      .filter(fellow => fellow.skills ? fellow.skills.split(',').includes(selected) : false)
      .map((fellow, i) => (
        <SimpleAvatar bgPhoto={fellow.avatar_url} cta="View profile" key={i} />
      ));

  return (
    <div className="App">
      <Heading fontSize={7} mb={3}>
        Get Help
      </Heading>
      <Heading fontSize={2} mb={-20}>
        As Fellows, we have a unique opportunity to learn from each other. With over 100 of us, each of us has a unique skillset which we can all learn from.
      </Heading>

      <div class="blankslate">
        <h3 class="mb-1">
          {selected ? `Your technology: ${selected}` : "You don’t seem to have selected a technology."}
        </h3>
        {!selected && (<p>Choose a technology to filter Fellows and Mentors.</p>)}
        <SelectMenu>
          <Button as="summary" className="choose-tech-btn">Choose your tech</Button>
          <SelectMenu.Modal className="techs-filter">
            <SelectMenu.Header>Filter by Tech</SelectMenu.Header>
            <SelectMenu.Filter placeholder="Filter projects" value={search} aria-label="Filter Projects" onInput={(e) => setSearch(e.target.value.toLowerCase())} />
            <SelectMenu.List>
              {getSelectMenuItems()}
            </SelectMenu.List>
          </SelectMenu.Modal>
        </SelectMenu>
      </div>

      <div
        style={{
          paddingTop: "10px",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto auto",
          gridRowGap: "20px",
        }}
      >
        {createAvatars()}
      </div>
    </div>
  );
}
