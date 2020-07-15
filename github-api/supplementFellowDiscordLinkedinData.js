const fs = require("fs");
require("dotenv").config();

const usersJson = JSON.parse(fs.readFileSync('./allUsers.json'));
const extraJson = JSON.parse(fs.readFileSync("./fellowship-fullnames-githubIds-discordIds-linkedinIds.json"));

/**
 * This is for SECRET supplementary data. Intended to be a 'build' step before fetcher.js is called with saved=true
 * Discord IDs and the LinkedIn profile names are the 'secret' data here
*/
usersJson.forEach(u => {
  const obj = extraJson.find(ej => ej.githubId === u.username);
  if (obj) {
    u.discord_id = obj.discordId;
    u.linkedin_id = obj.linkedinId;
  }
});

// console.log(usersJson);
fs.writeFileSync('./allUsers.json', JSON.stringify(usersJson, null, 2), 'utf8');
