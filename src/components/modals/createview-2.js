const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

// Once the user enter the values in the createview modal, this script runs
module.exports = {
	data: {
		name: `createview-2`,
	},
	async execute(interaction, client) {
		// Get the values entered in the modal
		const name = interaction.fields.getTextInputValue("NameInput");
		const address = interaction.fields.getTextInputValue("AddressInput");
		const blockchain = interaction.fields.getTextInputValue("BlockchainInput");
		const needAdmin = interaction.fields.getTextInputValue("NeedAdminInput");
		const abi = interaction.fields.getTextInputValue("AbiInput");

		// TRANSFER THE DATA TO THE 3rd PART
		await interaction.reply({ content: "helo" });

		// Create the 2nd part of the modal
		const modal2 = new ModalBuilder()
			.setCustomId(`createview-3`)
			.setTitle(`Create a new view function 2/2`);

		// Create all the components of the modal
		const textBefore = new TextInputBuilder()
			.setCustomId("TextBeforeInput")
			.setLabel(`Text before saying the result`)
			.setRequired(false)
			.setStyle(TextInputStyle.Short);

		const textAfter = new TextInputBuilder()
			.setCustomId("TextAfterInput")
			.setLabel(`Text after saying the result`)
			.setRequired(false)
			.setStyle(TextInputStyle.Short);

		// Add the components and show the modal
		modal2.addComponents(new ActionRowBuilder().addComponents(textBefore));
		modal2.addComponents(new ActionRowBuilder().addComponents(textAfter));
		await interaction.showModal(modal2);
	},
};
