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
        Authorization: "bearer " + process.env.GITHUB_TOKEN,
      },
    }
  );

  const json = await response.json();
  return { githubId: username, pastWeekCommits: json.total_count };
};

/**Helper function: Create a date that is seven days before the current date.*/
const sevenDaysAgo = () =>
  new Date(new Date().setDate(new Date().getDate() - 7));

/**Helper function: Format a date into a YYYY-MM-DD string.*/
const formatDate = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

/**Find the fellow with the highest commit count.*/
const findMostValuable = (arr) =>
  arr.reduce((a, b) => (a.pastWeekCommits > b.pastWeekCommits ? a : b));

/**Get an array of thirty objects like { githubId: "abc", total_count: 123 }.*/
const getCounts = async (someUsernames) =>
  await Promise.all(someUsernames.map(async (u) => await getCommits(u)));

// --------------------------------------------------
//    execution
// --------------------------------------------------

const jsonUsernames = JSON.parse(fs.readFileSync("./usernames.json"));
let usernames = jsonUsernames.data;

// interval because of low rate limit for Custom Search API
// 170 fellows total, 30 requests every 65 seconds (extra 5 seconds just in case)
// 6 cycles, ~6 minutes total running time
let timesRun = 0;
let allCommitCounts = [];
const interval = setInterval(async () => {
  timesRun++;
  if (timesRun === 6) {
    clearInterval(interval);
    const mvf = findMostValuable(allCommitCounts);
    // TODO: in Lambda, send `mvf` in POST request to Discord webhook
  }

  const someUsernames = usernames.splice(0, 30); // get first thirty, delete first thirty from `usernames`
  const thirtyCounts = await getCounts(someUsernames);
  allCommitCounts.push(...thirtyCounts);
}, 65_000);
