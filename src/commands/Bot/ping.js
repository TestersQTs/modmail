const Command = require("../../structures/Command");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Return the Websocket and API latency",
			category: "Bot",
			usage: "!ping",
		});
	}

	async run(message, _args) {
		const latency = Math.floor(new Date().getTime() - message.createdTimestamp);
		const apiLatency = Math.round(this.client.ws.ping);

		return message.channel.send(`Pong \`${latency}\` ms | **API:** \`${apiLatency}\` ms`);
	}
};
