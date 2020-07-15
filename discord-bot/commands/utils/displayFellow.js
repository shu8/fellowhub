const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { githubToken } = require("../../config");
const {
	API_BASE_URL,
	REPORTER_BASE_URL,
	MESSAGE_EMBED_FOOTER,
} = require("../../constants");

const displayFellow = async (message, arg) => {
	const userData = await getUserDataFromAPI(arg);
	userData.popularityPoints = getPopularityPoints(userData);
	message.channel.send(createEmbed(userData));
};

const getUserDataFromAPI = async (username) => {
	const endpoint = API_BASE_URL + "/fellows/" + username;

	const response = await fetch(endpoint, {
		headers: { Authorization: githubToken },
	});
	return response.json();
};

const getPopularityPoints = ({ name, followers, avatar_url }) => {
	const date = new Date().getDate();
	const id = avatar_url.match(/u\/(\d+)\?/)[1];
	const mystery = id.toString().slice(5);
	return parseInt(name.length + date * mystery) + followers || 0;
};

const createEmbed = (userData) => {
	return new MessageEmbed({
		title: `**${userData.name}**`,
		url: userData.github_url,
		thumbnail: { url: userData.avatar_url },
		fields: createFellowEmbedFields(userData),
		footer: MESSAGE_EMBED_FOOTER,
		color: "#0099ff",
	});
};

const getGroupType = (groupType) => {
	if (
		groupType === "MLH Staff" ||
		groupType === "Mentors" ||
		groupType === "CTF"
	)
		return "Group:";
	return "Pod:";
};

const buildReporterLink = (username) =>
	`[Reporter](${REPORTER_BASE_URL + "/" + username})`;

const createFellowEmbedFields = (userData) => {
	let embedFields = [];

	const isFellow =
		userData.pod !== "MLH Staff" &&
		userData.pod !== "Mentors" &&
		userData.pod !== "CTF";
	const hasBio = userData.bio !== null && userData.bio !== "";
	const hasLocation = userData.location !== null && userData.location !== "";

	embedFields.push({
		name: "Stats:",
		value: buildReporterLink(userData.username),
	});

	if (hasBio) {
		embedFields.push({
			name: "Bio:",
			value: userData.bio,
		});
	}

	if (hasLocation) {
		embedFields.push({
			name: "Location:",
			value: userData.location,
		});
	}

	embedFields.push({
		name: getGroupType(userData.pod),
		value: isFellow ? userData.pod_id + " → " + userData.pod : userData.pod,
	});

	embedFields.push({
		name: "Popularity points:",
		value: getPopularityPoints(userData),
	});

	return embedFields;
};

module.exports = displayFellow;
