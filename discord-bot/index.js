const { discordToken } = require("./config");
const client = require("./Client");

client.once("ready", () => {
	console.log("Client ready!");
	client.guilds.cache
		.first()
		.members.fetch()
		.then((fetchedMembers) => {
			let output = [];
			for (let member of fetchedMembers) {
				output.push({
					fullName: member[1].user.username,
					discordId: member[1].user.id,
				});
			}
			process.stdout.write(JSON.stringify(output) + "\n");
		});
});
client.login(discordToken);

client.on("message", (message) => {
	if (!message.content.startsWith("!") || message.author.bot) return;

	const args = message.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		message.channel.send("There was an error trying to execute that command!");
	}
});
