// Once the user enter the values in the createview-2 modal, this script runs
module.exports = {
	data: {
		name: `createview-3`,
	},
	async execute(interaction, client) {
		// Get the values entered in the modal
		const textBefore = interaction.fields.getTextInputValue("TextBeforeInput");
		const textAfter = interaction.fields.getTextInputValue("textAfterInput");

		// REALLY STORE THE DATA

		// GET THE VALUES TO ENTER

		//GET THE NAME
		const name = "blabla";

		// Reply to the user on discord
		await interaction.reply({
			content: `The function '${name}' has been added successfully`,
		});
	},
};
