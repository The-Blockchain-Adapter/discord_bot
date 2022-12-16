require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

// Setup
const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.modals = new Collection();
client.commandArray = [];

// Check all of the commands
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

// Handle everything & login
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
	await connect(databaseToken).catch(console.error);
})();
