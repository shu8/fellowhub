module.exports = {
	name: "help",
	description: "Explains bot usage",
	async execute(message, args) {
		const helpMessage = `Your wish is my command:\n
    :robot: \`!gimme [GitHub username]\` to get a fellow, mentor or MLH admin
    \t\t → Example: \`!gimme yashkumarverma\`\n
    :robot: \`!gimme mentors\` to get a list of mentors\n
    :robot: \`!gimme playlist\` to get a link to the MLH Fellowship Sessions Playlist\n
    :robot: \`!gimme [project]\` to get a project
    \t\t → Example: \`!gimme amplify\`\n
    :robot: \`!random\` to get a random fellow\n
    :robot: \`!random [pod name]\` or \`!random [pod number]\` to get a randomized list of pod members
    \t\t → Example: \`!random dodos\` or \`!random 0.2.1\`
    \t\t → Note: Add the \`--table\` flag to view the list as a table\n
    :robot: \`!standup [GitHub username]\` or \`!standup [pod number]\` or \`!standup [project]\`\n\t\t\tto get their daily standups
    \t\t → Example: \`!standup michiboo\` or \`!standup 0.4.1\` or \`!standup amplify\`
    \t\t → Note: \`!standup [project]\` only works for the projects of 0.2.1 and 0.2.2\n
    :robot: \`!goodbot\` or \`!badbot\` to like or dislike the bot
    `;

		message.channel.send(helpMessage);
	},
};

// :robot: \`!votefor @[Discord username]\` to cast a vote for your favorite fellow
// \t\t → Note: Only valid during the MLH Halfway Hackathon FellowHub Voting Event.
// \t\t → Example: \`!votefor @John Smith\`
