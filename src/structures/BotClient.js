const { Client, Collection, Permissions } = require("discord.js");
const Util = require("./Util");
const BotUtils = require("../utils/BotUtils");

const { PermissionException } = require("./exceptions/PermissionException");

module.exports = class BotClient extends Client {
	constructor(options = {}) {
		super({
			disableMentions: "everyone",
			fetchAllUsers: false,
		});
		this.validate(options);

		this.commands = new Collection();
		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Util(this);

		this.botutils = new BotUtils(this);
	}

	validate(options) {
		if (typeof options !== "object") throw new TypeError("Options must be type of Object!");

		if (!options.token) throw new Error("Client cannot log in without token!");
		this.token = options.token;

		if (!global.config.prefix) throw new Error("Client cannot log in without prefix!");
		if (typeof global.config.prefix !== "string") throw new TypeError("Prefix must be type of String!");
		this.prefix = global.config.prefix;

		if (!options.defaultPerms) throw new PermissionException("Default permissions cannot be null!");
		this.defaultPerms = new Permissions(options.defaultPerms).freeze();
	}

	async login(token = this.token) {
		await this.utils.loadEvents();
		await this.utils.loadCommands();
		await super.login(token);
	}
};
