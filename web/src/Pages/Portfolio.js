import React from "react";

import { Box, TabNav, Label, BorderBox, UnderlineNav, Button, Details, Truncate } from "@primer/components";
import {
  GitCompareIcon, MegaphoneIcon, PencilIcon, HeartIcon, StarIcon, GitForkIcon, ClippyIcon
} from "@primer/octicons-react";

import { fetchFellow, fetchStandups, starRepo, sendDiscordMessage } from '../Components';
import TabPanel from "../Components/TabPanel";
import Loading from "../Components/Loading";

import linkedinTemplates from "../data/linkedin-recommendation-templates.json";

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
      <div dangerouslySetInnerHTML={{ __html: fixStandupIfEmail(standup.body) }} />
    </BorderBox>
  )
}

/**Hotfix for standup formatting if the fellow posted their standup via e-mail.*/
function fixStandupIfEmail(standup) {
  if (/class="email-fragment"/.test(standup)) {
    const match = standup.match(/<div class="email-fragment">([\s\S]*?)<\/div>/);
    if (match) {
      return match[1]
        .replace(/\*\*:/g, "</b>")
        .replace(/\*\*/g, "<br><b>")
        .replace(/-/g, "<br>-")
        .replace(/$\n<b>/, "<b>");
    } else {
      // unexpected formatting :(
      return standup;
    }
  }
  return standup;
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
      this.setState({ fellow, standups: standups.error ? [] : standups });
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

  renderLinkedinExchangeTab() {
    const name = this.state.fellow.name.split(' ')[0];
    const detailElements = linkedinTemplates.map((t, i) => {
      const text = t.replace(/RECOMMENDED_FELLOW/g, name);
      return (
        <BorderBox className="linkedin-template-expander" key={i}>
          <Details>
            <Truncate as="summary" title={text}>{text}</Truncate>
            <p>
              {text}
              <Button
                onClick={() => navigator.clipboard.writeText(text)}
                title="Copy to clipboard"
                className="copy-to-clipboard"
              >
                <ClippyIcon size={24} />
              </Button>
            </p>
          </Details>
        </BorderBox>
      );
    });

    return (
      <div>
        {this.state.fellow.linkedin_id
          ? <a href={`https://linkedin.com/in/${this.state.fellow.linkedin_id}`} target="_blank" rel="noopener noreferrer">
              <Button className="blue-btn" onClick={() => 1}>Click here to visit {name}'s LinkedIn profile.</Button>
            </a>
          : <span>Oh no! Looks like we don't have this Fellow's LinkedIn profile saved! Please get in touch with us and we will fix this!</span>
        }
        {this.state.fellow.linkedin_id && (
          <Button className="blue-btn" style={{ marginLeft: '10px'}} onClick={async () =>
            await sendDiscordMessage(this.props.loggedInUser.username, this.props.username, 'linkedin', null, this.props.accessToken)}
          >
            I've endorsed {name}!
          </Button>
        )}
        {detailElements}
      </div>
    );
  }

  renderGithubExchangeTab() {
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
            accessToken={this.props.accessToken}
            recipient={this.props.username}
            sender={this.props.loggedInUser.username}
          />
        )}
      </div>
    );
  }

  render() {
    if (!this.props.username) return this.renderError();
    const { fellow } = this.state

    if (!fellow) {
      return <Loading />
    } else if (!Object.keys(fellow).length) {
      return this.renderError();
    }

    return (
      <div className="portfolio">
        <div className="portfolio-header">
          <img src={fellow.avatar_url} />
          <div className="details">
            {fellow.name
              ? <span className="username">{fellow.name} ({fellow.username})</span>
              : <span className="username">{fellow.username}</span>}
            <span className="pod-info" style={{ marginLeft: "10px" }}>{fellow.pod} {fellow.pod !== fellow.pod_id ? `(${fellow.pod_id})` : ''}</span>
            <a className="social-link" href={`https://github.com/${fellow.username_original}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            {fellow.linkedin_id && <a className="social-link" href={`https://linkedin.com/in/${fellow.linkedin_id}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
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
              {this.renderGithubExchangeTab()}
            </TabPanel>

            <TabPanel tab={this.state.exchangeTab} value={"linkedin"}>
              <p>
                If you have appreciated working with a Fellow during the Fellowship, please take a minute to endorse them on LinkedIn.
                <br />
                You can easily copy and paste personalised templates below to make the process quick and simple! You are encouraged to edit these to include your personal experiences with the Fellow.
              </p>
              {this.renderLinkedinExchangeTab()}
            </TabPanel>
          </div>
        </TabPanel>
      </div>
    );
  }
}
