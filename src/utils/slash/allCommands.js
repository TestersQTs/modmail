const axios = require("axios");
const { config } = require("dotenv");

config({
	path: `${__dirname}/../../.env`,
});

axios
	.get("https://discord.com/api/v8/applications/791331386379993088/guilds/784408056997216327/commands", {
		headers: { Authorization: `Bot ${process.env.TOKEN}` },
	})
	.then(req => {
		console.log(req.data);
	});
