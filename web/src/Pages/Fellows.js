import React from "react";

import SimpleAvatar from "../Components/SimpleAvatar";
import Search from "../Components/Search";

export default class Fellows extends React.Component {
  state = { search: "" };

  handleInput = (e) => {
    this.setState({ search: e.target.value.toLowerCase() });
  };

  createAvatars() {
    console.log(this.props)
    return this.props.fellows.map((fellow, i) => (
      <SimpleAvatar
        bgPhoto={fellow.avatar_url}
        cta="View profile"
        ctaUrl={`/fellows/${fellow.username}`}
        key={i}
      />
    ));
  }

  render() {
    return (
      <div className="App">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto auto auto",
            gridRowGap: "20px",
          }}
        >
          {this.createAvatars()}
        </div>
      </div>
    );
  }
}
