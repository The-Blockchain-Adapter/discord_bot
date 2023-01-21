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

			// If the modal is a script modal, get the script-2 modal
			var modal;
			if (customId.startsWith("script-")) {
				modal = modals.get("script-2");
			} else {
				modal = modals.get(customId);
			}

			// If there is no code for this modal, return an error
			if (!modal) return new Error("There is no code for this modal.");

			// Execute the modal code
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
