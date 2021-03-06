const Discord = require("discord.js");

module.exports = async (client, token, id, interaction) => {
	client.api.interactions(id, token).callback.post({
		data: {
			type: 5,
		},
	});

	let serverId = global.config.inboxServerId;
	if (global.config.inboxServerId === "") serverId = global.config.mainServerId;
	const guild = client.guilds.cache.get(serverId);

	const category = await guild.channels.cache.get(global.config.newMailCategoryId);
	category.children.forEach(channel => channel.delete());

	await new Discord.WebhookClient(client.user.id, token).send(`Cleared all of the mail :)`);
};
