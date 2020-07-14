const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const jsonUsernames = JSON.parse(fs.readFileSync("./usernames.json"));
const usernames = jsonUsernames.map((obj) => obj.githubId);

(async () => {
  const skills = [];
  for (let user of usernames) {
    const languages = [];
    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
      headers: { authorization: "token " + process.env.GITHUB_TOKEN },
    });
    const jsonRepos = await response.json();
    for (let repo of jsonRepos) {
      languages.push(repo.language);
    }
    skills.push({ githubId: user, languages });
    console.log({ githubId: user, languages });
  }
  fs.writeFileSync(
    "./skills-retrieved-from-repo-languages.json",
    JSON.stringify(skills)
  );
})();
