const BotClient = require("./structures/BotClient");
const db = require("./utils/database/connection");
const fs = require("fs");
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

	if (fs.existsSync(`${__dirname}/commandsSlash/${interaction.data.name}.js`))
		await require(`./commandsSlash/${interaction.data.name}`)(client, token, id, interaction);
	else console.error("lol error");
});

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch(err => console.log("Database connection error: ", err));

client.login().catch(err => console.log("Client connection error: ", err));
