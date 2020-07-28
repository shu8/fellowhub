const express = require("express");
const bodyParser = require("body-parser");
const { discordToken } = require("./config");
const client = require("./Client");

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

let cachedMessage;
client.on("message", (message) => {
	if (message.author.bot && !message.content.startsWith("!reply")) cachedMessage = message;

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

app.post("/send-message", (req, res) => {
	if (req.body.secret !== process.env.SEND_MESSAGE_SECRET)
		return res.json({ error: true, error_msg: "Unauthorized" });

	if (cachedMessage) {
		cachedMessage.channel.send(req.body.message);
		res.json({ error: false });
	} else {
		res.json({ error: true, error_msg: "No cached message available :(" });
	}
});

app.listen(3000, () =>
	console.log("/send-message POST server listening on port 3000")
);
