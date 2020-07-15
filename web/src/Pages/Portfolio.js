import React from "react";

import { Heading, Box, TabNav, Label, BorderBox } from "@primer/components";
import {
  HourglassIcon, GitCompareIcon, MegaphoneIcon, PencilIcon
} from "@primer/octicons-react";

import { fetchFellow, fetchStandups } from '../Components';
import TabPanel from "../Components/TabPanel";

const stateColors = {
  OPEN: '#28a745',
  MERGED: '#6f42c1',
  CLOSED: '#d73a49',
};

function Pull(props) {
  const { pull } = props;
  const number = pull.url.split('/').pop();

  return (
    <BorderBox style={{ padding: '5px', width: '300px', margin: '5px' }}>
      <Box>
        <Label variant="medium" mr={2} bg={stateColors[pull.state]}>{pull.state}</Label>
        <span style={{ fontWeight: 'bold' }}>{pull.title}</span>
      </Box>
      <Box>
        <a href={pull.url} target="_blank" rel="noopener noreferrer">#{number}</a> on GitHub.
      </Box>
    </BorderBox>
  )
}

function Issue(props) {
  const { issue } = props;
  const number = issue.url.split('/').pop();

  return (
    <BorderBox style={{ padding: '5px', width: '300px', margin: '5px' }}>
      <Box>
        <Label variant="medium" mr={2} bg={stateColors[issue.state]}>{issue.state}</Label>
        <span style={{ fontWeight: 'bold' }}>{issue.title}</span>
      </Box>
      <Box>
        <a href={issue.url} target="_blank" rel="noopener noreferrer">#{number}</a> on GitHub.
      </Box>
    </BorderBox>
  )
}

function Standup(props) {
  const { standup } = props;

  return (
    <BorderBox style={{ padding: '5px', width: '400px', margin: '5px' }} className="standup">
      <Box>
        <Label variant="medium" mr={2} bg={stateColors.OPEN}>{new Date(standup.createdAt).toLocaleString()}</Label>
        <a href={standup.url} target="_blank" rel="noopener noreferrer">View on GitHub</a>.
      </Box>
      <div dangerouslySetInnerHTML={{ __html: standup.body }} />
    </BorderBox>
  )
}

export default class Portfolio extends React.Component {
  state = { fellow: null, standups: [], tab: 'pulls' };

  async componentDidMount() {
    if (this.props.username && this.props.accessToken) {
      const fellow = await fetchFellow(this.props.username, this.props.accessToken);
      const standups = await fetchStandups(this.props.username, this.props.accessToken);
      console.log(standups);
      this.setState({ fellow, standups });
    }
  }

  renderError() {
    return (
      <div className="App">
        <h1>Fellow not found!</h1>
      </div>
    );
  }

  setTab(tab) { this.setState({ tab }) }

  render() {
    if (!this.props.username) return this.renderError();
    const { fellow } = this.state

    if (!fellow) {
      return (
        <Heading fontSize={7} mb={3} style={{ textAlign: 'center' }}>
          <HourglassIcon size={55} /> Loading...
        </Heading>
      );
    } else if (!Object.keys(fellow).length) {
      return this.renderError();
    }

    return (
      <div className="portfolio">
        <div className="portfolio-header">
          <img src={fellow.avatar_url} />
          <div className="details">
            <span className="username">{fellow.username}</span>
            <span className="pod-info">{fellow.pod} {fellow.pod !== fellow.pod_id ? `(${fellow.pod_id})` : ''}</span>
          </div>
        </div>
        <Box className="bio">
          {fellow.bio}
        </Box>
        <TabNav className="portfolio-tabs" aria-label="Main">
          <TabNav.Link
            href="#pulls"
            selected={this.state.tab === "pulls"}
            onClick={() => this.setTab("pulls")}
          >
            <GitCompareIcon /> Pulls
          </TabNav.Link>
          <TabNav.Link
            href="#issues"
            selected={this.state.tab === "issues"}
            onClick={() => this.setTab("issues")}
          >
            <MegaphoneIcon /> Issues
          </TabNav.Link>
          <TabNav.Link
            href="#standups"
            selected={this.state.tab === "standups"}
            onClick={() => this.setTab("standups")}
          >
            <PencilIcon /> Standups
          </TabNav.Link>
        </TabNav>

        <TabPanel tab={this.state.tab} value={"pulls"}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {this.state.fellow.pullsActivity.map((pull, i) => <Pull pull={pull} key={i} />)}
          </div>
        </TabPanel>

        <TabPanel tab={this.state.tab} value={"issues"}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {this.state.fellow.issuesActivity.map((issue, i) => <Issue issue={issue} key={i} />)}
          </div>
        </TabPanel>

        <TabPanel tab={this.state.tab} value={"standups"}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {this.state.standups.map((standup, i) => <Standup standup={standup} key={i} />)}
          </div>
        </TabPanel>
      </div>
    );
  }
}
