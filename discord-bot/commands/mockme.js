const fetch = require("node-fetch");
const { API_BASE_URL } = require("../constants");
const { githubToken } = require("../config");

module.exports = {
	name: "mockme",
	description:
		"Calls a random fellow invite them to have a mock interview with caller",
	async execute(message, args) {
		if (args.length > 0) {
			message.channel.send(
				`No arguments please! :grimacing:\nUsage: \`!mockme\``
			);
			return;
		}

		try {
			const callerDiscordId = message.author.id;

			const randomFellowData = await getRandomFellow();

			if (randomFellowData.discord_id === undefined) {
				throw Error("No Discord ID found!");
			}

			message.channel.send(
				`Hey <@${randomFellowData.discord_id}>! <@${callerDiscordId}> here is looking to do a quick mock interview :speech_balloon:\nAny chance you can help out and schedule a call? Great way to meet someone new! :raised_hands:`
			);
		} catch (error) {
			message.channel.send("Uh oh, something failed miserably.");
			console.log(error);
		}
	},
};

// TODO: De-duplicate this, which is also in random.js

const getRandomFellow = async () => {
	const endpoint = API_BASE_URL + "/random";

	const response = await fetch(endpoint, {
		headers: { Authorization: githubToken },
	});
	return response.json();
};
