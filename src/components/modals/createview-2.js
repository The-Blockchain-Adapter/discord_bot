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
		const text = interaction.fields.getTextInputValue("TextInput");
		const abi = interaction.fields.getTextInputValue("AbiInput");

		// REALLY STORE THE DATA

		// GET THE VALUES TO ENTER
		// start at the first "(" from the line of the function, and end a the next ")"
		//look at a real abi to see

		await interaction.reply({
			content: `The function ${name} has been added successfully!\nYou can now call it using the command  /view ${name}`,
		});
	},
};
