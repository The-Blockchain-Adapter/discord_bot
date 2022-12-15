const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

// Honnetement j'ai pas compris a quoi servais ce fichier
module.exports = (client) => {
	client.handleCommands = async () => {
		const commandFolders = fs.readdirSync("./src/commands");
		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./src/commands/${folder}`)
				.filter((file) => file.endsWith(".js"));

			const { commands, commandArray } = client;
			for (const file of commandFiles) {
				const command = require(`../../commands/${folder}/${file}`);
				commands.set(command.data.name, command);
				commandArray.push(command.data.toJSON());
				console.log(`Command: /${command.data.name} has been passed through the handler`);
			}
		}

		const clientId = process.env.clientId; // Your bot ID in discord
		const rest = new REST({ version: "9" }).setToken(process.env.token);

		try {
			await rest.put(Routes.applicationCommands(clientId), {
				body: client.commandArray,
			});
			console.log("Successfully reloaded application commands.");
		} catch (error) {
			console.error(error);
		}
	};
};
