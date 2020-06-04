const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("dotenv");
const prettyStringify = require("json-stringify-pretty-compact");

dotenv.config();

const escapeUsername = username => username.replace(/[-_]/g, '');

const getTeams = async () => {
	// <100 teams so first page will do!
	const response = await fetch(
		`https://api.github.com/orgs/MLH-Fellowship/teams`,
		{ headers: { authorization: "token " + process.env.GITHUB_TOKEN } }
	);
	return response.json();
};

const getMembersForTeam = async ({ teamSlug }) => {
	// <100 members per team so first page will do!
	const response = await fetch(
		`https://api.github.com/orgs/MLH-Fellowship/teams/${teamSlug}/members`,
		{ headers: { authorization: "token " + process.env.GITHUB_TOKEN } }
	);
	return response.json();
};

const fetchUsers = async () => {
	console.log("Retrieving MLH Fellowship users from GitGub API");

	const teams = await getTeams();
	const teamsCount = teams.length;
	console.log(`Fetched ${teamsCount} teams`);

	const users = [];
	const extraUserFields = ['name', 'bio', 'company', 'email', 'location', 'twitterUsername', 'websiteUrl'];

	for (let i = 0; i < teamsCount; i++) {
		const team = teams[i];

		// Skip the parent Summer 2020 team
		if (team.name === 'Summer 2020') continue;

		const membersForTeam = await getMembersForTeam({ teamSlug: team.slug });
		const teamMembersCount = membersForTeam.length;
		console.log(`Fetched ${teamMembersCount} members for team ${team.name}`);

		// Get all the extra data about all the users in this team, e.g. name, bio, etc.
		const extraUserDetails = await getUserDetails({
			usernames: membersForTeam.map(m => m.login)
		});

		for (let j = 0; j < teamMembersCount; j++) {
			const member = membersForTeam[j];
			member.pod = team.name;

			// Keys must be alphanumeric only in GraphQL Query
			const escapedUsername = escapeUsername(member.login);

			// Add the extra data for each member
			const thisUserDetails = extraUserDetails[escapedUsername];
			extraUserFields.forEach(field => member[field] = thisUserDetails[field]);

			// Handle the extra nested fields
			member['followers'] = thisUserDetails.followers.totalCount;
			member['following'] = thisUserDetails.following.totalCount;
			member['repositories'] = thisUserDetails.following.repositories;
		}

		users.push(...membersForTeam);
	}

	return new Promise((resolve, reject) => resolve(users));
};

const getUserDetails = async ({ usernames }) => {
	let queryString = '';

	// Delete underscores/hyphens, keys must be alphanumeric only in GraphQL Query
	usernames.forEach(u => {
		const escapedUsername = escapeUsername(u);
		queryString += `${escapedUsername}: user(login: "${u}") { ...UserFragment }\n`
	});

	const query = `
		query {
			${queryString}
		}

		fragment UserFragment on User {
			name
			login
			bio
			company
			email
			location
			twitterUsername
			websiteUrl
			followers {
				totalCount
			}
			following {
				totalCount
			}
			repositories {
				totalCount
			}
		}`;

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
	return json.data;
};

const saveUsers = users => {
	// TODO: Upload user data into AWS Amplify instead of dumping it as JSON.

	// save all users a single big JSON file
	const allUsersString = prettyStringify(users, { indent: 2 });
	fs.writeFileSync("./allUsers.json", allUsersString, "utf8");
	console.log(`Saved ${users.length} users to ./allUsers.json`);

	// save username array, for querying single users for more info that is not provided by /orgs/MLH-Fellowship/
	let usernames = { data: [] };
	for (let user of users) usernames.data.push(user.login);
	const allUsernamesString = prettyStringify(usernames, { indent: 2 });
	fs.writeFileSync("./usernames.json", allUsernamesString, "utf8");
	console.log(`Saved ${users.length} users to ./usernames.json`);
};

fetchUsers().then(users => saveUsers(users));