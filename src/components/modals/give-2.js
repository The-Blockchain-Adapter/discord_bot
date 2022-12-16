// Once the user enter the values in the balance modal, this script runs
module.exports = {
	data: {
		name: `give-2`,
	},
	async execute(interaction, client) {
		// Get the values entered in the modal
		const btc = interaction.fields.getTextInputValue("BTCInput");

		const user = interaction.user.username;
		// Reply to the user on discord
		await interaction.reply({
			content: `${user} has now $${btc} Bitcoins!!!`,
		});
	},
};
