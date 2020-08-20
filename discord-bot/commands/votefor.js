const fetch = require("node-fetch");
const {
	API_BASE_URL,
	VOTING_SERVER_API_BASE_URL,
	MENTOR_GITHUB_IDS,
	MLH_STAFF_GITHUB_IDS,
	GITHUB_IDS_OF_FELLOWS_WITHOUT_DISCORD_IDS,
} = require("../constants");
const { githubToken } = require("../config");

module.exports = {
	name: "votefor",
	description: "Receives, checks and casts votes for contest",
	async execute(message, args) {
		const arg = validateArgs(args, message);

		if (!arg) return;

		const voterDiscordId = message.author.id;
		const recipientDiscordId = getDiscordIdFromMention(arg);

		let voterGithubId = "";
		let recipientGithubId = "";

		// bot ID
		if (recipientDiscordId === "717455864994463884") {
			message.channel.send("Awww! But really, please vote for a human fellow.");
			return;
		}

		try {
			voterGithubId = await getGithhubIdFromDiscordId(voterDiscordId);
			recipientGithubId = await getGithhubIdFromDiscordId(recipientDiscordId);

			// TEMP
			// voterGithubId = "ivov";
			// recipientGithubId = "adfaris";
		} catch (error) {
			console.log(
				`ERROR FOR ONE OF THESE DISCORD IDs:\n${voterDiscordId}\n${recipientGithubId}`
			);
			message.channel.send(
				"Uh oh, one of those Discord IDs is missing! Paging <@716842220648661012>"
			);
			return;
		}

		// pre-checks

		console.log(recipientGithubId);

		if (["ivov", "kendevops", "shu8"].includes(recipientGithubId)) {
			message.channel.send(
				"Oh that fellow is a voting event organizer! Please vote for another fellow!"
			);
			return;
		}

		if (MLH_STAFF_GITHUB_IDS.includes(recipientGithubId)) {
			message.channel.send(
				"Oh that is an MLH staffer! Only fellows can receive votes!"
			);
			return;
		}

		if (MENTOR_GITHUB_IDS.includes(recipientGithubId)) {
			message.channel.send(
				"Oh that is a mentor! Only fellows can receive votes!"
			);
			return;
		}

		if (GITHUB_IDS_OF_FELLOWS_WITHOUT_DISCORD_IDS.includes(recipientGithubId)) {
			message.channel.send(
				"Oh we have you in our database but without a Discord ID! Paging <@716842220648661012>"
			);
			return;
		}

		if (voterGithubId === recipientGithubId) {
			message.channel.send(
				"Very sneaky. Please only vote for someone other than yourself."
			);
			return;
		}

		const voteCheckResponse = await fetch(
			VOTING_SERVER_API_BASE_URL + "/check_vote?github_id=" + voterGithubId
		);
		const { isVoter, canVote } = await voteCheckResponse.json();

		if (!isVoter) {
			message.channel.send(
				"You are not a fellow! Only fellows may cast votes."
			);
			return;
		}

		if (!canVote) {
			message.channel.send("The records show you've already voted!");
			return;
		}

		// cast vote

		const voteCastingResponse = await fetch(
			VOTING_SERVER_API_BASE_URL + "/cast_vote",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					voter: voterGithubId,
					recipient: recipientGithubId,
				}),
			}
		);

		const { success } = await voteCastingResponse.json();

		if (!success) {
			message.channel.send(
				"Uh oh, your vote could not be recorded! Paging <@716842220648661012>"
			);
			return;
		}

		message.channel.send("Your vote has been recorded. Thank you for voting!");
	},
};

const validateArgs = (args, message) => {
	if (args.length === 0) {
		message.channel.send(
			"No argument! :grimacing:\nUsage: `!votefor @Discord username`"
		);
		return;
	} else if (args.length > 1) {
		message.channel.send(
			"Too many arguments! :grimacing:\nUsage: `!voteFor @Discord username`"
		);
		return;
	}
	return args[0];
};

const getDiscordIdFromMention = (mention) => mention.replace(/[!<@>]/g, "");

const getGithhubIdFromDiscordId = async (discordId) => {
	const endpoint = API_BASE_URL + "/fellows/";

	const response = await fetch(endpoint, {
		headers: { Authorization: githubToken },
	});
	const json = await response.json();

	const relevantObj = json.find((obj) => obj.discord_id === discordId);

	return relevantObj.username;
};
