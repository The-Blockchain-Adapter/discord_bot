const { InteractionType } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		// If a user use a command, execute the linked script
		if (interaction.isChatInputCommand()) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;
			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: `Something went wrong while executing this command...`,
					ephemeral: true,
				});
			}

			// If a user submit a modal, execute the linked script
		} else if (interaction.type == InteractionType.ModalSubmit) {
			const { modals } = client;
			const { customId } = interaction;
			const modal = modals.get(customId);
			if (!modal) return new Error("There is no code for this modal.");
			try {
				await modal.execute(interaction, client);
			} catch (error) {
				console.error(error);
			}

			// If a user enter a command with values inside, execute the linked script
		} else if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
			const { commands } = client;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;
			try {
				await command.autocomplete(interaction, client);
			} catch (error) {
				console.error(error);
			}
		}
	},
};
