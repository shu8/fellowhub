const fetch = require("node-fetch");

module.exports = {
	name: "reply",
	description: "Sends a reply through the bot",
	async execute(message, args) {
		let channelToMessage;
		if (args[0] && args[0].startsWith('$')) {
			channelToMessage = args[0].slice(1); // Remove symbol at front
			args.shift();
		}

		if (!channelToMessage) {
			message.channel.send("Uh oh, no channel provided.");
			return;
		}

		const reply = args.join(" ");
		try {
			await fetch("http://localhost:3000/send-message", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: process.env.SEND_MESSAGE_SECRET,
					channelCustomId: channelToMessage,
					message: reply,
				}),
			});
		} catch (error) {
			message.channel.send("Uh oh, something failed miserably.");
			console.log(error);
		}
	},
};
