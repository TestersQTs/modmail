const Discord = require("discord.js");

module.exports = async (client, token, id, interaction) => {
	client.api.interactions(id, token).callback.post({data: {
			type: 5
		}
	})

	const embed = new Discord.MessageEmbed()
		.setColor("#7289DA")
		.setDescription(
			`**Developers:** KlukCZ#6589, mrphilip#1337
            **Version:** 1.0.0
            **GitHub:** https://github.com/TestersQTs/modmail
            **License:** MIT`)
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter(`Executed by: ${interaction.member.user.username}`, (await client.users.fetch(interaction.member.user.id)).avatarURL())
		.setTimestamp()

	await new Discord.WebhookClient(client.user.id, token).send(embed)
}