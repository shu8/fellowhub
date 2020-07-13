const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

const addManualEntries = users => {
  users['jevakallio'] = ['JavaScript', 'TypeScript', 'React', 'CSS', 'Redux'];
  users['ianjennings'] = ['JavaScript', 'Bash', 'CoffeeScript', 'Electron', 'Java', 'WebSocket'];
  users['zencephalon'] = ['Ruby', 'JavaScript', 'REST', 'Python'];
  users['flosincapite'] = ['Python'];
  users['arcofdescent'] = ['Julia', 'Docker', 'DevOps', 'JavaScript', 'Perl', 'Elixir', 'Vue', 'Python'];
  users['mkcode'] = ['Ruby', 'JavaScript', 'TypeScript', 'Bash'];
  users['juped'] = ['C', 'Ruby', 'JavaScript'];
};

const query = `
{
  organization(login: "MLH-Fellowship") {
    team(slug: "mlh-fellows-summer-2020") {
      discussion(number: 3) {
        comments(first: 100) {
          totalCount
          edges {
            node {
              author {
                login
              }
              bodyText
            }
          }
        }
      }
    }
  }
}`;

const fetchDiscussionComments = async () => {
  const response = await fetch(
    'https://api.github.com/graphql',
    {
      method: 'post',
      headers: {
        Authorization: "bearer " + process.env.GITHUB_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    },
  );
  const json = await response.json();
  const comments = json.data.organization.team.discussion.comments.edges.map(e => e.node);

  const extracted = {};
  comments.forEach(c => {
    const match = c.bodyText.match(/overview\s*:?\s*(.*\n)/i);
    const username = c.author.login;

    const comment = match[1].replace(/[().,!]/g, '');
    // In general, people will use a Capital letter when talking about technologies :P
    const possibleTechs = comment.split(/\s|\/|,/).filter(w => w[0] && w[0] === w[0].toUpperCase());

    const filteredTechs = possibleTechs.filter(t => {
      return t.length !== 1 && t !== "I\'m";
    }).map(t => {
      return t
        .replace(/(^ML)/, "Machine Learning")
        .replace(/(^AI)/, "Artificial Intelligence")
        .replace(/(^JS)|(javascript)/i, "JavaScript")
        .replace(/(^TS)|(typescript)/i, "TypeScript")
        .replace(/(^ReactJS)/i, "React")
        .replace(/(^NodeJS)/i, "Node");
    });

    extracted[username] = filteredTechs;
  });

  addManualEntries(extracted);
  return extracted;
}

fetchDiscussionComments().then(users => {
  const usersCount = users.length;

  const allUsersString = JSON.stringify(users, null, 2);
  fs.writeFileSync("./allUsersSkills.json", allUsersString, "utf8");
  console.log(`Saved ${usersCount} users to ./allUsersSkills.json`);
  return users;
});
