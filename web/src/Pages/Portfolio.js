import React from "react";

import { Heading, Box, TabNav, Label, BorderBox, UnderlineNav, Button } from "@primer/components";
import {
  HourglassIcon, GitCompareIcon, MegaphoneIcon, PencilIcon, HeartIcon, StarIcon, GitForkIcon
} from "@primer/octicons-react";

import { fetchFellow, fetchStandups, starRepo, sendDiscordMessage } from '../Components';
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

const performStar = async (repo, accessToken, sender, recipient, setStars) => {
  const success = await starRepo(repo, accessToken, sender, recipient);
  if (success) {
    await sendDiscordMessage(sender, recipient, 'star', repo.name, accessToken);
    setStars(repo.stars + 1);
  } else {
    window.alert('There was an error starring the repo, please try starring directly on GitHub');
  }
}

function Repo(props) {
  const { repo, accessToken, recipient, sender } = props;
  const [stars, setStars] = React.useState(repo.stars);

  return (
    <BorderBox style={{ padding: '5px', width: '400px', margin: '5px' }} className="repo">
      <Box>
        <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: repo.shortDescriptionHTML }} />
      <Box className="stats-wrapper">
        <div className="stars-forks">
          <a href={`${repo.url}/stargazers`}>
            <StarIcon /> {stars}
          </a>
          &nbsp;&nbsp;&nbsp;
          <a href={`${repo.url}/network/members`}>
            <GitForkIcon /> {repo.forks}
          </a>
        </div>
        <div className="star-repo">
          <Button
            className="blue-btn"
            onClick={() => {
              performStar(repo, accessToken, sender, recipient, setStars);
            }}
            disabled={stars !== repo.stars}
          >
            <StarIcon /> Star this repo!
          </Button>
        </div>
      </Box>
    </BorderBox>
  )
}

export default class Portfolio extends React.Component {
  state = {
    fellow: null,
    standups: [],
    tab: window.location.hash.substr(1) || 'pulls',
    exchangeTab: 'github',
  };

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
  setExchangeTab(exchangeTab) { this.setState({ exchangeTab }) };

  renderLinkedinExchangeTab(props) {
    return <div />
  }

  renderGithubExchangeTab(props) {
    let repos;
    if (this.state.fellow.pinnedRepos && this.state.fellow.pinnedRepos.length) {
      repos = this.state.fellow.pinnedRepos;
    } else if (this.state.fellow.topRepos && this.state.fellow.topRepos.length) {
      repos = this.state.fellow.topRepos;
    } else {
      return <div>Looks like this Fellow doesn't have any active repositories -- you could start a project together!</div>
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {repos.map(r =>
          <Repo
            repo={r}
            accessToken={props.accessToken}
            recipient={props.username}
            sender={props.loggedInUser.username}
          />
        )}
      </div>
    );
  }

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
          <TabNav.Link
            href="#exchange"
            selected={this.state.tab === "exchange"}
            onClick={() => this.setTab("exchange")}
          >
            <HeartIcon /> Exchange Network
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

        <TabPanel tab={this.state.tab} value={"exchange"}>
          <div>
            <strong>FellowHub wants to help all our Fellows boost their social & professional network.</strong>
            <UnderlineNav aria-label="Social Network">
              <UnderlineNav.Link
                href="#github"
                selected={this.state.exchangeTab === "github"}
                onClick={() => this.setExchangeTab("github")}
              >
                GitHub
              </UnderlineNav.Link>
              <UnderlineNav.Link
                href="#linkedin"
                selected={this.state.exchangeTab === "linkedin"}
                onClick={() => this.setExchangeTab("linkedin")}
              >
                LinkedIn
              </UnderlineNav.Link>
            </UnderlineNav>

            <TabPanel tab={this.state.exchangeTab} value={"github"}>
              <p>
                If you have discovered an awesome open source project by a fellow Fellow, please consider starring their projects to help boost their visibility.
                <br />
                You can even use FellowHub to discover open source projects by Fellows you work with.
              </p>
              {this.renderGithubExchangeTab(this.props)}
            </TabPanel>

            <TabPanel tab={this.state.exchangeTab} value={"linkedin"}>
              <p>
                If you have appreciated working with a Fellow during the Fellowship, please take a minute to endorse them on LinkedIn.
                <br />
                FellowHub provides personalised templates you can use to make the process quick and simple! You are encouraged to edit these to include your personal experiences with the Fellow.
              </p>
              {this.renderLinkedinExchangeTab(this.props.accessToken)}
            </TabPanel>
          </div>
        </TabPanel>
      </div>
    );
  }
}
