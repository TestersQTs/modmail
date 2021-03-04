const BotClient = require("./structures/BotClient");
const db = require("./utils/database/connection");
require("./structures/Config");
require("dotenv").config();

const config = {
	token: process.env.TOKEN,
	prefix: global.config.prefix,
	defaultPerms: ["SEND_MESSAGES", "VIEW_CHANNEL"],
};

const client = new BotClient(config);

client.ws.on("INTERACTION_CREATE", async interaction => {
	const { token, id } = interaction;

	switch (interaction.data.name) {
		case "ping":
			await require("./commandsSlash/ping")(client, token, id, interaction);
			break;

		default:
			console.error("Something shit itself very very badly");
			break;
	}

	console.log(interaction);
});

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch(err => console.log("Database connection error: ", err));

client.login().catch(err => console.log("Client connection error: ", err));
