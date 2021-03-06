module.exports = async (client, msg) => {
	// check if user has a mail already active
	// if add the content to the channel
	// if not create a new mail

	let serverId = global.config.inboxServerId;
	if (global.config.inboxServerId === "") serverId = global.config.mainServerId;
	const guild = client.guilds.cache.get(serverId);

	let channelName = `${msg.author.tag.replace("#", "-")}`;
	if (channelName.length > 32) channelName = msg.author.username;

	guild.channels.create(channelName, {
		type: "text",
		reasons: `${msg.author.tag} (${msg.author.id}) started a new thread`,
		topic: `${msg.author.tag} (${msg.author.id}) | Thread opened ${new Date()}`,
		parent: global.config.newMailCategoryId,
	});

	console.log(guild);
};
