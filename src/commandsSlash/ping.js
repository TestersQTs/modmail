const Discord = require("discord.js");

module.exports = async (client, token, id, interaction) => {
	client.api.interactions(id, token).callback.post({
		data: {
			type: 5,
		},
	});

	const embed = new Discord.MessageEmbed()
		.setColor("#7289DA")
		.setDescription(`WebSocket latency is **${Math.round(client.ws.ping)}ms**`)
		.setFooter(
			`Executed by: ${interaction.member.user.username}#${interaction.member.user.discriminator}`,
			(await client.users.fetch(interaction.member.user.id)).avatarURL(),
		)
		.setTimestamp();

	await new Discord.WebhookClient(client.user.id, token).send(embed);
};
