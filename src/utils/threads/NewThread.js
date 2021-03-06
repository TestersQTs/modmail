module.exports = async (client, msg) => {
	let serverId = global.config.inboxServerId;
	if (global.config.inboxServerId === "") serverId = global.config.mainServerId;
	const inboxServer = client.guilds.cache.get(serverId);
	const mainServer = client.guilds.cache.get(global.config.mainServerId);
	const user = await mainServer.members.fetch(msg.author.id);
	if (user === undefined) return console.error("user was not found");

	let channelName = `${msg.author.tag.replace("#", "-")}`;
	if (channelName.length > 32) channelName = msg.author.username;

	const channel = await inboxServer.channels.create(channelName, {
		type: "text",
		reasons: `${msg.author.tag} (${msg.author.id}) started a new thread`,
		topic: `${msg.author.tag} (${msg.author.id}) | Thread opened ${new Date()}`,
		parent: global.config.newMailCategoryId,
	});
	const threadStartMessage = `
Tag: ${msg.author.tag} \`(${msg.author.id})\` | <@${msg.author.id}>
${user.nickname !== null ? `Nickname: ${user.nickname}\n` : ""}
Account created: ${client.botutils.FormatDays(msg.author.createdAt)}
Joined server: ${client.botutils.FormatDays(user.joinedTimestamp)} 

Roles: **${user.roles.cache.map(role => (role.name !== "@everyone" ? role.name : "")).join(" ")}**
ID (channel-message): \`${msg.channel.id}-${msg.id}\`
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
	`;

	channel.send(threadStartMessage);
};
