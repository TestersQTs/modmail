const BotClient = require("./structures/BotClient");
const db = require("./utils/database/connection");
const fs = require('fs');
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
	if (fs.existsSync(`./commandsSlash/${interaction.data.name}`))
		await require(`./commandsSlash/${interaction.data.name}`)(client, token, id, interaction);
	else
		console.log("Something shit itself very very badly")
});

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch(err => console.log("Database connection error: ", err));

client.login().catch(err => console.log("Client connection error: ", err));
