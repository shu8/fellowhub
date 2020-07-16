const fetch = require("node-fetch");
const fs = require("fs");

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
  arr.filter(x => x.pastWeekCommits).sort((a, b) => b.pastWeekCommits - a.pastWeekCommits)[0]

/**Get an array of thirty objects like { githubId: "abc", total_count: 123 }.*/
const getCounts = async (someUsernames) =>
  await Promise.all(someUsernames.map(async (u) => await getCommits(u)));

const sendDiscordMessage = async (mvf) => {
  const res = await fetch('https://ld48eii9kk.execute-api.eu-central-1.amazonaws.com/dev/discord-message',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.GITHUB_TOKEN
      },
      body: JSON.stringify({
        sender: mvf.githubId,
        recipient: mvf.githubId, // Hack
        message_type: 'mvf',
        number: mvf.pastWeekCommits,
      }),
    },
  );

  const json = await res.json();
  if (!json.success) {
    console.log(json);
    throw Error('Error sending discord message');
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.handler = async (event) => {
  const allCommitCounts = [];
  if (process.env.DEBUG) {
    allCommitCounts = JSON.parse(fs.readFileSync("./commitCounts.json"));
  } else {
    const jsonUsernames = JSON.parse(fs.readFileSync("./usernames.json"));
    let usernames = jsonUsernames.data;

    // interval because of low rate limit for Custom Search API
    // 170 fellows total, 30 requests every 65 seconds (extra 5 seconds just in case)
    // 6 cycles, ~6 minutes total running time
    for (let i = 0; i < 6; i++) {
      console.log(JSON.stringify(allCommitCounts));
      const someUsernames = usernames.splice(0, 30); // get first thirty, delete first thirty from `usernames`
      const thirtyCounts = await getCounts(someUsernames);
      allCommitCounts.push(...thirtyCounts);
      await delay(65000);
    }
  }

  console.log(JSON.stringify(allCommitCounts));
  const mvf = findMostValuable(allCommitCounts);
  console.log(mvf);
  await sendDiscordMessage(mvf);
};
