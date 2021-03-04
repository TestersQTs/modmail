const Event = require("../structures/Event");

module.exports = class extends Event {
	constructor(...args) {
		super(...args);
	}

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>`);
		if (!message.guild || message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for **${message.guild.name}** is \`\`${this.client.prefix}\`\``);
		if (!message.content.startsWith(this.client.prefix)) return;

		const [cmd, ...args] = message.content.slice(this.client.prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
			if (userPermCheck) {
				const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
				if (missing.length) {
					return message.channel.send("missing perms").then(msg => {
						message.delete({ timeout: 5000 });
						msg.delete({ timeout: 5000 });
					});
				}
			}

			const clientPermCheck = command.userPerms ? this.client.defaultPerms.add(command.clientPerms) : this.client.defaultPerms;
			if (clientPermCheck) {
				const missing = message.channel.permissionsFor(message.member).missing(clientPermCheck);
				if (missing.length) {
					return message.channel.send("bot missing perms");
				}
			}

			if (command.devOnly) if (!global.config.developers.includes(message.author.id)) return;

			if (command.maxArgs < args.length && command.maxArgs !== -1) {
				return message.channel.send(
					`Unexpected argument \`${args[command.maxArgs]}\`. Expected \`${command.maxArgs}\` got \`${args.length}\`\n**Correct usage:** ${
						command.usage
					}`,
				);
			}

			if (command.minArgs > args.length) {
				return message.channel.send(
					`Missing argument \`${command.argList[args.length]}\`. Expected \`${command.minArgs}\` got \`${args.length}\`\n**Correct usage:** ${
						command.usage
					}`,
				);
			}

			command.run(message, args);
		}
	}
};
