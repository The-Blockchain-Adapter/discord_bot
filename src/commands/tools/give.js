const {
	SlashCommandBuilder,
	ModalBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

// Command details
module.exports = {
	data: new SlashCommandBuilder().setName("give").setDescription("Give you BTC"),
	async execute(interaction, client) {
		// Create the modal
		const modal = new ModalBuilder().setCustomId(`give-2`).setTitle(`Give you BTC`);

		// Create the address component
		const btc = new TextInputBuilder()
			.setCustomId("BTCInput")
			.setLabel(`How many Bitcoins do you want ?`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short);

		// Add the components and show the modal
		modal.addComponents(new ActionRowBuilder().addComponents(btc));
		await interaction.showModal(modal);
	},
};
