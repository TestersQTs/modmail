const axios = require("axios");
const { config } = require("dotenv");

config({
	path: `${__dirname}/../../.env`,
});

axios.post(
	"https://discord.com/api/v8/applications/791331386379993088/guilds/784408056997216327/commands",
	{ name: "clearMail", description: "Delete all channels in the mod mail category" },
	{ headers: { Authorization: `Bot ${process.env.TOKEN}` } },
);
