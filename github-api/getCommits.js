const fs = require("fs");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

/**Get total count of commits for GitHub user for the past seven days.*/
const getCommits = async (username) => {
  const date = formatDate(sevenDaysAgo());

  // https://developer.github.com/v3/search/#search-commits
  const response = await fetch(
    `https://api.github.com/search/commits?q=author:${username}+committer-date:>${date}`,
    {
      method: "get",
      headers: {
        Accept: "application/vnd.github.cloak-preview",
        Authorization: process.env.GITHUB_TOKEN,
      },
    }
  );

  const json = await response.json();
  return { githubId: username, pastWeekCommits: json.total_count };
};

/**Create a date that is seven days before the current date.*/
const sevenDaysAgo = () =>
  new Date(new Date().setDate(new Date().getDate() - 7));

/**Format a date into a YYYY-MM-DD string.*/
const formatDate = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const jsonUsernames = JSON.parse(fs.readFileSync("./usernames.json"));
const usernames = jsonUsernames.data;

usernames.forEach((u) => getCommits(u).then(console.log));
