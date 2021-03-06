const moment = require("moment");

module.exports = class BotUtils {
	constructor(client) {
		this.client = client;
	}

	FormatDays(start) {
		const end = moment.utc().format("YYYY-MM-DD");
		const date = moment(moment.utc(start).format("YYYY-MM-DD"));
		const days = moment.duration(date.diff(end)).asDays();

		return `${moment.utc(start).format("MMMM, Do YYYY @ hh:mm:ss a")} \`\`(${Math.floor(days).toString().replace("-", "")} days ago)\`\``;
	}
};
