const axios = require("axios");
const { config } = require("dotenv");

config({
	path: `${__dirname}/../../.env`,
});

axios.delete("https://discord.com/api/v8/applications/791331386379993088/guilds/784408056997216327/commands/817035844220747797", {
	headers: { Authorization: `Bot ${process.env.TOKEN}` },
});
