const express = require("express");
const bodyParser = require("body-parser");
const { discordToken } = require("./config");
const client = require("./Client");

// Object with key/values in the form `friendlyName: channelIdAsString`
const { friendlyChannelMappings } = require("./secretConfig");

client.once("ready", () => {
	console.log("Client ready!");
	// client.guilds.cache
	// 	.first()
	// 	.members.fetch()
	// 	.then((fetchedMembers) => {
	// 		let output = [];
	// 		for (let member of fetchedMembers) {
	// 			output.push({
	// 				fullName: member[1].user.username,
	// 				discordId: member[1].user.id,
	// 			});
	// 		}
	// 		process.stdout.write(JSON.stringify(output) + "\n");
	// 	});
});

client.login(discordToken);

client.on("message", (message) => {
	if (!message.content.startsWith("!")) return;

	const args = message.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "invite" || command === "howdoi") return;

	if (!client.commands.has(command)) {
		message.channel.send("Fellowbot does not have that command!");
		return;
	}

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		message.channel.send("There was an error trying to execute that command!");
	}
});

const app = express();
app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
	if (req.body.secret !== process.env.SEND_MESSAGE_SECRET) {
		return res.json({ error: true, error_msg: "Unauthorized" });
	}

	if (!req.body.channelCustomId) {
		return res.json({ error: true, error_msg: "No channel found :(" });
	}

	let channel;
	let error = false;
	try {
		// First try getting the channel assuming the parameter is the 'friendly name' e.g. "server-spam"
		channel = await client.channels.fetch(friendlyChannelMappings[req.body.channelCustomId]);
	} catch (err) {
		try {
			// Fall back to the parameter being the channel ID itself
			channel = await client.channels.fetch(req.body.channelCustomId);
		} catch (err) {
			// Alert maintainers if there's an error
			console.error('Unknown channel: ' + req.body.channelCustomId);
			error = true;
			channel = await client.channels.fetch(process.env.ALERTS_CHANNEL);
		}
	}

	if (channel) {
		if (error) channel.send('Error sending message to channel: ' + req.body.channelCustomId);
		channel.send(req.body.message);
		res.json({ error: false });
	} else {
		res.json({ error: true, error_msg: "No channel found :(" });
	}
});

app.listen(3000, () =>
	console.log("/send-message POST server listening on port 3000")
);
