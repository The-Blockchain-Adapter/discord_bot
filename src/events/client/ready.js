// Once the bot is ready, send a message on the terminal
const chalk = require("chalk");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		console.log(chalk.cyan(`${client.user.tag} is logged in and online.`));
	},
};
