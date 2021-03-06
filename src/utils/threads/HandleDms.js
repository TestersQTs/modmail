const NewThread = require("./NewThread");
const OldThread = require("./OldThread");
const { hasActiveThread } = require("./ThreadUtils");

module.exports = async (client, msg) => {
	if (hasActiveThread(msg.author.id)) OldThread(client, msg);
	else NewThread(client, msg);
};
